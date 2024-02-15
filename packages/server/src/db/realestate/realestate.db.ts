import { Pool } from 'pg';
import dbConfig from '../../config/dbConfig';
import { Address, ListingInformationDTO, ListingPriceInformationDTO, PropertyInformationDTO } from '@realestatemanager/shared';

export class RealEstateManager {

    private pool = new Pool(dbConfig);

    async insertListingInformation(listingInfo: ListingInformationDTO) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            console.log('BEGIN QUERY');
            console.log(`listingInfo: ${listingInfo}`);
            const addressId = await this.insertAddress(client, listingInfo.propertyInformation.address);
            const listingId = await this.insertListing(client, listingInfo.propertyInformation, addressId, listingInfo.zillowURL);
            await this.insertListingPrice(client, listingId, listingInfo.listingPriceInformation);

            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    private async insertAddress(pool: Pool, address: Address): Promise<number> {
        const result = await pool.query(`
            INSERT INTO address (full_address, state, zipcode, town, county, country, street_address, apartment_number)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
            `, [address.fullAddress, address.state, address.zipcode, address.town, address.county, address.country, address.streetAddress, address.apartmentNumber]);

        return result.rows[0].id;
    }


    private async insertListing(pool: Pool, listing: PropertyInformationDTO, addressId: number, zillowURL: string): Promise<number> {
        const result = await pool.query(`
            INSERT INTO listing (address_id, 
                zillow_url, 
                number_of_days_on_market, 
                elementary_school_rating, 
                middle_school_rating, 
                high_school_rating, 
                number_of_bedrooms, 
                number_of_full_bathrooms, 
                number_of_half_bathrooms,
                square_feet,
                acres,
                year_built, 
                home_type)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            RETURNING id
            `, [addressId,
            zillowURL,
            listing.numberOfDaysOnMarket,
            listing.elementarySchoolRating,
            listing.middleSchoolRating,
            listing.highSchoolRating,
            listing.numberOfBedrooms,
            listing.numberOfFullBathrooms,
            listing.numberOfHalfBathrooms,
            listing.squareFeet,
            listing.acres,
            listing.yearBuilt,
            listing.homeType]);

        return result.rows[0].id;
    }

    private async insertListingPrice(pool: Pool, listingId: number, priceInfo: ListingPriceInformationDTO): Promise<void> {
        await pool.query(`
            INSERT INTO listing_price (listing_id, price, zestimate, rent_estimate, monthly_property_tax_amount, monthly_home_insurance_amount, monthly_hoa_fees_amount)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            `, [listingId, priceInfo.price, priceInfo.zestimate, priceInfo.rentEstimate, priceInfo.monthlyPropertyTaxAmount, priceInfo.monthlyHomeInsuranceAmount, priceInfo.monthlyHOAFeesAmount]);
    }


}