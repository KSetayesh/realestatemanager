import { RentCastDetails } from "src/realestatecalc/models/rent_cast_api_models/rentcastdetails.model";
import { RealEstateManager } from "./realestate.db";
import { RentCastResponse } from "src/realestatecalc/models/rent_cast_api_models/rentcastresponse.model";

export class RentCastManager extends RealEstateManager {

    private GET_RENT_CAST_API_QUERY = `SELECT 
        api_calls_this_month, number_of_free_api_calls, billing_period, first_billed_on 
        FROM rent_cast_api;
    `;

    private UPDATE_NUMBER_OF_API_CALLS_QUERY = `UPDATE rent_cast_api 
        SET api_calls_this_month = api_calls_this_month + 1;
    `;

    private RESET_NUMBER_OF_API_CALLS_QUERY = `UPDATE rent_cast_api 
        SET api_calls_this_month = 0;
    `;

    private INSERT_RENT_CAST_API_RESPONSE_QUERY = `INSERT INTO rent_cast_api_response
           (address_id,
            formatted_address,
            address_line1,
            address_line2,
            city,
            state,
            zip_code,
            county,
            bedrooms,
            bathrooms,
            latitude,
            longitude,
            square_footage,
            property_type,
            lot_size,
            status,
            year_built,
            price,
            listed_date,
            removed_date,
            created_date,
            last_seen_date,
            days_on_market)`;


    async insertRentCastApiResponse(rentCastResponse: RentCastResponse): Promise<void> {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            console.log('BEGIN QUERY');

            await this._insertRentCastApiResponse(rentCastResponse);

            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async getRentCastDetails(): Promise<RentCastDetails> {

        const rentCastDetails: RentCastDetails[] = [];
        const query = `${this.GET_RENT_CAST_API_QUERY};`;

        try {
            const res = await this.pool.query(query);
            res.rows.forEach(row => {
                const agent: RentCastDetails = this.mapRowToRentCastDetails(row);
                rentCastDetails.push(agent);
            });
            if (rentCastDetails.length < 1) {
                throw new Error('Should be at least 1 Rent Cast Details Row in database');
            }
            return rentCastDetails[0];
        } catch (err) {
            console.error('Error fetching all agents', err);
            throw err;
        }
    }

    async updateNumberOfApiCalls() {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            console.log('BEGIN QUERY');

            await this._updateNumberOfApiCalls();

            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    async resetNumberOfApiCalls() {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            console.log('BEGIN QUERY');

            await this._resetNumberOfApiCalls();

            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }

    private async _resetNumberOfApiCalls() {
        try {
            await this.pool.query(this.RESET_NUMBER_OF_API_CALLS_QUERY);
            console.log('Listing information inserted successfully');

        } catch (err) {
            console.error('Error inserting listing information', err);
            throw err;
        }
    }

    private async _updateNumberOfApiCalls() {
        try {
            await this.pool.query(this.UPDATE_NUMBER_OF_API_CALLS_QUERY);
            console.log('Listing information inserted successfully');

        } catch (err) {
            console.error('Error inserting listing information', err);
            throw err;
        }
    }

    private async _insertRentCastApiResponse(rentCastResponse: RentCastResponse): Promise<void> {
        try {
            const values: any[] = [
                rentCastResponse.id,
                rentCastResponse.formattedAddress,
                rentCastResponse.addressLine1,
                rentCastResponse.addressLine2,
                rentCastResponse.city,
                rentCastResponse.state,
                rentCastResponse.zipCode,
                rentCastResponse.county,
                rentCastResponse.bedrooms,
                rentCastResponse.bathrooms,
                rentCastResponse.latitude,
                rentCastResponse.longitude,
                rentCastResponse.squareFootage,
                rentCastResponse.propertyType,
                rentCastResponse.lotSize,
                rentCastResponse.status,
                rentCastResponse.yearBuilt,
                rentCastResponse.price,
                rentCastResponse.listedDate,
                rentCastResponse.removedDate,
                rentCastResponse.createdDate,
                rentCastResponse.lastSeenDate,
                rentCastResponse.daysOnMarket,
            ];

            this.genericInsertQuery(this.INSERT_RENT_CAST_API_RESPONSE_QUERY, values);

            console.log('RentCast Response information inserted successfully');
        } catch (err) {
            console.error('Error inserting RentCast Response information', err);
            throw err;
        }
    }

    private mapRowToRentCastDetails(row: any): RentCastDetails {
        const apiCallsThisMonth: number = row.api_calls_this_month;
        const numberOfFreeApiCalls: number = row.number_of_free_api_calls;
        const billingPeriod: number = row.billing_period;
        const firstBilledOn: Date = row.first_billed_on;

        return new RentCastDetails(apiCallsThisMonth, numberOfFreeApiCalls, billingPeriod, firstBilledOn);
    }

}