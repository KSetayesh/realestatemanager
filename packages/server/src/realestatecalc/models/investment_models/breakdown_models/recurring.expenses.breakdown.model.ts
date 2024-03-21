import { RecurringExpensesDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "../../idtoconvertible.model";
import { Breakdown } from "./breakdown.model";
import { Transaction } from "../transaction_models/transaction.model";

export class RecurringExpensesBreakdown implements Breakdown, IDTOConvertible<RecurringExpensesDTO> {

    private propertyManagementRate: Transaction;
    private vacancyRate: Transaction;
    private maintenanceRate: Transaction;
    private otherExpensesRate: Transaction;
    private capExReserveRate: Transaction;

    constructor(
        propertyManagementRate: Transaction,
        vacancyRate: Transaction,
        maintenanceRate: Transaction,
        otherExpensesRate: Transaction,
        capExReserveRate: Transaction
    ) {
        this.propertyManagementRate = propertyManagementRate;
        this.vacancyRate = vacancyRate;
        this.maintenanceRate = maintenanceRate;
        this.otherExpensesRate = otherExpensesRate;
        this.capExReserveRate = capExReserveRate;
    }

    getTotalAmount(numberOfYears: number = 0): number {
        return this.getPropertyManagementAmount(numberOfYears) +
            this.getVacancyAmount(numberOfYears) +
            this.getMaintenanceAmount(numberOfYears) +
            this.getOtherExpensesAmount(numberOfYears) +
            this.getCapExReserveAmount(numberOfYears);
    }

    toDTO(): RecurringExpensesDTO {
        return {
            propertyManagementRate: this.getPropertyManagementRate(),
            vacancyRate: this.getVacancyRate(),
            maintenanceRate: this.getMaintenanceRate(),
            otherExpensesRate: this.getOtherExpensesRate(),
            capExReserveRate: this.getCapExReserveRate(),
        }
    }

    private getPropertyManagementAmount(numberOfYears: number = 0): number {
        return this.propertyManagementRate.getProjectedValue(numberOfYears);
    }

    private getPropertyManagementRate(): number {
        return this.propertyManagementRate.getRate();
    }

    private getVacancyAmount(numberOfYears: number = 0): number {
        return this.vacancyRate.getProjectedValue(numberOfYears);
    }

    private getVacancyRate(): number {
        return this.vacancyRate.getRate();
    }

    private getMaintenanceAmount(numberOfYears: number = 0): number {
        return this.maintenanceRate.getProjectedValue(numberOfYears);
    }

    private getMaintenanceRate(): number {
        return this.maintenanceRate.getRate();
    }

    private getOtherExpensesAmount(numberOfYears: number = 0): number {
        return this.otherExpensesRate.getProjectedValue(numberOfYears);
    }

    private getOtherExpensesRate(): number {
        return this.otherExpensesRate.getRate();
    }

    private getCapExReserveAmount(numberOfYears: number = 0): number {
        return this.capExReserveRate.getProjectedValue(numberOfYears);
    }

    private getCapExReserveRate(): number {
        return this.capExReserveRate.getRate();
    }

}