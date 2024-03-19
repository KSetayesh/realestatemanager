import { GrowthProjections } from "./growth.projections.model";
import {
    AmortizationDetailsDTO,
    InvestmentMetricsResponseDTO,
    Utility
} from "@realestatemanager/shared";
import { InitialCostsBreakdown } from "./initialcosts.model";
import { MortgageCalculator } from "./mortgage.calc.model";
import { TaxImplications } from "./tax.implications.model";

export class InvestmentScenario {
    private growthProjections: GrowthProjections;
    private initialCostsBreakdown: InitialCostsBreakdown;
    private mortgageCalculator: MortgageCalculator;
    private taxImplications?: TaxImplications;

    constructor(
        growthProjections: GrowthProjections,
        initialCostsBreakdown: InitialCostsBreakdown,
        mortgageCalculator: MortgageCalculator,
        taxImplications?: TaxImplications,
    ) {
        this.growthProjections = growthProjections;
        this.initialCostsBreakdown = initialCostsBreakdown;
        this.mortgageCalculator = mortgageCalculator;
        this.taxImplications = taxImplications;
    }

    createInvestmentMetrics(): InvestmentMetricsResponseDTO {

        const ROI: number = this.calculateROI();
        const capRate: number = this.calculateCapRate();
        const initialMortgagePayment: number = this.getMortgageAmount();
        const initialMonthlyAmount: number = this.getMortgageAmountWithFixedMonthlyExpenses();
        const recurringCosts: number = this.getRecurringExpenses();
        const monthlyCashFlow: number = this.calculateMonthlyCashFlow();
        const yearlyCashFlow: number = this.calculateYearlyCashFlow();
        const ammortizationDetails: AmortizationDetailsDTO[] = this.calculateAmortizationSchedule();

        return {
            mortgageDetails: this.mortgageCalculator.toDTO(),
            growthProjections: this.growthProjections.toDTO(),
            initialCosts: this.initialCostsBreakdown.toDTO(),
            taxImplications: this.taxImplications.toDTO(),
            investmentProjections: {
                ROI: Utility.round(ROI),
                capRate: Utility.round(capRate),
                recurringCosts: Utility.round(recurringCosts),
                monthlyPayment: Utility.round(initialMonthlyAmount),
                mortgageAmount: Utility.round(initialMortgagePayment),
                monthlyCashFlow: Utility.round(monthlyCashFlow),
                yearlyCashFlow: Utility.round(yearlyCashFlow),
                ammortizationDetails: ammortizationDetails,
            },
        };

    }

    private getPurchasePrice(): number {
        return this.mortgageCalculator.getPurchasePrice();
    }

    private getLoanAmount(): number {
        return this.mortgageCalculator.getLoanAmount();
    }

    private getDownPaymentAmount(): number {
        return this.mortgageCalculator.getDownPaymentAmount();
    }

    private getRentalAmount(): number {
        return this.mortgageCalculator.getRentalIncome();
    }

    private getMonthlyInterestRate(): number {
        return this.mortgageCalculator.getMonthlyInterestRate();
    }

    private getNumberOfPayments(): number {
        return this.mortgageCalculator.getNumberOfPayments();
    }

    private getRecurringExpenses(): number {
        return this.mortgageCalculator.getRecurringExpenses();
    }

    private getFixedExpenses(): number {
        return this.mortgageCalculator.getFixedExpenses();
    }

    private getFutureDatedRecurringExpenses(numberOfYearsFromNow: number): number {
        return this.mortgageCalculator.getFutureDatedRecurringExpenses(this.getAnnualRentIncreaseRate(), numberOfYearsFromNow);
    }

    private getFutureDatedFixedExpenses(numberOfYearsFromNow: number): number {
        const annualPropertyTaxIncreaseRate = this.getAnnualTaxIncreaseRate();
        const annualHomeInsuranceIncreaseRate = 0;
        const annualHOAFeesIncreaseRate = 0;
        return this.mortgageCalculator.getFutureDatedFixedExpenses(annualPropertyTaxIncreaseRate,
            annualHomeInsuranceIncreaseRate,
            annualHOAFeesIncreaseRate,
            numberOfYearsFromNow);
    }

    private getTotalInitialCosts(): number {
        return this.initialCostsBreakdown.getTotalInitialCosts();
    }

    private getMortgageAmount(): number {
        return this.mortgageCalculator.calculateMortgagePayment();
    }

    private getMortgageAmountWithFixedMonthlyExpenses(): number {
        return this.mortgageCalculator.getMortgageAmountWithFixedMonthlyExpenses();
    }

    private getFutureDatedMortgageAmountWithFixedMonthlyExpenses(
        numberOfYearsFromNow: number
    ): number {

        const annualPropertyTaxIncreaseRate = this.getAnnualTaxIncreaseRate();
        const annualHomeInsuranceIncreaseRate = 0;
        const annualHOAFeesIncreaseRate = 0;

        return this.mortgageCalculator.getFutureDatedMortgageAmountWithFixedMonthlyExpenses(
            annualPropertyTaxIncreaseRate,
            annualHomeInsuranceIncreaseRate,
            annualHOAFeesIncreaseRate,
            numberOfYearsFromNow);
    }

    private calculateROI(): number {
        const downPaymentAmount = this.getDownPaymentAmount();
        // Ensure downPaymentAmount is non-zero to avoid division by zero
        if (downPaymentAmount === 0) {
            throw new Error("Down payment cannot be zero for rate of return calculations.");
        }
        const yearlyReturn = this.calculateYearlyCashFlow();
        const initialExpeses = this.getTotalInitialCosts();

        return (yearlyReturn / initialExpeses) * 100;
    }

    private calculateYearlyCashFlow(): number {
        return this.calculateMonthlyCashFlow() * 12;
    }

    private calculateMonthlyCashFlow(rent: number = this.getRentalAmount()): number {
        const recurringExpenses = this.getRecurringExpenses();
        return rent - (this.getMortgageAmountWithFixedMonthlyExpenses() + recurringExpenses);
    }

    private calculateFutureDatedMonthlyCashFlow(numberOfYearsFromNow: number): number {
        const futureDatedRecurringExpenses = this.getFutureDatedRecurringExpenses(numberOfYearsFromNow);
        const futureDatedRentAmount = this.getFutureDatedRentalIncome(numberOfYearsFromNow);
        const futureDatedMortgageAmountWithFixedMonthlyExpenses = this.getFutureDatedMortgageAmountWithFixedMonthlyExpenses(numberOfYearsFromNow);
        return futureDatedRentAmount - (futureDatedMortgageAmountWithFixedMonthlyExpenses + futureDatedRecurringExpenses);
    }

    private calculateCapRate(): number {
        const annualNetOperatingIncome = (this.calculateMonthlyCashFlow() + this.getMortgageAmount()) * 12;
        return (annualNetOperatingIncome / this.getPurchasePrice()) * 100;
    }

    private getAnnualAppreciationRate(): number {
        return this.growthProjections.getAnnualAppreciationRate();
    }

    private getAnnualRentIncreaseRate(): number {
        return this.growthProjections.getAnnualRentIncreaseRate();
    }

    private getAnnualTaxIncreaseRate(): number {
        return this.growthProjections.getAnnualTaxIncreaseRate();
    }

    private getFutureDatedRentalIncome(numberOfYearsFromNow: number): number {
        return this.mortgageCalculator.getFutureDatedRentalIncome(this.getAnnualRentIncreaseRate(), numberOfYearsFromNow);
    }

    private calculateAmortizationSchedule(): AmortizationDetailsDTO[] {

        const principal = this.getPurchasePrice();
        const loanAmount = this.getLoanAmount();
        const downPaymentAmount = this.getDownPaymentAmount();
        const monthlyInterestRate = this.getMonthlyInterestRate() / 100;
        const totalPayments = this.getNumberOfPayments();
        const mortgagePayment = this.getMortgageAmount();
        let monthlyPayment = this.getMortgageAmountWithFixedMonthlyExpenses();
        let schedule: AmortizationDetailsDTO[] = [];
        let remainingBalance = loanAmount;
        let cumulativePrincipalPaid = 0;
        let totalInterestPaid = 0;
        let propertyValue = principal;
        let rentalAmount = this.getRentalAmount();
        let recurringExpenses = this.getRecurringExpenses();
        let fixedCosts = this.getFixedExpenses();
        let monthlyCashFlow = this.calculateMonthlyCashFlow();
        let accumulatedCashFlow = 0;

        const getMonthlyPaymentAndRecurringCosts = (numberOfYearsFromNow?: number): number => {
            if (!numberOfYearsFromNow) {
                return this.getMortgageAmountWithFixedMonthlyExpenses() + this.getRecurringExpenses();
            }
            return this.getFutureDatedMortgageAmountWithFixedMonthlyExpenses(numberOfYearsFromNow) +
                this.getFutureDatedRecurringExpenses(numberOfYearsFromNow);
        };

        let monthlyPaymentAndRecurringCosts = getMonthlyPaymentAndRecurringCosts();

        const getMonthlyAppreciationRate = (): number => {
            // Calculate the equivalent monthly appreciation rate for a 4% annual rate
            const annualAppreciationRate = this.getAnnualAppreciationRate() / 100;
            return Math.pow(1 + annualAppreciationRate, 1 / 12) - 1;
        };

        const monthlyAppreciationRate = getMonthlyAppreciationRate();

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
                propertyValue *= (1 + monthlyAppreciationRate);
                if (monthMod12 - 1 === 0) {
                    rentalAmount = this.getFutureDatedRentalIncome(yearCounter - 1);
                    fixedCosts = this.getFutureDatedFixedExpenses(yearCounter - 1);
                    recurringExpenses = this.getFutureDatedRecurringExpenses(yearCounter - 1);
                    monthlyPaymentAndRecurringCosts = getMonthlyPaymentAndRecurringCosts(yearCounter - 1);
                    monthlyPayment = this.getFutureDatedMortgageAmountWithFixedMonthlyExpenses(yearCounter - 1);
                    monthlyCashFlow = this.calculateFutureDatedMonthlyCashFlow(yearCounter - 1);
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
            const fixedCostsRounded = Utility.round(fixedCosts);
            const monthlyPaymentAndRecurringCostsRounded = Utility.round(monthlyPaymentAndRecurringCosts);
            const monthlyCashFlowRounded = Utility.round(monthlyCashFlow);
            const accumulatedCashFlowRounded = Utility.round(accumulatedCashFlow);

            const amortizationDetailsDTO: AmortizationDetailsDTO = {
                month: monthMod12,
                date: dateAsString,
                year: yearCounter,
                recurringCosts: recurringExpensesRounded,
                fixedCosts: fixedCostsRounded,
                monthlyPayment: monthlyPaymentRounded,
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

}