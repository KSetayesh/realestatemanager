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

    setCache() {
        if (!this.usePropertyCache) {
            return;
        }

        const listingWithScenariosDTO: ListingWithScenariosResponseDTO = this.createInvestmentMetrics();
        this.cache.set(this.listingDetails.id, listingWithScenariosDTO);
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
