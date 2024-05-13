// import { Pool } from 'pg';
// import fs from 'fs/promises';  // Use promise-based fs
// import { RentCastDetails } from "./rentcastdetails.model";
// import apiKeysConfig from '../../../config/apiKeysConfig';
// import { RentCastManager } from "src/db/realestate/dao/rentcast.dao";
// import { DatabaseManagerFactory } from "src/db/realestate/dbfactory";
// import { rentCastDetailsMap } from 'src/shared/Constants';
// import { RentCastDBManager } from 'src/db/realestate/dbmanager/rentcast.manager';

// export type ApiCallDetails = {
//     canCallRentCastApi: boolean;
//     rentCastDetailsId?: number;
// };

// export type RentCastApiHeader = {
//     method: string;
//     headers: {
//         accept: string;
//         'X-Api-Key': string;
//     }
// };


// export class RentCastDetailsManager {

//     private rentCastDBManager: RentCastDBManager;

//     constructor() {
//         this.rentCastDBManager = new RentCastDBManager();
//     }

//     // private rentCastDetailsMap: { [key: number]: string } = {
//     //     1: apiKeysConfig.rentCastApiKey,
//     //     2: apiKeysConfig.backUpRentCastApiKey,
//     // };

//     // private rentCastManager: RentCastManager;
//     // private pool: Pool;

//     // constructor() {
//     //     this.rentCastManager = DatabaseManagerFactory.createRentCastManager();
//     //     this.pool = DatabaseManagerFactory.getDbPool();
//     // }

//     async getApiKey(): Promise<string> {
//         const apiCallDetails: ApiCallDetails = await this.getApiCallDetails();
//         if (!this.canMakeApiCall(apiCallDetails)) {
//             throw new Error('Cannot fetch api key');
//         }
//         return rentCastDetailsMap[apiCallDetails.rentCastDetailsId];
//     }

//     // async getRentCastApiDetails(): Promise<RentCastDetails[]> {
//     //     const rentCastDetails: RentCastDetails[] = await this.rentCastManager.getRentCastDetails(this.pool);

//     //     for (const rentCastDetail of rentCastDetails) {
//     //         if (!(rentCastDetail.id in this.rentCastDetailsMap)) {
//     //             throw new Error(`${rentCastDetail.id} not found! Need to update rentCastDetailsMap`);
//     //         }
//     //     }
//     //     return (await this.rentCastManager.getRentCastDetails(this.pool)).sort((a, b) => a.id - b.id);
//     // }

//     // async updateNumberOfApiCalls(id: number): Promise<void> {
//     //     await this.rentCastManager.updateNumberOfApiCalls(this.pool, id);
//     // }

//     // async insertRentCastApiCall(
//     //     endpoint: string,
//     //     fullUrl: string,
//     //     rentCastDetailsId: number,
//     //     executionTime: Date = new Date()
//     // ): Promise<number> {
//     //     return this.rentCastManager.insertRentCastApiCall(this.pool, endpoint, fullUrl, rentCastDetailsId, executionTime);
//     // }

//     async getApiCallDetails(): Promise<ApiCallDetails> {
//         if (!apiKeysConfig.canMakeRentCastApiCall) {
//             console.log(`"canMakeRentCastApiCall" is set to false in .env`);
//             return { canCallRentCastApi: false };
//         }

//         const rentCastDetails: RentCastDetails[] = await this.rentCastDBManager.getRentCastApiDetails();
//         for (const rentCastDetail of rentCastDetails) {
//             if (rentCastDetail.canMakeFreeApiCall) {
//                 return { canCallRentCastApi: true, rentCastDetailsId: rentCastDetail.id };
//             }
//         }

//         console.log(`Number of rent cast api calls has reached its limit, cannot make api call`);
//         return { canCallRentCastApi: false };
//     }

//     async writeResponseToJsonFile(filePath: string, data: any): Promise<void> {
//         try {
//             await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
//             console.log('File has been saved successfully.');
//         } catch (err) {
//             console.error('Failed to write to file:', err);
//         }
//     }

//     private canMakeApiCall(apiCallDetails: ApiCallDetails): boolean {
//         if (!apiKeysConfig.canMakeRentCastApiCall) {
//             console.log(`"canMakeRentCastApiCall" is set to false in .env`);
//             return false;
//         }

//         return apiCallDetails.canCallRentCastApi && apiCallDetails.rentCastDetailsId > -1;
//     }


// }