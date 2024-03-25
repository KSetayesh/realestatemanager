import { AmortizationDetailsDTO, Utility } from "@realestatemanager/shared";
import { PMIDetails } from "../pmidetails.model";
import { FinancialTransactionBreakdown } from "./financial.transaction.breakdown";
import { FinancingTerms } from "./financing.terms";


export class InvestmentCalculator {
    private financialTransactionBreakdown: FinancialTransactionBreakdown;
    private financingTerms: FinancingTerms;
    private pmiDetails?: PMIDetails;

    constructor(
        financialTransactionBreakdown: FinancialTransactionBreakdown,
        financingTerms: FinancingTerms,
        pmiDetails?: PMIDetails) {

        this.financialTransactionBreakdown = financialTransactionBreakdown;
        this.financingTerms = financingTerms;
        this.pmiDetails = pmiDetails;
    }

    createInvestmentMetrics(): any {

        const ROI: number = this.calculateROI();
        const capRate: number = this.calculateInitialCapRate();
        const initialMortgagePayment: number = this.calculateMortgagePayment(true);
        const mortgageRelatedCosts: number = this.getTotalMortgageRelatedExpenses();
        const initialMonthlyAmount: number = initialMortgagePayment + mortgageRelatedCosts;
        const recurringCosts: number = this.getTotalRecurringExpenses();
        const monthlyCashFlow: number = this.calculateMonthlyCashFlow();
        const yearlyCashFlow: number = this.calculateYearlyCashFlow();
        const ammortizationDetails: AmortizationDetailsDTO[] = this.calculateAmortizationSchedule();

    }

    private calculateAmortizationSchedule() {// AmortizationDetailsDTO[] {

        const schedule: AmortizationDetailsDTO[] = [];
        const principal: number = this.getPurchasePrice();
        const loanAmount: number = this.getLoanAmount();
        const downPaymentAmount: number = this.getDownPaymentAmount();
        const monthlyInterestRate: number = this.getMonthlyInterestRate() / 100;
        const totalPayments: number = this.getNumberOfPayments();
        const mortgagePayment: number = this.calculateMortgagePayment(true);
        let remainingBalance: number = loanAmount;
        let cumulativePrincipalPaid: number = 0;
        let totalInterestPaid: number = 0;
        let propertyValue: number = principal;
        let rentalAmount: number = this.getRentalAmount();
        let monthlyCashFlow: number = this.calculateMonthlyCashFlow();
        let accumulatedCashFlow: number = 0;
        let mortgageRelatedCosts: number = this.getTotalMortgageRelatedExpenses();
        let recurringExpenses: number = this.getTotalRecurringExpenses();
        let monthlyPayment: number = mortgagePayment + mortgageRelatedCosts
        let monthlyPaymentAndRecurringCosts: number = monthlyPayment + recurringExpenses;


        // let monthlyPaymentAndRecurringCosts = getMonthlyPaymentAndRecurringCosts();

        // const getMonthlyAppreciationRate = (): number => {
        //     // Calculate the equivalent monthly appreciation rate for a 4% annual rate
        //     const annualAppreciationRate = this.getAnnualAppreciationRate() / 100;
        //     return Math.pow(1 + annualAppreciationRate, 1 / 12) - 1;
        // };

        // const monthlyAppreciationRate = getMonthlyAppreciationRate();

        const today = new Date();

        // Get the first day of the next month
        const year = today.getMonth() === 11 ? today.getFullYear() + 1 : today.getFullYear();
        const nextMonth = (today.getMonth() + 1) % 12;

        for (let monthCounter = 1; monthCounter <= totalPayments; monthCounter++) {
            const month = (nextMonth + (monthCounter - 1)) % 12;
            const yearOffset = Math.floor((nextMonth + (monthCounter - 1)) / 12);
            const date: Date = new Date(year + yearOffset, month, 1);
            const dateAsString = date.toLocaleDateString('en-US'); // date.toISOString().split('T')[0];

            const interestPayment = remainingBalance * monthlyInterestRate;
            const principalPayment = mortgagePayment - interestPayment;
            remainingBalance -= principalPayment;
            cumulativePrincipalPaid += principalPayment;
            totalInterestPaid += interestPayment;

            const monthMod12 = ((monthCounter - 1) % 12) + 1;
            const yearCounter = Math.floor((monthCounter - 1) / 12) + 1;

            // Apply monthly appreciation compounded
            if (monthCounter > 1) {
                // propertyValue *= (1 + monthlyAppreciationRate);
                // Come back to this calculation
                propertyValue = this.getFutureDatedHomeValue(monthCounter);
                if (monthMod12 - 1 === 0) {
                    rentalAmount = this.getRentalAmount(yearCounter - 1);
                    mortgageRelatedCosts = this.getTotalMortgageRelatedExpenses(yearCounter - 1);
                    recurringExpenses = this.getTotalRecurringExpenses(yearCounter - 1);
                    monthlyPayment = mortgagePayment + mortgageRelatedCosts;
                    monthlyPaymentAndRecurringCosts = monthlyPayment + recurringExpenses;
                    // monthlyPaymentAndRecurringCosts =  //getMonthlyPaymentAndRecurringCosts(yearCounter - 1);
                    // monthlyPayment = this.getMortgageAmountWithFixedMonthlyExpenses(yearCounter - 1);
                    monthlyCashFlow = this.calculateMonthlyCashFlow(yearCounter - 1);
                }
            }

            accumulatedCashFlow += monthlyCashFlow;

            const equityWithAppreciation = downPaymentAmount + cumulativePrincipalPaid + (propertyValue - principal);
            const appreciationValue = propertyValue - principal; // Total appreciation from the original value
            const rentEstimate = Utility.round(rentalAmount);
            const mortgagePaymentRounded = Utility.round(mortgagePayment);
            const monthlyPaymentRounded = Utility.round(monthlyPayment);
            const interestPaymentRounded = Utility.round(interestPayment);
            const interestPercentageRounded = Utility.round((interestPaymentRounded / mortgagePaymentRounded) * 100);
            const totalInterestPaidRounded = Utility.round(totalInterestPaid);
            const principalPaymentRounded = Utility.round(principalPayment);
            const principalPercentageRounded = Utility.round((principalPaymentRounded / mortgagePaymentRounded) * 100);
            const remainingBalanceRounded = Utility.round(remainingBalance);
            const equityWithDownPaymentRounded = Utility.round(cumulativePrincipalPaid + downPaymentAmount);
            const equityWithoutDownPaymentRounded = Utility.round(cumulativePrincipalPaid);
            const equityWithAppreciationRounded = Utility.round(equityWithAppreciation);
            const appreciationValueRounded = Utility.round(appreciationValue);
            const recurringExpensesRounded = Utility.round(recurringExpenses);
            const mortgageRelatedCostsRounded = Utility.round(mortgageRelatedCosts);
            const monthlyPaymentAndRecurringCostsRounded = Utility.round(monthlyPaymentAndRecurringCosts);
            const monthlyCashFlowRounded = Utility.round(monthlyCashFlow);
            const accumulatedCashFlowRounded = Utility.round(accumulatedCashFlow);

            const amortizationDetailsDTO = { // AmortizationDetailsDTO = {
                month: monthMod12,
                date: dateAsString,
                year: yearCounter,
                recurringCosts: recurringExpensesRounded,
                fixedCosts: mortgageRelatedCosts,
                monthlyPayment: mortgageRelatedCostsRounded,
                monthlyPaymentAndRecurringCosts: monthlyPaymentAndRecurringCostsRounded,
                rentEstimate: rentEstimate,
                monthlyCashFlow: monthlyCashFlowRounded,
                accumulatedCashFlow: accumulatedCashFlowRounded,
                mortgageAmount: mortgagePaymentRounded,
                amountPaidInInterest: {
                    //   description: 'The portion of the monthly payment that is allocated towards paying off interest.',
                    amount: interestPaymentRounded,
                    percentage: interestPercentageRounded,
                },
                amountPaidInPrincipal: {
                    //    description: 'The portion of the monthly payment that goes towards reducing the principal balance.',
                    amount: principalPaymentRounded,
                    percentage: principalPercentageRounded,
                },
                totalInterestPaid: totalInterestPaidRounded,
                remainingBalance: remainingBalanceRounded,
                equityWithDownPayment: equityWithDownPaymentRounded,
                equityAmountWithoutDownPayment: equityWithoutDownPaymentRounded,
                equityAmountWithAppreciation: equityWithAppreciationRounded,
                appreciationAmount: appreciationValueRounded,
            };

            schedule.push(amortizationDetailsDTO);

        }

        return schedule;
    }

    private calculateMortgagePayment(calculateWithPMI: boolean = false): number {
        const monthlyInterestRate = this.getMonthlyInterestRate() / 100;
        const numberOfPayments = this.getNumberOfPayments();
        const loanAmount = this.getLoanAmount();
        let monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

        // Add PMI calculation if down payment is less than 20%
        if (calculateWithPMI) {
            monthlyPayment += this.getPMIAmount();
        }

        return monthlyPayment;
    }

    private getPMIAmount(): number {
        const isPMI = (): boolean => {
            return this.getDownPaymentPercentage() < 20;
        };

        if (isPMI()) {
            // Assume PMI rate of 0.75% of the loan amount annually as an example
            const annualPMI = this.getLoanAmount() * (this.getPmiRate() / 100); //  0.0075;
            const monthlyPMI = annualPMI / 12;
            return monthlyPMI;
        }
        return 0;
    }

    private calculateROI(numberOfYears: number = 0): number {
        const downPaymentAmount = this.getDownPaymentAmount();
        // Ensure downPaymentAmount is non-zero to avoid division by zero
        if (downPaymentAmount === 0) {
            throw new Error("Down payment cannot be zero for rate of return calculations.");
        }
        const yearlyReturn = this.calculateYearlyCashFlow(numberOfYears);
        const initialExpeses = this.getTotalInitialExpenses();

        return (yearlyReturn / initialExpeses) * 100;
    }

    private calculateYearlyCashFlow(numberOfYears: number = 0): number {
        return this.calculateMonthlyCashFlow(numberOfYears) * 12;
    }

    private calculateMonthlyCashFlow(numberOfYears: number = 0): number {
        const mortgageAmount = this.calculateMortgagePayment(true);
        const monthlyPayment = mortgageAmount + this.getTotalMortgageRelatedExpenses(numberOfYears);
        const futureDatedRecurringExpenses = this.getTotalRecurringExpenses(numberOfYears);
        const futureDatedRentAmount = this.getRentalAmount(numberOfYears);
        return futureDatedRentAmount - (monthlyPayment + futureDatedRecurringExpenses);
    }

    private calculateInitialCapRate(): number {
        const annualNetOperatingIncome = (this.calculateMonthlyCashFlow() + this.calculateMortgagePayment()) * 12;
        return (annualNetOperatingIncome / this.getPurchasePrice()) * 100;
    }

    private getPmiRate(): number {
        return this.pmiDetails.getPmiRate();
    }

    private getNumberOfPayments(): number {
        return this.financingTerms.getNumberOfPayments();
    }

    private getMonthlyInterestRate(): number {
        return this.financingTerms.getMonthlyInterestRate();
    }

    private getFutureDatedHomeValue(numberOfYears: number = 0): number {
        return this.financialTransactionBreakdown.getFutureDatedPrice(numberOfYears).amount;
    }

    private getTotalMortgageRelatedExpenses(numberOfYears: number = 0): number {
        return this.financialTransactionBreakdown.getTotalFixedRecurringExpenses(numberOfYears).amount;
    }

    private getTotalRecurringExpenses(numberOfYears: number = 0): number {
        return this.financialTransactionBreakdown.getTotalOperationalRecurringExpenses(numberOfYears).amount;
    }

    private getTotalInitialExpenses(): number {
        return this.financialTransactionBreakdown.getTotalInitialExpenses().amount;
    }

    private getPurchasePrice(): number {
        return this.financialTransactionBreakdown.getPurchasePrice().amount;
    }

    private getLoanAmount(): number {
        return this.financialTransactionBreakdown.getLoanAmount().amount;
    }

    private getDownPaymentAmount(): number {
        return this.financialTransactionBreakdown.getDownPaymentAmount().amount;
    }

    private getDownPaymentPercentage(): number {
        return this.financialTransactionBreakdown.getDownPaymentRate().rate;
    }

    private getRentalAmount(numberOfYears: number = 0): number {
        return this.financialTransactionBreakdown.getRentalIncomeAmount(numberOfYears).amount;
    }

}