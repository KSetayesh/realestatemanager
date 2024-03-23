import { RecurringExpensesDTO, ValueAmountInput, ValueInput, ValueRateInput } from "@realestatemanager/shared";
import { IDTOConvertible } from "../../idtoconvertible.model";
import { Breakdown } from "./breakdown.model";
import { RecurringExpensesCalculator } from "../new_calculators/transaction.calculator";

export class RecurringExpensesBreakdown implements Breakdown, IDTOConvertible<RecurringExpensesDTO> {

    private propertyManagementRate: ValueRateInput;
    private vacancyRate: ValueRateInput;
    private maintenanceRate: ValueRateInput;
    private otherExpensesRate: ValueRateInput;
    private capExReserveRate: ValueRateInput;

    constructor(
        propertyManagementRate: ValueRateInput,
        vacancyRate: ValueRateInput,
        maintenanceRate: ValueRateInput,
        otherExpensesRate: ValueRateInput,
        capExReserveRate: ValueRateInput
    ) {
        this.propertyManagementRate = propertyManagementRate;
        this.vacancyRate = vacancyRate;
        this.maintenanceRate = maintenanceRate;
        this.otherExpensesRate = otherExpensesRate;
        this.capExReserveRate = capExReserveRate;
    }

    calculateRecurringExpenses(
        rentalAmount: ValueAmountInput,
        rentalGrowthRate: ValueRateInput,
        numberOfYears: number = 0
    ): number {
        return this.getPropertyManagementAmount(rentalAmount, rentalGrowthRate, numberOfYears) +
            this.getVacancyAmount(rentalAmount, rentalGrowthRate, numberOfYears) +
            this.getMaintenanceAmount(rentalAmount, rentalGrowthRate, numberOfYears) +
            this.getOtherExpensesAmount(rentalAmount, rentalGrowthRate, numberOfYears) +
            this.getCapExReserveAmount(rentalAmount, rentalGrowthRate, numberOfYears);
    }

    getPropertyManagementAmount(
        rentalAmount: ValueAmountInput,
        rentalGrowthRate: ValueRateInput,
        numberOfYears: number = 0): number {
        const calculator: RecurringExpensesCalculator = new RecurringExpensesCalculator(rentalGrowthRate);
        return calculator.getAmount(this.propertyManagementRate, rentalAmount.amount, numberOfYears);
    }

    getVacancyAmount(
        rentalAmount: ValueAmountInput,
        rentalGrowthRate: ValueRateInput,
        numberOfYears: number = 0): number {
        const calculator: RecurringExpensesCalculator = new RecurringExpensesCalculator(rentalGrowthRate);
        return calculator.getAmount(this.vacancyRate, rentalAmount.amount, numberOfYears);
    }

    getMaintenanceAmount(
        rentalAmount: ValueAmountInput,
        rentalGrowthRate: ValueRateInput,
        numberOfYears: number = 0): number {
        const calculator: RecurringExpensesCalculator = new RecurringExpensesCalculator(rentalGrowthRate);
        return calculator.getAmount(this.maintenanceRate, rentalAmount.amount, numberOfYears);
    }

    getOtherExpensesAmount(
        rentalAmount: ValueAmountInput,
        rentalGrowthRate: ValueRateInput,
        numberOfYears: number = 0): number {
        const calculator: RecurringExpensesCalculator = new RecurringExpensesCalculator(rentalGrowthRate);
        return calculator.getAmount(this.otherExpensesRate, rentalAmount.amount, numberOfYears);
    }

    getCapExReserveAmount(
        rentalAmount: ValueAmountInput,
        rentalGrowthRate: ValueRateInput,
        numberOfYears: number = 0): number {
        const calculator: RecurringExpensesCalculator = new RecurringExpensesCalculator(rentalGrowthRate);
        return calculator.getAmount(this.capExReserveRate, rentalAmount.amount, numberOfYears);
    }

    toDTO(): RecurringExpensesDTO {
        return {
            propertyManagementRate: this.propertyManagementRate.rate,
            vacancyRate: this.vacancyRate.rate,
            maintenanceRate: this.maintenanceRate.rate,
            otherExpensesRate: this.otherExpensesRate.rate,
            capExReserveRate: this.capExReserveRate.rate,
        }
    }

}