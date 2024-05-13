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

    constructor(pool: Pool) {
        this.rentCastManager = DatabaseManagerFactory.createRentCastManager();
        this.pool = pool;
    }

    async callRentCastApi(
        endpoint: string,
        rentCastDetailsId: number,
        rentCastApiRequest: RentCastApiRequestDTO,
        filePath: string
    ): Promise<RentCastApiResponse> {

        console.log("requestData:", rentCastApiRequest);

        const apiCallDetails = await this.getApiCallDetails();
        if (!apiCallDetails.canCallRentCastApi) {
            throw new Error('API call not permitted at this time.');
        }

        const url = new RentClassApiUrlCreator().createURL(endpoint, rentCastApiRequest);

        console.log("URL for RentCast Api:", url);

        try {
            // const options = this.getHeadersForRentCastApiCall()
            const options: RentCastApiHeader = await this.getHeadersForRentCastApiCall();
            const response = await fetch(url, options);
            if (response.status === 200) {
                const executionTime = new Date();
                console.log("Is successful!");

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

    private async getApiKey(): Promise<string> {
        const apiCallDetails: ApiCallDetails = await this.getApiCallDetails();
        if (!this.canMakeApiCall(apiCallDetails)) {
            throw new Error('Cannot fetch api key');
        }
        return rentCastDetailsMap[apiCallDetails.rentCastDetailsId];
    }

    async getApiCallDetails(): Promise<ApiCallDetails> {
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

    private canMakeApiCall(apiCallDetails: ApiCallDetails): boolean {
        if (!apiKeysConfig.canMakeRentCastApiCall) {
            console.log(`"canMakeRentCastApiCall" is set to false in .env`);
            return false;
        }

        return apiCallDetails.canCallRentCastApi && apiCallDetails.rentCastDetailsId > -1;
    }

    private async getHeadersForRentCastApiCall(): Promise<RentCastApiHeader> {
        const apiCallDetails: ApiCallDetails = await this.getApiCallDetails();

        if (!apiCallDetails.canCallRentCastApi || !apiCallDetails.rentCastDetailsId) {
            throw new Error(`No available API configurations to make a call.`);
        }

        const apiKey = await this.getApiKey();

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