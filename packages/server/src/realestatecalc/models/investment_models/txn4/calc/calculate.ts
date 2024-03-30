import { Utility } from "@realestatemanager/shared";
import { MortgageCalculator } from "../mortgage.calc";
import { PurchasePrice } from "../purchase.price";
import { RentEstimate } from "../rent.estimate";
import { TransactionManager } from "./transaction.manager";
import { getYear } from "src/shared/Constants";

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

export class Calculate {

    private transactionManager: TransactionManager;
    private mortgageCalc: MortgageCalculator;

    // Financing
    private purchasePrice: PurchasePrice;
    private rentalEstimate: RentEstimate;


    // // Fixed Recurring Expenses
    // private monthlyHOAFeesAmount: RecurringFixedCost;
    // private monthlyHomeInsuranceAmount: RecurringFixedCost;
    // private monthlyPropertyTax: RecurringFixedCost;

    // // Income Streams
    // private rentEstimate: RentEstimate;
    // private storageUnitFees: Income;
    // private parkingFee: Income;
    // private laundryService: Income;
    // private otherAdditionalIncomeStreams: Income;

    // // Initial Expenses
    // private downPayment: InitialCost;
    // private closingCosts: InitialCost;
    // private initialRepairCosts: InitialCost;
    // private legalAndProfessionalFees: InitialCost;
    // private travelingCosts: InitialCost;
    // private otherInitialExpenses: InitialCost;

    // // Recurring Operational Expenses
    // private capExReserveRate: RecurringOperationalCost;
    // private maintenanceRate: RecurringOperationalCost;
    // private otherExpenseRate: RecurringOperationalCost;
    // private propertyManagementRate: RecurringOperationalCost;
    // private vacancyRate: RecurringOperationalCost;


    // private recurringFixedCostMap: Map<TransactionKey, RecurringFixedCost>;
    // private incomeMap: Map<TransactionKey, Income>;
    // private initialExpenseMap: Map<TransactionKey, InitialCost>;
    // private recurringOperationalCostMap: Map<TransactionKey, RecurringOperationalCost>;

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

    createInvestmentMetrics(monthCounter: number = 0) {

        //const initialValues = this.getInitialValues();
        return this.getMonthlyTransactionData(monthCounter);
    }

    // build(monthCounter: number = 0) {
    //     const initialValues = this.getInitialValues();
    //     const ammortizationYearData = this.getMonthlyTransactionData(monthCounter);
    // }

    getInitialValues() {
        return {
            [TransactionType.FINANCING]: {
                type: TransactionType.FINANCING,
                totalAmount: 0,
                breakdown: {
                    [TransactionKey.PURCHASE_PRICE]: Utility.round(this.purchasePrice.getInitialPurchasePrice()),
                    [TransactionKey.LOAN_AMOUNT]: Utility.round(this.mortgageCalc.getLoanAmount()),

                },
            },
            // [TransactionType.MORTGAGE]: {
            //     type: TransactionType.MORTGAGE,
            //     totalAmount: 0,
            //     breakdown: {
            //         [TransactionKey.MORTGAGE]: {},
            //     },
            // },
            [TransactionType.INITIAL_EXPENSE]: this.transactionManager.getInitialCostsDTO(this.purchasePrice),
        };
    }

    private getMonthlyTransactionData(monthCounter: number): any { //AmortizationYearData {
        const yearCounter = getYear(monthCounter);
        return {

            [TransactionType.FINANCING]: {
                type: TransactionType.FINANCING,
                totalAmount: 0,
                breakdown: {
                    [TransactionKey.PURCHASE_PRICE]: Utility.round(this.purchasePrice.getFutureDatedHomeValue(yearCounter)),
                    [TransactionKey.LOAN_AMOUNT]: Utility.round(this.mortgageCalc.getLoanAmount()),
                },
            },

            [TransactionType.OPERATIONAL_RECURRING_EXPENSE]:
                this.transactionManager.getRecurringOperationalCostsDTO(this.rentalEstimate, yearCounter),

            [TransactionType.INCOME_STREAMS]:
                this.transactionManager.getIncomeStreamsDTO(this.rentalEstimate, yearCounter),

            [TransactionType.FIXED_RECURRING_EXPENSE]:
                this.transactionManager.getRecurringFixedExpensesDTO(this.rentalEstimate, yearCounter),

            [TransactionType.MORTGAGE]: {
                type: TransactionType.MORTGAGE,
                mortgage: Utility.round(this.mortgageCalc.getAmount()),
                breakdown: {
                    annualInterestRate: Utility.round(this.mortgageCalc.getRate()),
                    mortgageWithPMI: Utility.round(this.mortgageCalc.getMortgagePlusPMIAmount(monthCounter)),
                    pmiAmount: Utility.round(this.mortgageCalc.getPMIAmount(monthCounter)),
                    interestPaid: Utility.round(this.mortgageCalc.getInterestAmountForPayment(monthCounter)),
                    principalPaid: Utility.round(this.mortgageCalc.getPrincipalAmountForPayment(monthCounter)),
                    percentPaidInInterest: Utility.round(this.mortgageCalc.getPercentageOfInterest(monthCounter)),
                    percentPaidInPrincipal: Utility.round(this.mortgageCalc.getPercentageOfPrincipal(monthCounter)),
                    remainingLoanBalance: Utility.round(this.mortgageCalc.calculateBalanceAfterPayment(monthCounter)),
                },
            },

        };

    }

}