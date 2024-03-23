import { ValueAmountInput } from "@realestatemanager/shared";
import { Breakdown } from "./fixed.expenses.breakdown.model";

export class IncomeStreamsBreakdown {

    private rentalAmount: Breakdown;
    private parkingFees: Breakdown; // ValueAmountInput; // Income from parking facilities, if available.
    private laundryServices: Breakdown; //ValueAmountInput; // Income from on-site laundry services.
    private storageUnitFees: Breakdown; //ValueAmountInput; // Income from storage units, if available.
    private otherAdditionalIncomeStreams: Breakdown;//ValueAmountInput; // Any other sources of income not covered above.

    constructor(
        rentalAmount: Breakdown,
        parkingFees: Breakdown,
        laundryServices: Breakdown,
        storageUnitFees: Breakdown,
        otherAdditionalIncomeStreams: Breakdown,
    ) {
        this.rentalAmount = rentalAmount;
        this.parkingFees = parkingFees;
        this.laundryServices = laundryServices;
        this.storageUnitFees = storageUnitFees;
        this.otherAdditionalIncomeStreams = otherAdditionalIncomeStreams;
    }

    getRentalAmount(): Breakdown {
        return this.rentalAmount;
    }

    getParkingFees(): Breakdown {
        return this.parkingFees;
    }

    getLaundryService(): Breakdown {
        return this.laundryServices;
    }

    getStorageUnitFees(): Breakdown {
        return this.storageUnitFees;
    }

    getOtherAdditionalIncomeStreams(): Breakdown {
        return this.otherAdditionalIncomeStreams;
    }

}