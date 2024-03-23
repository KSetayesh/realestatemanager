import { TransactionsDTO, ValueAmountInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { IDTOConvertible } from "../../idtoconvertible.model";
import { Calculate } from "./calculate.model";
import { Expenses } from "./expenses.model";
import { Incomes } from "./incomes.model";

export class FinancialTransaction implements Calculate, IDTOConvertible<TransactionsDTO> {
    private incomes: Incomes;
    private expenses: Expenses;

    constructor(incomes: Incomes, expenses: Expenses) {
        this.incomes = incomes;
        this.expenses = expenses;
    }

    getTotalInitialCosts(): ValueAmountInput {
        return this.expenses.getTotalInitialCostsDetail();
    }

    getTotalFixedExpenses(numberOfYears: number = 0): ValueAmountInput {
        return this.expenses.getTotalFixedExpensesAmount(numberOfYears);
    }

    getTotalRecurringExpenses(numberOfYears: number = 0): ValueAmountInput {
        return this.expenses.getTotalRecurringExpenses(numberOfYears);
    }

    getTotalAmount(numberOfYears: number = 0): ValueAmountInput {
        return {
            type: ValueType.AMOUNT,
            amount: this.getTotalIncomes(numberOfYears).amount - this.getTotalExpenses(numberOfYears).amount,
        }
    }

    getTotalIncomes(numberOfYears: number = 0): ValueAmountInput {
        return this.incomes.getTotalAmount(numberOfYears);
    }

    getTotalExpenses(numberOfYears: number = 0): ValueAmountInput {
        return this.expenses.getTotalAmount(numberOfYears);
    }

    getRentalAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.incomes.getRentalAmount(numberOfYears);
    }

    getDownPaymentAmount(): ValueAmountInput {
        return this.expenses.getDownPaymentAmount();
    }

    getDownPaymentPercentage(): ValueRateInput {
        return this.expenses.getDownPaymentPercentage();
    }

    toDTO(): TransactionsDTO {
        return {
            incomes: this.incomes.toDTO(),
            expenses: this.expenses.toDTO(),
        };
    }

}