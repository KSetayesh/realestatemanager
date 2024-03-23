import { GrowthProjections } from "./growth.projections.model";
import {
    AmortizationDetailsDTO,
    InvestmentMetricsResponseDTO,
    Utility,
    ValueAmountInput,
    ValueRateInput,
    ValueType
} from "@realestatemanager/shared";
import { MortgageCalculator, MortgagePayment } from "./mortgage.calc.model";
import { FinancialTransaction } from "../new_breakdown_models.ts/financial.transaction.model";
import { TaxImplications } from "./tax.implications.model";
import { InitialCostsDetail, PurchaseDetail } from "../new_breakdown_models.ts/purchase.detail.model";
import { IncomeStreamsDetail } from "../new_breakdown_models.ts/income.streams.detail.model";
import { RecurringExpensesDetail } from "../new_breakdown_models.ts/recurring.expenses.detail.model";
import { FixedExpensesDetail } from "../new_breakdown_models.ts/fixed.expenses.detail.model";

export class InvestmentScenario {

    private growthProjections: GrowthProjections;
    private mortgageCalculator: MortgageCalculator;
    private initialCostsDetail: InitialCostsDetail;
    private purchaseDetail: PurchaseDetail;
    private incomeStreamsDetail: IncomeStreamsDetail;
    private recurringExpensesDetail: RecurringExpensesDetail;
    private fixedExpensesDetail: FixedExpensesDetail;
    private taxImplications?: TaxImplications;

    constructor(
        growthProjections: GrowthProjections,
        mortgageCalculator: MortgageCalculator,
        initialCostsDetail: InitialCostsDetail,
        purchaseDetail: PurchaseDetail,
        incomeStreamsDetail: IncomeStreamsDetail,
        recurringExpensesDetail: RecurringExpensesDetail,
        fixedExpensesDetail: FixedExpensesDetail,
        taxImplications?: TaxImplications,
    ) {
        this.growthProjections = growthProjections;
        this.mortgageCalculator = mortgageCalculator;
        this.initialCostsDetail = initialCostsDetail;
        this.purchaseDetail = purchaseDetail;
        this.incomeStreamsDetail = incomeStreamsDetail;
        this.recurringExpensesDetail = recurringExpensesDetail;
        this.fixedExpensesDetail = fixedExpensesDetail;
        this.taxImplications = taxImplications;
    }

    private getPurchasePrice(): ValueAmountInput {
        return {
            type: ValueType.AMOUNT,
            amount: this.mortgageCalculator.getPurchasePrice()
        };
    }

    private getLoanAmount(): ValueAmountInput {
        return {
            type: ValueType.AMOUNT,
            amount: this.getPurchasePrice().amount - this.getDownPaymentAmount().amount,
        };
    }

    private getRentalAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.financialTransaction.getRentalAmount(numberOfYears);
    }

    private getDownPaymentAmount(): ValueAmountInput {
        return this.financialTransaction.getDownPaymentAmount();
    }

    private getMortgageAmount(
        totalPrincipalPaid: number,
        appreciatedPropertyValue?: ValueAmountInput): MortgagePayment {
        return this.mortgageCalculator.calculateMortgagePayment(
            {
                type: ValueType.AMOUNT,
                amount: totalPrincipalPaid
            },
            this.getDownPaymentAmount(),
            appreciatedPropertyValue,
        );
    }

    private getMortgageAmountWithFixedMonthlyExpenses(numberOfYears: number = 0): number {
        return this.getMortgageAmount() + this.getFixedExpenses(numberOfYears);
    }

    private getRecurringExpenses(numberOfYears: number = 0): ValueAmountInput {
        return this.financialTransaction.getTotalRecurringExpenses(numberOfYears);
    }

    private getFixedExpenses(numberOfYears: number = 0): ValueAmountInput {
        return this.financialTransaction.getTotalFixedExpenses(numberOfYears);
    }

    private getInitialCosts(): ValueAmountInput {
        return this.financialTransaction.getTotalInitialCosts();
    }

    private getMonthlyInterestRate(): ValueRateInput {
        return this.mortgageCalculator.getMonthlyInterestRate();
    }

    private getNumberOfPayments(): number {
        return this.mortgageCalculator.getNumberOfPayments();
    }

    // getRentalGrowthRate(): ValueRateInput {
    //     return this.growthProjections.getAnnualRentIncreaseRate();
    // }

    // getRecurringExpensesList(): ValueRateInput[] {
    //     return this.financialTransaction.getRecurringExpensesList();
    // }

    createInvestmentMetrics(): InvestmentMetricsResponseDTO {

        const ROI: number = this.calculateROI();
        const capRate: number = this.calculateInitialCapRate();
        const initialMortgagePayment: MortgagePayment = this.getMortgageAmount(0);
        const initialMonthlyAmount: number = this.getMortgageAmountWithFixedMonthlyExpenses();
        const recurringCosts: ValueAmountInput = this.getRecurringExpenses();
        const monthlyCashFlow: number = this.calculateMonthlyCashFlow();
        const yearlyCashFlow: number = this.calculateYearlyCashFlow();
        const ammortizationDetails: AmortizationDetailsDTO[] = this.calculateAmortizationSchedule();

        return {
            mortgageDetails: this.mortgageCalculator.toDTO(),
            growthProjections: this.growthProjections.toDTO(),
            taxImplications: this.taxImplications.toDTO(),
            investmentProjections: {
                ROI: Utility.round(ROI),
                capRate: Utility.round(capRate),
                recurringCosts: Utility.round(recurringCosts),
                monthlyPayment: Utility.round(initialMonthlyAmount),
                mortgageAmount: Utility.round(initialMortgagePayment.mortgageAmount.amount),
                monthlyCashFlow: Utility.round(monthlyCashFlow),
                yearlyCashFlow: Utility.round(yearlyCashFlow),
                ammortizationDetails: ammortizationDetails,
            },
        };

    }

    // private getRecurringExpenses(numberOfYears: number = 0): number {
    //     return this.mortgageCalculator.getRecurringExpenses(numberOfYears);
    // }

    // private getFixedExpenses(numberOfYears: number = 0): number {
    //     return this.mortgageCalculator.getFixedExpenses(numberOfYears);
    // }

    // private getInitialCosts(): number {
    //     return this.mortgageCalculator.getInitialCosts();
    // }

    // private getMortgageAmount(): number {
    //     return this.mortgageCalculator.calculateMortgagePayment();
    // }

    // private getMortgageAmountWithFixedMonthlyExpenses(numberOfYears: number = 0): number {
    //     return this.mortgageCalculator.getMortgageAmountWithFixedMonthlyExpenses(numberOfYears);
    // }

    private calculateROI(): number {
        const downPaymentAmount = this.getDownPaymentAmount();
        // Ensure downPaymentAmount is non-zero to avoid division by zero
        if (downPaymentAmount === 0) {
            throw new Error("Down payment cannot be zero for rate of return calculations.");
        }
        const yearlyReturn = this.calculateYearlyCashFlow();
        const initialExpeses = this.getInitialCosts();

        return (yearlyReturn / initialExpeses) * 100;
    }

    private calculateYearlyCashFlow(): number {
        return this.calculateMonthlyCashFlow() * 12;
    }

    private calculateMonthlyCashFlow(numberOfYears: number = 0): number {
        const futureDatedRecurringExpenses = this.getRecurringExpenses(numberOfYears);
        const futureDatedRentAmount = this.getRentalAmount(numberOfYears);
        const futureDatedMortgageAmountWithFixedMonthlyExpenses = this.getMortgageAmountWithFixedMonthlyExpenses(numberOfYears);
        return futureDatedRentAmount - (futureDatedMortgageAmountWithFixedMonthlyExpenses + futureDatedRecurringExpenses);
    }

    private calculateInitialCapRate(): number {
        const annualNetOperatingIncome = (this.calculateMonthlyCashFlow() + this.getMortgageAmount()) * 12;
        return (annualNetOperatingIncome / this.getPurchasePrice()) * 100;
    }

    private getAnnualAppreciationRate(): number {
        return this.growthProjections.getAnnualAppreciationRate();
    }

    private calculateAmortizationSchedule(): AmortizationDetailsDTO[] {

        const principal = this.getPurchasePrice();
        const loanAmount = this.getLoanAmount();
        const downPaymentAmount = this.getDownPaymentAmount();
        const monthlyInterestRate = this.getMonthlyInterestRate().rate / 100;
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

        const getMonthlyPaymentAndRecurringCosts = (numberOfYearsFromNow: number = 0): number => {
            return this.getMortgageAmountWithFixedMonthlyExpenses(numberOfYearsFromNow) +
                this.getRecurringExpenses(numberOfYearsFromNow);
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
                    rentalAmount = this.getRentalAmount(yearCounter - 1);
                    fixedCosts = this.getFixedExpenses(yearCounter - 1);
                    recurringExpenses = this.getRecurringExpenses(yearCounter - 1);
                    monthlyPaymentAndRecurringCosts = getMonthlyPaymentAndRecurringCosts(yearCounter - 1);
                    monthlyPayment = this.getMortgageAmountWithFixedMonthlyExpenses(yearCounter - 1);
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
