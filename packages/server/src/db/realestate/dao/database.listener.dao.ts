import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Utility } from '@realestatemanager/shared';
import { Pool } from 'pg';
import { DatabaseService } from 'src/db/database.service';
import { DatabaseTriggerType } from 'src/shared/Constants';
import { ListingManager } from '../dbmanager/listing.manager';
import { ListingDetails } from 'src/modules/realestatecalc/models/listingdetails.model';
import { CalculationsCacheHandler } from 'src/modules/realestatecalc/api/calculations.cache.handler';



@Injectable()
export class DatabaseListenerDAO implements OnModuleDestroy { //OnModuleInit, OnModuleDestroy {
    private pool: Pool;

    constructor(
        private readonly databaseService: DatabaseService,
        private readonly listingManager: ListingManager,
        private readonly cacheHandler: CalculationsCacheHandler
    ) {
        this.pool = this.databaseService.getPool();
    }

    // async onModuleInit() {
    //     console.log('In DatabaseListenerDAO.onModuleInit()');
    //     await this.listenToListingChanges();
    // }

    async onModuleDestroy() {
        if (this.pool) {
            await this.pool.release();
            console.log('Client released');
        }
    }

    async listenToListingChanges() {
        console.log('---Listening to database changes---');
        const client = await this.pool.connect();

        try {
            await client.query('LISTEN listing_change');
            client.on('notification', async (msg) => {
                console.log('inside listener');
                if (msg.channel === 'listing_change' && ((msg.payload + '').toLocaleLowerCase() === 'true')) {
                    console.log('Received listing_change notification:', msg.payload);
                    const res = await client.query(`SELECT AS , operation FROM affected_ids;`);

                    // const affectedIdsList: AffectedIdsType[] = [];
                    const affectedIdsByTypeMap: Map<number, DatabaseTriggerType> = new Map();

                    res.rows.forEach(row => {
                        const propertyListingId: number = row.property_listing_id;
                        const operation: DatabaseTriggerType = Utility.getEnumValue(DatabaseTriggerType, row.operation);
                        affectedIdsByTypeMap.set(propertyListingId, operation);
                    });

                    const listingDetailsList: ListingDetails[] = await this.listingManager.getPropertiesByIds(
                        client,
                        [...affectedIdsByTypeMap.keys()]
                    );

                    const listingDetailsGroupedByTriggerType: Map<DatabaseTriggerType, ListingDetails[]> = new Map();

                    for (const listingDetails of listingDetailsList) {
                        const listingId: number = listingDetails.id;
                        if (listingId in affectedIdsByTypeMap) {
                            const triggerType: DatabaseTriggerType = affectedIdsByTypeMap.get(listingId);
                            if (!(triggerType in listingDetailsGroupedByTriggerType)) {
                                listingDetailsGroupedByTriggerType.set(triggerType, []);
                            }
                            listingDetailsGroupedByTriggerType.get(triggerType).push(listingDetails);
                        }
                        else {
                            console.log(`Listing Id ${listingId} not found in affectedIdsByTypeMap`);
                        }
                    }

                    const triggerCacheBasedOnTriggerType = {
                        [DatabaseTriggerType.DELETE]: (listingDetailsList: ListingDetails[]) => {

                        },
                        [DatabaseTriggerType.GET_ALL_LISTINGS]: (listingDetailsList: ListingDetails[]) => { },
                        [DatabaseTriggerType.INSERT]: (listingDetailsList: ListingDetails[]) => { },
                        [DatabaseTriggerType.UPDATE]: (listingDetailsList: ListingDetails[]) => { },
                    };

                    for (const key of listingDetailsGroupedByTriggerType.keys()) {
                        const listingDetailsList: ListingDetails[] = listingDetailsGroupedByTriggerType.get(key);

                    }


                }
                else {
                    console.log('Not true');
                }
            });
        } catch (err) {
            console.error('Error setting up notification listener', err);
        }
    }

    // private async handleListingChange(changes: any[]) {
    //     changes.forEach(change => {
    //         console.log(`Operation: ${change.operation}, Record ID: ${change.id}`);
    //         if (DatabaseTriggerType.GET_ALL_LISTINGS === change.operation) {
    //             console.log('Is a GET_ALL_LISTINGS operation');
    //         }
    //         else if (DatabaseTriggerType.UPDATE === change.operation) {
    //             console.log('Is an UPDATE operation');
    //         }
    //         else if (DatabaseTriggerType.DELETE === change.operation) {
    //             console.log('Is a DELETE operation');
    //         }
    //         else if (DatabaseTriggerType.INSERT === change.operation) {
    //             console.log('Is an INSERT operation');
    //         }
    //         else {
    //             throw new Error('Not a valid operation type');
    //         }
    //         // Perform the necessary actions based on the change
    //     });
    // }

    // public async executeQueryWithNotification(query: string, params: any[]) {
    //     const client = await this.pool.connect();
    //     try {
    //         await client.query('BEGIN');
    //         const res = await client.query(query, params);
    //         await client.query('SELECT notify_and_clear_affected_ids()');
    //         await client.query('COMMIT');
    //         return res;
    //     } catch (err) {
    //         await client.query('ROLLBACK');
    //         throw err;
    //     } finally {
    //         client.release();
    //     }
    // }
}
