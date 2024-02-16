import { Pool } from 'pg';
import dbConfig from '../../config/dbConfig';

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

    async getPropertyByZillowURL(zillowURL: string): Promise<ListingInformationDTO> {
        const client = await this.pool.connect();
        try {
            const { rows } = await client.query(`
            SELECT
                l.id as listing_id,
                l.zillow_url,
                l.number_of_days_on_market,
                l.elementary_school_rating,
                l.middle_school_rating,
                l.high_school_rating,
                l.number_of_bedrooms,
                l.number_of_full_bathrooms,
                l.number_of_half_bathrooms,
                l.square_feet,
                l.acres,
                l.year_built,
                l.home_type,
                l.created_at as listing_created_at,
                l.updated_at as listing_updated_at,
                a.*,
                lp.price,
                lp.zestimate,
                lp.rent_estimate,
                lp.monthly_property_tax_amount,
                lp.monthly_home_insurance_amount,
                lp.monthly_hoa_fees_amount,
                lp.created_at as price_created_at,
                lp.updated_at as price_updated_at
            FROM listing l
            JOIN address a ON l.address_id = a.id
            JOIN listing_price lp ON lp.listing_id = l.id
            WHERE l.zillow_url = $1
        `, [zillowURL]);

            if (rows.length === 0) {
                throw new Error(`Listing with Zillow URL ${zillowURL} not found.`);
            }

            return this.mapRowToListingInformationDTO(rows[0]);
        } catch (e) {
            throw e;
        } finally {
            client.release();
        }
    }

    async getAllListings(): Promise<ListingInformationDTO[]> {
        const client = await this.pool.connect();
        try {
            const { rows } = await client.query(`
            SELECT
                l.id as listing_id,
                l.zillow_url,
                l.number_of_days_on_market,
                l.elementary_school_rating,
                l.middle_school_rating,
                l.high_school_rating,
                l.number_of_bedrooms,
                l.number_of_full_bathrooms,
                l.number_of_half_bathrooms,
                l.square_feet,
                l.acres,
                l.year_built,
                l.home_type,
                l.created_at as listing_created_at,
                l.updated_at as listing_updated_at,
                a.*,
                lp.price,
                lp.zestimate,
                lp.rent_estimate,
                lp.monthly_property_tax_amount,
                lp.monthly_home_insurance_amount,
                lp.monthly_hoa_fees_amount,
                lp.created_at as price_created_at,
                lp.updated_at as price_updated_at
            FROM listing l
            JOIN address a ON l.address_id = a.id
            JOIN listing_price lp ON lp.listing_id = l.id
        `);

            return rows.map((row): ListingInformationDTO => this.mapRowToListingInformationDTO(row));
        } catch (e) {
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

    private mapRowToListingInformationDTO(row: any): ListingInformationDTO {
        return {
            zillowURL: row.zillow_url,
            propertyInformation: {
                address: {
                    fullAddress: row.full_address,
                    state: row.state,
                    zipcode: row.zipcode,
                    town: row.town,
                    county: row.county,
                    country: row.country,
                    streetAddress: row.street_address,
                    apartmentNumber: row.apartment_number
                },
                numberOfDaysOnMarket: row.number_of_days_on_market,
                elementarySchoolRating: row.elementary_school_rating,
                middleSchoolRating: row.middle_school_rating,
                highSchoolRating: row.high_school_rating,
                numberOfBedrooms: row.number_of_bedrooms,
                numberOfFullBathrooms: row.number_of_full_bathrooms,
                numberOfHalfBathrooms: row.number_of_half_bathrooms,
                squareFeet: row.square_feet,
                acres: row.acres,
                yearBuilt: row.year_built,
                homeType: row.home_type
            },
            listingPriceInformation: {
                price: row.price,
                zestimate: row.zestimate,
                rentEstimate: row.rent_estimate,
                monthlyPropertyTaxAmount: row.monthly_property_tax_amount,
                monthlyHomeInsuranceAmount: row.monthly_home_insurance_amount,
                monthlyHOAFeesAmount: row.monthly_hoa_fees_amount
            }
        };
    }



}