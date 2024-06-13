import { IDTOConvertible, RentCastDetailsResponseDTO, Utility } from "@realestatemanager/types";
import { Entity } from "src/shared/entity";
import { PropertyUtility } from "src/utility/PropertyUtility";

export class RentCastDetails extends Entity implements IDTOConvertible<RentCastDetailsResponseDTO> {

    private _apiCallsThisMonth: number;
    private _numberOfFreeApiCalls: number;
    private _billingPeriod: number;
    private _mostRecentBillingDate: Date;
    private _firstBilledOn: Date;
    private _email: string; // Sensative info don't want to expose in getter
    private _apiKeyName: string; // Sensative info don't want to expose in getter
    private _apiKey: string;

    constructor(
        id: number,
        apiCallsThisMonth: number,
        numberOfFreeApiCalls: number,
        billingPeriod: number,
        mostRecentBillingDate: Date,
        firstBilledOn: Date,
        email: string,
        apiKeyName: string,
        apiKey: string,
    ) {
        super(id);
        this._apiCallsThisMonth = apiCallsThisMonth;
        this._numberOfFreeApiCalls = numberOfFreeApiCalls;
        this._billingPeriod = billingPeriod;
        this._mostRecentBillingDate = mostRecentBillingDate;
        this._firstBilledOn = firstBilledOn;
        this._email = email;
        this._apiKeyName = apiKeyName;
        this._apiKey = apiKey;

    }

    get canMakeFreeApiCall(): boolean {
        return this.remainingNumberOfFreeApiCalls > 0 && Utility.isValidString(this.apiKey);
    }

    get apiCallsThisMonth(): number {
        return this._apiCallsThisMonth;
    }

    get billingPeriod(): number {
        return this._billingPeriod;
    }

    get mostRecentBillingDate(): Date {
        return this._mostRecentBillingDate;
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

    get daysIntoBillingPeriod(): number {
        return PropertyUtility.calculateDaysPassedSinceIgnoreTime(this.mostRecentBillingDate);
    }

    get email(): string {
        return this._email;
    }

    get apiKeyName(): string {
        return this._apiKeyName;
    }

    get apiKey(): string {
        return this._apiKey;
    }

    toDTO(): RentCastDetailsResponseDTO {
        return {
            apiKeyName: this.apiKeyName,
            apiCallsThisMonth: this.apiCallsThisMonth,
            numberOfFreeApiCalls: this.numberOfFreeApiCalls,
            remainingNumberOfFreeApiCalls: this.remainingNumberOfFreeApiCalls,
            canMakeApiCalls: this.canMakeFreeApiCall,
            daysIntoBillingPeriod: this.daysIntoBillingPeriod,
            billingPeriod: this.billingPeriod,
            mostRecentBillingDate: this.mostRecentBillingDate,
            firstBilledOn: this.firstBilledOn,
        };

    }

}