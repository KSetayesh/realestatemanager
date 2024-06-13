import { Pool } from 'pg';
import fs from 'fs/promises';  // Use promise-based fs
import rentCastConfig from '../../../config/rentCastConfig';
import { CreateRentCastApiRequest } from "@realestatemanager/shared";
import { rentCastDetailsMap } from 'src/shared/Constants';
import { RentClassApiUrlCreator } from './rent.cast.api.url.creator';
import { RentCastManager } from 'src/db/realestate/dbmanager/rentcast.manager';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/db/database.service';
import { RentCastApiEndPointManager, RentCastEndPoint } from './rent.cast.api.endpoint.manager';
import { RentCastDetails } from '../models/rentcastdetails.model';
import { ApiClient } from 'src/shared/api.client';
import { EndpointDetails } from 'src/shared/endpoint.details.interface';

export type ApiCallDetails = {
    canCallRentCastApi: boolean;
    rentCastDetailsId?: number;
};

export type RentCastApiResponse = {
    jsonData: any;
    endPoint: string;
    rentCastApiCallId?: number;
    executionTime?: Date;
};


@Injectable()
export class RentCastApiClient extends ApiClient {

    private pool: Pool;
    private rentCastApiEndPointManager: RentCastApiEndPointManager;

    constructor(
        private readonly databaseService: DatabaseService,
        private readonly rentCastManager: RentCastManager,
    ) {
        super(
            rentCastConfig.rentCastApiUrl,
            rentCastConfig.canMakeRentCastApiCall
        );
        this.pool = this.databaseService.getPool();
        this.rentCastApiEndPointManager = new RentCastApiEndPointManager();
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

    getEndPointDetails(rentCastApiEndPoint: RentCastEndPoint): EndpointDetails {
        return this.rentCastApiEndPointManager.getEndPointDetails(this.baseApiUrl, rentCastApiEndPoint);
    }

    private async _callRentCastApi(
        rentCastEndPoint: RentCastEndPoint,
        apiCallDetails: ApiCallDetails,
        rentCastApiRequest: CreateRentCastApiRequest,
    ): Promise<RentCastApiResponse> {

        console.log("requestData:", rentCastApiRequest);

        const endpointDetails: EndpointDetails = this.getEndPointDetails(rentCastEndPoint);
        const filePath = endpointDetails.responseFilePath;
        const endPoint = endpointDetails.endPoint;

        const url = new RentClassApiUrlCreator().createURL(endPoint, rentCastApiRequest);

        const response = await this._makeApiCall(apiCallDetails, url);
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

    protected async _makeApiCall(apiCallDetails: ApiCallDetails, url: string): Promise<Response> {
        const apiKey = rentCastDetailsMap[apiCallDetails.rentCastDetailsId];
        return this.makeApiCall(apiKey, url, undefined);
    }

    private async getApiCallDetails(): Promise<ApiCallDetails> {
        if (!this.canMakeApiCall) {
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

    private async writeResponseToJsonFile(filePath: string, data: any): Promise<void> {
        try {
            console.log(`Writing rentcast api response to ${filePath}`);
            await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
            console.log('File has been saved successfully.');
        } catch (err) {
            console.error('Failed to write to file:', err);
        }
    }

}