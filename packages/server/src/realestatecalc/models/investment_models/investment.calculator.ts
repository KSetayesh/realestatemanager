import { getYear } from "src/shared/Constants";
import { MortgageCalculator } from "./mortgage.calc";
import { PurchasePrice } from "./purchase.price";
import { RentEstimate } from "./rent.estimate";
import {
    AmortizationBreakdownDTO,
    FinancingDTO,
    InitialInvestmentBreakdownDTO,
    MonthlyDateData,
    MonthlyInvestmentBreakdownDTO,
    MonthlyInvestmentDetailsDTO,
    MortgageDTO,
    MortgageTxnDTO,
    TransactionKey,
    TransactionType,
    Utility
} from "@realestatemanager/shared";
import { TransactionManager } from "./transaction.manager";


export class InvestmentCalculator {

    private transactionManager: TransactionManager;
    private mortgageCalc: MortgageCalculator;

    // Financing
    private purchasePrice: PurchasePrice;
    private rentalEstimate: RentEstimate;

    constructor(
        transactionManager: TransactionManager,
        mortgageCalc: MortgageCalculator,
        purchasePrice: PurchasePrice,
        rentalEstimate: RentEstimate,
    ) {
        this.transactionManager = transactionManager;
        this.mortgageCalc = mortgageCalc;
        this.purchasePrice = purchasePrice;
        this.rentalEstimate = rentalEstimate;
    }

    createInvestmentMetrics(): AmortizationBreakdownDTO {
        let ammortizationList: MonthlyInvestmentDetailsDTO[] = [];

        const totalPayments = this.mortgageCalc.numberOfPayments;
        const today = new Date();
        const year = today.getMonth() === 11 ? today.getFullYear() + 1 : today.getFullYear();
        const nextMonth = (today.getMonth() + 1) % 12;


        for (let monthCounter = 1; monthCounter <= totalPayments; monthCounter++) {
            const monthlyDateData: MonthlyDateData = this.getDateData(year, nextMonth, monthCounter);
            const monthlyInvestmentDetailsDTO: MonthlyInvestmentDetailsDTO = {
                monthlyDateData: monthlyDateData,
                monthlyBreakdown: this.getMonthlyTransactionData(monthCounter),
            };

            ammortizationList.push(monthlyInvestmentDetailsDTO);
        }

        const returnData: AmortizationBreakdownDTO = {
            initialInvestmenDetails: this.getInitialValues(),
            amortizationData: ammortizationList,
        }

        return returnData;
    }

    private getInitialValues(): InitialInvestmentBreakdownDTO {
        return {
            [TransactionType.FINANCING]: this.getFinancingDTO(),

            [TransactionType.MORTGAGE]: this.getMortgageDTO(0),

            [TransactionType.INCOME_STREAMS]:
                this.transactionManager.getIncomeStreamsDTO(this.rentalEstimate, 0),

            [TransactionType.OPERATIONAL_RECURRING_EXPENSE]:
                this.transactionManager.getRecurringOperationalCostsDTO(this.rentalEstimate, 0),

            [TransactionType.INITIAL_EXPENSE]: this.transactionManager.getInitialCostsDTO(this.purchasePrice),
        };
    }

    private getMonthlyTransactionData(monthCounter: number): MonthlyInvestmentBreakdownDTO { //AmortizationYearData {
        // const yearCounter = getYear(monthCounter);
        return {
            appreciation: {
                appreciationRate: this.purchasePrice.getExpectedAppreciationRate(),
                homeValue: Utility.round(this.purchasePrice.getFutureDatedHomeValue(monthCounter)),
            },
            // Go back to the calculations for each of these 4 investmentBreakdown properties
            investmentBreakdown: {
                capRate: Utility.round(this.calculateCapRate(monthCounter)),
                ROI: Utility.round(this.calculateROI(monthCounter)),
                monthlyCashFlow: Utility.round(this.calculateMonthlyCashFlow(monthCounter)),
                yearlyCashFlow: Utility.round(this.calculateYearlyCashFlow(monthCounter)),
            },
            transactions: {
                expenseAmount: Utility.round(this.getTotalRecurringExpenseAmount(this.rentalEstimate, monthCounter)),
                incomeAmount: Utility.round(this.getTotalIncomeStreams(this.rentalEstimate, monthCounter)),
                netIncome: Utility.round(this.getNetIncome(this.rentalEstimate, monthCounter)),
                breakdown: {
                    [TransactionType.OPERATIONAL_RECURRING_EXPENSE]:
                        this.transactionManager.getRecurringOperationalCostsDTO(this.rentalEstimate, monthCounter),

                    [TransactionType.INCOME_STREAMS]:
                        this.transactionManager.getIncomeStreamsDTO(this.rentalEstimate, monthCounter),

                    [TransactionType.FIXED_RECURRING_EXPENSE]:
                        this.transactionManager.getRecurringFixedExpensesDTO(this.rentalEstimate, monthCounter),

                    [TransactionType.MORTGAGE]: this.getMortgageDTO(monthCounter),
                },
            },
        };

    }

    private getFinancingDTO(): FinancingDTO {
        return {
            type: TransactionType.FINANCING,
            breakdown: {
                [TransactionKey.PURCHASE_PRICE]: this.purchasePrice.toDTO(0),
                [TransactionKey.LOAN_AMOUNT]: Utility.round(this.mortgageCalc.getLoanAmount()),
            },
        };
    }

    private getMortgageDTO(monthCounter: number): MortgageDTO {

        const mortgageTxnDTO = (monthCounter: number): MortgageTxnDTO => {
            return this.mortgageCalc.toDTO(monthCounter);
        }

        return {
            type: TransactionType.MORTGAGE,
            totalAmount: {
                amount: Utility.round(this.mortgageCalc.getAmount(monthCounter)),
                description: 'Mortgage + PMI'
            },
            breakdown: mortgageTxnDTO(monthCounter),
        };
    }

    private getNetIncome(rentEstimate: RentEstimate, monthCounter: number): number {
        return this.transactionManager.getTotalIncomeStreams(rentEstimate, monthCounter) -
            this.getTotalRecurringExpenseAmount(rentEstimate, monthCounter);
    }

    private getTotalRecurringExpenseAmount(rentEstimate: RentEstimate, monthCounter: number): number {
        return this.transactionManager.getTotalRecurringExpenseAmount(rentEstimate, monthCounter) +
            this.mortgageCalc.getAmount(monthCounter);
    }

    private getTotalIncomeStreams(rentEstimate: RentEstimate, monthCounter: number): number {
        return this.transactionManager.getTotalIncomeStreams(rentEstimate, monthCounter);
    }

    private getDateData(year: number, nextMonth: number, monthCounter: number): MonthlyDateData {
        const month = (nextMonth + (monthCounter - 1)) % 12;
        const yearOffset = Math.floor((nextMonth + (monthCounter - 1)) / 12);
        const date: Date = new Date(year + yearOffset, month, 1);
        const dateAsString = date.toLocaleDateString('en-US'); // date.toISOString().split('T')[0];
        const monthMod12 = ((monthCounter - 1) % 12) + 1;
        const yearCounter = getYear(monthCounter);
        return {
            dateAsString: dateAsString,
            monthMod12: monthMod12,
            yearCounter: yearCounter,
        }
    }

    //--------------------------------------------------------------------------------------------------------

    private calculateROI(monthCounter: number): number {
        const downPaymentAmount = this.downPaymentAmount;
        // Ensure downPaymentAmount is non-zero to avoid division by zero
        if (downPaymentAmount === 0) {
            throw new Error("Down payment cannot be zero for rate of return calculations.");
        }
        const yearlyReturn = this.calculateYearlyCashFlow(monthCounter);
        const initialExpeses = this.totalInitialCosts;

        return (yearlyReturn / initialExpeses) * 100;
    }

    private calculateYearlyCashFlow(monthCounter: number): number {
        return this.calculateMonthlyCashFlow(monthCounter) * 12;
    }

    private calculateMonthlyCashFlow(monthCounter: number): number {
        return this.getNetIncome(this.rentalEstimate, monthCounter);
    }

    private calculateCapRate(monthCounter: number): number {
        const annualNetOperatingIncome = (this.calculateMonthlyCashFlow(monthCounter) + this.mortgageCalc.getAmount(0)) * 12;
        return (annualNetOperatingIncome / this.initialPurchasePrice) * 100;
    }

    private get downPaymentAmount(): number {
        return this.transactionManager.downPaymentTxn.getAmount(this.purchasePrice);
    }

    private get initialPurchasePrice(): number {
        return this.purchasePrice.getInitialPurchasePrice();
    }

    private get totalInitialCosts(): number {
        return this.transactionManager.getTotalInitialCosts(this.purchasePrice);
    }

}