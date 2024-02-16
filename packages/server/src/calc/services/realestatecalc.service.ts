// import { Utility } from './utility';

import { AdditionalExpensesDTO, AmortizationScheduleDTO, MortgageDTO, ProjectionsDTO, Utility } from "@realestatemanager/shared";

// export type AmortizationSchedule = {
//     month: number;
//     year: number;
//     monthlyPayment: number;
//     interestPayment: number;
//     principalPayment: number;
//     remainingBalance: number;
//     equityWithDownPayment: number;
//     equityWithoutDownPayment: number;
//     equityWithAppreciation: number,
//     appreciationValue: number,
// };

// export interface PropertyInformation {
//     zillowURL: string;
// };

// export interface Projections {
//     annualAppreciationRate: number;
//     taxIncreaseRate: number;
//     rentIncreaseRate: number;
// };

// export interface Mortgage {
//     principal: number;
//     downPaymentPercentage: number;
//     closingCostsRate: number;
//     pmiRate: number;
//     annualInterestRate: number;
//     monthlyPropertyTaxAmount: number;
//     monthlyHomeInsuranceAmount: number;
//     monthlyHOAFeesAmount: number;
//     years: number;
// };

// export interface AdditionalExpenses {
//     propertyManagementRate: number;
//     vacancyRate: number;
//     maintenanceRate: number;
//     otherExpensesRate: number;
// };

// export interface RealEstateInvestment {
//     propertyInformation: PropertyInformation;
//     mortgage: Mortgage;
//     additionalExpenses: AdditionalExpenses;
//     rentEstimate: number;
//     projections?: Projections;
// };

// export interface RealEstateInvestmentsData {
//     realEstateInvestments: { realEstateInvestment: RealEstateInvestment }[];
// };


export class RealEstateCalculator {

    constructor() { }

    calculateAmortizationSchedule(mortgage: MortgageDTO, projections: ProjectionsDTO): AmortizationScheduleDTO[] {
        const principal = mortgage.principal;
        const loanAmount = this.calculateLoanAmount(principal, mortgage.downPaymentPercentage);
        const downPaymentAmount = this.calculateDownPaymentAmount(principal, mortgage.downPaymentPercentage);
        const interestRate = mortgage.annualInterestRate;
        const years = mortgage.termInYears;
        const monthlyInterestRate = interestRate / 12 / 100;
        const totalPayments = years * 12;
        const monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
        let schedule: AmortizationScheduleDTO[] = [];
        let remainingBalance = loanAmount;
        let cumulativePrincipalPaid = 0;
        let propertyValue = principal;

        // Calculate the equivalent monthly appreciation rate for a 4% annual rate
        const annualAppreciationRate = projections.annualAppreciationRate / 100;
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

            schedule.push({
                month: ((month - 1) % 12) + 1,
                year: Math.floor((month - 1) / 12) + 1,
                monthlyPayment: Utility.round(monthlyPayment),
                interestPayment: Utility.round(interestPayment),
                principalPayment: Utility.round(principalPayment),
                remainingBalance: Utility.round(remainingBalance),
                equityWithDownPayment: Utility.round(cumulativePrincipalPaid + downPaymentAmount),
                equityWithoutDownPayment: Utility.round(cumulativePrincipalPaid),
                equityWithAppreciation: Utility.round(equityWithAppreciation),
                appreciationValue: Utility.round(appreciationValue),
            });
        }

        return schedule;
    }

    // findPrincipalForDesiredReturn(desiredReturn: number, investment: RealEstateInvestment, increment: number = 500, tolerance: number = 0.01): number {
    //     let lowPrincipal = 0;
    //     let highPrincipal = investment.mortgage.principal * 2; // Assuming an upper bound to start the search
    //     let midPrincipal = investment.mortgage.principal;

    //     while (lowPrincipal <= highPrincipal) {
    //         midPrincipal = lowPrincipal + (highPrincipal - lowPrincipal) / 2;
    //         investment.mortgage.principal = midPrincipal;

    //         const currentReturn = this.calculateAnnualRateOfReturn(investment);

    //         if (Math.abs(currentReturn - desiredReturn) <= tolerance) {
    //             break; // Found a principal close enough to desired return
    //         } else if (currentReturn < desiredReturn) {
    //             highPrincipal = midPrincipal - increment; // Adjust the search towards lower principal values
    //         } else {
    //             lowPrincipal = midPrincipal + increment; // Adjust the search towards higher principal values
    //         }
    //     }

    //     return Utility.round(midPrincipal); // Returns the closest found value if exact match isn't found within tolerance
    // }

    // calculateAnnualRateOfReturn(realEstateInvestment: RealEstateInvestment): number {
    //     const mortgage: MortgageDTO = realEstateInvestment.mortgage;
    //     const yearlyReturn = this.calculateYearlyReturn(realEstateInvestment);
    //     const downPaymentAmount = this.calculateDownPaymentAmount(mortgage.principal, mortgage.downPaymentPercentage);
    //     const closingCosts = this.calculateClosingCostAmount(mortgage.principal, mortgage.closingCostsRate);
    //     const outOfPocketAmount = downPaymentAmount + closingCosts;
    //     // Ensure downPaymentAmount is non-zero to avoid division by zero
    //     if (downPaymentAmount === 0) {
    //         throw new Error("Down payment cannot be zero for rate of return calculations.");
    //     }
    //     return Utility.round((yearlyReturn / outOfPocketAmount) * 100);
    // }

    calculateYearlyReturn(realEstateInvestment: RealEstateInvestment): number {
        return this.calculateMonthlyReturn(realEstateInvestment) * 12;
    }

    calculateMonthlyReturn(realEstateInvestment: RealEstateInvestment): number {
        const mortgage: MortgageDTO = realEstateInvestment.mortgage;
        const additionalExpenses: AdditionalExpensesDTO = realEstateInvestment.additionalExpenses;
        const rentAmount = realEstateInvestment.rentEstimate;
        return rentAmount - (this.calculateMortgage(mortgage) + this.calculateAdditionalExpenses(rentAmount, additionalExpenses));
    }

    calculateMortgage(mortgage: MortgageDTO): number {
        const monthlyInterestRate = mortgage.annualInterestRate / 100 / 12;
        const numberOfPayments = mortgage.years * 12;
        const loanAmount = this.calculateLoanAmount(mortgage.principal, mortgage.downPaymentPercentage);
        let monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

        // Add PMI calculation if down payment is less than 20%
        if (mortgage.downPaymentPercentage < 20) {
            // Assume PMI rate of 0.75% of the loan amount annually as an example
            const annualPMI = loanAmount * (mortgage.pmiRate / 100); //  0.0075;
            const monthlyPMI = annualPMI / 12;
            monthlyPayment += monthlyPMI;
        }

        monthlyPayment += (mortgage.monthlyPropertyTaxAmount +
            mortgage.monthlyHomeInsuranceAmount +
            mortgage.monthlyHOAFeesAmount);

        return monthlyPayment;
    }

    calculateDownPaymentAmount(principal: number, downPaymentPercentage: number): number {
        return principal * (downPaymentPercentage / 100);
    }

    private calculateAdditionalExpenses(rent: number, additionalExpenses: AdditionalExpensesDTO): number {
        const propertyManagement = rent * (additionalExpenses.propertyManagementRate / 100);
        const vacancy = rent * (additionalExpenses.vacancyRate / 100);
        const maintenance = rent * (additionalExpenses.maintenanceRate / 100);
        const otherExpenses = rent * (additionalExpenses.otherExpensesRate / 100);
        const totalAmount = propertyManagement +
            vacancy +
            maintenance +
            otherExpenses;

        return Utility.round(totalAmount);
    }

    private calculateLoanAmount(principal: number, downPaymentPercentage: number): number {
        return principal * (1 - (downPaymentPercentage / 100));
    }

    private calculateClosingCostAmount(principal: number, closingCostsRate: number): number {
        return principal * (closingCostsRate / 100);
    }


}


