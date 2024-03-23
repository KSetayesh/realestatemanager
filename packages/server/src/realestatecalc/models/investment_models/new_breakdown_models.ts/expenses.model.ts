import { ExpensesDTO, ValueAmountInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { IDTOConvertible } from "../../idtoconvertible.model";
import { Calculate } from "./calculate.model";
import { FixedExpensesDetail } from "./fixed.expenses.detail.model";
import { InitialCostsDetail } from "./initial.costs.detail.model";
import { RecurringExpensesDetail } from "./recurring.expenses.detail.model";

export class Expenses implements Calculate, IDTOConvertible<ExpensesDTO> {

    private fixedExpensesDetail: FixedExpensesDetail;
    private recurringExpensesDetail: RecurringExpensesDetail;
    private initialCostsDetail: InitialCostsDetail;

    constructor(
        fixedExpensesDetail: FixedExpensesDetail,
        recurringExpensesDetail: RecurringExpensesDetail,
        initialCostsDetail: InitialCostsDetail,
    ) {
        this.fixedExpensesDetail = fixedExpensesDetail;
        this.recurringExpensesDetail = recurringExpensesDetail;
        this.initialCostsDetail = initialCostsDetail;
    }

    getTotalAmount(numberOfBedrooms: number = 0): ValueAmountInput {
        const totalFixedExpenses = this.getTotalFixedExpensesAmount(numberOfBedrooms).amount;
        const totalRecurringExpenses = this.getTotalRecurringExpenses(numberOfBedrooms).amount;
        const totalInitialCosts = this.getTotalInitialCostsDetail().amount;
        return {
            type: ValueType.AMOUNT,
            amount: totalFixedExpenses + totalRecurringExpenses + totalInitialCosts,
        };
    }

    getTotalFixedExpensesAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.fixedExpensesDetail.getTotalAmount(numberOfYears);
    }

    getTotalRecurringExpenses(numberOfYears: number = 0): ValueAmountInput {
        return this.recurringExpensesDetail.getTotalAmount(numberOfYears);
    }

    getTotalInitialCostsDetail(): ValueAmountInput {
        return this.initialCostsDetail.getTotalAmount();
    }

    getDownPaymentPercentage(): ValueRateInput {
        return this.initialCostsDetail.calculateDownPaymentPercentage();
    }

    getDownPaymentAmount(): ValueAmountInput {
        return this.initialCostsDetail.calculateDownPaymentAmount();
    }

    toDTO() {
        return {
            fixedMonthlyExpenses: this.fixedExpensesDetail.toDTO(),
            recurringExpenses: this.recurringExpensesDetail.toDTO(),
            initialCosts: this.initialCostsDetail.toDTO(),
        };
    }

}