import { Pool } from 'pg';
import fs from 'fs/promises';  // Use promise-based fs
import apiKeysConfig from '../../config/apiKeysConfig';
import { CreateRentCastApiRequest } from "@realestatemanager/shared";
import { rentCastDetailsMap } from 'src/shared/Constants';
import { RentCastDetails } from '../models/rent_cast_api_models/rentcastdetails.model';
import { RentClassApiUrlCreator } from './rent.cast.api.url.creator';
import { RentCastManager } from 'src/db/realestate/dbmanager/rentcast.manager';
import { DatabaseManagerFactory } from 'src/db/realestate/dbfactory';
import path from 'path';

export enum RentCastEndPoint {
    SALE = 'SALE',
    PROPERTIES = 'PROPERTIES',
};

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
    jsonData: any;
    endPoint: string;
    rentCastApiCallId?: number;
    executionTime?: Date;
};

interface EndpointDetails {
    endPoint: string;
    responseFilePath: string;
};

export class RentCastApiClient {


    private endPointMap: Record<RentCastEndPoint, EndpointDetails> = {
        [RentCastEndPoint.SALE]: {
            endPoint: 'https://api.rentcast.io/v1/listings/sale',
            responseFilePath: path.join(__dirname, '../../../src/data/latestRentCastSale.json'),
        },
        [RentCastEndPoint.PROPERTIES]: {
            endPoint: 'https://api.rentcast.io/v1/properties',
            responseFilePath: path.join(__dirname, '../../../src/data/latestRentCastProperty.json'),
        },
    };

    private rentCastManager: RentCastManager;
    private pool: Pool;

    constructor() {
        this.rentCastManager = DatabaseManagerFactory.createRentCastManager();
        this.pool = DatabaseManagerFactory.getDbPool();
    }

    getEndpoint(rentCastEndPoint: RentCastEndPoint): string {
        const endpointDetails: EndpointDetails = this.endPointMap[rentCastEndPoint];
        return endpointDetails.endPoint;
    }

    async getRentCastDetailsId(): Promise<number> {
        return (await this.getApiCallDetails()).rentCastDetailsId;
    }

    async callRentCastApi(
        rentCastEndPoint: RentCastEndPoint,
        rentCastApiRequest: CreateRentCastApiRequest,
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
                rentCastEndPoint,
                apiCallDetails,
                rentCastApiRequest,
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
        rentCastEndPoint: RentCastEndPoint,
        apiCallDetails: ApiCallDetails,
        rentCastApiRequest: CreateRentCastApiRequest,
    ): Promise<RentCastApiResponse> {

        console.log("requestData:", rentCastApiRequest);

        const endpointDetails: EndpointDetails = this.endPointMap[rentCastEndPoint];
        const filePath = endpointDetails.responseFilePath;
        const endPoint = endpointDetails.endPoint;

        const url = new RentClassApiUrlCreator().createURL(endPoint, rentCastApiRequest);

        const response = await this.makeApiCall(apiCallDetails, url);
        if (response.status === 200) {
            const executionTime = new Date();
            console.log("RentCastApi call is successful!");
            const rentCastDetailsId = apiCallDetails.rentCastDetailsId;
            await this.rentCastManager.updateNumberOfApiCalls(this.pool, rentCastDetailsId);
            const rentCastApiCallId = await this.rentCastManager.insertRentCastApiCall(
                this.pool,
                endPoint,
                url,
                rentCastDetailsId,
                executionTime
            );
            const data = await response.json();
            console.log("_data1:", data); // Log the response data

            // Write response data to JSON file
            await this.writeResponseToJsonFile(filePath, data);
            console.log(`Api response written to ${filePath}`);
            return {
                rentCastApiCallId,
                jsonData: data,
                endPoint: endPoint,
            };

        } else {
            console.log("Is NOT successful!");
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

    }

    private async makeApiCall(apiCallDetails: ApiCallDetails, url: string): Promise<any> {
        try {
            console.log("URL for RentCast Api:", url);
            const options: RentCastApiHeader = await this.getHeadersForRentCastApiCall(apiCallDetails);
            return fetch(url, options);
        }
        catch (error) {
            console.error('RentCast Api Call Error:', error);
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
                return {
                    canCallRentCastApi: true,
                    rentCastDetailsId: rentCastDetail.id
                };
            }
        }

        console.log(`Number of rent cast api calls has reached its limit, cannot make api call`);
        
        return {
            canCallRentCastApi: false
        };
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