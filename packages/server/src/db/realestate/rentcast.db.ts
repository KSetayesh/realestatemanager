import { Pool } from 'pg';
import { RentCastDetails } from "src/realestatecalc/models/rent_cast_api_models/rentcastdetails.model";
import { RealEstateManager } from "./realestate.db";
import { RentCastResponse } from "src/realestatecalc/models/rent_cast_api_models/rentcastresponse.model";

export class RentCastManager extends RealEstateManager {

    private CHECK_FOR_EXISTING_ADDRESS_ID = `SELECT EXISTS (SELECT 1 FROM rent_cast_api_response WHERE address_id = $1) AS exists;`;

    private GET_RENT_CAST_CONFIG_DETAILS_QUERY = `SELECT 
        api_calls_this_month, number_of_free_api_calls, billing_period, first_billed_on, most_recent_billing_date 
        FROM rent_cast_config_details;
    `;

    private UPDATE_NUMBER_OF_API_CALLS_QUERY = `UPDATE rent_cast_config_details 
        SET api_calls_this_month = api_calls_this_month + 1;
    `;

    private RESET_NUMBER_OF_API_CALLS_QUERY = `UPDATE rent_cast_config_details 
        SET api_calls_this_month = 0;
    `;

    private INSERT_RENT_CAST_API_RESPONSE_QUERY = `INSERT INTO rent_cast_api_response
           (address_id,
            api_response_data,
            rent_cast_api_call_id)`;

    private INSERT_RENT_CAST_API_CALL_QUERY = `INSERT INTO rent_cast_api_call (end_point, full_url, execution_time)`;

    // Function to check if a specific ID exists in the database
    async checkIfAddressIdExists(pool: Pool, address_id: string): Promise<boolean> {
        const query = this.CHECK_FOR_EXISTING_ADDRESS_ID;
        try {
            const res = await pool.query(query, [address_id]);
            return res.rows[0].exists;  // This will be true or false
        } catch (err) {
            // console.error('Error executing query', err.stack);
            return false;  // Return false or throw an error as per your error handling policy
        }
    }

    async insertRentCastApiResponse(pool: Pool, rentCastResponse: RentCastResponse, rentCastApiCallId: number): Promise<number> {
        try {
            const values: any[] = [
                rentCastResponse.id,
                rentCastResponse.apiResponseData,
                rentCastApiCallId,
            ];

            for (let i = 0; i < values.length; i++) {
                console.log(values[i]);
            }

            const id = await this.genericInsertQuery(
                pool,
                this.INSERT_RENT_CAST_API_RESPONSE_QUERY,
                values,
                'address_id'
            );

            console.log('RentCast Response information inserted successfully');

            return id;
        } catch (err) {
            console.error('Error inserting RentCast Response information', err);
            throw err;
        }
    }

    async getRentCastDetails(pool: Pool,): Promise<RentCastDetails> {

        const rentCastDetails: RentCastDetails[] = [];
        const query = `${this.GET_RENT_CAST_CONFIG_DETAILS_QUERY};`;

        try {
            const res = await pool.query(query);
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

    async updateNumberOfApiCalls(pool: Pool) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            console.log('BEGIN QUERY');

            await this._updateNumberOfApiCalls(pool);

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Transaction failed:', error);
            throw error;
        } finally {
            client.release();
        }
    }

    async resetNumberOfApiCalls(pool: Pool) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            console.log('BEGIN QUERY');

            await this._resetNumberOfApiCalls(pool);

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Transaction failed:', error);
            throw error;
        } finally {
            client.release();
        }
    }

    async insertRentCastApiCall(
        pool: Pool,
        endpoint: string,
        fullUrl: string,
        executionTime: Date = new Date()
    ): Promise<number> {
        try {
            const values: any[] = [
                endpoint,
                fullUrl,
                executionTime,
            ];

            const id = await this.genericInsertQuery(pool, this.INSERT_RENT_CAST_API_CALL_QUERY, values);

            console.log('RentCast Api Call inserted successfully');

            return id;
        } catch (err) {
            console.error('Error inserting RentCast API Call', err);
            throw err;
        }
    }

    private async _resetNumberOfApiCalls(pool: Pool) {
        try {
            await pool.query(this.RESET_NUMBER_OF_API_CALLS_QUERY);
            console.log('Listing information inserted successfully');

        } catch (err) {
            console.error('Error inserting listing information', err);
            throw err;
        }
    }

    private async _updateNumberOfApiCalls(pool: Pool) {
        try {
            await pool.query(this.UPDATE_NUMBER_OF_API_CALLS_QUERY);
            console.log('Listing information inserted successfully');

        } catch (err) {
            console.error('Error inserting listing information', err);
            throw err;
        }
    }

    private mapRowToRentCastDetails(row: any): RentCastDetails {
        const apiCallsThisMonth: number = row.api_calls_this_month;
        const numberOfFreeApiCalls: number = row.number_of_free_api_calls;
        const billingPeriod: number = row.billing_period;
        const mostRecentBillingDate: Date = row.most_recent_billing_date;
        const firstBilledOn: Date = row.first_billed_on;

        return new RentCastDetails(apiCallsThisMonth, numberOfFreeApiCalls, billingPeriod, mostRecentBillingDate, firstBilledOn);
    }

}