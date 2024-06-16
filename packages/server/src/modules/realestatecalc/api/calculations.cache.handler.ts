import { Injectable } from '@nestjs/common';
import {
    CreateInvestmentScenarioRequest,
    CreateListingDetailsCalculationsRequest,
    ListingDetailsResponseDTO,
    ListingWithScenariosResponseDTO
} from '@realestatemanager/types';
import { CalculationsApiClient } from "src/modules/realestatecalc/api/calculations.api.client";
import { ListingDetails } from "src/modules/realestatecalc/models/listingdetails.model";
import applicationConfig from 'src/config/applicationConfig';
import { createClient } from 'redis';
import { Utility } from '@realestatemanager/utilities';

@Injectable()
export class CalculationsCacheHandler {

    private calculationsApiClient: CalculationsApiClient;
    private redisClient;

    constructor(
        calculationsApiClient: CalculationsApiClient,
    ) {
        this.calculationsApiClient = calculationsApiClient;
        // Initialize Redis client with environment variable or default to localhost
        const redisUrl = applicationConfig.redisUrl || 'redis://localhost:6379';
        this.redisClient = createClient({
            url: redisUrl
        });
        this.redisClient.connect();
    }


    async setNewCache(listingDetailsArr: ListingDetails[]): Promise<void> {
        const listingDetailsDTOArr: ListingDetailsResponseDTO[] = listingDetailsArr.map(listingDetails => listingDetails.toDTO());
        const response = await this.calculationsApiClient.setFreshCache(listingDetailsDTOArr);
        if (!response.ok) {
            throw new Error(`Failed to set new cache: ${response.status} ${response.statusText}`);
        }
    }

    async getCalcResults(listingDetailsArr: ListingDetails[]): Promise<ListingWithScenariosResponseDTO[]> {
        // Log the size of the Redis cache
        const dbSize = await this.redisClient.sendCommand(['DBSIZE']);
        console.log('Size of cache before trying to get from it:', dbSize);

        // Log the number of properties being fetched
        console.log(`Fetching ${listingDetailsArr.length} properties`);

        // Fetch properties from cache in parallel
        const results = await Promise.all(
            listingDetailsArr.map(listingDetail => this._getFromCache(listingDetail.toDTO()))
        );

        // Filter out undefined results
        const listingWithScenariosArr: ListingWithScenariosResponseDTO[] = results.filter((result): result is ListingWithScenariosResponseDTO => result !== undefined);

        // Create a set of IDs for properties fetched from cache
        const cachedIds: Set<number> = new Set(listingWithScenariosArr.map(item => item.listingDetails.id));

        // Collect properties that need to be fetched from the calculation server
        const listingsToFetch: CreateListingDetailsCalculationsRequest[] = listingDetailsArr
            .filter(listing => !cachedIds.has(listing.id))
            .map(listing => ({ listingDetails: listing.toDTO() }));

        // Fetch properties from the calculation server if needed
        if (listingsToFetch.length > 0) {
            const response: Response = await this.calculationsApiClient.getFromCalcServer(listingsToFetch);
            if (!response.ok) {
                throw new Error(`Failed to get from calc server: ${response.status} ${response.statusText}`);
            }
            const newListings: ListingWithScenariosResponseDTO[] = await response.json();
            listingWithScenariosArr.push(...newListings);
        }

        console.log('Finished fetching all properties');
        return listingWithScenariosArr;
    }


    async updateCache(listingDetailsList: ListingDetails[], forceUpdate: boolean): Promise<void> {
        const listingDetailsListDTO: ListingDetailsResponseDTO[] = listingDetailsList.map(listingDetails => listingDetails.toDTO());
        const response = await this.calculationsApiClient.setCache(listingDetailsListDTO, forceUpdate);
        if (!response.ok) {
            throw new Error(`Failed to update cache: ${response.status} ${response.statusText}`);
        }
    }

    async deleteFromCache(listingDetailIds: number[]): Promise<void> {
        const response = await this.calculationsApiClient.deleteFromCache(listingDetailIds);
        if (!response.ok) {
            throw new Error(`Failed to delete from cache: ${response.status} ${response.statusText}`);
        }
    }

    async calculate(listingDetails: ListingDetails, investmentScenarioRequest: CreateInvestmentScenarioRequest): Promise<ListingWithScenariosResponseDTO> {
        const response: Response = await this.calculationsApiClient.calculate(listingDetails, investmentScenarioRequest);
        if (!response.ok) {
            throw new Error(`Failed to calculate: ${response.status} ${response.statusText}`);
        }
        const listingWithScenarios: ListingWithScenariosResponseDTO = await response.json();
        return listingWithScenarios;
    }


    private async _getFromCache(listingDetails: ListingDetailsResponseDTO): Promise<ListingWithScenariosResponseDTO | undefined> {
        const listingId = listingDetails.id;
        const key = listingId.toString();
        // Fetch from cache
        const cachedListingJson = await this.redisClient.get(key);
        if (cachedListingJson) {
            const cachedListing: ListingWithScenariosResponseDTO = JSON.parse(cachedListingJson);

            // Check if cached listing is identical to the requested listing
            if (Utility.deepEqual(cachedListing.listingDetails, listingDetails)) {
                console.log(`Property id ${listingId} has been found in cache and is identical.`);
                return cachedListing;
            } else {
                console.log(`Property id ${listingId} found in cache but is not identical.`);
            }
        } else {
            console.log(`Property id ${listingId} NOT found in cache`);
        }

        return undefined; // Explicitly return undefined if not found or not identical
    }


}