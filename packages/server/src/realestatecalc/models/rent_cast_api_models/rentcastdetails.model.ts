import { RentCastDetailsDTO } from "@realestatemanager/shared";

export class RentCastDetails {

    private _apiCallsThisMonth: number;
    private _numberOfFreeApiCalls: number;
    private _billingPeriod: number;
    private _firstBilledOn: Date;

    constructor(
        apiCallsThisMonth: number,
        numberOfFreeApiCalls: number,
        billingPeriod: number,
        firstBilledOn: Date,
    ) {
        this._apiCallsThisMonth = apiCallsThisMonth;
        this._numberOfFreeApiCalls = numberOfFreeApiCalls;
        this._billingPeriod = billingPeriod;
        this._firstBilledOn = firstBilledOn;
    }

    get canMakeFreeApiCall(): boolean {
        return this.remainingNumberOfFreeApiCalls > 0;
    }

    get apiCallsThisMonth(): number {
        return this._apiCallsThisMonth;
    }

    get billingPeriod(): number {
        return this._billingPeriod;
    }

    get firstBilledOn(): Date {
        return this._firstBilledOn;
    }

    get numberOfFreeApiCalls(): number {
        return this._numberOfFreeApiCalls;
    }

    get remainingNumberOfFreeApiCalls(): number {
        return this.numberOfFreeApiCalls - this.apiCallsThisMonth;
    }

    toDTO(): RentCastDetailsDTO {
        return {
            apiCallsThisMonth: this.apiCallsThisMonth,
            numberOfFreeApiCalls: this.numberOfFreeApiCalls,
            remainingNumberOfFreeApiCalls: this.remainingNumberOfFreeApiCalls,
            canMakeApiCalls: this.canMakeFreeApiCall,
            billingPeriod: this.billingPeriod,
            firstBilledOn: this.firstBilledOn,
        };

    }

}