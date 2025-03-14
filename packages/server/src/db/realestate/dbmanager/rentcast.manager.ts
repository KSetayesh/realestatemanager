import { Pool } from 'pg';
import { RentCastDAO } from '../dao/rentcast.dao';
import { DatabaseManager } from './db.manager';
import { Injectable } from '@nestjs/common';
import { RentCastResponse } from 'src/modules/rentcast/models/rentcastresponse.model';
import { RentCastDetails } from 'src/modules/rentcast/models/rentcastdetails.model';
import { RentCastMatchingData } from 'src/modules/rentcast/models/rentcastmatchingdata.model'; 
import { RentCastDAOInterface } from '../dao/rentcast.dao.interface';

@Injectable()
export class RentCastManager extends DatabaseManager implements RentCastDAOInterface {

    constructor(
        private readonly rentCastDAO: RentCastDAO,
        commit: boolean,
    ) {
        super(commit)
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
        return (await this.rentCastDAO.getRentCastApiDetails(pool)).sort((a, b) => a.id - b.id);
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
