import { AdditionalIncomeStreamsDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "../idtoconvertible.model";
import { Income } from "./transaction.model";


export class AdditionalIncomeStreams implements Income, IDTOConvertible<AdditionalIncomeStreamsDTO> {

    private parkingFees?: number; // Income from parking facilities, if available.
    private laundryServices?: number; // Income from on-site laundry services.
    private storageUnitFees?: number; // Income from storage units, if available.
    private otherAdditionalIncomeStreams?: number; // Any other sources of income not covered above.

    constructor(
        parkingFees?: number,
        laundryServices?: number,
        storageUnitFees?: number,
        otherAdditionalIncomeStreams?: number) {

        this.parkingFees = parkingFees;
        this.laundryServices = laundryServices;
        this.storageUnitFees = storageUnitFees;
        this.otherAdditionalIncomeStreams = otherAdditionalIncomeStreams;
    }

    totalIncomes(): number {
        return this.parkingFees + this.laundryServices + this.storageUnitFees + this.otherAdditionalIncomeStreams;
    }

    isIncome(): boolean {
        return true;
    }

    isExpense(): boolean {
        return false;
    }

    toDTO(): AdditionalIncomeStreamsDTO {
        return {
            parkingFees: this.parkingFees,
            laundryServices: this.laundryServices,
            storageUnitFees: this.storageUnitFees,
            otherAdditionalIncomeStreams: this.otherAdditionalIncomeStreams,
        };
    }

}