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

    constructor(propertyManagementRate?: number,
        vacancyRate?: number,
        maintenanceRate?: number,
        otherExpensesRate?: number,
        capExReserveRate?: number,
        legalAndProfessionalFees?: number,
        initialRepairCosts?: number) {

        this.propertyManagementRate = propertyManagementRate;
        this.vacancyRate = vacancyRate;
        this.maintenanceRate = maintenanceRate;
        this.otherExpensesRate = otherExpensesRate;
        this.capExReserveRate = capExReserveRate;
        this.legalAndProfessionalFees = legalAndProfessionalFees;
        this.initialRepairCosts = initialRepairCosts;
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
