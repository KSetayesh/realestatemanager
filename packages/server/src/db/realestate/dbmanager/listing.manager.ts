import { Pool } from 'pg';
import { ListingDAO } from '../dao/listing.dao';
import { ListingCreationType } from '@realestatemanager/shared';
import { ListingDetails } from 'src/realestatecalc/models/listing_models/listingdetails.model';
import { DatabaseManager } from './db.manager';

export class ListingManager extends DatabaseManager {

    private listingDAO: ListingDAO;

    constructor(listingDAO: ListingDAO, commit: boolean) {
        super(commit);
        this.listingDAO = listingDAO;
    }

    async getAllListings(pool: Pool): Promise<ListingDetails[]> {
        return this.listingDAO.getAllListings(pool);
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