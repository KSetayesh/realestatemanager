import { Pool } from 'pg';
import dbConfig from '../../config/dbConfig';
import { ListingDetails } from 'src/calc/models/listingdetails.model';
import { Address } from 'src/calc/models/address.model';
import { PropertyDetails } from 'src/calc/models/propertydetails.model';
import { ZillowMarketEstimates } from 'src/calc/models/zillowmarketestimates.model';
import { PriceDetails } from 'src/calc/models/pricedetails.model';
import { AddressDTO, Country, HomeType, ListingDetailsDTO, PriceDetailsDTO, PropertyDetailsDTO, SchoolRatingDTO, State, ZillowMarketEstimatesDTO } from '@realestatemanager/shared';
import { SchoolRating } from 'src/calc/models/schoolrating.model';

export class RealEstateManager {

    private pool = new Pool(dbConfig);

    async insertListingInformation(listingInfo: ListingDetailsDTO): Promise<void> {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            console.log('BEGIN QUERY');

            await this._insertListingInformation(listingInfo);

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
        const query = `
        SELECT 
            ld.zillow_url, 
            ad.full_address, ad.state, ad.zipcode, ad.town, ad.county, ad.country, ad.street_address, ad.apartment_number,
            pd.number_of_days_on_market, pd.elementary_school_rating, pd.middle_school_rating, pd.high_school_rating, 
            pd.number_of_bedrooms, pd.number_of_full_bathrooms, pd.number_of_half_bathrooms, pd.square_feet, pd.acres, pd.year_built, pd.home_type, pd.description, 
            pdt.listing_price, pdt.monthly_property_tax_amount, pdt.monthly_home_insurance_amount, pdt.monthly_hoa_fees_amount,
            zme.zestimate, zme.zillow_rent_estimate
        FROM listing_details ld
        JOIN property_details pd ON ld.property_details_id = pd.id
        JOIN address ad ON pd.address_id = ad.id
        JOIN price_details pdt ON ld.price_details_id = pdt.id
        LEFT JOIN zillow_market_estimates zme ON pdt.zillow_market_estimates_id = zme.id;
    `;

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
        const query = `
        SELECT 
            ld.zillow_url, 
            ad.full_address, ad.state, ad.zipcode, ad.town, ad.county, ad.country, ad.street_address, ad.apartment_number,
            pd.number_of_days_on_market, pd.elementary_school_rating, pd.middle_school_rating, pd.high_school_rating, 
            pd.number_of_bedrooms, pd.number_of_full_bathrooms, pd.number_of_half_bathrooms, pd.square_feet, pd.acres, pd.year_built, pd.home_type, pd.description, 
            pdt.listing_price, pdt.monthly_property_tax_amount, pdt.monthly_home_insurance_amount, pdt.monthly_hoa_fees_amount,
            zme.zestimate, zme.zillow_rent_estimate
        FROM listing_details ld
        JOIN property_details pd ON ld.property_details_id = pd.id
        JOIN address ad ON pd.address_id = ad.id
        JOIN price_details pdt ON ld.price_details_id = pdt.id
        LEFT JOIN zillow_market_estimates zme ON pdt.zillow_market_estimates_id = zme.id
        WHERE ld.zillow_url = $1;
    `;

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
        const zipCode: string = row.zipCode;
        const town: string = row.town;
        const county: string = row.county;
        const country: Country = row.country;
        const streetAddress: string = row.street_address;
        const apartmentNumber: string = row.apartment_number;
        const address: Address = new Address(fullAddress, state, zipCode, town, county, country, streetAddress, apartmentNumber);

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
        const homeType: HomeType = row.home_type;
        const description: string = row.description;
        const schoolRating: SchoolRating = new SchoolRating(elementarySchoolRating, middleSchoolRating, highSchoolRating);

        const propertyDetails: PropertyDetails = new PropertyDetails(address, schoolRating, numberOfDaysOnMarket, numberOfBedrooms, numberOfFullBathrooms, numberOfHalfBathrooms, squareFeet, acres, yearBuilt, homeType, description);

        const zestimate: number = row.zestimate;
        const zillowRentEstimate: number = row.zillow_rent_estimate;

        const zillowMarketEstimates: ZillowMarketEstimates = new ZillowMarketEstimates(zestimate, zillowRentEstimate);

        const zillowURL: string = row.zillow_url;
        const listingPrice: number = row.listing_price;
        const monthlyPropertyTaxAmount: number = row.monthly_property_tax_amount;
        const monthlyHomeInsuranceAmount: number = row.monthly_home_insurance_amount
        const monthlyHOAFeesAmount: number = row.monthly_hoa_fees_amount;

        const priceDetails: PriceDetails = new PriceDetails(listingPrice, zillowMarketEstimates, monthlyPropertyTaxAmount, monthlyHomeInsuranceAmount, monthlyHOAFeesAmount);

        return new ListingDetails(zillowURL, propertyDetails, priceDetails);

    }

    private async _insertListingInformation(listingInfo: ListingDetailsDTO): Promise<void> {
        try {
            const addressId = await this.insertAddress(listingInfo.propertyDetails.address);
            const schoolRatingId = await this._insertSchoolRating(listingInfo.propertyDetails.schoolRating);
            const propertyDetailsId = await this.insertPropertyDetails(listingInfo.propertyDetails, addressId, schoolRatingId);
            let zillowMarketEstimatesId: number | null = null;
            if (listingInfo.priceDetails.zillowMarketEstimates) {
                zillowMarketEstimatesId = await this.insertZillowMarketEstimates(listingInfo.priceDetails.zillowMarketEstimates);
            }
            const priceDetailsId = await this.insertPriceDetails(listingInfo.priceDetails, zillowMarketEstimatesId);
            await this.pool.query(
                `INSERT INTO listing_details (zillow_url, property_details_id, price_details_id)
       VALUES ($1, $2, $3)`,
                [listingInfo.zillowURL, propertyDetailsId, priceDetailsId]
            );
            console.log('Listing information inserted successfully');
        } catch (err) {
            console.error('Error inserting listing information', err);
            throw err;
        }
    }

    private async _insertSchoolRating(schoolRating: SchoolRatingDTO): Promise<number> {
        const { elementarySchoolRating, middleSchoolRating, highSchoolRating } = schoolRating;
        const result = await this.pool.query(
            `INSERT INTO school_rating (elementary_school_rating, middle_school_rating, high_school_rating)
         VALUES ($1, $2, $3) RETURNING id`,
            [elementarySchoolRating, middleSchoolRating, highSchoolRating]
        );
        return result.rows[0].id;
    }

    private async insertAddress(address: AddressDTO): Promise<number> {
        const { fullAddress, state, zipcode, town, county, country, streetAddress, apartmentNumber } = address;
        const res = await this.pool.query(
            `INSERT INTO address (full_address, state, zipcode, town, county, country, street_address, apartment_number)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
            [fullAddress, state, zipcode, town, county, country, streetAddress, apartmentNumber]
        );
        return res.rows[0].id;
    }

    private async insertPropertyDetails(propertyDetails: PropertyDetailsDTO, addressId: number, schoolRatingId: number): Promise<number> {
        const { numberOfDaysOnMarket, numberOfBedrooms, numberOfFullBathrooms, numberOfHalfBathrooms, squareFeet, acres, yearBuilt, homeType } = propertyDetails;
        const res = await this.pool.query(
            `INSERT INTO property_details (address_id, school_rating_id, number_of_days_on_market, number_of_bedrooms, number_of_full_bathrooms, number_of_half_bathrooms, square_feet, acres, year_built, home_type, description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`,
            [addressId, schoolRatingId, numberOfDaysOnMarket, numberOfBedrooms, numberOfFullBathrooms, numberOfHalfBathrooms, squareFeet, acres, yearBuilt, homeType]
        );
        return res.rows[0].id;
    }

    private async insertZillowMarketEstimates(zillowMarketEstimates: ZillowMarketEstimatesDTO): Promise<number> {
        const { zestimate, zillowRentEstimate } = zillowMarketEstimates;
        const res = await this.pool.query(
            `INSERT INTO zillow_market_estimates (zestimate, zillow_rent_estimate)
     VALUES ($1, $2) RETURNING id`,
            [zestimate, zillowRentEstimate]
        );
        return res.rows[0].id;
    }

    private async insertPriceDetails(priceDetails: PriceDetailsDTO, zillowMarketEstimatesId: number): Promise<number> {
        const { listingPrice, monthlyPropertyTaxAmount, monthlyHomeInsuranceAmount, monthlyHOAFeesAmount } = priceDetails;
        const res = await this.pool.query(
            `INSERT INTO price_details (listing_price, zillow_market_estimates_id, monthly_property_tax_amount, monthly_home_insurance_amount, monthly_hoa_fees_amount)
     VALUES ($1, $2, $3, $4, $5) RETURNING id`,
            [listingPrice, zillowMarketEstimatesId, monthlyPropertyTaxAmount, monthlyHomeInsuranceAmount, monthlyHOAFeesAmount]
        );
        return res.rows[0].id;
    }

}

