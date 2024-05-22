import { Pool } from 'pg';
import { RentCastDetails } from "src/realestatecalc/models/rent_cast_api_models/rentcastdetails.model";
import { RealEstateDAO } from "./realestate.dao";
import { RentCastResponse } from "src/realestatecalc/models/rent_cast_api_models/rentcastresponse.model";
import { RentCastApiResponse } from 'src/realestatecalc/api/rent.cast.api.client';
import { RentCastMatchingData } from 'src/realestatecalc/models/rent_cast_api_models/rentcastmatchingdata.model';

export class RentCastDAO extends RealEstateDAO {

    private CHECK_FOR_EXISTING_ADDRESS_ID =
        `SELECT EXISTS (SELECT 1 FROM rent_cast_api_response WHERE address_id = $1) AS exists`;


    private GET_RENT_CAST_CONFIG_DETAILS_QUERY = `SELECT 
        id, api_calls_this_month, number_of_free_api_calls, billing_period, first_billed_on, most_recent_billing_date,  
        email, api_key_name 
        FROM rent_cast_config_details`;


    private UPDATE_NUMBER_OF_API_CALLS_QUERY = `UPDATE rent_cast_config_details 
        SET api_calls_this_month = api_calls_this_month + 1
        WHERE id = $1`;


    private RESET_NUMBER_OF_API_CALLS_QUERY = `UPDATE rent_cast_config_details 
        SET api_calls_this_month = 0
        WHERE id = $1`;


    private INSERT_RENT_CAST_API_RESPONSE_QUERY = `INSERT INTO rent_cast_api_response
           (address_id,
            api_response_data,
            rent_cast_api_call_id)`;


    private INSERT_RENT_CAST_API_CALL_QUERY =
        `INSERT INTO rent_cast_api_call (end_point, full_url, rent_cast_config_detail_id, execution_time)`;

    private MATCHING_RENT_CAST_DATA_QUERY = `
        SELECT
        s.response_id AS sale_response_id,
        p.response_id AS property_response_id,
	    s.address_id AS sale_address_id,
	    s.api_response_data AS sale_api_response_data,
	    p.api_response_data AS property_api_response_data,
	    s.end_point AS sale_end_point,
	    p.end_point AS property_end_point,
        s.call_execution_time as sale_call_execution_time,
        p.call_execution_time as property_call_execution_time
        FROM
            (
                SELECT
                    rcar.id AS response_id,
                    rcar.address_id,
                    rcar.api_response_data,
                    rcac.end_point,
                    rcac.full_url,
                    rcac.execution_time AS call_execution_time
                FROM
                    rent_cast_api_response rcar
                JOIN
                    rent_cast_api_call rcac ON rcac.id = rcar.rent_cast_api_call_id
                WHERE
                    rcac.end_point = $1 
                    AND rcar.api_response_data IS NOT NULL
            ) AS s
        JOIN
            (
                SELECT
                    rcar.id AS response_id,
                    rcar.address_id,
                    rcar.api_response_data,
                    rcac.end_point,
                    rcac.full_url,
                    rcac.execution_time AS call_execution_time
                FROM
                    rent_cast_api_response rcar
                JOIN
                    rent_cast_api_call rcac ON rcac.id = rcar.rent_cast_api_call_id
                WHERE
                    rcac.end_point = $2
                    AND rcar.api_response_data IS NOT NULL
            ) AS p ON s.address_id = p.address_id
            ORDER BY sale_address_id
        `;

    // Function to check if a specific ID exists in the database
    async checkIfAddressIdExists(pool: Pool, address_id: string): Promise<boolean> {
        const query = `${this.CHECK_FOR_EXISTING_ADDRESS_ID};`;
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
                rentCastResponse.addressId,
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
            );

            console.log('RentCast Response information inserted successfully');

            return id;
        } catch (err) {
            console.error('Error inserting RentCast Response information', err);
            throw err;
        }
    }

    async getRentCastDetails(pool: Pool): Promise<RentCastDetails[]> {

        const rentCastDetails: RentCastDetails[] = [];

        try {
            const query = `${this.GET_RENT_CAST_CONFIG_DETAILS_QUERY};`;
            const res = await pool.query(query);
            res.rows.forEach(row => {
                const agent: RentCastDetails = this.mapRowToRentCastDetails(row);
                rentCastDetails.push(agent);
            });
            if (rentCastDetails.length < 1) {
                throw new Error('Should be at least 1 Rent Cast Details Row in database');
            }
            return rentCastDetails; //rentCastDetails[0];
        } catch (err) {
            console.error('Error fetching all agents', err);
            throw err;
        }
    }

    async updateNumberOfApiCalls(pool: Pool, rentCastConfigDetailsId: number) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            console.log('BEGIN QUERY');

            await this._updateNumberOfApiCalls(pool, rentCastConfigDetailsId);

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
        rentCastDetailsId: number,
        executionTime: Date = new Date()
    ): Promise<number> {
        try {

            const values: any[] = [
                endpoint,
                fullUrl,
                rentCastDetailsId,
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

    async findMatchingRentingCastData(pool: Pool, saleEndPoint: string, propertyEndPoint: string): Promise<RentCastMatchingData[]> {
        const matchingRentCastDataList: RentCastMatchingData[] = [];
        try {
            const query = `${this.MATCHING_RENT_CAST_DATA_QUERY};`;
            const res = await pool.query(query, [saleEndPoint, propertyEndPoint]);
            res.rows.forEach(row => {
                matchingRentCastDataList.push(
                    this.mapRowToMatchingRentingCastData(row)
                );
            });

        } catch (err) {
            console.error('Error fetching all agents', err);
            throw err;
        }
        return matchingRentCastDataList;
    }

    private async _resetNumberOfApiCalls(pool: Pool, id: number) {
        const query = `${this.RESET_NUMBER_OF_API_CALLS_QUERY};`;
        try {
            await pool.query(query, [id]);
            console.log('Number of api calls set to 0');

        } catch (err) {
            console.error('Error inserting listing information', err);
            throw err;
        }
    }

    private async _updateNumberOfApiCalls(pool: Pool, rentCastConfigDetailsId: number) {
        const query = `${this.UPDATE_NUMBER_OF_API_CALLS_QUERY};`;
        try {
            await pool.query(query, [rentCastConfigDetailsId]);
            console.log('Number of api calls has been incremented');

        } catch (err) {
            console.error('Error inserting listing information', err);
            throw err;
        }
    }

    private mapRowToMatchingRentingCastData(row: any): RentCastMatchingData {
        const saleAddressId = row.sale_address_id;
        const saleResponseId = row.sale_response_id;
        const propertyResponseId = row.property_response_id;
        const saleResponseJsonData = row.sale_api_response_data;
        const propertyResponseJsonData = row.property_api_response_data;
        const saleEndPoint = row.sale_end_point;
        const propertyEndPoint = row.property_end_point;
        const saleExecutionTime = row.sale_call_execution_time
        const propertyExecutionTime = row.property_call_execution_time;

        const saleRentCastData: RentCastApiResponse = {
            jsonData: saleResponseJsonData,
            endPoint: saleEndPoint,
            executionTime: saleExecutionTime,
        };

        const propertyRentCastData: RentCastApiResponse = {
            jsonData: propertyResponseJsonData,
            endPoint: propertyEndPoint,
            executionTime: propertyExecutionTime,
        };

        return new RentCastMatchingData(
            saleAddressId,
            {
                rentCastResponseId: saleResponseId,
                rentCastData: saleRentCastData
            },
            {
                rentCastResponseId: propertyResponseId,
                rentCastData: propertyRentCastData
            }
        );
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