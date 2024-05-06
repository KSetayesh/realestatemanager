import { RentCastDetails } from "src/realestatecalc/models/rent_cast_api_models/rentcastdetails.model";
import { RealEstateManager } from "./realestate.db";

export class RentCastManager extends RealEstateManager {

    private GET_RENT_CAST_API_QUERY = `SELECT 
        api_calls_this_month, number_of_free_api_calls, billing_period, first_billed_on 
        FROM rent_cast_api;
    `;

    private UPDATE_NUMBER_OF_API_CALLS = `UPDATE rent_cast_api 
        SET api_calls_this_month = api_calls_this_month + 1;
    `;

    private RESET_NUMBER_OF_API_CALLS = `UPDATE rent_cast_api 
        SET api_calls_this_month = 0;
    `;

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
            await this.pool.query(this.RESET_NUMBER_OF_API_CALLS);
            console.log('Listing information inserted successfully');

        } catch (err) {
            console.error('Error inserting listing information', err);
            throw err;
        }
    }

    private async _updateNumberOfApiCalls() {
        try {
            await this.pool.query(this.UPDATE_NUMBER_OF_API_CALLS);
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
        const firstBilledOn: Date = row.first_billed_on;

        return new RentCastDetails(apiCallsThisMonth, numberOfFreeApiCalls, billingPeriod, firstBilledOn);
    }

}