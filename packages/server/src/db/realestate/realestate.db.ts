import { Pool } from 'pg';
import dbConfig from '../../config/dbConfig';
import { ListingDetails } from 'src/calc/models/listing_models/listingdetails.model';
import { Address } from 'src/calc/models/listing_models/address.model';
import { PropertyDetails } from 'src/calc/models/listing_models/propertydetails.model';
import { ZillowMarketEstimates } from 'src/calc/models/listing_models/zillowmarketestimates.model';
import { AddressDTO, Country, HomeType, ListingDetailsDTO, PropertyDetailsDTO, SchoolRatingDTO, State, ZillowMarketEstimatesDTO } from '@realestatemanager/shared';
import { SchoolRating } from 'src/calc/models/listing_models/schoolrating.model';

export class RealEstateManager {

    private pool = new Pool(dbConfig);

    private GET_LISTINGS_QUERY = `SELECT 
            ld.zillow_url, ld.listing_price, 
            ad.full_address, ad.state, ad.zipcode, ad.city, ad.county, ad.country, ad.street_address, ad.apartment_number,
            pd.number_of_days_on_market, sr.elementary_school_rating, sr.middle_school_rating, sr.high_school_rating, 
            pd.number_of_bedrooms, pd.number_of_full_bathrooms, pd.number_of_half_bathrooms, pd.square_feet, 
            pd.acres, pd.year_built, pd.has_garage, pd.has_pool, pd.has_basement, pd.home_type, pd._description,
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
            listing_price)`;

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
            apartment_number)`;

    private INSERT_PROPERTY_DETAILS_QUERY = `INSERT INTO property_details 
                (address_id, 
                school_rating_id, 
                number_of_days_on_market, 
                number_of_bedrooms, 
                number_of_full_bathrooms, 
                number_of_half_bathrooms, 
                square_feet, 
                acres, 
                year_built,
                has_garage,
                has_pool,
                has_basement,
                home_type, 
                _description)`;

    private INSERT_ZILLOW_MARKET_ESTIMATES_QUERY = `INSERT INTO zillow_market_estimates 
            (zestimate, 
            zestimate_low, 
            zestimate_high, 
            zillow_rent_estimate,
            zillow_monthly_property_tax_amount,
            zillow_monthly_home_insurance_amount,
            zillow_monthly_hoa_fees_amount)`;

    async insertListingDetails(listingDetails: ListingDetailsDTO): Promise<void> {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            console.log('BEGIN QUERY');

            await this._insertListingDetails(listingDetails);

            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async getAllListings(): Promise<ListingDetails[]> {
        const listings: ListingDetails[] = [];
        const query = `${this.GET_LISTINGS_QUERY};`;

        try {
            const res = await this.pool.query(query);
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

    async getPropertyByZillowURL(zillowURL: string): Promise<ListingDetails | null> {
        const query = `${this.GET_LISTINGS_QUERY} WHERE ld.zillow_url = $1;`;
        try {
            const res = await this.pool.query(query, [zillowURL]);
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

    private mapRowToListingDetails(row: any): ListingDetails {
        const fullAddress: string = row.full_address;
        const state: State = row.state;
        const zipcode: string = row.zipcode;
        const city: string = row.city;
        const county: string = row.county;
        const country: Country = row.country;
        const streetAddress: string = row.street_address;
        const apartmentNumber: string = row.apartment_number;
        const address: Address =
            new Address(
                fullAddress,
                state,
                zipcode,
                city,
                county,
                country,
                streetAddress,
                apartmentNumber);

        const numberOfDaysOnMarket: number = row.number_of_days_on_market;
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
        const homeType: HomeType = row.home_type;
        const description: string = row._description;
        const schoolRating: SchoolRating = new SchoolRating(elementarySchoolRating, middleSchoolRating, highSchoolRating);

        const propertyDetails: PropertyDetails =
            new PropertyDetails(
                address,
                schoolRating,
                numberOfDaysOnMarket,
                numberOfBedrooms,
                numberOfFullBathrooms,
                numberOfHalfBathrooms,
                squareFeet,
                acres,
                yearBuilt,
                hasGarage,
                hasPool,
                hasBasement,
                homeType,
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

        return new ListingDetails(zillowURL, propertyDetails, zillowMarketEstimates, listingPrice);

    }

    private async _insertListingDetails(listingDetails: ListingDetailsDTO): Promise<void> {
        try {
            const addressId = await this.insertAddress(listingDetails.propertyDetails.address);
            const schoolRatingId = await this._insertSchoolRating(listingDetails.propertyDetails.schoolRating);
            const propertyDetailsId = await this.insertPropertyDetails(listingDetails.propertyDetails, addressId, schoolRatingId);
            let zillowMarketEstimatesId: number | null = null;
            if (listingDetails.zillowMarketEstimates) {
                zillowMarketEstimatesId = await this.insertZillowMarketEstimates(listingDetails.zillowMarketEstimates);
            }

            const values: any[] = [listingDetails.zillowURL, propertyDetailsId, zillowMarketEstimatesId, listingDetails.listingPrice];
            this.genericInsertQuery(this.INSERT_LISTING_DETAILS_QUERY, values);

            console.log('Listing information inserted successfully');
        } catch (err) {
            console.error('Error inserting listing information', err);
            throw err;
        }
    }

    private async _insertSchoolRating(schoolRating: SchoolRatingDTO): Promise<number> {

        const values: any[] = [
            schoolRating.elementarySchoolRating,
            schoolRating.middleSchoolRating,
            schoolRating.highSchoolRating]

        return this.genericInsertQuery(this.INSERT_SCHOOL_RATING_QUERY, values);
    }

    private async insertAddress(address: AddressDTO): Promise<number> {

        const values: any[] = [
            address.fullAddress,
            address.state,
            address.zipcode,
            address.city,
            address.county,
            address.country,
            address.streetAddress,
            address.apartmentNumber];

        return this.genericInsertQuery(this.INSERT_ADDRESS_QUERY, values);
    }

    private async insertPropertyDetails(propertyDetails: PropertyDetailsDTO, addressId: number, schoolRatingId: number): Promise<number> {

        const values: any[] = [
            addressId,
            schoolRatingId,
            propertyDetails.numberOfDaysOnMarket,
            propertyDetails.numberOfBedrooms,
            propertyDetails.numberOfFullBathrooms,
            propertyDetails.numberOfHalfBathrooms,
            propertyDetails.squareFeet,
            propertyDetails.acres,
            propertyDetails.yearBuilt,
            propertyDetails.hasGarage,
            propertyDetails.hasPool,
            propertyDetails.hasBasement,
            propertyDetails.homeType,
            propertyDetails.description]

        return this.genericInsertQuery(this.INSERT_PROPERTY_DETAILS_QUERY, values);

    }

    private async insertZillowMarketEstimates(zillowMarketEstimates: ZillowMarketEstimatesDTO): Promise<number> {

        const values: any[] = [
            zillowMarketEstimates.zestimate,
            zillowMarketEstimates.zestimateRange.low,
            zillowMarketEstimates.zestimateRange.high,
            zillowMarketEstimates.zillowRentEstimate,
            zillowMarketEstimates.zillowMonthlyPropertyTaxAmount,
            zillowMarketEstimates.zillowMonthlyHomeInsuranceAmount,
            zillowMarketEstimates.zillowMonthlyHOAFeesAmount];

        return this.genericInsertQuery(this.INSERT_ZILLOW_MARKET_ESTIMATES_QUERY, values);
    }

    private async genericInsertQuery(query: string, values: any[]): Promise<number> {
        let insertString = ' VALUES (';
        for (let i = 0; i < values.length; i++) {
            insertString += `$${i + 1}`;
            if (i < values.length - 1) {
                insertString += ', ';
            }
        }
        insertString += ') RETURNING id;'

        console.log(insertString);

        const res = await this.pool.query(`${query} ${insertString}`, values);
        return res.rows[0].id;
    }

}

