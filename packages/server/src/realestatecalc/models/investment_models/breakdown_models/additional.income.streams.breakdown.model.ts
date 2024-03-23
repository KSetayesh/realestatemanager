import { AdditionalIncomeStreamsDTO, ValueAmountInput, ValueRateInput } from "@realestatemanager/shared";
import { IDTOConvertible } from "../../idtoconvertible.model";
import { Breakdown } from "./breakdown.model";
import { IncomeCalculator } from "../new_calculators/transaction.calculator";

export class AdditionalIncomeStreamsBreakdown implements Breakdown, IDTOConvertible<AdditionalIncomeStreamsDTO> {

    private parkingFees: ValueAmountInput; // Income from parking facilities, if available.
    private laundryServices: ValueAmountInput; // Income from on-site laundry services.
    private storageUnitFees: ValueAmountInput; // Income from storage units, if available.
    private otherAdditionalIncomeStreams: ValueAmountInput; // Any other sources of income not covered above.

    constructor(
        parkingFees: ValueAmountInput,
        laundryServices: ValueAmountInput,
        storageUnitFees: ValueAmountInput,
        otherAdditionalIncomeStreams: ValueAmountInput,
    ) {
        this.parkingFees = parkingFees;
        this.laundryServices = laundryServices;
        this.storageUnitFees = storageUnitFees;
        this.otherAdditionalIncomeStreams = otherAdditionalIncomeStreams;
    }

    calculateAdditionalIncomes(
        incomeGrowthRate: ValueRateInput,
        appreciationGrowthRate: ValueRateInput,
        numberOfYears: number = 0
    ): number {
        return this.getParkingFeesAmount(incomeGrowthRate, appreciationGrowthRate, numberOfYears) +
            this.getLaundryServicesAmount(incomeGrowthRate, appreciationGrowthRate, numberOfYears) +
            this.getStorageUnitFeesAmount(incomeGrowthRate, appreciationGrowthRate, numberOfYears) +
            this.getOtherAdditionalIncomeStreamsAmount(incomeGrowthRate, appreciationGrowthRate, numberOfYears);
    }

    getParkingFeesAmount(
        incomeGrowthRate: ValueRateInput,
        appreciationGrowthRate: ValueRateInput,
        numberOfYears: number = 0
    ): number {
        const incomeCalculator: IncomeCalculator =
            new IncomeCalculator(incomeGrowthRate, appreciationGrowthRate);
        return incomeCalculator.getAmount(this.parkingFees, numberOfYears);
    }

    getLaundryServicesAmount(
        incomeGrowthRate: ValueRateInput,
        appreciationGrowthRate: ValueRateInput,
        numberOfYears: number = 0
    ): number {
        const incomeCalculator: IncomeCalculator =
            new IncomeCalculator(incomeGrowthRate, appreciationGrowthRate);
        return incomeCalculator.getAmount(this.laundryServices, numberOfYears);
    }

    getStorageUnitFeesAmount(
        incomeGrowthRate: ValueRateInput,
        appreciationGrowthRate: ValueRateInput,
        numberOfYears: number = 0
    ): number {
        const incomeCalculator: IncomeCalculator =
            new IncomeCalculator(incomeGrowthRate, appreciationGrowthRate);
        return incomeCalculator.getAmount(this.storageUnitFees, numberOfYears);
    }

    getOtherAdditionalIncomeStreamsAmount(
        incomeGrowthRate: ValueRateInput,
        appreciationGrowthRate: ValueRateInput,
        numberOfYears: number = 0
    ): number {
        const incomeCalculator: IncomeCalculator =
            new IncomeCalculator(incomeGrowthRate, appreciationGrowthRate);
        return incomeCalculator.getAmount(this.otherAdditionalIncomeStreams, numberOfYears);
    }

    // getTotalAmount(numberOfYears: number = 0): number {
    //     return this.getParkingFees(numberOfYears) +
    //         this.getLaundryServices(numberOfYears) +
    //         this.getStorageUnitFees(numberOfYears) +
    //         this.getOtherAdditionalIncomeStreams(numberOfYears);
    // }

    // toDTO(numberOfYears: number = 0): AdditionalIncomeStreamsDTO {
    //     return {
    //         parkingFees: this.getParkingFees(numberOfYears),
    //         laundryServices: this.getLaundryServices(numberOfYears),
    //         storageUnitFees: this.getStorageUnitFees(numberOfYears),
    //         otherAdditionalIncomeStreams: this.getOtherAdditionalIncomeStreams(numberOfYears),
    //     }
    // }

    // private getParkingFees(numberOfYears: number = 0): number {
    //     return this.parkingFees.getProjectedValue(numberOfYears);
    // }

    // private getLaundryServices(numberOfYears: number = 0): number {
    //     return this.laundryServices.getProjectedValue(numberOfYears);
    // }

    // private getStorageUnitFees(numberOfYears: number = 0): number {
    //     return this.storageUnitFees.getProjectedValue(numberOfYears);
    // }

    // private getOtherAdditionalIncomeStreams(numberOfYears: number = 0): number {
    //     return this.otherAdditionalIncomeStreams.getProjectedValue(numberOfYears);
    // }

}