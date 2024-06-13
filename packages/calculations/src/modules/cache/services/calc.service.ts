import { Injectable } from "@nestjs/common";
import {
    AmortizationBreakdownResponseDTO,
    CreateInvestmentScenarioRequest,
    ListingDetailsResponseDTO,
    ListingWithScenariosResponseDTO
} from "@realestatemanager/types";
import { InvestmentMetricBuilder } from "src/calculations/builder/investment.metric.builder";
import { InvestmentCalculator } from "src/calculations/investment.calculator";

@Injectable()
export class CalcService {

    async calculate(
        listingDetails: ListingDetailsResponseDTO,
        investmentScenarioRequest: CreateInvestmentScenarioRequest
    ): Promise<ListingWithScenariosResponseDTO> {

        const investmentMetricsBuilder = new InvestmentMetricBuilder(listingDetails, investmentScenarioRequest);
        const investmentCalc: InvestmentCalculator = investmentMetricsBuilder.build();
        const metrics: AmortizationBreakdownResponseDTO = investmentCalc.createInvestmentMetrics();
        return {
            listingDetails: listingDetails,
            metrics: metrics,
        };
    }

}