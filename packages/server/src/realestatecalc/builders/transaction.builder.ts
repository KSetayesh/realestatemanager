import { GrowthFrequency, ValueAmountInput, ValueInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { GrowthProjections } from "../models/investment_models/new_new_new/growth.projections.model";
import { InitialCostsBreakdown } from "../models/investment_models/breakdown_models/initial.costs.breakdown.model";
import { AmountTransaction } from "../models/investment_models/transaction_models/amount.transaction.model";
import { AmountAndRate, Transaction } from "../models/investment_models/transaction_models/transaction.model";
import { RateTransaction } from "../models/investment_models/transaction_models/rate.transaction.model";
import { AdditionalIncomeStreamsBreakdown } from "../models/investment_models/breakdown_models/additional.income.streams.breakdown.model";
import { RecurringExpensesBreakdown } from "../models/investment_models/breakdown_models/recurring.expenses.breakdown.model";
import { RentalIncomeBreakdown } from "../models/investment_models/breakdown_models/rental.income.breakdown.model";
import { FixedExpensesBreakdown } from "../models/investment_models/breakdown_models/fixed.expenses.breakdown.model";
import { FinancialTransaction } from "../models/investment_models/transaction_models/financial.transaction.breakdown.model";
import { Incomes } from "../models/investment_models/transaction_models/incomes.breakdown.model";
import { Expenses } from "../models/investment_models/transaction_models/expenses.breakdown.model";

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
        return this.createTransaction(
            this.txnBuilderReq.downPayment,
            0,
            purchasePrice,
            0,
        );
        // this.txnBuilderReq.growthProjections.getAnnualAppreciationRate());
    }

    private createIncomes(purchasePrice: number): Incomes {
        return new Incomes(
            this.createAdditionalIncomesStreamsBreakdown(purchasePrice),
            this.createRentalIncomeBreakdown(),
        );
    }

    private createExpenses(purchasePrice: number, rentalAmount: number): Expenses {
        return new Expenses(
            this.createFixedExpensesBreakdown(rentalAmount),
            this.createRecurringExpensesBreakdown(rentalAmount),
            this.createInitialCostsBreakdown(purchasePrice),
        );
    }

    private createRentalIncomeBreakdown(): RentalIncomeBreakdown {
        return new RentalIncomeBreakdown(
            this.createTransaction(
                this.txnBuilderReq.rentEstimate,
                this.txnBuilderReq.growthProjections.getAnnualRentIncreaseRate(),
                0,
                0,
            )
        );
    }

    private createAdditionalIncomesStreamsBreakdown(purchasePrice: number): AdditionalIncomeStreamsBreakdown {

        return new AdditionalIncomeStreamsBreakdown(
            this.createParkingFees(),
            this.createLaundryServices(),
            this.createStorageUnitFees(),
            this.createOtherAdditionalIncomeStreams(),
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
            this.txnBuilderReq.growthProjections.getAnnualTaxIncreaseRate(),
            rentalAmount,
            0,
        );
    }

    private createMonthlyHOAFeesAmount(rentalAmount: number): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.monthlyHOAFeesAmount,
            this.txnBuilderReq.growthProjections.getAnnualHOAFeesIncreaseRate(),
            rentalAmount,
            0,
        );
    }

    private createMonthlyHomeInsuranceAmount(rentalAmount: number): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.monthlyHomeInsuranceAmount,
            this.txnBuilderReq.growthProjections.getAnnualHomeInsuranceIncreaseRate(),
            rentalAmount,
            0,
        );
    }

    private createPropertyManagementRate(rentalAmount: number): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.propertyManagementRate,
            0,
            rentalAmount,
            this.txnBuilderReq.growthProjections.getAnnualRentIncreaseRate(),
        );
    }

    private createVacancyRate(rentalAmount: number): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.vacancyRate,
            0,
            rentalAmount,
            this.txnBuilderReq.growthProjections.getAnnualRentIncreaseRate(),
        );
    }

    private createMaintenanceRate(rentalAmount: number): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.maintenanceRate,
            0,
            rentalAmount,
            this.txnBuilderReq.growthProjections.getAnnualRentIncreaseRate(),
        );
    }

    private createOtherExpensesRate(rentalAmount: number): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.otherExpensesRate,
            0,
            rentalAmount,
            this.txnBuilderReq.growthProjections.getAnnualRentIncreaseRate(),
        );
    }

    private createCapExReserveRate(rentalAmount: number): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.capExReserveRate,
            0,
            rentalAmount,
            this.txnBuilderReq.growthProjections.getAnnualRentIncreaseRate(),
        );
    }

    private createLegalAndProfessionalFees(purchasePrice: number): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.legalAndProfessionalFees,
            0,
            purchasePrice,
            0,
        );
    }

    private createInitialRepairCosts(purchasePrice: number): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.initialRepairCosts,
            0,
            purchasePrice,
            0,
        );
    }

    private createClosingCosts(purchasePrice: number): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.closingCosts,
            0,
            purchasePrice,
            0);
    }

    private createTravelingCosts(purchasePrice: number): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.travelingCosts,
            0,
            purchasePrice,
            0,
        );
    }

    private createOtherInitialExpenses(purchasePrice: number): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.otherInitialExpenses,
            0,
            purchasePrice,
            0
        );
    }

    private createParkingFees(): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.parkingFees,
            0,
            0,
            0
        );
    }

    private createLaundryServices(): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.laundryServices,
            0,
            0,
            0
        );
    }

    private createStorageUnitFees(): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.storageUnitFees,
            0,
            0,
            0,
        );
    }

    private createOtherAdditionalIncomeStreams(): Transaction {
        return this.createTransaction(
            this.txnBuilderReq.otherAdditionalIncomeStreams,
            0,
            0,
            0,
        );
    }

    private createTransaction(
        valueInput: ValueInput,
        growthRate: number,
        amountComparedTo: number,
        rateComparedTo: number,
        valueGrowthFrequency?: GrowthFrequency,
        amountComparedToGrowthFrequency?: GrowthFrequency,
    ): Transaction {

        const createRateType = (rate: number, growthFrequency?: GrowthFrequency): ValueRateInput => {
            return {
                rate: rate,
                type: ValueType.RATE,
                growthFrequency: growthFrequency,
            }
        }

        const createValueTypeAmount = (
            amount: number,
            rate: number,
            growthFrequency?: GrowthFrequency
        ): AmountAndRate => {
            return {
                amountValue: {
                    amount: amount,
                    type: ValueType.AMOUNT,
                },
                rateValue: createRateType(rate, growthFrequency),
            };
        };

        const amountComparedToValueType = createValueTypeAmount(amountComparedTo, rateComparedTo, amountComparedToGrowthFrequency);
        const growthRateValue = createRateType(growthRate, valueGrowthFrequency);

        if (ValueType.AMOUNT === valueInput.type) {
            return new AmountTransaction(valueInput, growthRateValue, amountComparedToValueType);
        }
        else if (ValueType.RATE === valueInput.type) {
            return new RateTransaction(valueInput, growthRateValue, amountComparedToValueType);
        }
    }

}