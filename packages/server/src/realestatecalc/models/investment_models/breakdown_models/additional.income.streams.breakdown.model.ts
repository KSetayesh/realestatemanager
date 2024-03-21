import { AdditionalIncomeStreamsDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "../../idtoconvertible.model";
import { Breakdown } from "./breakdown.model";
import { Transaction } from "../transaction_models/transaction.model";

export class AdditionalIncomeStreamsBreakdown implements Breakdown, IDTOConvertible<AdditionalIncomeStreamsDTO> {

    private parkingFees: Transaction; // Income from parking facilities, if available.
    private laundryServices: Transaction; // Income from on-site laundry services.
    private storageUnitFees: Transaction; // Income from storage units, if available.
    private otherAdditionalIncomeStreams: Transaction; // Any other sources of income not covered above.

    constructor(
        parkingFees: Transaction,
        laundryServices: Transaction,
        storageUnitFees: Transaction,
        otherAdditionalIncomeStreams: Transaction
    ) {
        this.parkingFees = parkingFees;
        this.laundryServices = laundryServices;
        this.storageUnitFees = storageUnitFees;
        this.otherAdditionalIncomeStreams = otherAdditionalIncomeStreams;
    }

    getTotalAmount(numberOfYears: number = 0): number {
        return this.getParkingFees(numberOfYears) +
            this.getLaundryServices(numberOfYears) +
            this.getStorageUnitFees(numberOfYears) +
            this.getOtherAdditionalIncomeStreams(numberOfYears);
    }

    toDTO(numberOfYears: number = 0): AdditionalIncomeStreamsDTO {
        return {
            parkingFees: this.getParkingFees(numberOfYears),
            laundryServices: this.getLaundryServices(numberOfYears),
            storageUnitFees: this.getStorageUnitFees(numberOfYears),
            otherAdditionalIncomeStreams: this.getOtherAdditionalIncomeStreams(numberOfYears),
        }
    }

    private getParkingFees(numberOfYears: number = 0): number {
        return this.parkingFees.getProjectedValue(numberOfYears);
    }

    private getLaundryServices(numberOfYears: number = 0): number {
        return this.laundryServices.getProjectedValue(numberOfYears);
    }

    private getStorageUnitFees(numberOfYears: number = 0): number {
        return this.storageUnitFees.getProjectedValue(numberOfYears);
    }

    private getOtherAdditionalIncomeStreams(numberOfYears: number = 0): number {
        return this.otherAdditionalIncomeStreams.getProjectedValue(numberOfYears);
    }

}