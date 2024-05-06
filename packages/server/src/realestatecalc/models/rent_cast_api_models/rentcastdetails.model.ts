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

    canMakeFreeApiCall(): boolean {
        return this._apiCallsThisMonth < this.numberOfFreeApiCalls;
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

}