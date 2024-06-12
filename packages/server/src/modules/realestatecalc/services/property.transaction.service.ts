import { Pool, PoolClient } from 'pg';
import { Injectable } from '@nestjs/common';
import {
    CreateGetAllPropertiesRequest,
    CreateListingDetailsRequest,
    CreateUpdatePropertyRequest,
    ListingWithScenariosResponseDTO,
    CreatePropertiesInBulkRequest,
    CreateInvestmentScenarioRequest,
    ListingCreationType,
} from '@realestatemanager/shared';
import { DatabaseService } from 'src/db/database.service';
import { PropertyService } from './property.service';
import { ListingDetails } from '../models/listingdetails.model';
import { DatabaseTriggerTypes } from 'src/shared/Constants';

@Injectable()
export class PropertyTransactionService {

    private pool: Pool;

    constructor(
        private readonly databaseService: DatabaseService,
        private readonly propertyService: PropertyService,
        private readonly enableCacheUpdates: boolean,
    ) {
        this.pool = this.databaseService.getPool()
        this.setupCache();
    }

    async getAllProperties(getAllPropertiesRequest?: CreateGetAllPropertiesRequest): Promise<ListingWithScenariosResponseDTO[]> {
        return this.propertyService.getAllProperties(this.pool, getAllPropertiesRequest);
    }

    async updateProperty(createUpdatePropertyRequest: CreateUpdatePropertyRequest): Promise<ListingWithScenariosResponseDTO> {
        return this.executeWithTransaction(client => this.propertyService.updateProperty(client, createUpdatePropertyRequest));
    }

    async deleteListingDetails(zillowURL: string): Promise<boolean> {
        return this.executeWithTransaction(client => this.propertyService.deleteListingDetails(client, zillowURL));
    }

    async addNewProperty(listingDetailsRequest: CreateListingDetailsRequest): Promise<number> {
        return this.executeWithTransaction(client => this.propertyService.addNewProperty(client, listingDetailsRequest));
    }

    async addPropertiesInBulk(propertiesInBulk: CreatePropertiesInBulkRequest): Promise<number> {
        return this.executeWithTransaction(client => this.propertyService.addPropertiesInBulk(client, propertiesInBulk));
    }

    async calculate(
        investmentScenarioRequest: CreateInvestmentScenarioRequest,
        listingDetails?: ListingDetails,
    ): Promise<ListingWithScenariosResponseDTO> {
        return this.propertyService.calculate(this.pool, investmentScenarioRequest, listingDetails);
    }

    async getListingsByRentCastSaleResponseIds(rentCastSaleResponseIds: number[]): Promise<ListingDetails[]> {
        return this.propertyService.getListingsByRentCastSaleResponseIds(this.pool, rentCastSaleResponseIds);
    }

    async updateListingDetails(updatedListingDetails: ListingDetails): Promise<void> {
        return this.executeWithTransaction(client => this.propertyService.updateListingDetails(client, updatedListingDetails));
    }

    async insertListingDetails(
        listingDetails: ListingDetails,
        listingCreationType: ListingCreationType,
    ): Promise<number> {
        return this.executeWithTransaction(client => this.propertyService.insertListingDetails(client, listingDetails, listingCreationType));
    }

    private async executeWithTransaction<T>(operation: (client: PoolClient) => Promise<T>, updateCache: boolean = true): Promise<T> {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            const result = await operation(client);
            await client.query('COMMIT');
            await this.executeUpdateCache(client, updateCache);
            return result;
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Transaction failed:', error);
            throw error;
        } finally {
            client.release();
        }
    }

    private async executeUpdateCache(client: Pool, updateCache: boolean = true): Promise<void> {
        if (!this.enableCacheUpdates) {
            return;
        }
        if (updateCache) {
            await client.query('SELECT notify_and_clear_affected_ids()');
        }
    }

    private async setupCache(): Promise<void> {
        if (!this.enableCacheUpdates) {
            return;
        }
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            await client.query(`
                INSERT INTO 
                affected_ids (id, operation) 
                SELECT id, '${DatabaseTriggerTypes.GET_ALL_LISTINGS}' 
                FROM listing_details;`);
            await client.query('COMMIT');
            await this.executeUpdateCache(client);
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Transaction failed:', error);
            throw error;
        } finally {
            client.release();
        }
    }

}

