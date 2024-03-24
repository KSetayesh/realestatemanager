import { RecurringExpensesDTO, ValueAmountInput, ValueRateInput, ValueType, isValueRateInput } from "@realestatemanager/shared";
import { RecurringExpensesBreakdown } from "./recurring.expenses.breakdown.model";
import { Breakdown } from "./fixed.expenses.breakdown.model";
import { Calculate } from "./calculate.model";
import { IDTOConvertible } from "../../idtoconvertible.model";
import { RecurringExpensesCalculator } from "../new_calculators/recurring.expense.projection.calculator";

export class RecurringExpensesDetail implements Calculate, IDTOConvertible<RecurringExpensesDTO> {

    private recurringExpensesBreakdown: RecurringExpensesBreakdown;
    private rentalGrowthRate: ValueRateInput;
    private inititalRentalAmount: ValueAmountInput;
    private recurringExpensesCalculator: RecurringExpensesCalculator;

    private propertyManagement = 'Property Management';
    private vacancy = 'Vacancy';
    private maintenance = 'Maintenance';
    private otherExpenses = 'Other Expenses';
    private capExReserve = 'Cap Ex Reserve';

    constructor(
        recurringExpensesBreakdown: RecurringExpensesBreakdown,
        rentalGrowthRate: ValueRateInput,
        inititalRentalAmount: ValueAmountInput,
    ) {
        this.recurringExpensesBreakdown = recurringExpensesBreakdown;
        this.rentalGrowthRate = rentalGrowthRate;
        this.inititalRentalAmount = inititalRentalAmount;
        this.recurringExpensesCalculator =
            new RecurringExpensesCalculator(
                this.rentalGrowthRate,
                this.inititalRentalAmount
            );
    }

    getTotalAmount(numberOfYears: number = 0): ValueAmountInput {
        const propertyManagementAmount = this.calculatePropertyManagementAmount(numberOfYears).amount;
        const vacancyAmount = this.calculateVacancyAmount(numberOfYears).amount;
        const maintenanceAmount = this.calculateMaintenanceAmount(numberOfYears).amount;
        const otherExpensesAmount = this.calculateOtherExpensesAmount(numberOfYears).amount;
        const capExReserveAmount = this.calculateCapExReserveAmount(numberOfYears).amount;
        return {
            type: ValueType.AMOUNT,
            amount: propertyManagementAmount +
                vacancyAmount +
                maintenanceAmount +
                otherExpensesAmount +
                capExReserveAmount
        };
    }

    calculatePropertyManagementAmount(numberOfYears: number = 0): ValueAmountInput {
        const propertyManagementRate: Breakdown = this.recurringExpensesBreakdown.getPropertyManagementRate();
        return this.calculateAmount(propertyManagementRate, this.propertyManagement, numberOfYears);
    }

    getPropertyManagementRate(): ValueRateInput {
        const propertyManagementRate: Breakdown = this.recurringExpensesBreakdown.getPropertyManagementRate();
        return this.calculateRate(propertyManagementRate, this.propertyManagement);
    }

    calculateVacancyAmount(numberOfYears: number = 0): ValueAmountInput {
        const vacancyRate: Breakdown = this.recurringExpensesBreakdown.getVacancyRate();
        return this.calculateAmount(vacancyRate, this.vacancy, numberOfYears);
    }

    getVacancyRate(): ValueRateInput {
        const vacancyRate: Breakdown = this.recurringExpensesBreakdown.getVacancyRate();
        return this.calculateRate(vacancyRate, this.vacancy);
    }

    calculateMaintenanceAmount(numberOfYears: number = 0): ValueAmountInput {
        const maintenanceRate: Breakdown = this.recurringExpensesBreakdown.getMaintenanceRate();
        return this.calculateAmount(maintenanceRate, this.maintenance, numberOfYears);
    }

    getMaintenanceRate(): ValueRateInput {
        const maintenanceRate: Breakdown = this.recurringExpensesBreakdown.getMaintenanceRate();
        return this.calculateRate(maintenanceRate, this.maintenance);
    }

    calculateOtherExpensesAmount(numberOfYears: number = 0): ValueAmountInput {
        const otherExpensesRate: Breakdown = this.recurringExpensesBreakdown.getOtherExpensesRate();
        return this.calculateAmount(otherExpensesRate, this.otherExpenses, numberOfYears);
    }

    getOtherExpensesRate(): ValueRateInput {
        const otherExpensesRate: Breakdown = this.recurringExpensesBreakdown.getOtherExpensesRate();
        return this.calculateRate(otherExpensesRate, this.otherExpenses);
    }

    calculateCapExReserveAmount(numberOfYears: number = 0): ValueAmountInput {
        const capExReserveRate: Breakdown = this.recurringExpensesBreakdown.getCapExReserveRate();
        return this.calculateAmount(capExReserveRate, this.capExReserve, numberOfYears);
    }

    getCapExReserveRate(): ValueRateInput {
        const capExReserveRate: Breakdown = this.recurringExpensesBreakdown.getCapExReserveRate();
        return this.calculateRate(capExReserveRate, this.capExReserve);
    }

    toDTO(): RecurringExpensesDTO {
        return {
            propertyManagementRate: this.getPropertyManagementRate().rate,
            vacancyRate: this.getVacancyRate().rate,
            maintenanceRate: this.getMaintenanceRate().rate,
            otherExpensesRate: this.getOtherExpensesRate().rate,
            capExReserveRate: this.getCapExReserveRate().rate,
        };
    }

    private calculateAmount(breakdown: Breakdown, recurringExpense: string, numberOfYears: number = 0): ValueAmountInput {
        // const rentalAmount: Breakdown = this.incomesStreamsBreakdown.getRentalAmount();
        if (isValueRateInput(breakdown.value)) {
            return this.recurringExpensesCalculator.getAmount(
                breakdown.value,
                numberOfYears
            );
        }
        throw new Error(`${recurringExpense} is not an "Amount"`);
    }

    private calculateRate(breakdown: Breakdown, recurringExpense: string): ValueRateInput {
        // const rentalAmount: Breakdown = this.incomesStreamsBreakdown.getRentalAmount();
        if (isValueRateInput(breakdown.value)) {
            return this.recurringExpensesCalculator.getRate(
                breakdown.value,
            );
        }
        throw new Error(`${recurringExpense} is not a "Rate"`);
    }


}