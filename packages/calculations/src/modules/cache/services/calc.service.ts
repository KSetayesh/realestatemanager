import { Injectable } from "@nestjs/common";
import {
    AmortizationBreakdownResponseDTO,
    CreateInvestmentScenarioRequest,
    CreateListingDetailsCalculationsRequest,
    ListingDetailsResponseDTO,
    ListingWithScenariosResponseDTO
} from "@realestatemanager/types";
import { InvestmentMetricBuilder } from "src/calculations/builder/investment.metric.builder";
import { InvestmentCalculator } from "src/calculations/investment.calculator";

@Injectable()
export class CalcService {

    async calculateInBulk(
        createListingDetailsCalculationsListRequest: CreateListingDetailsCalculationsRequest[]
    ): Promise<ListingWithScenariosResponseDTO[]> {
        const listingWithScenariosList: ListingWithScenariosResponseDTO[] = [];
        for (const listingDetailsCalcReq of createListingDetailsCalculationsListRequest) {
            listingWithScenariosList.push(await this.calculate(listingDetailsCalcReq));
        }
        return listingWithScenariosList;
    }

    async calculate(
        createListingDetailsCalculationsRequest: CreateListingDetailsCalculationsRequest
    ): Promise<ListingWithScenariosResponseDTO> {
        const listingDetails: ListingDetailsResponseDTO = createListingDetailsCalculationsRequest.listingDetails;
        const investmentScenarioRequest: CreateInvestmentScenarioRequest = createListingDetailsCalculationsRequest.investmentScenarioRequest;
        const investmentMetricsBuilder = new InvestmentMetricBuilder(listingDetails, investmentScenarioRequest);
        const investmentCalc: InvestmentCalculator = investmentMetricsBuilder.build();
        const metrics: AmortizationBreakdownResponseDTO = investmentCalc.createInvestmentMetrics();
        return {
            listingDetails: listingDetails,
            metrics: metrics,
        };
    }

}