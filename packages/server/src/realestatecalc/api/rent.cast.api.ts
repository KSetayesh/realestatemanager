import { Pool } from 'pg';
import fs from 'fs/promises';  // Use promise-based fs
import apiKeysConfig from '../../config/apiKeysConfig';
import { RentCastApiRequestDTO } from "@realestatemanager/shared";
import { rentCastDetailsMap } from 'src/shared/Constants';
import { RentCastDetails } from '../models/rent_cast_api_models/rentcastdetails.model';
import { RentClassApiUrlCreator } from './rent.cast.api.url.creator';
import { RentCastManager } from 'src/db/realestate/dbmanager/rentcast.manager';
import { DatabaseManagerFactory } from 'src/db/realestate/dbfactory';

export type ApiCallDetails = {
    canCallRentCastApi: boolean;
    rentCastDetailsId?: number;
};

export type RentCastApiHeader = {
    method: string;
    headers: {
        accept: string;
        'X-Api-Key': string;
    }
};

export type RentCastApiResponse = {
    rentCastApiCallId: number;
    jsonData: any;
};

export class RentCastApi {

    private rentCastManager: RentCastManager;
    private pool: Pool;

    constructor() {
        this.rentCastManager = DatabaseManagerFactory.createRentCastManager();
        this.pool = DatabaseManagerFactory.getDbPool();
    }

    async getRentCastDetailsId(): Promise<number> {
        return (await this.getApiCallDetails()).rentCastDetailsId;
    }

    async callRentCastApi(
        endpoint: string,
        rentCastApiRequest: RentCastApiRequestDTO,
        filePath: string
    ): Promise<RentCastApiResponse> {

        const apiCallDetails = await this.getApiCallDetails();
        if (!apiCallDetails.canCallRentCastApi) {
            throw new Error('API call not permitted at this time.');
        }

        const client = await this.pool.connect();
        let rentCastApiResponse: RentCastApiResponse;
        try {

            await client.query('BEGIN');
            console.log('BEGIN QUERY');

            rentCastApiResponse = await this._callRentCastApi(
                endpoint,
                apiCallDetails,
                rentCastApiRequest,
                filePath,
            );

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Transaction failed:', error);
            throw error;
        } finally {
            client.release();
        }
        return rentCastApiResponse;

    }

    private async _callRentCastApi(
        endpoint: string,
        apiCallDetails: ApiCallDetails,
        rentCastApiRequest: RentCastApiRequestDTO,
        filePath: string
    ): Promise<RentCastApiResponse> {

        console.log("requestData:", rentCastApiRequest);

        const url = new RentClassApiUrlCreator().createURL(endpoint, rentCastApiRequest);

        console.log("URL for RentCast Api:", url);

        try {
            const options: RentCastApiHeader = await this.getHeadersForRentCastApiCall(apiCallDetails);
            const response = await fetch(url, options);
            if (response.status === 200) {
                const executionTime = new Date();
                console.log("Is successful!");
                const rentCastDetailsId = apiCallDetails.rentCastDetailsId;
                await this.rentCastManager.updateNumberOfApiCalls(this.pool, rentCastDetailsId);
                const rentCastApiCallId = await this.rentCastManager.insertRentCastApiCall(
                    this.pool,
                    endpoint,
                    url,
                    rentCastDetailsId,
                    executionTime
                );
                const data = await response.json();
                console.log("_data1:", data); // Log the response data

                // Write response data to JSON file
                await this.writeResponseToJsonFile(filePath, data);
                return {
                    rentCastApiCallId: rentCastApiCallId,
                    jsonData: data,
                };

            } else {
                console.log("Is NOT successful!");
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error:', error);
            throw new Error(error);// Re-throw the error if needed or handle it as needed
        }
    }

    private async getApiCallDetails(): Promise<ApiCallDetails> {
        if (!apiKeysConfig.canMakeRentCastApiCall) {
            console.log(`"canMakeRentCastApiCall" is set to false in .env`);
            return { canCallRentCastApi: false };
        }

        const rentCastDetails: RentCastDetails[] = await this.rentCastManager.getRentCastApiDetails(this.pool);
        for (const rentCastDetail of rentCastDetails) {
            if (rentCastDetail.canMakeFreeApiCall) {
                return { canCallRentCastApi: true, rentCastDetailsId: rentCastDetail.id };
            }
        }

        console.log(`Number of rent cast api calls has reached its limit, cannot make api call`);
        return { canCallRentCastApi: false };
    }

    private async getHeadersForRentCastApiCall(apiCallDetails: ApiCallDetails): Promise<RentCastApiHeader> {

        const apiKey = rentCastDetailsMap[apiCallDetails.rentCastDetailsId];

        return {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-Api-Key': apiKey,
            }
        };
    }

    private async writeResponseToJsonFile(filePath: string, data: any): Promise<void> {
        try {
            await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
            console.log('File has been saved successfully.');
        } catch (err) {
            console.error('Failed to write to file:', err);
        }
    }

}