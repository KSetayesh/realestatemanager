import apiKeysConfig from '../../config/apiKeysConfig';
import { Injectable } from "@nestjs/common";
import {
    ListingCreationType,
    RentCastApiRequestDTO,
    RentCastDetailsDTO
} from "@realestatemanager/shared";
import { DatabaseManagerFactory } from "src/db/realestate/dbfactory";
import { RentCastManager } from "src/db/realestate/rentcast.db";
import { RentCastResponse } from "../models/rent_cast_api_models/rentcastresponse.model";
import { ListingManager } from "src/db/realestate/listing.db";
import { RentCastDetails } from "../models/rent_cast_api_models/rentcastdetails.model";

type RentCastApiResponse = {
    executionTime: Date;
    jsonData: any;
}

@Injectable()
export class RentCastService {

    private listingManager: ListingManager;
    private rentCastManager: RentCastManager;

    constructor() {
        this.listingManager = DatabaseManagerFactory.createListingManager();
        this.rentCastManager = DatabaseManagerFactory.createRentCastManager();
    }

    async getRentCastApiDetails(): Promise<RentCastDetailsDTO> {
        return (await this.rentCastManager.getRentCastDetails()).toDTO();
    }

    async addNewPropertyWithRentCastAPI(rentCastApiRequest: RentCastApiRequestDTO): Promise<void> {

        console.log("In addNewPropertyWithRentCastAPI!");
        console.log("requestData:", rentCastApiRequest);

        const canCallRentCastApi: boolean = await this.canCallRentCastApi();

        if (!canCallRentCastApi) {
            return;
        }

        const url = this.createURL(rentCastApiRequest);

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-Api-Key': apiKeysConfig.rentCastApiKey,
            }
        };

        try {
            const response: RentCastApiResponse = this.callRentCastApi(url);
            const rentCastResponses: RentCastResponse[] = this.parseApiResponse(response.jsonData);

            await this.listingManager.insertListingDetailsWithRentCastDetails(
                rentCastResponses,
                ListingCreationType.RENT_CAST_API,
                response.executionTime
            );
        }
        catch (error) {
            console.error(error);
            throw new Error(error);
        }

    }

    private callRentCastApi(url: string): RentCastApiResponse {
        let data;
        let now: Date;
        const options = this.getHeadersForRentCastApiCall();

        fetch(url, options)
            .then(async res => {
                if (res.status === 200) {
                    now = new Date();
                    console.log("Is successful!");

                    // Call updateNumberOfApiCalls here
                    await this.rentCastManager.updateNumberOfApiCalls();
                    data = await res.json();
                    console.log(data); // Log the response data

                } else {
                    console.log("Is NOT successful!");
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
            })
            .catch(err => console.error('error:' + err));

        return {
            executionTime: now,
            jsonData: data,
        };

    }

    private getHeadersForRentCastApiCall() {
        return {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-Api-Key': apiKeysConfig.rentCastApiKey,
            }
        };
    }

    private async canCallRentCastApi(): Promise<boolean> {
        if (!apiKeysConfig.canMakeRentCastApiCall) {
            console.log(`"canMakeRentCastApiCall" is set to false in .env`);
            return false;
        }

        const rentCastDetails: RentCastDetails = await this.rentCastManager.getRentCastDetails();

        if (!rentCastDetails.canMakeFreeApiCall) {
            console.log(`Number of rent cast api calls has exceeded ${rentCastDetails.numberOfFreeApiCalls}`);
            return false;
        }
        return true;
    }

    private parseApiResponse(jsonData): RentCastResponse[] {
        const rentCastResponses: RentCastResponse[] = [];
        // Iterate through each object in the array
        for (const property of jsonData) {
            const id = property.id;
            const formattedAddress = property.formattedAddress ?? '';
            const addressLine1 = property.addressLine1 ?? '';
            const addressLine2 = property.addressLine2 ?? '';
            const city = property.city ?? '';
            const state = property.state ?? '';
            const zipCode = property.zipCode ?? '';
            const county = property.county ?? '';
            const bedrooms = property.bedrooms ?? -1;
            const bathrooms = property.bathrooms ?? -1;
            const latitude = property.latitude ?? -1;
            const longitude = property.longitude ?? -1;
            const squareFootage = property.squareFootage ?? -1;
            const propertyType = property.propertyType ?? '';
            const lotSize = property.lotSize ?? -1;
            const status = property.status ?? '';
            const yearBuilt = property.yearBuilt ?? -1;
            const price = property.price ?? -1;
            const listedDate = property.listedDate ?? null;
            const removedDate = property.removedDate ?? null;
            const createdDate = property.createdDate ?? null;
            const lastSeenDate = property.lastSeenDate ?? null;
            const daysOnMarket = property.daysOnMarket ?? -1;

            rentCastResponses.push(
                new RentCastResponse(
                    id,
                    formattedAddress,
                    addressLine1,
                    addressLine2,
                    city,
                    state,
                    zipCode,
                    county,
                    bedrooms,
                    bathrooms,
                    latitude,
                    longitude,
                    squareFootage,
                    propertyType,
                    lotSize,
                    status,
                    yearBuilt,
                    price,
                    listedDate,
                    removedDate,
                    createdDate,
                    lastSeenDate,
                    daysOnMarket,
                )
            );

        }

        return rentCastResponses;

    };

    private createURL(rentCastApiRequest: RentCastApiRequestDTO): string {
        let appendToUrl = '';
        let firstAppended = true;
        if (rentCastApiRequest.address) {
            appendToUrl += this.appendUrlParameter('address', rentCastApiRequest.address, firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.city) {
            appendToUrl += this.appendUrlParameter('city', rentCastApiRequest.city, firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.state) {
            appendToUrl += this.appendUrlParameter('state', rentCastApiRequest.state, firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.zipCode) {
            appendToUrl += this.appendUrlParameter('zipCode', rentCastApiRequest.zipCode, firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.latitude) {
            appendToUrl += this.appendUrlParameter('latitude', rentCastApiRequest.latitude.toString(), firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.longitude) {
            appendToUrl += this.appendUrlParameter('longitude', rentCastApiRequest.longitude.toString(), firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.radius) {
            appendToUrl += this.appendUrlParameter('radius', rentCastApiRequest.radius.toString(), firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.propertyType) {
            appendToUrl += this.appendUrlParameter('propertyType', rentCastApiRequest.propertyType, firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.bedrooms) {
            appendToUrl += this.appendUrlParameter('bedrooms', rentCastApiRequest.bedrooms.toString(), firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.bathrooms) {
            appendToUrl += this.appendUrlParameter('bathrooms', rentCastApiRequest.bathrooms.toString(), firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.status) {
            appendToUrl += this.appendUrlParameter('status', rentCastApiRequest.status, firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.daysOld) {
            appendToUrl += this.appendUrlParameter('daysOld', rentCastApiRequest.daysOld.toString(), firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.limit) {
            appendToUrl += this.appendUrlParameter('limit', rentCastApiRequest.limit.toString(), firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.offset) {
            appendToUrl += this.appendUrlParameter('offset', rentCastApiRequest.offset.toString(), firstAppended);
            firstAppended = false;
        }
        return `https://api.rentcast.io/v1/listings/sale${appendToUrl}`;
    }

    private appendUrlParameter(
        property: string,
        value: string,
        firstAppended: boolean,
    ): string {
        const space = '%20';
        value = value.replace(/ /g, space);
        const returnValue = `${property}=${value}`;
        if (firstAppended) {
            return `?${returnValue}`;
        }
        else {
            return `&${returnValue}`;
        }
    }

}