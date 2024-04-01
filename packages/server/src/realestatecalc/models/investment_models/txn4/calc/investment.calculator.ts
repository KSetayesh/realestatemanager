import { getYear } from "src/shared/Constants";
import { TransactionManager } from "./transaction.manager";
import { MortgageCalculator } from "../mortgage.calc";
import { PurchasePrice } from "../purchase.price";
import { RentEstimate } from "../rent.estimate";
import { Utility } from "@realestatemanager/shared";

export type MonthlyDateData = {
    dateAsString: string;
    monthMod12: number;
    yearCounter: number;
};

export enum TransactionType {
    INITIAL_EXPENSE = 'Initial Expense',
    FIXED_RECURRING_EXPENSE = 'Fixed Recurring Expense',
    OPERATIONAL_RECURRING_EXPENSE = 'Operational Recurring Expense',
    INCOME_STREAMS = 'Income Streams',
    FINANCING = 'Financing',
    MORTGAGE = 'Mortgage',
};

export enum TransactionKey {
    LOAN_AMOUNT = 'Loan Amount',
    PURCHASE_PRICE = 'Purchase Price',

    MORTGAGE = 'Mortgage',
    // MORTGAGE_INTEREST = 'Mortgage Interest',
    // MORTGAGE_PRINCIPAL = 'Mortgage Principal',
    // MORTGAGE_AMOUNT = 'Mortgage Amount',
    // PMI = 'PMI',

    PROPERTY_TAX = 'Property Tax',
    HOA_FEE = 'Monthly HOA Fee',
    HOME_INSURANCE = 'Monthly Home Insurance',

    RENTAL_INCOME = 'Rental Income',
    PARKING_FEES = 'Parking Fees',
    LAUNDRY_SERVICES = 'Laundry Service',
    STORAGE_UNIT_FEES = 'Storage Unit Fees',
    OTHER_ADDITIONAL_INCOME_STREAMS = 'Other Additional Incomes Streams',

    PROPERTY_MANAGEMENT_EXPENSE = 'Property Management Expense',
    VACANCY_EXPENSE = 'Vacancy Expense',
    MAINTENANCE_EXPENSE = 'Maintenance Expense',
    OTHER_EXPENSES = 'Other Expeneses',
    CAP_EX_RESERVE_EXPENSE = 'Cap Ex Reserve Expense',

    DOWN_PAYMENT = 'Down Payment',
    LEGAL_AND_PROFESSIONAL_FEES = 'Legal And Professional Fees',
    INITIAL_REPAIR_COST = 'Initial Repair Costs',
    CLOSING_COST = 'Closing Costs',
    TRAVELING_COST = 'Traveling Costs',
    OTHER_INITIAL_EXPENSES = 'Other Initial Expenses',
};

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

    createInvestmentMetrics(): any {
        let ammortizationList: any[] = [];

        const totalPayments = this.mortgageCalc.numberOfPayments;
        const today = new Date();
        const year = today.getMonth() === 11 ? today.getFullYear() + 1 : today.getFullYear();
        const nextMonth = (today.getMonth() + 1) % 12;


        for (let monthCounter = 1; monthCounter <= totalPayments; monthCounter++) {
            const monthlyDateData: MonthlyDateData = this.getDateData(year, nextMonth, monthCounter);

            let yrData = {
                yearCounter: monthlyDateData.yearCounter,
                month: monthlyDateData.monthMod12,
                date: monthlyDateData.dateAsString,
                monthlyBreakdown: this.getMonthlyTransactionData(monthCounter),
            };
            ammortizationList.push(yrData);
        }

        let returnData = {
            initialValues: this.getInitialValues(),
            ammortizationList: ammortizationList
        }

        return returnData;
    }

    private getInitialValues() {
        return {
            [TransactionType.FINANCING]: {
                type: TransactionType.FINANCING,
                breakdown: {
                    [TransactionKey.PURCHASE_PRICE]: this.purchasePrice.toDTO(),
                    [TransactionKey.LOAN_AMOUNT]: Utility.round(this.mortgageCalc.getLoanAmount()),
                },
            },

            [TransactionType.MORTGAGE]: {
                type: TransactionType.MORTGAGE,
                mortgagePlusPMI: Utility.round(this.mortgageCalc.getAmount(0)),
                breakdown: {
                    annualInterestRate: Utility.round(this.mortgageCalc.getRate()),
                    mortgageAmount: Utility.round(this.mortgageCalc.getMortgageAmount()),
                    pmiAmount: Utility.round(this.mortgageCalc.getPMIAmount(0)),
                },
            },

            [TransactionType.INCOME_STREAMS]:
                this.transactionManager.getIncomeStreamsDTO(this.rentalEstimate, 0),

            [TransactionType.OPERATIONAL_RECURRING_EXPENSE]:
                this.transactionManager.getRecurringOperationalCostsDTO(this.rentalEstimate, 0),

            [TransactionType.INITIAL_EXPENSE]: this.transactionManager.getInitialCostsDTO(this.purchasePrice),
        };
    }

    private getMonthlyTransactionData(monthCounter: number): any { //AmortizationYearData {
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

                    [TransactionType.MORTGAGE]: {
                        type: TransactionType.MORTGAGE,
                        mortgagePlusPMI: Utility.round(this.mortgageCalc.getAmount(monthCounter)),
                        breakdown: {
                            annualInterestRate: Utility.round(this.mortgageCalc.getRate()),
                            mortgageAmount: Utility.round(this.mortgageCalc.getMortgageAmount()),
                            pmiAmount: Utility.round(this.mortgageCalc.getPMIAmount(monthCounter)),
                            interestPaid: Utility.round(this.mortgageCalc.getInterestAmountForPayment(monthCounter)),
                            principalPaid: Utility.round(this.mortgageCalc.getPrincipalAmountForPayment(monthCounter)),
                            percentPaidInInterest: Utility.round(this.mortgageCalc.getPercentageOfInterest(monthCounter)),
                            percentPaidInPrincipal: Utility.round(this.mortgageCalc.getPercentageOfPrincipal(monthCounter)),
                            remainingLoanBalance: Utility.round(this.mortgageCalc.calculateBalanceAfterPayment(monthCounter)),
                        },
                    },
                },
            },
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