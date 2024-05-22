import { Pool } from 'pg';
import { RealEstateDAO } from "./realestate.dao";
import { ListingDetails } from 'src/realestatecalc/models/listing_models/listingdetails.model';
import { Address } from 'src/realestatecalc/models/listing_models/address.model';
import { PropertyDetails } from 'src/realestatecalc/models/listing_models/propertydetails.model';
import { ZillowMarketEstimates } from 'src/realestatecalc/models/listing_models/zillowmarketestimates.model';
import {
    Country,
    PropertyType,
    PropertyStatus,
    State,
    ListingCreationType,
} from '@realestatemanager/shared';
import { SchoolRating } from 'src/realestatecalc/models/listing_models/schoolrating.model';

export class ListingDAO extends RealEstateDAO {

    private GET_LISTINGS_QUERY = `SELECT 
            ld.id AS listing_details_id, ld.zillow_url, ld.listing_price, ld.property_status, ld.date_listed,
            ld.creation_type, ld.created_at, ld.updated_at, ld.rent_cast_sale_response_id, 
            ld.rent_cast_property_response_id, 
            ad.id AS address_id, ad.full_address, ad.state, ad.zipcode, ad.city, ad.county, ad.country, 
            ad.street_address, ad.apartment_number, ad.longitude, ad.latitude,
            sr.id AS school_rating_id, sr.elementary_school_rating, sr.middle_school_rating, sr.high_school_rating, 
            pd.id AS property_details_id, pd.number_of_bedrooms, pd.number_of_full_bathrooms, 
            pd.number_of_half_bathrooms, pd.square_feet, pd.acres, pd.year_built, pd.has_garage, pd.has_pool, 
            pd.has_basement, pd.property_type, pd._description,
            zme.id AS zillow_market_estimates_id, zme.zestimate, zme.zestimate_low, zme.zestimate_high, 
            zme.zillow_rent_estimate, zme.zillow_monthly_property_tax_amount, 
            zme.zillow_monthly_home_insurance_amount, zme.zillow_monthly_hoa_fees_amount 
        FROM listing_details ld
        JOIN zillow_market_estimates zme ON ld.zillow_market_estimates_id = zme.id 
        JOIN property_details pd ON ld.property_details_id = pd.id
        JOIN address ad ON pd.address_id = ad.id 
        JOIN school_rating sr ON pd.school_rating_id = sr.id`;

    //----------------------------------------------------------------------------------------------------

    private INSERT_LISTING_DETAILS_QUERY = `INSERT INTO listing_details 
            (zillow_url, 
            property_details_id, 
            zillow_market_estimates_id, 
            listing_price,
            property_status,
            date_listed,
            creation_type)`;

    //----------------------------------------------------------------------------------------------------

    private INSERT_LISTING_DETAILS_WITH_RENT_CAST_ID_QUERY = `INSERT INTO listing_details 
            (zillow_url, 
            property_details_id, 
            zillow_market_estimates_id, 
            listing_price,
            property_status,
            date_listed,
            creation_type,
            rent_cast_sale_response_id)`;

    private UPDATE_LISTING_DETAILS_WITH_RENT_CAST_ID_QUERY = `UPDATE listing_details
            SET zillow_url = $1,
                property_details_id = $2,
                zillow_market_estimates_id = $3,
                listing_price = $4,
                property_status = $5,
                date_listed = $6,
                creation_type = $7,
                rent_cast_sale_response_id = $8,
                rent_cast_property_response_id = $9,
                updated_at = $10,
            WHERE id = $11;`;

    //----------------------------------------------------------------------------------------------------

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

    private UPDATE_LISTING_DETAILS_WITH_MULTIPLE_RENT_CAST_ID_QUERY = `UPDATE listing_details
            SET zillow_url = $1,
                property_details_id = $2,
                zillow_market_estimates_id = $3,
                listing_price = $4,
                property_status = $5,
                date_listed = $6,
                creation_type = $7,
                rent_cast_sale_response_id = $8,
                rent_cast_property_response_id = $9,
                updated_at = $10,
            WHERE id = $11;`;

    //----------------------------------------------------------------------------------------------------

    private INSERT_SCHOOL_RATING_QUERY = `INSERT INTO school_rating 
            (elementary_school_rating, 
            middle_school_rating, 
            high_school_rating)`;

    private UPDATE_SCHOOL_RATING_QUERY = `UPDATE school_rating
            SET elementary_school_rating = $1,
                middle_school_rating = $2,
                high_school_rating = $3,
                updated_at = $4,
            WHERE id = $5;`;

    //----------------------------------------------------------------------------------------------------

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

    private UPDATE_ADDRESS_QUERY = `UPDATE address
            SET full_address = $1,
                state = $2,
                zipcode = $3,
                city = $4,
                county = $5,
                country = $6,
                street_address = $7,
                apartment_number = $8,
                longitude = $9,
                latitude = $10,
                updated_at = $11,
            WHERE id = $12;`;

    //----------------------------------------------------------------------------------------------------

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

    private UPDATE_PROPERTY_DETAILS_QUERY = `UPDATE property_details
            SET address_id = $1,
                school_rating_id = $2,
                number_of_bedrooms = $3,
                number_of_full_bathrooms = $4,
                number_of_half_bathrooms = $5,
                square_feet = $6,
                acres = $7,
                year_built = $8,
                has_garage = $9,
                has_pool = $10,
                has_basement = $11,
                property_type = $12,
                _description = $13,
                updated_at = $14,
            WHERE id = $15;`;

    //----------------------------------------------------------------------------------------------------

    private INSERT_ZILLOW_MARKET_ESTIMATES_QUERY = `INSERT INTO zillow_market_estimates 
            (zestimate, 
            zestimate_low, 
            zestimate_high, 
            zillow_rent_estimate,
            zillow_monthly_property_tax_amount,
            zillow_monthly_home_insurance_amount,
            zillow_monthly_hoa_fees_amount)`;

    private UPDATE_ZILLOW_MARKET_ESTIMATES_QUERY = `UPDATE zillow_market_estimates
            SET zestimate = $1,
                zestimate_low = $2,
                zestimate_high = $3,
                zillow_rent_estimate = $4,
                zillow_monthly_property_tax_amount = $5,
                zillow_monthly_home_insurance_amount = $6,
                zillow_monthly_hoa_fees_amount = $7,
                updated_at = $8,
            WHERE id = $9;`;

    //----------------------------------------------------------------------------------------------------

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
        if (rentCastSaleResponseIds.length === 0) {
            console.log('No rentCastSaleResponseIds provided.');
            return [];
        }

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
        listingDetails: ListingDetails,
        creationType: ListingCreationType,
    ): Promise<number> {
        let newListingId = -1;
        try {
            const addressId = await this.insertAddress(pool, listingDetails);
            const schoolRatingId = await this._insertSchoolRating(pool, listingDetails);
            const propertyDetailsId = await this.insertPropertyDetails(
                pool,
                listingDetails,
                addressId,
                schoolRatingId
            );

            const zillowMarketEstimatesId: number = await this.insertZillowMarketEstimates(pool, listingDetails);

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

            const saleResponseId = listingDetails.rentCastSaleResponseId;
            const propertyResponseId = listingDetails.rentCastPropertyResponseId;

            if (isValidRentCastResponseId(saleResponseId)) {
                values.push(saleResponseId);
                if (isValidRentCastResponseId(propertyResponseId)) {
                    values.push(propertyResponseId);
                    newListingId = await this.genericInsertQuery(
                        pool,
                        this.INSERT_LISTING_DETAILS_WITH_MULTIPLE_RENT_CAST_ID_QUERY,
                        values
                    );
                }
                else {
                    newListingId = await this.genericInsertQuery(
                        pool,
                        this.INSERT_LISTING_DETAILS_WITH_RENT_CAST_ID_QUERY,
                        values
                    );
                }
            }
            else {
                newListingId = await this.genericInsertQuery(
                    pool,
                    this.INSERT_LISTING_DETAILS_QUERY,
                    values
                );
            }

            if (newListingId > -1) {
                console.log('Listing information inserted successfully');
                console.log(`New ListingDetails id: ${newListingId}`);
            }
        } catch (err) {
            console.error('Error inserting listing information', err);
            throw err;
        }
        return newListingId;
    }

    async updateListingDetails(pool: Pool, listingDetails: ListingDetails): Promise<void> {
        const query = this.UPDATE_LISTING_DETAILS_WITH_RENT_CAST_ID_QUERY;

        const values = [
            listingDetails.propertyDetailsId,
            listingDetails.zillowMarketEstimatesId,
            listingDetails.listingPrice,
            listingDetails.propertyStatus,
            listingDetails.dateListed,
            listingDetails.creationType,
            listingDetails.rentCastSaleResponseId,
            listingDetails.rentCastPropertyResponseId,
            new Date(),
            listingDetails.id,
        ];

        try {
            await pool.query(query, values);
            console.log('Zillow market estimates updated successfully');
        } catch (err) {
            console.error('Error updating Zillow market estimates', err);
            throw err;
        }
    }

    private mapRowToListingDetails(row: any): ListingDetails {

        const addressId: number = row.address_id;
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
                addressId,
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

        const schoolRatingId: number = row.school_rating_id;
        const elementarySchoolRating: number = row.elementary_school_rating;
        const middleSchoolRating: number = row.middle_school_rating;
        const highSchoolRating: number = row.high_school_rating;

        const schoolRating: SchoolRating =
            new SchoolRating(
                schoolRatingId,
                elementarySchoolRating,
                middleSchoolRating,
                highSchoolRating
            );

        const propertyDetailsId: number = row.property_details_id;
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

        const propertyDetails: PropertyDetails =
            new PropertyDetails(
                propertyDetailsId,
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

        const zillowMarketEstimatesId: number = row.zillow_market_estimates_id;
        const zestimate: number = row.zestimate;
        const zillowRentEstimate: number = row.zillow_rent_estimate;
        const zestimateLow: number = row.zestimate_low;
        const zestimateHigh: number = row.zestimate_high;
        const zillowMonthlyPropertyTaxAmount: number = row.zillow_monthly_property_tax_amount;
        const zillowMonthlyHomeInsuranceAmount: number = row.zillow_monthly_home_insurance_amount;
        const zillowMonthlHOAFeesAmount: number = row.zillow_monthly_hoa_fees_amount;

        const zillowMarketEstimates: ZillowMarketEstimates =
            new ZillowMarketEstimates(
                zillowMarketEstimatesId,
                zestimate,
                zestimateLow,
                zestimateHigh,
                zillowRentEstimate,
                zillowMonthlyPropertyTaxAmount,
                zillowMonthlyHomeInsuranceAmount,
                zillowMonthlHOAFeesAmount);

        const listingDetailsId: number = row.listing_details_id;
        const zillowURL: string = row.zillow_url;
        const listingPrice: number = row.listing_price;
        const creationType: ListingCreationType = row.creation_type;
        const propertyStatus: PropertyStatus = row.property_status;
        const dateListed: Date = new Date(row.date_listed);
        const dateCreated: Date = new Date(row.created_at);
        const dateUpdated: Date = new Date(row.updated_at);
        const rentCastSaleResponseId: number = row.rent_cast_sale_response_id;
        const rentCastPropertyResponseId: number = row.rent_cast_property_response_id;

        return new ListingDetails(
            listingDetailsId,
            zillowURL,
            propertyDetails,
            zillowMarketEstimates,
            listingPrice,
            propertyStatus,
            creationType,
            dateListed,
            dateCreated,
            dateUpdated,
            rentCastSaleResponseId,
            rentCastPropertyResponseId
        );

    }

    private async _updateSchoolRating(pool: Pool, listingDetails: ListingDetails): Promise<void> {

        const query = this.UPDATE_SCHOOL_RATING_QUERY;

        const values: any[] = this.getSchoolRatingValues(listingDetails);
        values.push(new Date());
        values.push(listingDetails.schoolRatingId);

        try {
            await pool.query(query, values);
            console.log('Zillow market estimates updated successfully');
        } catch (err) {
            console.error('Error updating Zillow market estimates', err);
            throw err;
        }
    }

    private async _insertSchoolRating(pool: Pool, listingDetails: ListingDetails): Promise<number> {

        const values: any[] = this.getSchoolRatingValues(listingDetails);

        return this.genericInsertQuery(pool, this.INSERT_SCHOOL_RATING_QUERY, values);
    }

    private getSchoolRatingValues(listingDetails: ListingDetails): any[] {
        return [
            listingDetails.elementarySchoolRating,
            listingDetails.middleSchoolRating,
            listingDetails.highSchoolRating
        ];
    }

    private async updateAddress(pool: Pool, listingDetails: ListingDetails): Promise<void> {

        const query = this.UPDATE_ADDRESS_QUERY;

        const values: any[] = this.getAddressValues(listingDetails);
        values.push(new Date());
        values.push(listingDetails.addressId);

        try {
            await pool.query(query, values);
            console.log('Zillow market estimates updated successfully');
        } catch (err) {
            console.error('Error updating Zillow market estimates', err);
            throw err;
        }
    }

    private async insertAddress(pool: Pool, listingDetails: ListingDetails): Promise<number> {

        const values: any[] = this.getAddressValues(listingDetails);

        return this.genericInsertQuery(pool, this.INSERT_ADDRESS_QUERY, values);
    }

    private getAddressValues(listingDetails: ListingDetails): any[] {
        return [
            listingDetails.fullAddress,
            listingDetails.state,
            listingDetails.zipcode,
            listingDetails.city,
            listingDetails.county,
            listingDetails.country,
            listingDetails.streetAddress,
            listingDetails.apartmentNumber,
            listingDetails.longitude,
            listingDetails.latitude
        ];
    }

    private async updatePropertyDetails(pool: Pool, listingDetails: ListingDetails): Promise<void> {

        const query = this.UPDATE_PROPERTY_DETAILS_QUERY;

        const values: any[] = this.getPropertyDetailsValues(listingDetails);
        values.push(new Date());
        values.push(listingDetails.propertyDetailsId);

        try {
            await pool.query(query, values);
            console.log('Zillow market estimates updated successfully');
        } catch (err) {
            console.error('Error updating Zillow market estimates', err);
            throw err;
        }
    }

    private async insertPropertyDetails(
        pool: Pool,
        listingDetails: ListingDetails,
        addressId: number,
        schoolRatingId: number
    ): Promise<number> {

        const values: any[] = [
            addressId,
            schoolRatingId
        ];
        values.push(...this.getPropertyDetailsValues(listingDetails));

        return this.genericInsertQuery(pool, this.INSERT_PROPERTY_DETAILS_QUERY, values);

    }

    private getPropertyDetailsValues(listingDetails: ListingDetails): any[] {
        return [
            listingDetails.numberOfBedrooms,
            listingDetails.numberOfFullBathrooms,
            listingDetails.numberOfHalfBathrooms,
            listingDetails.squareFeet,
            listingDetails.acres,
            listingDetails.yearBuilt,
            listingDetails.hasGarage,
            listingDetails.hasPool,
            listingDetails.hasBasement,
            listingDetails.propertyType,
            listingDetails.description
        ];
    }

    private async updateZillowMarketEstimates(pool: Pool, listingDetails: ListingDetails): Promise<void> {

        const query = this.UPDATE_ZILLOW_MARKET_ESTIMATES_QUERY;

        const values: any[] = this.getZillowMarketEstimatesValues(listingDetails);
        values.push(new Date());
        values.push(listingDetails.zillowMarketEstimatesId);

        try {
            await pool.query(query, values);
            console.log('Zillow market estimates updated successfully');
        } catch (err) {
            console.error('Error updating Zillow market estimates', err);
            throw err;
        }
    }

    private async insertZillowMarketEstimates(pool: Pool, listingDetails: ListingDetails): Promise<number> {

        const values: any[] = this.getZillowMarketEstimatesValues(listingDetails);

        return this.genericInsertQuery(pool, this.INSERT_ZILLOW_MARKET_ESTIMATES_QUERY, values);
    }

    private getZillowMarketEstimatesValues(listingDetails: ListingDetails): any[] {
        return [
            listingDetails.zestimate,
            listingDetails.zestimateRangeLow,
            listingDetails.zestimateRangeHigh,
            listingDetails.zillowRentEstimate,
            listingDetails.zillowMonthlyPropertyTaxAmount,
            listingDetails.zillowMonthlyHomeInsuranceAmount,
            listingDetails.zillowMonthlyHOAFeesAmount
        ];
    }
}
