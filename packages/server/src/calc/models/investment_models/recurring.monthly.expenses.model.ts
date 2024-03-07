import { RecurringExpensesBreakdownDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "../idtoconvertible.model";
import { Expenses } from "./expenses.model";

export class RecurringMonthlyExpenses implements Expenses, IDTOConvertible<RecurringExpensesBreakdownDTO> {

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

    toDTO(): RecurringExpensesBreakdownDTO {
        return null;
        // const propertyManagementAmount = this.propertyManagementAmount;
        // const vacancyAmount = this.vacancyAmount;
        // const maintenanceAmount = this.maintenanceAmount;
        // const otherExpensesAmount = this.otherExpensesAmount;
        // const capExReserveAmount = this.capExReserveAmount;

        // const totalCosts = propertyManagementAmount + vacancyAmount + maintenanceAmount + otherExpensesAmount + capExReserveAmount;

        // return {
        //     totalCosts: totalCosts,
        //     breakdown: {
        //         propertyManagementAmount: propertyManagementAmount,
        //         vacancyAmount: vacancyAmount,
        //         maintenanceAmount: maintenanceAmount,
        //         otherExpensesAmount: otherExpensesAmount,
        //         capExReserveAmount: capExReserveAmount,
        //     },
        // }
    }
}