import { OperatingExpensesDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";

export class OperatingExpenses implements IDTOConvertible<OperatingExpensesDTO>{
    private propertyManagementRate?: number;
    private vacancyRate?: number;
    private maintenanceRate?: number;
    private otherExpensesRate?: number;
    private capExReserveRate?: number;
    private legalAndProfessionalFees?: number;
    private initialRepairCosts?: number;
    private closingCosts?: number;

    constructor(propertyManagementRate?: number,
        vacancyRate?: number,
        maintenanceRate?: number,
        otherExpensesRate?: number,
        capExReserveRate?: number,
        legalAndProfessionalFees?: number,
        initialRepairCosts?: number,
        closingCosts?: number) {

        this.propertyManagementRate = propertyManagementRate;
        this.vacancyRate = vacancyRate;
        this.maintenanceRate = maintenanceRate;
        this.otherExpensesRate = otherExpensesRate;
        this.capExReserveRate = capExReserveRate;
        this.legalAndProfessionalFees = legalAndProfessionalFees;
        this.initialRepairCosts = initialRepairCosts;
        this.closingCosts = closingCosts;
    }

    calculateRecurringExpenses(): number {
        return (this.propertyManagementRate + this.vacancyRate + this.maintenanceRate + this.otherExpensesRate + this.capExReserveRate) / 100;
    }

    calculateOneTimeExpenses(): number {
        return this.legalAndProfessionalFees + this.initialRepairCosts + this.closingCosts;
    }

    toDTO(): OperatingExpensesDTO {
        return {
            propertyManagementRate: this.propertyManagementRate,
            vacancyRate: this.vacancyRate,
            maintenanceRate: this.maintenanceRate,
            otherExpensesRate: this.otherExpensesRate,
            capExReserveRate: this.capExReserveRate,
            legalAndProfessionalFees: this.legalAndProfessionalFees,
            initialRepairCosts: this.initialRepairCosts,
        };
    }
}
