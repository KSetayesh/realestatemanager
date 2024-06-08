import { Pool } from 'pg';
import { ListingDAO } from '../dao/listing.dao';
import { CreateFilteredPropertyListRequest, ListingCreationType } from '@realestatemanager/shared';
import { DatabaseManager } from './db.manager';
import { Injectable } from '@nestjs/common';
import { ListingDetails } from 'src/modules/realestatecalc/models/listing_models/listingdetails.model';

@Injectable()
export class ListingManager extends DatabaseManager {

    // private listingDAO: ListingDAO;

    // constructor(listingDAO: ListingDAO, commit: boolean) {
    //     super(commit);
    //     this.listingDAO = listingDAO;
    // }

    constructor(
        private readonly listingDAO: ListingDAO,
        commit: boolean,
    ) {
        super(commit)
    }

    async getAllListings(pool: Pool, filteredPropertyListRequest?: CreateFilteredPropertyListRequest): Promise<ListingDetails[]> {
        return this.listingDAO.getAllListings(pool, filteredPropertyListRequest);
    }

    async getListingsByRentCastSaleResponseIds(pool: Pool, rentCastSaleResponseIds: number[]): Promise<ListingDetails[]> {
        return this.listingDAO.getListingsByRentCastSaleResponseIds(pool, rentCastSaleResponseIds);
    }

    async getPropertyByZillowURL(pool: Pool, zillowURL: string): Promise<ListingDetails | null> {
        return this.listingDAO.getPropertyByZillowURL(pool, zillowURL);
    }

    async insertListingDetails(
        pool: Pool,
        listingDetails: ListingDetails,
        creationType: ListingCreationType,
    ): Promise<number> {
        if (!this.commit) {
            console.log(this.commitMessage);
            return;
        }
        return this.listingDAO.insertListingDetails(
            pool,
            listingDetails,
            creationType,
        );
    }

    async updateListingDetails(
        pool: Pool,
        listingDetails: ListingDetails,
    ): Promise<void> {
        if (!this.commit) {
            console.log(this.commitMessage);
            return;
        }
        this.listingDAO.updateListingDetails(
            pool,
            listingDetails,
        );
    }

}