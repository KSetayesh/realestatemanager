import { Pool } from 'pg';
import dbConfig from '../../config/dbConfig';
import { ListingDetails } from 'src/calc/models/listingdetails.model';
import { Address } from 'src/calc/models/address.model';
import { PropertyDetails } from 'src/calc/models/propertydetails.model';
import { ZillowMarketEstimates } from 'src/calc/models/zillowmarketestimates.model';
import { PriceDetails } from 'src/calc/models/pricedetails.model';
import { AddressDTO, Country, HomeType, ListingDetailsDTO, PriceDetailsDTO, PropertyDetailsDTO, State, ZillowMarketEstimatesDTO } from '@realestatemanager/shared';

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
    SELECT ld.zillow_url, pd.*, ad.*, zd.*, pdt.*, zme.zestimate, zme.zillow_rent_estimate
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
    SELECT ld.zillow_url, pd.*, ad.*, zd.*, pdt.*, zme.zestimate, zme.zillow_rent_estimate
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

        const propertyDetails: PropertyDetails = new PropertyDetails(address, numberOfDaysOnMarket, elementarySchoolRating, middleSchoolRating, highSchoolRating, numberOfBedrooms, numberOfFullBathrooms, numberOfHalfBathrooms, squareFeet, acres, yearBuilt, homeType);

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


        // return {
        //     zillowURL: row.zillow_url,
        //     propertyDetails: {
        //         address: {
        //             fullAddress: row.full_address,
        //             state: row.state,
        //             zipcode: row.zipcode,
        //             town: row.town,
        //             county: row.county,
        //             country: row.country,
        //             streetAddress: row.street_address,
        //             apartmentNumber: row.apartment_number,
        //         },
        //         numberOfDaysOnMarket: row.number_of_days_on_market,
        //         elementarySchoolRating: row.elementary_school_rating,
        //         middleSchoolRating: row.middle_school_rating,
        //         highSchoolRating: row.high_school_rating,
        //         numberOfBedrooms: row.number_of_bedrooms,
        //         numberOfFullBathrooms: row.number_of_full_bathrooms,
        //         numberOfHalfBathrooms: row.number_of_half_bathrooms,
        //         squareFeet: row.square_feet,
        //         acres: row.acres,
        //         yearBuilt: row.year_built,
        //         homeType: row.home_type,
        //     },
        //     priceDetails: {
        //         listingPrice: row.listing_price,
        //         zillowMarketEstimates: {
        //             zestimate: row.zestimate,
        //             zillowRentEstimate: row.zillow_rent_estimate,
        //         },
        //         monthlyPropertyTaxAmount: row.monthly_property_tax_amount,
        //         monthlyHomeInsuranceAmount: row.monthly_home_insurance_amount,
        //         monthlyHOAFeesAmount: row.monthly_hoa_fees_amount,
        //     }
        // };
    }

    private async _insertListingInformation(listingInfo: ListingDetailsDTO): Promise<void> {
        try {
            const addressId = await this.insertAddress(listingInfo.propertyDetails.address);
            const propertyDetailsId = await this.insertPropertyDetails(listingInfo.propertyDetails, addressId);
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

    private async insertAddress(address: AddressDTO): Promise<number> {
        const { fullAddress, state, zipcode, town, county, country, streetAddress, apartmentNumber } = address;
        const res = await this.pool.query(
            `INSERT INTO address (full_address, state, zipcode, town, county, country, street_address, apartment_number)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
            [fullAddress, state, zipcode, town, county, country, streetAddress, apartmentNumber]
        );
        return res.rows[0].id;
    }

    private async insertPropertyDetails(propertyDetails: PropertyDetailsDTO, addressId: number): Promise<number> {
        const { numberOfDaysOnMarket, elementarySchoolRating, middleSchoolRating, highSchoolRating, numberOfBedrooms, numberOfFullBathrooms, numberOfHalfBathrooms, squareFeet, acres, yearBuilt, homeType } = propertyDetails;
        const res = await this.pool.query(
            `INSERT INTO property_details (address_id, number_of_days_on_market, elementary_school_rating, middle_school_rating, high_school_rating, number_of_bedrooms, number_of_full_bathrooms, number_of_half_bathrooms, square_feet, acres, year_built, home_type)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`,
            [addressId, numberOfDaysOnMarket, elementarySchoolRating, middleSchoolRating, highSchoolRating, numberOfBedrooms, numberOfFullBathrooms, numberOfHalfBathrooms, squareFeet, acres, yearBuilt, homeType]
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

// async insertListingInformation(listingInfo: ListingDetailsDTO) {
//     const client = await this.pool.connect();
//     try {
//         await client.query('BEGIN');
//         console.log('BEGIN QUERY');
//         // console.log(`listingInfo: ${listingInfo}`);
//         const addressId = await this.insertAddress(client, listingInfo.propertyInformation.address);
//         const listingId = await this.insertListing(client, listingInfo.propertyInformation, addressId, listingInfo.zillowURL);
//         await this.insertListingPrice(client, listingId, listingInfo.listingPriceInformation);

//         await client.query('COMMIT');
//     } catch (e) {
//         await client.query('ROLLBACK');
//         throw e;
//     } finally {
//         client.release();
//     }
// }

// async getPropertyByZillowURL(zillowURL: string): Promise<ListingInformationDTO> {
//     const client = await this.pool.connect();
//     try {
//         const { rows } = await client.query(`
//         SELECT
//             l.id as listing_id,
//             l.zillow_url,
//             l.number_of_days_on_market,
//             l.elementary_school_rating,
//             l.middle_school_rating,
//             l.high_school_rating,
//             l.number_of_bedrooms,
//             l.number_of_full_bathrooms,
//             l.number_of_half_bathrooms,
//             l.square_feet,
//             l.acres,
//             l.year_built,
//             l.home_type,
//             l.created_at as listing_created_at,
//             l.updated_at as listing_updated_at,
//             a.*,
//             lp.price,
//             lp.zestimate,
//             lp.rent_estimate,
//             lp.monthly_property_tax_amount,
//             lp.monthly_home_insurance_amount,
//             lp.monthly_hoa_fees_amount,
//             lp.created_at as price_created_at,
//             lp.updated_at as price_updated_at
//         FROM listing l
//         JOIN address a ON l.address_id = a.id
//         JOIN listing_price lp ON lp.listing_id = l.id
//         WHERE l.zillow_url = $1
//     `, [zillowURL]);

//         if (rows.length === 0) {
//             throw new Error(`Listing with Zillow URL ${zillowURL} not found.`);
//         }

//         return this.mapRowToListingInformationDTO(rows[0]);
//     } catch (e) {
//         throw e;
//     } finally {
//         client.release();
//     }
// }

// async getAllListings(): Promise<ListingInformationDTO[]> {
//     const client = await this.pool.connect();
//     try {
//         const { rows } = await client.query(`
//         SELECT
//             l.id as listing_id,
//             l.zillow_url,
//             l.number_of_days_on_market,
//             l.elementary_school_rating,
//             l.middle_school_rating,
//             l.high_school_rating,
//             l.number_of_bedrooms,
//             l.number_of_full_bathrooms,
//             l.number_of_half_bathrooms,
//             l.square_feet,
//             l.acres,
//             l.year_built,
//             l.home_type,
//             l.created_at as listing_created_at,
//             l.updated_at as listing_updated_at,
//             a.*,
//             lp.price,
//             lp.zestimate,
//             lp.rent_estimate,
//             lp.monthly_property_tax_amount,
//             lp.monthly_home_insurance_amount,
//             lp.monthly_hoa_fees_amount,
//             lp.created_at as price_created_at,
//             lp.updated_at as price_updated_at
//         FROM listing l
//         JOIN address a ON l.address_id = a.id
//         JOIN listing_price lp ON lp.listing_id = l.id
//     `);

//         return rows.map((row): ListingInformationDTO => this.mapRowToListingInformationDTO(row));
//     } catch (e) {
//         throw e;
//     } finally {
//         client.release();
//     }
// }

// private async insertAddress(pool: Pool, address: Address): Promise<number> {
//     const result = await pool.query(`
//         INSERT INTO address (full_address, state, zipcode, town, county, country, street_address, apartment_number)
//         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
//         RETURNING id
//         `, [address.fullAddress, address.state, address.zipcode, address.town, address.county, address.country, address.streetAddress, address.apartmentNumber]);

//     return result.rows[0].id;
// }

// private async insertListing(pool: Pool, listing: PropertyInformationDTO, addressId: number, zillowURL: string): Promise<number> {
//     const result = await pool.query(`
//         INSERT INTO listing (address_id,
//             zillow_url,
//             number_of_days_on_market,
//             elementary_school_rating,
//             middle_school_rating,
//             high_school_rating,
//             number_of_bedrooms,
//             number_of_full_bathrooms,
//             number_of_half_bathrooms,
//             square_feet,
//             acres,
//             year_built,
//             home_type)
//         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
//         RETURNING id
//         `, [addressId,
//         zillowURL,
//         listing.numberOfDaysOnMarket,
//         listing.elementarySchoolRating,
//         listing.middleSchoolRating,
//         listing.highSchoolRating,
//         listing.numberOfBedrooms,
//         listing.numberOfFullBathrooms,
//         listing.numberOfHalfBathrooms,
//         listing.squareFeet,
//         listing.acres,
//         listing.yearBuilt,
//         listing.homeType]);

//     return result.rows[0].id;
// }

// private async insertListingPrice(pool: Pool, listingId: number, priceInfo: ListingPriceInformationDTO): Promise<void> {
//     await pool.query(`
//         INSERT INTO listing_price (listing_id, price, zestimate, rent_estimate, monthly_property_tax_amount, monthly_home_insurance_amount, monthly_hoa_fees_amount)
//         VALUES ($1, $2, $3, $4, $5, $6, $7)
//         `, [listingId, priceInfo.price, priceInfo.zestimate, priceInfo.rentEstimate, priceInfo.monthlyPropertyTaxAmount, priceInfo.monthlyHomeInsuranceAmount, priceInfo.monthlyHOAFeesAmount]);
// }

// private mapRowToListingInformationDTO(row: any): ListingInformationDTO {
//     return {
//         zillowURL: row.zillow_url,
//         propertyInformation: {
//             address: {
//                 fullAddress: row.full_address,
//                 state: row.state,
//                 zipcode: row.zipcode,
//                 town: row.town,
//                 county: row.county,
//                 country: row.country,
//                 streetAddress: row.street_address,
//                 apartmentNumber: row.apartment_number
//             },
//             numberOfDaysOnMarket: row.number_of_days_on_market,
//             elementarySchoolRating: row.elementary_school_rating,
//             middleSchoolRating: row.middle_school_rating,
//             highSchoolRating: row.high_school_rating,
//             numberOfBedrooms: row.number_of_bedrooms,
//             numberOfFullBathrooms: row.number_of_full_bathrooms,
//             numberOfHalfBathrooms: row.number_of_half_bathrooms,
//             squareFeet: row.square_feet,
//             acres: row.acres,
//             yearBuilt: row.year_built,
//             homeType: row.home_type
//         },
//         listingPriceInformation: {
//             price: row.price,
//             zestimate: row.zestimate,
//             rentEstimate: row.rent_estimate,
//             monthlyPropertyTaxAmount: row.monthly_property_tax_amount,
//             monthlyHomeInsuranceAmount: row.monthly_home_insurance_amount,
//             monthlyHOAFeesAmount: row.monthly_hoa_fees_amount
//         }
//     };
// }



// }