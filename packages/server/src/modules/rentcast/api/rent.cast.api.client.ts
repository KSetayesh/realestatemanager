import { Pool } from 'pg';
import rentCastConfig from '../../../config/rentCastConfig';
import { CreateRentCastApiRequest } from "@realestatemanager/types";
import { RentClassApiUrlCreator } from './rent.cast.api.url.creator';
import { RentCastManager } from 'src/db/realestate/dbmanager/rentcast.manager';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/db/database.service';
import { RentCastApiEndPointManager, RentCastEndPoint } from './rent.cast.api.endpoint.manager';
import { RentCastDetails } from '../models/rentcastdetails.model';
import { ApiClient } from 'src/shared/api.client';
import { EndpointDetails } from 'src/shared/endpoint.details.interface';
import { PropertyUtility } from 'src/utility/PropertyUtility';
import { Utility } from '@realestatemanager/utilities';

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

    async callRentCastApi(
        rentCastEndPoint: RentCastEndPoint,
        rentCastApiRequest: CreateRentCastApiRequest,
    ): Promise<RentCastApiResponse> {

        const rentCastDetails: RentCastDetails = await this.getRentCastDetails();
        if (!rentCastDetails) {
            throw new Error('API call not permitted at this time.');
        }

        const client = await this.pool.connect();
        let rentCastApiResponse: RentCastApiResponse;
        try {

            await client.query('BEGIN');
            console.log('BEGIN QUERY');

            rentCastApiResponse = await this._callRentCastApi(
                rentCastEndPoint,
                rentCastDetails,
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
        rentCastDetails: RentCastDetails,
        rentCastApiRequest: CreateRentCastApiRequest,
    ): Promise<RentCastApiResponse> {

        console.log("requestData:", rentCastApiRequest);

        const endpointDetails: EndpointDetails = this.getEndPointDetails(rentCastEndPoint);
        const filePath = endpointDetails.responseFilePath;
        const endPoint = endpointDetails.endPoint;

        const url: string = new RentClassApiUrlCreator().createURL(endPoint, rentCastApiRequest);

        const response: Response = await this._makeApiCall(rentCastDetails, url);

        const executionTime = new Date();
        console.log("RentCastApi call is successful!");
        const rentCastDetailsId = rentCastDetails.id;
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
        Utility.writeResponseToJsonFileNonBlocking(filePath, data);

        console.log(`Api response written to ${filePath}`);
        return {
            rentCastApiCallId,
            jsonData: data,
            endPoint: endPoint,
        };

    }

    protected async _makeApiCall(rentCastDetails: RentCastDetails, url: string): Promise<Response> {
        return this.makeApiCall(rentCastDetails.apiKey, url, undefined);
    }

    private async getRentCastDetails(): Promise<RentCastDetails | undefined> {
        if (!this.canMakeApiCall) {
            console.log(`"canMakeRentCastApiCall" is set to false in .env`);
            return;
        }

        const rentCastDetails: RentCastDetails[] = await this.rentCastManager.getRentCastApiDetails(this.pool);
        const validRentCastDetail = rentCastDetails.find(detail => detail.canMakeFreeApiCall);

        if (validRentCastDetail) {
            return validRentCastDetail;
        } else {
            console.log(`Number of rent cast api calls has reached its limit, cannot make api call`);
            return;
        }
    }

}