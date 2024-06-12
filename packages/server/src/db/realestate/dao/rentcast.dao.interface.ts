import { Pool } from 'pg';
import { RentCastDetails } from 'src/modules/rentcast/models/rentcastdetails.model';
import { RentCastMatchingData } from 'src/modules/rentcast/models/rentcastmatchingdata.model';
import { RentCastResponse } from 'src/modules/rentcast/models/rentcastresponse.model';

export interface RentCastDAOInterface {

    checkIfAddressIdExists(pool: Pool, address_id: string): Promise<boolean>;

    insertRentCastApiResponse(
        pool: Pool,
        rentCastResponse: RentCastResponse,
        rentCastApiCallId: number
    ): Promise<number>;

    getRentCastApiDetails(pool: Pool): Promise<RentCastDetails[]>;

    updateNumberOfApiCalls(pool: Pool, rentCastConfigDetailsId: number): Promise<void>;

    resetNumberOfApiCalls(pool: Pool, id: number): Promise<void>;

    insertRentCastApiCall(
        pool: Pool,
        endpoint: string,
        fullUrl: string,
        rentCastDetailsId: number,
        executionTime: Date,
    ): Promise<number>;

    findMatchingRentingCastData(
        pool: Pool,
        saleEndPoint: string,
        propertyEndPoint: string
    ): Promise<RentCastMatchingData[]>;

}