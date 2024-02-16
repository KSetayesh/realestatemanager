import { OperatingExpensesDTO } from "@realestatemanager/shared";

export class OperatingExpenses {
    propertyManagementRate?: number;
    vacancyRate?: number;
    maintenanceRate?: number;
    otherExpensesRate?: number;
    capExReserveRate?: number;
    legalAndProfessionalFees?: number;
    initialRepairCosts?: number;

    constructor() { }

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
