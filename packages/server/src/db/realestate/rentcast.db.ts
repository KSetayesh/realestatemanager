import { Pool } from 'pg';
import { RentCastDetails } from "src/realestatecalc/models/rent_cast_api_models/rentcastdetails.model";
import { RealEstateManager } from "./realestate.db";
import { RentCastResponse } from "src/realestatecalc/models/rent_cast_api_models/rentcastresponse.model";
import { RentCastDetailsManager } from 'src/realestatecalc/models/rent_cast_api_models/rentcastdetailsmanager.model';

export class RentCastManager extends RealEstateManager {

    private CHECK_FOR_EXISTING_ADDRESS_ID = `SELECT EXISTS (SELECT 1 FROM rent_cast_api_response WHERE address_id = $1) AS exists;`;


    /*
        Remove hardcoded "WHERE id = 1;"
    */
    private GET_RENT_CAST_CONFIG_DETAILS_QUERY = `SELECT 
        id, api_calls_this_month, number_of_free_api_calls, billing_period, first_billed_on, most_recent_billing_date,  
        email, api_key_name 
        FROM rent_cast_config_details;`;
    //     WHERE id = 1;
    // `;

    /*
        Remove hardcoded "WHERE id = 1;"
    */
    private UPDATE_NUMBER_OF_API_CALLS_QUERY = `UPDATE rent_cast_config_details 
        SET api_calls_this_month = api_calls_this_month + 1
        WHERE id = $1;`;


    /*
        Remove hardcoded "WHERE id = 1;"
    */
    private RESET_NUMBER_OF_API_CALLS_QUERY = `UPDATE rent_cast_config_details 
        SET api_calls_this_month = 0
        WHERE id = $1;`;


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

    async getRentCastDetails(pool: Pool,): Promise<RentCastDetailsManager> {

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
            return new RentCastDetailsManager(rentCastDetails); //rentCastDetails[0];
        } catch (err) {
            console.error('Error fetching all agents', err);
            throw err;
        }
    }

    async updateNumberOfApiCalls(pool: Pool, id: number) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            console.log('BEGIN QUERY');

            await this._updateNumberOfApiCalls(pool, id);

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Transaction failed:', error);
            throw error;
        } finally {
            client.release();
        }
    }

    async resetNumberOfApiCalls(pool: Pool, id: number) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            console.log('BEGIN QUERY');

            await this._resetNumberOfApiCalls(pool, id);

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

    private async _resetNumberOfApiCalls(pool: Pool, id: number) {
        try {
            await pool.query(this.RESET_NUMBER_OF_API_CALLS_QUERY, [id]);
            console.log('Listing information inserted successfully');

        } catch (err) {
            console.error('Error inserting listing information', err);
            throw err;
        }
    }

    private async _updateNumberOfApiCalls(pool: Pool, id: number) {
        try {
            await pool.query(this.UPDATE_NUMBER_OF_API_CALLS_QUERY, [id]);
            console.log('Listing information inserted successfully');

        } catch (err) {
            console.error('Error inserting listing information', err);
            throw err;
        }
    }

    private mapRowToRentCastDetails(row: any): RentCastDetails {
        const id: number = row.id;
        const apiCallsThisMonth: number = row.api_calls_this_month;
        const numberOfFreeApiCalls: number = row.number_of_free_api_calls;
        const billingPeriod: number = row.billing_period;
        const mostRecentBillingDate: Date = row.most_recent_billing_date;
        const firstBilledOn: Date = row.first_billed_on;
        const email: string = row.email;
        const apiKeyName: string = row.api_key_name;

        return new RentCastDetails(
            id,
            apiCallsThisMonth,
            numberOfFreeApiCalls,
            billingPeriod,
            mostRecentBillingDate,
            firstBilledOn,
            email,
            apiKeyName
        );
    }

}