import { AdditionalIncomeStreamsDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";


export class AdditionalIncomeStreams implements IDTOConvertible<AdditionalIncomeStreamsDTO> {

    private parkingFees?: number; // Income from parking facilities, if available.
    private laundryServices?: number; // Income from on-site laundry services.
    private storageUnitFees?: number; // Income from storage units, if available.
    private other?: number; // Any other sources of income not covered above.

    constructor(parkingFees?: number, laundryServices?: number, storageUnitFees?: number, other?: number) {
        this.parkingFees = parkingFees;
        this.laundryServices = laundryServices;
        this.storageUnitFees = storageUnitFees;
        this.other = other;
    }

    getTotalIncomeAmount(): number {
        return this.toDTO().totalAmount;
    }

    toDTO(): AdditionalIncomeStreamsDTO {
        const parkingFees = this.parkingFees;
        const laundryServices = this.laundryServices;
        const storageUnitFees = this.storageUnitFees;
        const other = this.other;
        const totalAmount = parkingFees + laundryServices + storageUnitFees + other;

        return {
            totalAmount: totalAmount,
            breakdown: {
                parkingFees: parkingFees,
                laundryServices: laundryServices,
                storageUnitFees: storageUnitFees,
                other: other,
            },
        };
    }

}