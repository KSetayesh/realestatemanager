import { AmortizationBreakdownResponseDTO, CreateInvestmentScenarioRequest, ListingWithScenariosResponseDTO, Utility } from "@realestatemanager/shared";
import { ListingDetails } from "../listing_models/listingdetails.model";
import { InvestmentCalculator } from "./investment.calculator";
import { InvestmentMetricBuilder } from "src/realestatecalc/builders/investment.metric.builder";

export class InvestmentCalculationManager {

    private cache: Map<number, ListingWithScenariosResponseDTO>;
    private listingDetails: ListingDetails;
    private investmentScenarioRequest?: CreateInvestmentScenarioRequest;

    constructor(
        cache: Map<number, ListingWithScenariosResponseDTO>,
        listingDetails: ListingDetails,
        investmentScenarioRequest?: CreateInvestmentScenarioRequest) {

        this.cache = cache; // new Map<number, ListingWithScenariosResponseDTO>();
        this.listingDetails = listingDetails;
        this.investmentScenarioRequest = investmentScenarioRequest;
    }

    getListingDetailsCalculations(): ListingWithScenariosResponseDTO {
        if (!this.investmentScenarioRequest || this.investmentScenarioRequest.useDefaultRequest) {
            const listingId: number = this.listingDetails.id;
            const cachedListing = this.cache.get(listingId);

            if (cachedListing && Utility.deepEqual(this.listingDetails.toDTO(), cachedListing.listingDetails)) {
                return cachedListing;
            }
        }

        const investmentMetricsBuilder = new InvestmentMetricBuilder(this.listingDetails, this.investmentScenarioRequest);
        const investmentCalc: InvestmentCalculator = investmentMetricsBuilder.build();
        const metrics: AmortizationBreakdownResponseDTO = investmentCalc.createInvestmentMetrics();

        const listingWithScenariosDTO: ListingWithScenariosResponseDTO = {
            listingDetails: this.listingDetails.toDTO(),
            metrics: metrics,
        };

        this.cache.set(this.listingDetails.id, listingWithScenariosDTO);

        return listingWithScenariosDTO;
    }
}
