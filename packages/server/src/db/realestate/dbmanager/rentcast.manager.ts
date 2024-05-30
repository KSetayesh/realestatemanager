import { Pool } from 'pg';
import apiKeysConfig from '../../../config/apiKeysConfig';
import { RentCastDetails } from "src/realestatecalc/models/rent_cast_api_models/rentcastdetails.model";
import { RentCastDAO } from '../dao/rentcast.dao';
import { RentCastResponse } from 'src/realestatecalc/models/rent_cast_api_models/rentcastresponse.model';
import { RentCastMatchingData } from 'src/realestatecalc/models/rent_cast_api_models/rentcastmatchingdata.model';
import { DatabaseManager } from './db.manager';

export class RentCastManager extends DatabaseManager {

    private rentCastDAO: RentCastDAO;

    private rentCastDetailsMap: { [key: number]: string } = {
        1: apiKeysConfig.rentCastApiKey,
        2: apiKeysConfig.backUpRentCastApiKey,
        3: apiKeysConfig.backUpbackUpRentCastApiKey,
    };

    constructor(rentCastDAO: RentCastDAO, commit: boolean) {
        super(commit);
        this.rentCastDAO = rentCastDAO;
    }

    // Function to check if a specific ID exists in the database
    async checkIfAddressIdExists(pool: Pool, addressId: string): Promise<boolean> {
        return this.rentCastDAO.checkIfAddressIdExists(pool, addressId);
    }

    async insertRentCastApiResponse(
        pool: Pool,
        rentCastResponse: RentCastResponse,
        rentCastApiCallId: number
    ): Promise<number> {
        if (!this.commit) {
            console.log(this.commitMessage);
            return;
        }
        return this.rentCastDAO.insertRentCastApiResponse(pool, rentCastResponse, rentCastApiCallId);
    }

    async resetNumberOfApiCalls(pool: Pool, id: number) {
        if (!this.commit) {
            console.log(this.commitMessage);
            return;
        }
        await this.rentCastDAO.resetNumberOfApiCalls(pool, id);
    }

    async getRentCastApiDetails(pool: Pool): Promise<RentCastDetails[]> {
        const rentCastDetails: RentCastDetails[] = await this.rentCastDAO.getRentCastDetails(pool);

        for (const rentCastDetail of rentCastDetails) {
            if (!(rentCastDetail.id in this.rentCastDetailsMap)) {
                throw new Error(`${rentCastDetail.id} not found! Need to update rentCastDetailsMap`);
            }
        }
        return (await this.rentCastDAO.getRentCastDetails(pool)).sort((a, b) => a.id - b.id);
    }

    async updateNumberOfApiCalls(pool: Pool, rentCastConfigDetailsId: number): Promise<void> {
        if (!this.commit) {
            console.log(this.commitMessage);
            return;
        }
        await this.rentCastDAO.updateNumberOfApiCalls(pool, rentCastConfigDetailsId);
    }

    async insertRentCastApiCall(
        pool: Pool,
        endpoint: string,
        fullUrl: string,
        rentCastDetailsId: number,
        executionTime: Date = new Date()
    ): Promise<number> {
        if (!this.commit) {
            console.log(this.commitMessage);
            return;
        }
        return this.rentCastDAO.insertRentCastApiCall(
            pool,
            endpoint,
            fullUrl,
            rentCastDetailsId,
            executionTime
        );
    }

    async findMatchingRentingCastData(pool: Pool, saleEndPoint: string, propertyEndPoint: string): Promise<RentCastMatchingData[]> {
        return this.rentCastDAO.findMatchingRentingCastData(pool, saleEndPoint, propertyEndPoint);
    }

}
