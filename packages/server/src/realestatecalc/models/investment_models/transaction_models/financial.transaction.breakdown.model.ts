import { TransactionsDTO, ValueAmountInput, ValueRateInput } from "@realestatemanager/shared";
import { IDTOConvertible } from "../../idtoconvertible.model";
import { IncomesBreakdown } from "./incomes.breakdown.model";
import { ExpensesBreakdown } from "./expenses.breakdown.model";

export abstract class FinancialTransaction {

}

export abstract class Income {

    private purchasePrice: ValueAmountInput;
    private incomeGrowthRate: ValueRateInput;
    private propertyAppreciationGrowthRate: ValueRateInput;

    constructor(
        purchasePrice: ValueAmountInput,
        incomeGrowthRate: ValueRateInput,
        propertyAppreciationGrowthRate: ValueRateInput
    ) {

        this.purchasePrice = purchasePrice;
        this.incomeGrowthRate = incomeGrowthRate;
        this.propertyAppreciationGrowthRate = propertyAppreciationGrowthRate;
    }
}

export abstract class Expense {

    // // FixedExpensesBreakdown
    // rentalGrowthRate: ValueRateInput;
    // growthRate: ValueRateInput;
    // inititalRentalAmount: ValueAmountInput;

    // // RecurringExpenses
    // rentalGrowthRate: ValueRateInput;
    // inititalRentalAmount: ValueAmountInput;

    // // InitialCostsBreakdown
    // purchasePrice: ValueAmountInput;

    // growthRate: ValueRateInput;
    // purchasePrice: ValueAmountInput;
    inititalRentalAmount: ValueAmountInput;
    rentalGrowthRate: ValueRateInput;

    constructor(
        // growthRate: ValueRateInput,
        // purchasePrice: ValueAmountInput,
        inititalRentalAmount: ValueAmountInput,
        rentalGrowthRate: ValueRateInput
    ) {
        // this.growthRate = growthRate;
        // this.purchasePrice = purchasePrice;
        this.inititalRentalAmount = inititalRentalAmount;
        this.rentalGrowthRate = rentalGrowthRate;
    }

}

export class RecurringExpense extends Expense {
    constructor(
        rentalGrowthRate: ValueRateInput,
        inititalRentalAmount: ValueAmountInput
    ) {
      super(rentalGrowthRate, inititalRentalAmount);
    }
}

export class InitialCosts extends Expense {
    private purchasePrice: ValueAmountInput;
    constructor(purchasePrice: ValueAmountInput) {
        this.purchasePrice = purchasePrice;
    }
}

//---------------------------------------------------------------------------------------------------------

export class FinancialTransactionBreakdown implements IDTOConvertible<TransactionsDTO> {

    private incomes: IncomesBreakdown;
    private expenses: ExpensesBreakdown;

    constructor(incomes: IncomesBreakdown, expenses: ExpensesBreakdown) {
        this.incomes = incomes;
        this.expenses = expenses;
    }

    getRecurringExpensesList(): ValueRateInput[] {
        return this.expenses.getRecurringExpensesList();
    }

    getRentalIncome(): ValueAmountInput {
        return this.incomes.getRentalIncomeAmount();
    }

    calculateRecurringExpenses(
        rentalGrowthRate: ValueRateInput,
        numberOfYears: number = 0
    ) {
        return this.expenses.calculateRecurringExpenses(this.getRentalIncome(), rentalGrowthRate, numberOfYears);
    }

    // getTotalIncomes(numberOfYears: number = 0): number {
    //     return this.incomes.getTotalIncomes(numberOfYears);
    // }

    // getRentalIncome(numberOfYears: number = 0): number {
    //     return this.incomes.getRentalIncome(numberOfYears);
    // }

    // getFixedExpenses(numberOfYears: number = 0): number {
    //     return this.expenses.getFixedExpenses(numberOfYears);
    // }

    // getRecurringExpenses(numberOfYears: number = 0): number {
    //     return this.expenses.getRecurringExpenses(numberOfYears);
    // }

    // getInitialCosts(): number {
    //     return this.expenses.getInitialCosts();
    // }

    toDTO(): TransactionsDTO {
        return {
            incomes: this.incomes.toDTO(),
            expenses: this.expenses.toDTO(),
        }
    }

}