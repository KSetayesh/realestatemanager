import { OperatingExpensesDTO, ValueInput, ValueType } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";

export class OperatingExpenses implements IDTOConvertible<OperatingExpensesDTO>{
    private propertyManagementRate?: number;
    private vacancyRate?: number;
    private maintenanceRate?: number;
    private otherExpensesRate?: number;
    private capExReserveRate?: number;
    private legalAndProfessionalFees?: number;
    private initialRepairCosts?: number;
    private travelingCosts?: number;
    private closingCosts?: number;
    private otherInitialExpenses?: number;

    constructor(propertyManagementRate?: number,
        vacancyRate?: number,
        maintenanceRate?: number,
        otherExpensesRate?: number,
        capExReserveRate?: number,
        legalAndProfessionalFees?: number,
        initialRepairCosts?: number,
        travelingCosts?: number,
        closingCosts?: number,
        otherInitialExpenses?: number) {

        this.propertyManagementRate = propertyManagementRate;
        this.vacancyRate = vacancyRate;
        this.maintenanceRate = maintenanceRate;
        this.otherExpensesRate = otherExpensesRate;
        this.capExReserveRate = capExReserveRate;
        this.legalAndProfessionalFees = legalAndProfessionalFees;
        this.initialRepairCosts = initialRepairCosts;
        this.travelingCosts = travelingCosts;
        this.closingCosts = closingCosts;
        this.otherInitialExpenses = otherInitialExpenses;
    }

    getPropertyManagementRate(): number {
        return this.propertyManagementRate;
    }

    getVacancyRate(): number {
        return this.vacancyRate;
    }

    getMaintenanceRate(): number {
        return this.maintenanceRate;
    }

    getOtherExpensesRate(): number {
        return this.otherExpensesRate;
    }

    getCapExReserveRate(): number {
        return this.capExReserveRate;
    }

    getLegalAndProfessionalFees(): number {
        return this.legalAndProfessionalFees;
    }

    getInitialRepairCosts(): number {
        return this.initialRepairCosts;
    }

    getTravelingCosts(): number {
        return this.travelingCosts;
    }

    getClosingCosts(): number {
        return this.closingCosts;
    }

    getOtherInitialExpenses(): number {
        return this.otherInitialExpenses;
    }

    calculateRecurringExpenses(): number {
        return (this.propertyManagementRate + this.vacancyRate + this.maintenanceRate + this.otherExpensesRate + this.capExReserveRate) / 100;
    }

    calculateOneTimeExpenses(): number {
        return this.legalAndProfessionalFees + this.initialRepairCosts + this.travelingCosts + this.closingCosts + this.otherInitialExpenses;
    }

    toDTO(): OperatingExpensesDTO {
        return {
            propertyManagementRate: this.propertyManagementRate,
            vacancyRate: this.vacancyRate,
            maintenanceRate: this.maintenanceRate,
            otherExpensesRate: this.otherExpensesRate,
            capExReserveRate: this.capExReserveRate,
            legalAndProfessionalFees: {
                type: ValueType.AMOUNT,
                amount: this.legalAndProfessionalFees,
            },
            initialRepairCosts: {
                type: ValueType.AMOUNT,
                amount: this.initialRepairCosts,
            },
            travelingCosts: {
                type: ValueType.AMOUNT,
                amount: this.initialRepairCosts,
            },
            closingCosts: {
                type: ValueType.AMOUNT,
                amount: this.closingCosts,
            },
            otherInitialExpenses: {
                type: ValueType.AMOUNT,
                amount: this.otherInitialExpenses,
            },
        };
    }
}
