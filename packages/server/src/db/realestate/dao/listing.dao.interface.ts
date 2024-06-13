import { CreateFilteredPropertyListRequest, ListingCreationType } from '@realestatemanager/shared';
import { Pool } from 'pg';
import { ListingDetails } from 'src/modules/realestatecalc/models/listingdetails.model';

export interface ListingDAOInterface {

    insertListingDetails(
        pool: Pool,
        listingDetails: ListingDetails,
        creationType: ListingCreationType,
    ): Promise<number>;

    deleteListingByZillowURL(pool: Pool, zillowURL: string): Promise<boolean>;

    updateListingDetails(pool: Pool, listingDetails: ListingDetails): Promise<void>;

    getAllListings(pool: Pool, filteredPropertyListRequest?: CreateFilteredPropertyListRequest): Promise<ListingDetails[]>;

    getListingsByRentCastSaleResponseIds(pool: Pool, rentCastSaleResponseIds: number[]): Promise<ListingDetails[]>;

    getPropertiesByZillowURLs(pool: Pool, zillowURLs: string[]): Promise<ListingDetails[]>;

    getPropertyByZillowURL(pool: Pool, zillowURL: string): Promise<ListingDetails | null>;

    getPropertyById(pool: Pool, id: number): Promise<ListingDetails | null>;

    getPropertiesByIds(pool: Pool, ids: number[]): Promise<ListingDetails[]>;

} 