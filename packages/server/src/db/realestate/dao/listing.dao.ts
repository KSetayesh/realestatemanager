import { Pool } from 'pg';
import { RealEstateDAO } from "./realestate.dao";
import { ListingDetails } from 'src/realestatecalc/models/listing_models/listingdetails.model';
import { Address } from 'src/realestatecalc/models/listing_models/address.model';
import { PropertyDetails } from 'src/realestatecalc/models/listing_models/propertydetails.model';
import { ZillowMarketEstimates } from 'src/realestatecalc/models/listing_models/zillowmarketestimates.model';
import {
    AddressDTO,
    Country,
    ListingDetailsDTO,
    PropertyDetailsDTO,
    PropertyType,
    PropertyStatus,
    SchoolRatingDTO,
    State,
    ZillowMarketEstimatesDTO,
    ListingCreationType,
} from '@realestatemanager/shared';
import { SchoolRating } from 'src/realestatecalc/models/listing_models/schoolrating.model';

export class ListingDAO extends RealEstateDAO {

    private GET_LISTINGS_QUERY = `SELECT 
            ld.zillow_url, ld.listing_price, ld.property_status, ld.date_listed, ld.creation_type, ld.created_at, ld.updated_at, ld.rent_cast_sale_response_id, 
            ad.full_address, ad.state, ad.zipcode, ad.city, ad.county, ad.country, ad.street_address, ad.apartment_number,
            ad.longitude, ad.latitude, sr.elementary_school_rating, sr.middle_school_rating, sr.high_school_rating, 
            pd.number_of_bedrooms, pd.number_of_full_bathrooms, pd.number_of_half_bathrooms, pd.square_feet, 
            pd.acres, pd.year_built, pd.has_garage, pd.has_pool, pd.has_basement, pd.property_type, pd._description,
            zme.zestimate, zme.zestimate_low, zme.zestimate_high, zme.zillow_rent_estimate, zme.zillow_monthly_property_tax_amount, 
            zme.zillow_monthly_home_insurance_amount, zme.zillow_monthly_hoa_fees_amount 
        FROM listing_details ld
        JOIN zillow_market_estimates zme ON ld.zillow_market_estimates_id = zme.id 
        JOIN property_details pd ON ld.property_details_id = pd.id
        JOIN address ad ON pd.address_id = ad.id 
        JOIN school_rating sr ON pd.school_rating_id = sr.id`;

    private INSERT_LISTING_DETAILS_QUERY = `INSERT INTO listing_details 
            (zillow_url, 
            property_details_id, 
            zillow_market_estimates_id, 
            listing_price,
            property_status,
            date_listed,
            creation_type)`;

    private INSERT_LISTING_DETAILS_WITH_RENT_CAST_ID_QUERY = `INSERT INTO listing_details 
            (zillow_url, 
            property_details_id, 
            zillow_market_estimates_id, 
            listing_price,
            property_status,
            date_listed,
            creation_type,
            rent_cast_sale_response_id)`;

    private INSERT_LISTING_DETAILS_WITH_MULTIPLE_RENT_CAST_ID_QUERY = `INSERT INTO listing_details 
            (zillow_url, 
            property_details_id, 
            zillow_market_estimates_id, 
            listing_price,
            property_status,
            date_listed,
            creation_type,
            rent_cast_sale_response_id,
            rent_cast_property_response_id)`;

    private INSERT_SCHOOL_RATING_QUERY = `INSERT INTO school_rating 
            (elementary_school_rating, 
            middle_school_rating, 
            high_school_rating)`;

    private INSERT_ADDRESS_QUERY = `INSERT INTO address 
            (full_address, 
            state, 
            zipcode, 
            city,
            county, 
            country, 
            street_address, 
            apartment_number,
            longitude,
            latitude)`;

    private INSERT_PROPERTY_DETAILS_QUERY = `INSERT INTO property_details 
                (address_id, 
                school_rating_id,
                number_of_bedrooms, 
                number_of_full_bathrooms, 
                number_of_half_bathrooms, 
                square_feet, 
                acres, 
                year_built,
                has_garage,
                has_pool,
                has_basement,
                property_type,
                _description)`;

    private INSERT_ZILLOW_MARKET_ESTIMATES_QUERY = `INSERT INTO zillow_market_estimates 
            (zestimate, 
            zestimate_low, 
            zestimate_high, 
            zillow_rent_estimate,
            zillow_monthly_property_tax_amount,
            zillow_monthly_home_insurance_amount,
            zillow_monthly_hoa_fees_amount)`;

    async getAllListings(pool: Pool): Promise<ListingDetails[]> {
        const listings: ListingDetails[] = [];
        const query = `${this.GET_LISTINGS_QUERY};`;

        try {
            const res = await pool.query(query);
            res.rows.forEach(row => {
                const listing: ListingDetails = this.mapRowToListingDetails(row);
                listings.push(listing);
            });
            return listings;
        } catch (err) {
            console.error('Error fetching all listings', err);
            throw err;
        }
    }

    async getListingsByRentCastSaleResponseIds(pool: Pool, rentCastSaleResponseIds: number[]): Promise<ListingDetails[]> {
        const listings: ListingDetails[] = [];

        // Generate the placeholder for the parameterized query
        const placeholders = rentCastSaleResponseIds.map((_, index) => `$${index + 1}`).join(', ');
        const query = `${this.GET_LISTINGS_QUERY} WHERE ld.rent_cast_sale_response_id IN (${placeholders});`;

        // Generate the placeholder for the parameterized query

        try {
            const res = await pool.query(query);
            res.rows.forEach(row => {
                const listing: ListingDetails = this.mapRowToListingDetails(row);
                listings.push(listing);
            });
            return listings;
        } catch (err) {
            console.error('Error fetching all listings', err);
            throw err;
        }
    }

    async getPropertyByZillowURL(pool: Pool, zillowURL: string): Promise<ListingDetails | null> {
        const query = `${this.GET_LISTINGS_QUERY} WHERE ld.zillow_url = $1;`;
        try {
            const res = await pool.query(query, [zillowURL]);
            if (res.rows.length > 0) {
                const row = res.rows[0];
                const listing: ListingDetails = this.mapRowToListingDetails(row);
                return listing;
            }
            return null;
        } catch (err) {
            console.error(`Error fetching property by Zillow URL: ${zillowURL}`, err);
            throw err;
        }
    }

    async insertListingDetails(
        pool: Pool,
        listingDetails: ListingDetailsDTO,
        creationType: ListingCreationType,
        saleResponseId?: number,
        propertyResponseId?: number,
    ): Promise<number> {
        let newListingId = -1;
        try {
            const addressId = await this.insertAddress(pool, listingDetails.propertyDetails.address);
            const schoolRatingId = await this._insertSchoolRating(pool, listingDetails.propertyDetails.schoolRating);
            const propertyDetailsId = await this.insertPropertyDetails(pool, listingDetails.propertyDetails, addressId, schoolRatingId);
            let zillowMarketEstimatesId: number | null = null;
            if (listingDetails.zillowMarketEstimates) {
                zillowMarketEstimatesId = await this.insertZillowMarketEstimates(pool, listingDetails.zillowMarketEstimates);
            }

            const values: any[] = [
                listingDetails.zillowURL,
                propertyDetailsId,
                zillowMarketEstimatesId,
                listingDetails.listingPrice,
                listingDetails.propertyStatus,
                listingDetails.dateListed,
                creationType,
            ];

            const isValidRentCastResponseId = (rentCastResponseId?: number): boolean => {
                return rentCastResponseId && rentCastResponseId > -1;
            }

            if (ListingCreationType.RENT_CAST_API === creationType && isValidRentCastResponseId(saleResponseId)) {
                values.push(saleResponseId);
                if (isValidRentCastResponseId(propertyResponseId)) {
                    values.push(propertyResponseId);
                    newListingId = await this.genericInsertQuery(pool, this.INSERT_LISTING_DETAILS_WITH_MULTIPLE_RENT_CAST_ID_QUERY, values);
                }
                else {
                    newListingId = await this.genericInsertQuery(pool, this.INSERT_LISTING_DETAILS_WITH_RENT_CAST_ID_QUERY, values);
                }
            }
            else {
                newListingId = await this.genericInsertQuery(pool, this.INSERT_LISTING_DETAILS_QUERY, values);
            }

            console.log('Listing information inserted successfully');
        } catch (err) {
            console.error('Error inserting listing information', err);
            throw err;
        }
        return newListingId;
    }

    private mapRowToListingDetails(row: any): ListingDetails {
        const fullAddress: string = row.full_address;
        const state: State = row.state;
        const zipcode: string = row.zipcode;
        const city: string = row.city;
        const county: string = row.county;
        const country: Country = row.country;
        const streetAddress: string = row.street_address;
        const apartmentNumber: string = row.apartment_number;
        const longitude: number = row.longitude;
        const latitude: number = row.latitude;
        const address: Address =
            new Address(
                fullAddress,
                state,
                zipcode,
                city,
                county,
                country,
                streetAddress,
                apartmentNumber,
                longitude,
                latitude
            );

        const elementarySchoolRating: number = row.elementary_school_rating;
        const middleSchoolRating: number = row.middle_school_rating;
        const highSchoolRating: number = row.high_school_rating;
        const numberOfBedrooms: number = row.number_of_bedrooms;
        const numberOfFullBathrooms: number = row.number_of_full_bathrooms;
        const numberOfHalfBathrooms: number = row.number_of_half_bathrooms;
        const squareFeet: number = row.square_feet;
        const acres: number = row.acres;
        const yearBuilt: number = row.year_built;
        const hasGarage: boolean = row.has_garage;
        const hasPool: boolean = row.has_pool;
        const hasBasement: boolean = row.has_basement;
        const propertyType: PropertyType = row.property_type;
        const description: string = row._description;
        const schoolRating: SchoolRating = new SchoolRating(elementarySchoolRating, middleSchoolRating, highSchoolRating);

        const propertyDetails: PropertyDetails =
            new PropertyDetails(
                address,
                schoolRating,
                numberOfBedrooms,
                numberOfFullBathrooms,
                numberOfHalfBathrooms,
                squareFeet,
                acres,
                yearBuilt,
                hasGarage,
                hasPool,
                hasBasement,
                propertyType,
                description);

        const zestimate: number = row.zestimate;
        const zillowRentEstimate: number = row.zillow_rent_estimate;
        const zestimateLow: number = row.zestimate_low;
        const zestimateHigh: number = row.zestimate_high;
        const zillowMonthlyPropertyTaxAmount: number = row.zillow_monthly_property_tax_amount;
        const zillowMonthlyHomeInsuranceAmount: number = row.zillow_monthly_home_insurance_amount;
        const zillowMonthlHOAFeesAmount: number = row.zillow_monthly_hoa_fees_amount;

        const zillowMarketEstimates: ZillowMarketEstimates =
            new ZillowMarketEstimates(
                zestimate,
                zestimateLow,
                zestimateHigh,
                zillowRentEstimate,
                zillowMonthlyPropertyTaxAmount,
                zillowMonthlyHomeInsuranceAmount,
                zillowMonthlHOAFeesAmount);

        const zillowURL: string = row.zillow_url;
        const listingPrice: number = row.listing_price;
        const creationType: ListingCreationType = row.creation_type;
        const propertyStatus: PropertyStatus = row.property_status;
        const dateListed: Date = new Date(row.date_listed);
        const dateCreated: Date = new Date(row.created_at);
        const dateUpdated: Date = new Date(row.updated_at);

        return new ListingDetails(
            zillowURL,
            propertyDetails,
            zillowMarketEstimates,
            listingPrice,
            propertyStatus,
            creationType,
            dateListed,
            dateCreated,
            dateUpdated,
        );

    }

    private async _insertSchoolRating(pool: Pool, schoolRating: SchoolRatingDTO): Promise<number> {

        const values: any[] = [
            schoolRating.elementarySchoolRating,
            schoolRating.middleSchoolRating,
            schoolRating.highSchoolRating]

        return this.genericInsertQuery(pool, this.INSERT_SCHOOL_RATING_QUERY, values);
    }

    private async insertAddress(pool: Pool, address: AddressDTO): Promise<number> {

        const values: any[] = [
            address.fullAddress,
            address.state,
            address.zipcode,
            address.city,
            address.county,
            address.country,
            address.streetAddress,
            address.apartmentNumber,
            address.longitude,
            address.latitude];

        return this.genericInsertQuery(pool, this.INSERT_ADDRESS_QUERY, values);
    }

    private async insertPropertyDetails(
        pool: Pool,
        propertyDetails: PropertyDetailsDTO,
        addressId: number,
        schoolRatingId: number
    ): Promise<number> {

        const values: any[] = [
            addressId,
            schoolRatingId,
            propertyDetails.numberOfBedrooms,
            propertyDetails.numberOfFullBathrooms,
            propertyDetails.numberOfHalfBathrooms,
            propertyDetails.squareFeet,
            propertyDetails.acres,
            propertyDetails.yearBuilt,
            propertyDetails.hasGarage,
            propertyDetails.hasPool,
            propertyDetails.hasBasement,
            propertyDetails.propertyType,
            propertyDetails.description]

        return this.genericInsertQuery(pool, this.INSERT_PROPERTY_DETAILS_QUERY, values);

    }

    private async insertZillowMarketEstimates(pool: Pool, zillowMarketEstimates: ZillowMarketEstimatesDTO): Promise<number> {

        const values: any[] = [
            zillowMarketEstimates.zestimate,
            zillowMarketEstimates.zestimateRange.low,
            zillowMarketEstimates.zestimateRange.high,
            zillowMarketEstimates.zillowRentEstimate,
            zillowMarketEstimates.zillowMonthlyPropertyTaxAmount,
            zillowMarketEstimates.zillowMonthlyHomeInsuranceAmount,
            zillowMarketEstimates.zillowMonthlyHOAFeesAmount];

        return this.genericInsertQuery(pool, this.INSERT_ZILLOW_MARKET_ESTIMATES_QUERY, values);
    }
}
