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

@Injectable()
export class PropertyTransactionService {

    private pool: Pool;

    constructor(
        private readonly databaseService: DatabaseService,
        private readonly propertyService: PropertyService,
    ) {
        this.pool = this.databaseService.getPool();
        // this.setNewCacheIfNeeded();
    }

    async executeWithTransaction<T>(operation: (client: PoolClient) => Promise<T>): Promise<T> {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            const result = await operation(client);
            await client.query('COMMIT');
            return result;
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Transaction failed:', error);
            throw error;
        } finally {
            client.release();
        }
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
        return this.executeWithTransaction(client => this.propertyService.calculate(client, investmentScenarioRequest, listingDetails));
    }

    async getListingsByRentCastSaleResponseIds(rentCastSaleResponseIds: number[]): Promise<ListingDetails[]> {
        return this.executeWithTransaction(client => this.propertyService.getListingsByRentCastSaleResponseIds(client, rentCastSaleResponseIds));
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
}

