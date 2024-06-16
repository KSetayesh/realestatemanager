import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { DatabaseService } from 'src/db/database.service';
import { DatabaseTriggerType } from 'src/shared/Constants';
import { ListingManager } from './realestate/dbmanager/listing.manager';
import { ListingDetails } from 'src/modules/realestatecalc/models/listingdetails.model';
import { CalculationsCacheHandler } from 'src/modules/realestatecalc/api/calculations.cache.handler';
import { Utility } from '@realestatemanager/utilities';

type TriggerCacheHandler = {
    [key in DatabaseTriggerType]: (list: ListingDetails[] | number[]) => Promise<void>;
};

@Injectable()
export class DatabaseListenerDAO implements OnModuleDestroy {
    private pool: Pool;

    // I don't want to "await" on any of these calls, 
    // I want to send the message to my cache api and then continue with the application right away
    private triggerCacheBasedOnTriggerType: TriggerCacheHandler = {
        [DatabaseTriggerType.GET_ALL_LISTINGS]: async (listDetails: ListingDetails[]): Promise<void> => {
            console.log('In setNewCache');
            this.cacheHandler.setNewCache(listDetails);
        },
        [DatabaseTriggerType.INSERT]: async (listDetails: ListingDetails[]): Promise<void> => {
            console.log('In updateCache (Insert)');
            this.cacheHandler.updateCache(listDetails, false);
        },
        [DatabaseTriggerType.UPDATE]: async (listDetails: ListingDetails[]): Promise<void> => {
            console.log('In updateCache (Update)');
            this.cacheHandler.updateCache(listDetails, true);
        },
        [DatabaseTriggerType.DELETE]: async (listDetailsIds: number[]): Promise<void> => {
            console.log('In deleteFromCache');
            this.cacheHandler.deleteFromCache(listDetailsIds);
        },
    };

    constructor(
        private readonly databaseService: DatabaseService,
        private readonly listingManager: ListingManager,
        private readonly cacheHandler: CalculationsCacheHandler,
        private readonly enableChacheUpdate: boolean,
    ) {
        this.pool = this.databaseService.getPool();
    }

    async onModuleDestroy() {
        if (this.pool) {
            await this.pool.release();
            console.log('Client released');
        }
    }

    async listenToListingChanges() {
        if (!this.enableChacheUpdate) {
            return;
        }
        console.log('---Listening to database changes---');
        const client = await this.pool.connect();

        try {
            await client.query('LISTEN listing_change');
            client.on('notification', async (msg: any) => {
                if (this.receivedChangeNotification(msg)) {
                    console.log('Received listing_change notification:', msg.payload);
                    await this.handleNotification(client);
                }
            });
        } catch (err) {
            console.error('Error setting up notification listener', err);
        }
    }

    private receivedChangeNotification(msg: any): boolean {
        return msg.channel === 'listing_change' && msg.payload.toLowerCase() === 'true';
    }

    private async handleNotification(client: PoolClient) {
        const res = await client.query('SELECT listing_details_id, operation FROM affected_ids;');
        await client.query('DELETE FROM affected_ids;');

        const affectedIdsByTypeMap: Map<number, DatabaseTriggerType> = new Map();
        const deletedIds: number[] = [];

        res.rows.forEach((row: any) => {
            const listingDetailsId: number = row.listing_details_id;
            const operation: DatabaseTriggerType = Utility.getEnumValue(DatabaseTriggerType, row.operation);
            if (operation === DatabaseTriggerType.DELETE) {
                deletedIds.push(listingDetailsId);
            } else {
                affectedIdsByTypeMap.set(listingDetailsId, operation);
            }
        });

        const listingDetailsList: ListingDetails[] = await this.listingManager.getPropertiesByIds(
            client,
            [...affectedIdsByTypeMap.keys()]
        );

        const listingDetailsGroupedByTriggerType: Map<DatabaseTriggerType, ListingDetails[]> = this.groupListingDetailsByTriggerType(
            listingDetailsList,
            affectedIdsByTypeMap
        );

        await this.processGroupedListingDetails(listingDetailsGroupedByTriggerType);
        if (deletedIds.length > 0) {
            await this.triggerCacheBasedOnTriggerType[DatabaseTriggerType.DELETE](deletedIds);
        }
    }

    private groupListingDetailsByTriggerType(
        listingDetailsList: ListingDetails[],
        affectedIdsByTypeMap: Map<number, DatabaseTriggerType>
    ): Map<DatabaseTriggerType, ListingDetails[]> {
        const listingDetailsGroupedByTriggerType: Map<DatabaseTriggerType, ListingDetails[]> = new Map();

        listingDetailsList.forEach((listingDetails) => {
            const listingId: number = listingDetails.id;
            if (affectedIdsByTypeMap.has(listingId)) {
                const triggerType: DatabaseTriggerType = affectedIdsByTypeMap.get(listingId);
                if (!listingDetailsGroupedByTriggerType.has(triggerType)) {
                    listingDetailsGroupedByTriggerType.set(triggerType, []);
                }
                listingDetailsGroupedByTriggerType.get(triggerType).push(listingDetails);
            } else {
                console.log(`Listing Id ${listingId} not found in affectedIdsByTypeMap`);
            }
        });

        return listingDetailsGroupedByTriggerType;
    }

    private async processGroupedListingDetails(listingDetailsGroupedByTriggerType: Map<DatabaseTriggerType, ListingDetails[]>) {
        for (const triggerType of listingDetailsGroupedByTriggerType.keys()) {
            const listingDetailsList: ListingDetails[] = listingDetailsGroupedByTriggerType.get(triggerType);
            if (listingDetailsList.length > 0) {
                await this.triggerCacheBasedOnTriggerType[triggerType](listingDetailsList);
            }
        }
    }


}
