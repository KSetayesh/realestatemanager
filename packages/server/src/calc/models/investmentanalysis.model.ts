import { InvestmentAnalysisDTO } from "@realestatemanager/shared";
import { AmortizationDetails } from "./amortizationdetails.model";
import { FinancialProjections } from "./financialprojections.model";
import { MortgageDetails } from "./mortgagedetails.model";
import { OperatingExpenses } from "./operatingexpenses.model";
import { IDTOConvertible } from "./idtoconvertible.model";

export class InvestmentAnalysis implements IDTOConvertible<InvestmentAnalysisDTO>{
    private amortizationDetails: AmortizationDetails;
    private financialProjections: FinancialProjections;
    private mortgageDetails: MortgageDetails;
    private operatingExpenses: OperatingExpenses;
    private rentEstimate: number;

    constructor(amortizationDetails: AmortizationDetails,
        financialProjections: FinancialProjections,
        mortgageDetails: MortgageDetails,
        operatingExpenses: OperatingExpenses,
        rentEstimate: number) {

        this.amortizationDetails = amortizationDetails;
        this.financialProjections = financialProjections;
        this.mortgageDetails = mortgageDetails;
        this.operatingExpenses = operatingExpenses;
        this.rentEstimate = rentEstimate;
    }

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
