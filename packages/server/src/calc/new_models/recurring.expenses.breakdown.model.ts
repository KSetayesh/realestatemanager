import { RecurringExpensesBreakdownDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";

export class RecurringExpensesBreakdown implements IDTOConvertible<RecurringExpensesBreakdownDTO> {

    private propertyManagementAmount: number;
    private vacancyAmount: number;
    private maintenanceAmount: number;
    private otherExpensesAmount: number;
    private capExReserveAmount: number;

    constructor(propertyManagementAmount: number,
        vacancyAmount: number,
        maintenanceAmount: number,
        otherExpensesAmount: number,
        capExReserveAmount: number) {

        this.propertyManagementAmount = propertyManagementAmount;
        this.vacancyAmount = vacancyAmount;
        this.maintenanceAmount = maintenanceAmount;
        this.otherExpensesAmount = otherExpensesAmount;
        this.capExReserveAmount = capExReserveAmount;
    }

    getTotalRecurringCosts(): number {
        return this.toDTO().totalCosts;
    }

    toDTO(): RecurringExpensesBreakdownDTO {
        const propertyManagementAmount = this.propertyManagementAmount;
        const vacancyAmount = this.vacancyAmount;
        const maintenanceAmount = this.maintenanceAmount;
        const otherExpensesAmount = this.otherExpensesAmount;
        const capExReserveAmount = this.capExReserveAmount;

        const totalCosts = propertyManagementAmount + vacancyAmount + maintenanceAmount + otherExpensesAmount + capExReserveAmount;

        return {
            totalCosts: totalCosts,
            breakdown: {
                propertyManagementAmount: propertyManagementAmount,
                vacancyAmount: vacancyAmount,
                maintenanceAmount: maintenanceAmount,
                otherExpensesAmount: otherExpensesAmount,
                capExReserveAmount: capExReserveAmount,
            },
        }
    }
}