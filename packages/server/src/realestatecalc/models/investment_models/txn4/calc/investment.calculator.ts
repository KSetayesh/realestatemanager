import { getYear } from "src/shared/Constants";
import { MortgageCalculator } from "../mortgage.calc";
import { PurchasePrice } from "../purchase.price";
import { RentEstimate } from "../rent.estimate";
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

        let returnData: AmortizationBreakdownDTO = {
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
        const yearCounter = getYear(monthCounter);
        return {
            appreciation: {
                appreciationRate: this.purchasePrice.getExpectedAppreciationRate(),
                homeValue: Utility.round(this.purchasePrice.getFutureDatedHomeValue(yearCounter)),
            },
            transactions: {
                expenseAmount: Utility.round(this.getTotalRecurringExpenseAmount(this.rentalEstimate, yearCounter)),
                incomeAmount: Utility.round(this.getTotalIncomeStreams(this.rentalEstimate, yearCounter)),
                netIncome: Utility.round(this.getNetIncome(this.rentalEstimate, yearCounter)),
                breakdown: {
                    [TransactionType.OPERATIONAL_RECURRING_EXPENSE]:
                        this.transactionManager.getRecurringOperationalCostsDTO(this.rentalEstimate, yearCounter),

                    [TransactionType.INCOME_STREAMS]:
                        this.transactionManager.getIncomeStreamsDTO(this.rentalEstimate, yearCounter),

                    [TransactionType.FIXED_RECURRING_EXPENSE]:
                        this.transactionManager.getRecurringFixedExpensesDTO(this.rentalEstimate, yearCounter),

                    [TransactionType.MORTGAGE]: this.getMortgageDTO(yearCounter),
                },
            },
        };

    }

    private getFinancingDTO(): FinancingDTO {
        return {
            type: TransactionType.FINANCING,
            breakdown: {
                [TransactionKey.PURCHASE_PRICE]: this.purchasePrice.toDTO(),
                [TransactionKey.LOAN_AMOUNT]: Utility.round(this.mortgageCalc.getLoanAmount()),
            },
        };
    }

    private getMortgageDTO(monthCounter: number = 0): MortgageDTO {

        const mortgageTxnDTO = (monthCounter: number = 0): MortgageTxnDTO => {
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

    private getNetIncome(rentEstimate: RentEstimate, yearCounter: number): number {
        return this.transactionManager.getTotalIncomeStreams(rentEstimate, yearCounter) -
            this.getTotalRecurringExpenseAmount(rentEstimate, yearCounter);
    }

    private getTotalRecurringExpenseAmount(rentEstimate: RentEstimate, yearCounter: number): number {
        return this.transactionManager.getTotalRecurringExpenseAmount(rentEstimate, yearCounter) +
            this.mortgageCalc.getAmount(yearCounter);
    }

    private getTotalIncomeStreams(rentEstimate: RentEstimate, yearCounter: number): number {
        return this.transactionManager.getTotalIncomeStreams(rentEstimate, yearCounter);
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



}