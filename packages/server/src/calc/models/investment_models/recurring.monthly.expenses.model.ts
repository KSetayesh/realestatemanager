import { RecurringExpensesDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "../idtoconvertible.model";
import { Expense } from "./transaction.model";

export class RecurringMonthlyExpenses implements Expense, IDTOConvertible<RecurringExpensesDTO> {

    private propertyManagementRate: number;
    private vacancyRate: number;
    private maintenanceRate: number;
    private otherExpensesRate: number;
    private capExReserveRate: number;

    constructor(
        propertyManagementRate: number,
        vacancyRate: number,
        maintenanceRate: number,
        otherExpensesRate: number,
        capExReserveRate: number) {

        this.propertyManagementRate = propertyManagementRate;
        this.vacancyRate = vacancyRate;
        this.maintenanceRate = maintenanceRate;
        this.otherExpensesRate = otherExpensesRate;
        this.capExReserveRate = capExReserveRate;
    }

    totalExpenses(): number {
        return this.propertyManagementRate +
            this.vacancyRate +
            this.maintenanceRate +
            this.otherExpensesRate +
            this.capExReserveRate;
    }

    isIncome(): boolean {
        return false;
    }

    isExpense(): boolean {
        return true;
    }

    toDTO(): RecurringExpensesDTO {
        return {
            propertyManagementRate: this.propertyManagementRate,
            vacancyRate: this.vacancyRate,
            maintenanceRate: this.maintenanceRate,
            otherExpensesRate: this.otherExpensesRate,
            capExReserveRate: this.capExReserveRate,
        };
    }
}