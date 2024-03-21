import { ValueAmountInput, ValueInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { GrowthProjections } from "../models/investment_models/growth.projections.model";
import { InitialCostsBreakdown } from "../models/investment_models/breakdown_models/initial.costs.breakdown.model";
import { AmountTransaction } from "../models/investment_models/transaction_models/amount.transaction.model";
import { Transaction } from "../models/investment_models/transaction_models/transaction.model";
import { RateTransaction } from "../models/investment_models/transaction_models/rate.transaction.model";
import { AdditionalIncomeStreamsBreakdown } from "../models/investment_models/breakdown_models/additional.income.streams.breakdown.model";
import { RecurringExpensesBreakdown } from "../models/investment_models/breakdown_models/recurring.expenses.breakdown.model";
import { RentalIncomeBreakdown } from "../models/investment_models/breakdown_models/rental.income.breakdown.model";
import { FixedExpensesBreakdown } from "../models/investment_models/breakdown_models/fixed.expenses.breakdown.model";
import { FinancialTransaction } from "../models/investment_models/transaction_models/financial.transaction";
import { Incomes } from "../models/investment_models/transaction_models/incomes.model";
import { Expenses } from "../models/investment_models/transaction_models/expenses.model";

export type TransactionBuilderRequest = {
    growthProjections: GrowthProjections;
    downPayment: ValueInput;
    monthlyPropertyTax: ValueInput;
    monthlyHomeInsuranceAmount: ValueInput;
    monthlyHOAFeesAmount: ValueInput;
    propertyManagementRate: ValueRateInput;
    vacancyRate: ValueRateInput;
    maintenanceRate: ValueRateInput;
    otherExpensesRate: ValueRateInput;
    capExReserveRate: ValueRateInput;
    rentEstimate: ValueAmountInput;
    parkingFees: ValueAmountInput;
    laundryServices: ValueAmountInput;
    storageUnitFees: ValueAmountInput;
    otherAdditionalIncomeStreams: ValueAmountInput;
    legalAndProfessionalFees: ValueInput;
    initialRepairCosts: ValueInput;
    travelingCosts: ValueInput;
    closingCosts: ValueInput;
    otherInitialExpenses: ValueInput;
};

export class TransactionBuilder {

    private txnBuilderReq: TransactionBuilderRequest;

    constructor(txnBuilderReq: TransactionBuilderRequest) {
        this.txnBuilderReq = txnBuilderReq;
    }

    build(purchasePrice: number): FinancialTransaction {
        const incomes: Incomes = this.createIncomes(purchasePrice);
        const rentalAmount: number = incomes.getRentalIncome();
        const expenses: Expenses = this.createExpenses(purchasePrice, rentalAmount);
        return new FinancialTransaction(incomes, expenses);
    }

    createDownPaymentAmount(purchasePrice: number): Transaction {
        return this.createTransaction(this.txnBuilderReq.downPayment, purchasePrice);
    }

    private createIncomes(purchasePrice: number): Incomes {
        return new Incomes(
            this.createAdditionalIncomesStreamsBreakdown(purchasePrice),
            this.createRentalIncomeBreakdown(purchasePrice),
        );
    }

    private createExpenses(purchasePrice: number, rentalAmount: number): Expenses {
        return new Expenses(
            this.createFixedExpensesBreakdown(rentalAmount),
            this.createRecurringExpensesBreakdown(rentalAmount),
            this.createInitialCostsBreakdown(purchasePrice),
        );
    }

    private createRentalIncomeBreakdown(purchasePrice: number): RentalIncomeBreakdown {
        return new RentalIncomeBreakdown(
            this.createTransaction(
                this.txnBuilderReq.rentEstimate,
                purchasePrice,
                this.txnBuilderReq.growthProjections.getAnnualRentIncreaseValueType()),
        );
    }

    private createAdditionalIncomesStreamsBreakdown(purchasePrice: number): AdditionalIncomeStreamsBreakdown {

        return new AdditionalIncomeStreamsBreakdown(
            this.createParkingFees(purchasePrice),
            this.createLaundryServices(purchasePrice),
            this.createStorageUnitFees(purchasePrice),
            this.createOtherAdditionalIncomeStreams(purchasePrice),
        );
    }

    private createInitialCostsBreakdown(purchasePrice: number): InitialCostsBreakdown {

        return new InitialCostsBreakdown(
            this.createDownPaymentAmount(purchasePrice),
            this.createLegalAndProfessionalFees(purchasePrice),
            this.createInitialRepairCosts(purchasePrice),
            this.createClosingCosts(purchasePrice),
            this.createTravelingCosts(purchasePrice),
            this.createOtherInitialExpenses(purchasePrice),
        );
    }

    private createRecurringExpensesBreakdown(rentalAmount: number): RecurringExpensesBreakdown {
        return new RecurringExpensesBreakdown(
            this.createPropertyManagementRate(rentalAmount),
            this.createVacancyRate(rentalAmount),
            this.createMaintenanceRate(rentalAmount),
            this.createOtherExpensesRate(rentalAmount),
            this.createCapExReserveRate(rentalAmount),
        );
    }

    private createFixedExpensesBreakdown(rentalAmount: number): FixedExpensesBreakdown {
        return new FixedExpensesBreakdown(
            this.createMonthlyPropertyTaxAmount(rentalAmount),
            this.createMonthlyHOAFeesAmount(rentalAmount),
            this.createMonthlyHomeInsuranceAmount(rentalAmount),
        );
    }

    private createMonthlyPropertyTaxAmount(rentalAmount: number): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.monthlyPropertyTax,
            rentalAmount
        );
    }

    private createMonthlyHOAFeesAmount(rentalAmount: number): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.monthlyHOAFeesAmount,
            rentalAmount
        );
    }

    private createMonthlyHomeInsuranceAmount(rentalAmount: number): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.monthlyHomeInsuranceAmount,
            rentalAmount
        );
    }

    private createPropertyManagementRate(rentalAmount: number): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.propertyManagementRate,
            rentalAmount
        );
    }

    private createVacancyRate(rentalAmount: number): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.vacancyRate,
            rentalAmount
        );
    }

    private createMaintenanceRate(rentalAmount: number): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.maintenanceRate,
            rentalAmount
        );
    }

    private createOtherExpensesRate(rentalAmount: number): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.otherExpensesRate,
            rentalAmount
        );
    }

    private createCapExReserveRate(rentalAmount: number): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.capExReserveRate,
            rentalAmount
        );
    }

    private createLegalAndProfessionalFees(purchasePrice: number): Transaction {
        return this.createTransaction(this.txnBuilderReq.legalAndProfessionalFees, purchasePrice);
    }

    private createInitialRepairCosts(purchasePrice: number): Transaction {
        return this.createTransaction(this.txnBuilderReq.initialRepairCosts, purchasePrice);
    }

    private createClosingCosts(purchasePrice: number): Transaction {
        return this.createTransaction(this.txnBuilderReq.closingCosts, purchasePrice);
    }

    private createTravelingCosts(purchasePrice: number): Transaction {
        return this.createTransaction(this.txnBuilderReq.travelingCosts, purchasePrice);
    }

    private createOtherInitialExpenses(purchasePrice: number): Transaction {
        return this.createTransaction(this.txnBuilderReq.otherInitialExpenses, purchasePrice);
    }

    private createParkingFees(purchasePrice: number): Transaction {
        return this.createTransaction(this.txnBuilderReq.parkingFees, purchasePrice);
    }

    private createLaundryServices(purchasePrice: number): Transaction {
        return this.createTransaction(this.txnBuilderReq.laundryServices, purchasePrice);
    }

    private createStorageUnitFees(purchasePrice: number): Transaction {
        return this.createTransaction(this.txnBuilderReq.storageUnitFees, purchasePrice);
    }

    private createOtherAdditionalIncomeStreams(purchasePrice: number): Transaction {
        return this.createTransaction(this.txnBuilderReq.otherAdditionalIncomeStreams, purchasePrice);
    }


    private createTransaction(
        valueInput: ValueInput,
        amountComparedTo: number,
        growthRate?: ValueRateInput
    ): Transaction {

        const createValueTypeAmount = (amount: number): ValueAmountInput => {
            return {
                amount: amount,
                type: ValueType.AMOUNT,
            };
        };

        const amountComparedToValueType = createValueTypeAmount(amountComparedTo);

        if (ValueType.AMOUNT === valueInput.type) {
            return new AmountTransaction(valueInput, amountComparedToValueType, growthRate);
        }
        else if (ValueType.RATE === valueInput.type) {
            return new RateTransaction(valueInput, amountComparedToValueType, growthRate);
        }
    }

}