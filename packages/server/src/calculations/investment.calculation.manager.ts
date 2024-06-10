import {
    AmortizationBreakdownResponseDTO,
    CreateInvestmentScenarioRequest,
    ListingWithScenariosResponseDTO,
    Utility
} from "@realestatemanager/shared";
import { InvestmentCalculator } from "./investment.calculator";
import applicationConfig from 'src/config/applicationConfig';
import { ListingDetails } from "src/modules/realestatecalc/models/listing_models/listingdetails.model";
import { InvestmentMetricBuilder } from "./builder/investment.metric.builder";

export class InvestmentCalculationManager {

    private cache: Map<number, ListingWithScenariosResponseDTO>;
    private listingDetails: ListingDetails;
    private investmentScenarioRequest?: CreateInvestmentScenarioRequest;
    private usePropertyCache: boolean = applicationConfig.useCache;


    constructor(
        cache: Map<number, ListingWithScenariosResponseDTO>,
        listingDetails: ListingDetails,
        investmentScenarioRequest?: CreateInvestmentScenarioRequest) {

        this.cache = cache;
        this.listingDetails = listingDetails;
        this.investmentScenarioRequest = investmentScenarioRequest;
    }

    resetCache(): void {
        this.cache.clear();
    }

    getListingDetailsCalculations(): ListingWithScenariosResponseDTO {
        if (!this.usePropertyCache) {
            return this.createInvestmentMetrics();
        }

        if (!this.investmentScenarioRequest || this.investmentScenarioRequest.useDefaultRequest) {
            const listingId: number = this.listingDetails.id;
            const cachedListing = this.cache.get(listingId);

            if (cachedListing && Utility.deepEqual(this.listingDetails.toDTO(), cachedListing.listingDetails)) {
                return cachedListing;
            }
        }

        this.setCache();

        return this.cache.get(this.listingDetails.id);
    }

    setCache(): ListingWithScenariosResponseDTO {
        if (!this.usePropertyCache) {
            return;
        }

        const listingWithScenariosDTO: ListingWithScenariosResponseDTO = this.createInvestmentMetrics();
        this.cache.set(this.listingDetails.id, listingWithScenariosDTO);
        return listingWithScenariosDTO;
    }

    deleteFromCache(): boolean {
        if (!this.usePropertyCache) {
            return false;
        }
        if (this.cache.has(this.listingDetails.id)) {
            this.cache.delete(this.listingDetails.id);
            console.log(`Deleted key ${this.listingDetails.id} from cache.`);
            return true;
        } else {
            console.log(`Key ${this.listingDetails.id} not found in cache.`);
            return false;
        }
    }

    updateCache(): ListingWithScenariosResponseDTO {
        if (!this.usePropertyCache) {
            return;
        }
        if (this.cache.has(this.listingDetails.id)) {
            this.cache.set(this.listingDetails.id, this.createInvestmentMetrics());
            console.log(`${this.listingDetails.id} has been updated in cache.`);
            return this.cache.get(this.listingDetails.id);
        } else {
            return this.setCache();
        }
    }

    private createInvestmentMetrics(): ListingWithScenariosResponseDTO {
        const investmentMetricsBuilder = new InvestmentMetricBuilder(this.listingDetails, this.investmentScenarioRequest);
        const investmentCalc: InvestmentCalculator = investmentMetricsBuilder.build();
        const metrics: AmortizationBreakdownResponseDTO = investmentCalc.createInvestmentMetrics();

        return {
            listingDetails: this.listingDetails.toDTO(),
            metrics: metrics,
        };
    }
}
