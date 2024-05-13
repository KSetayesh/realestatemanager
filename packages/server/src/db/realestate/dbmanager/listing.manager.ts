import { Pool } from 'pg'; 
import { ListingDAO } from '../dao/listing.dao';
import { ListingCreationType, ListingDetailsDTO } from '@realestatemanager/shared';
import { ListingDetails } from 'src/realestatecalc/models/listing_models/listingdetails.model';

export class ListingManager {

    private listingDAO: ListingDAO;

    constructor(listingDAO: ListingDAO) {
        this.listingDAO = listingDAO;
    }

    async getAllListings(pool: Pool): Promise<ListingDetails[]> {
        return this.listingDAO.getAllListings(pool);
    }

    async getPropertyByZillowURL(pool: Pool, zillowURL: string): Promise<ListingDetails | null> {
        return this.listingDAO.getPropertyByZillowURL(pool, zillowURL);
    }

    async insertListingDetails(
        pool: Pool,
        listingDetails: ListingDetailsDTO,
        creationType: ListingCreationType,
        saleResponseId?: number,
        propertyResponseId?: number,
    ): Promise<number> {
        return this.listingDAO.insertListingDetails(
            pool,
            listingDetails,
            creationType,
            saleResponseId,
            propertyResponseId
        );
    }

}