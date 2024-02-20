import { InvestmentScenarioDTO, Utility } from "@realestatemanager/shared";
import { AmortizationDetails } from "./amortizationdetails.model";
import { FinancialProjections } from "./financialprojections.model";
import { MortgageDetails } from "./mortgagedetails.model";
import { OperatingExpenses } from "./operatingexpenses.model";
import { IDTOConvertible } from "./idtoconvertible.model";

export class InvestmentScenario implements IDTOConvertible<InvestmentScenarioDTO>{
    private mortgageDetails: MortgageDetails;
    private financialProjections: FinancialProjections;
    private operatingExpenses: OperatingExpenses;
    private rentEstimate: number;
    private purchasePrice: number;

    constructor(
        financialProjections: FinancialProjections,
        mortgageDetails: MortgageDetails,
        operatingExpenses: OperatingExpenses,
        rentEstimate: number) {

        this.financialProjections = financialProjections;
        this.mortgageDetails = mortgageDetails;
        this.operatingExpenses = operatingExpenses;
        this.rentEstimate = rentEstimate;
    }

    toDTO(): InvestmentScenarioDTO {
        return {
            mortgageDetails: this.mortgageDetails.toDTO(),
            financialProjections: this.financialProjections.toDTO(),
            operatingExpenses: this.operatingExpenses.toDTO(),
            rentEstimate: this.rentEstimate,
            purchasePrice: this.purchasePrice
        };
    }

    calculateAmortizationSchedule(): AmortizationDetails[] {
        const principal = this.purchasePrice;
        const loanAmount = this.mortgageDetails.getLoanAmount();
        const downPaymentAmount = this.calculateDownPaymentAmount();
        const monthlyInterestRate = this.mortgageDetails.getMonthlyInterestRate() / 100;
        const totalPayments = this.mortgageDetails.getNumberOfPayments();
        const monthlyPayment = this.mortgageDetails.calculateMortgagePayment();
        let schedule: AmortizationDetails[] = [];
        let remainingBalance = loanAmount;
        let cumulativePrincipalPaid = 0;
        let propertyValue = principal;

        // Calculate the equivalent monthly appreciation rate for a 4% annual rate
        const annualAppreciationRate = this.financialProjections.getAnnualAppreciationRate() / 100; //projections.annualAppreciationRate / 100;
        const monthlyAppreciationRate = Math.pow(1 + annualAppreciationRate, 1 / 12) - 1;

        for (let month = 1; month <= totalPayments; month++) {
            const interestPayment = remainingBalance * monthlyInterestRate;
            const principalPayment = monthlyPayment - interestPayment;
            remainingBalance -= principalPayment;
            cumulativePrincipalPaid += principalPayment;

            // Apply monthly appreciation compounded
            propertyValue *= (1 + monthlyAppreciationRate);

            const equityWithAppreciation = downPaymentAmount + cumulativePrincipalPaid + (propertyValue - principal);
            const appreciationValue = propertyValue - principal; // Total appreciation from the original value

            const monthMod12 = ((month - 1) % 12) + 1;
            const year = Math.floor((month - 1) / 12) + 1;
            const monthlyPaymentRounded = Utility.round(monthlyPayment);
            const interestPaymentRounded = Utility.round(interestPayment);
            const principalPaymentRounded = Utility.round(principalPayment);
            const remainingBalanceRounded = Utility.round(remainingBalance);
            const equityWithDownPaymentRounded = Utility.round(cumulativePrincipalPaid + downPaymentAmount);
            const equityWithoutDownPaymentRounded = Utility.round(cumulativePrincipalPaid);
            const equityWithAppreciationRounded = Utility.round(equityWithAppreciation);
            const appreciationValueRounded = Utility.round(appreciationValue);

            const amortizationDetails: AmortizationDetails = new AmortizationDetails(
                monthMod12,
                year,
                monthlyPaymentRounded,
                interestPaymentRounded,
                principalPaymentRounded,
                remainingBalanceRounded,
                equityWithDownPaymentRounded,
                equityWithoutDownPaymentRounded,
                equityWithAppreciationRounded,
                appreciationValueRounded);

            schedule.push(amortizationDetails);
        }

        return schedule;
    }

    calculateROI(): number {
        const downPaymentAmount = this.calculateDownPaymentAmount();
        // Ensure downPaymentAmount is non-zero to avoid division by zero
        if (downPaymentAmount === 0) {
            throw new Error("Down payment cannot be zero for rate of return calculations.");
        }
        const yearlyReturn = this.calculateYearlyCashFlow();
        const initialExpeses = this.calculateInitialCosts();

        return Utility.round((yearlyReturn / initialExpeses) * 100);
    }

    calculateYearlyCashFlow(): number {
        return this.calculateMonthlyCashFlow() * 12;
    }

    calculateMonthlyCashFlow(): number {
        const recurringExpenses = this.operatingExpenses.calculateRecurringExpenses();
        return this.rentEstimate - (this.mortgageDetails.calculateMortgagePayment() + recurringExpenses);
    }

    calculateCapRate(): number {
        const annualNetOperatingIncome = (this.calculateMonthlyCashFlow() + this.mortgageDetails.calculateMortgagePayment()) * 12;
        return (annualNetOperatingIncome / this.purchasePrice) * 100;
    }

    calculateInitialCosts(): number {
        const downPaymentAmount = this.calculateDownPaymentAmount();
        const initialExpeses = this.operatingExpenses.calculateOneTimeExpenses();
        return downPaymentAmount + initialExpeses;
    }

    calculateDownPaymentAmount(): number {
        return this.purchasePrice * (this.mortgageDetails.getDownPaymentPercentage() / 100);
    }

}
