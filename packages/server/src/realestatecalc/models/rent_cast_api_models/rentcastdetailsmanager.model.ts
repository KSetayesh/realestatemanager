import { Pool } from 'pg';
import { RentCastDetails } from "./rentcastdetails.model";
import apiKeysConfig from '../../../config/apiKeysConfig';
import { RentCastManager } from "src/db/realestate/rentcast.db";
import { DatabaseManagerFactory } from "src/db/realestate/dbfactory";

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


export class RentCastDetailsManager {

    private rentCastDetailsMap: { [key: number]: string } = {
        1: apiKeysConfig.rentCastApiKey,
        2: apiKeysConfig.backUpRentCastApiKey,
    };

    private rentCastManager: RentCastManager;
    private pool: Pool;

    constructor() {
        this.rentCastManager = DatabaseManagerFactory.createRentCastManager();
        this.pool = DatabaseManagerFactory.getDbPool();
    }

    async getRentCastApiDetails(): Promise<RentCastDetails[]> {
        const rentCastDetails: RentCastDetails[] = await this.rentCastManager.getRentCastDetails(this.pool);

        for (const rentCastDetail of rentCastDetails) {
            if (!(rentCastDetail.id in this.rentCastDetailsMap)) {
                throw new Error(`${rentCastDetail.id} not found! Need to update rentCastDetailsMap`);
            }
        }
        return (await this.rentCastManager.getRentCastDetails(this.pool)).sort((a, b) => a.id - b.id);
    }

    async updateNumberOfApiCalls(id: number): Promise<void> {
        await this.rentCastManager.updateNumberOfApiCalls(this.pool, id);
    }

    async getApiCallDetails(): Promise<ApiCallDetails> {
        if (!apiKeysConfig.canMakeRentCastApiCall) {
            console.log(`"canMakeRentCastApiCall" is set to false in .env`);
            return { canCallRentCastApi: false };
        }

        const rentCastDetails: RentCastDetails[] = await this.getRentCastApiDetails();
        for (const rentCastDetail of rentCastDetails) {
            if (rentCastDetail.canMakeFreeApiCall) {
                return { canCallRentCastApi: true, rentCastDetailsId: rentCastDetail.id };
            }
        }

        console.log(`Number of rent cast api calls has reached its limit, cannot make api call`);
        return { canCallRentCastApi: false };
    }

    async getHeadersForRentCastApiCall(): Promise<RentCastApiHeader> {
        const apiCallDetails: ApiCallDetails = await this.getApiCallDetails();

        if (!apiCallDetails.canCallRentCastApi || !apiCallDetails.rentCastDetailsId) {
            throw new Error(`No available API configurations to make a call.`);
        }

        return {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-Api-Key': this.rentCastDetailsMap[apiCallDetails.rentCastDetailsId],
            }
        };
    }


}