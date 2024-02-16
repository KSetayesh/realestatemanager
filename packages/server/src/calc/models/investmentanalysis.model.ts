import { InvestmentAnalysisDTO } from "@realestatemanager/shared";
import { AmortizationDetails } from "./amortizationdetails.model";
import { FinancialProjections } from "./financialprojections.model";
import { MortgageDetails } from "./mortgagedetails.model";
import { OperatingExpenses } from "./operatingexpenses.model";

export class InvestmentAnalysis {
    amortizationDetails: AmortizationDetails;
    financialProjections: FinancialProjections;
    mortgageDetails: MortgageDetails;
    operatingExpenses: OperatingExpenses;
    rentEstimate: number;

    constructor() { }

    toDTO(): InvestmentAnalysisDTO {
        return {
            amortizationDetails: this.amortizationDetails.toDTO(),
            financialProjections: this.financialProjections.toDTO(),
            mortgageDetails: this.mortgageDetails.toDTO(),
            operatingExpenses: this.operatingExpenses.toDTO(),
            rentEstimate: this.rentEstimate,
        };
    }
}
