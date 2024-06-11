import { IDTOConvertible, ZillowMarketEstimatesResponseDTO } from "@realestatemanager/shared";
import { Entity } from "src/shared/entity";

export class ZillowMarketEstimates extends Entity implements IDTOConvertible<ZillowMarketEstimatesResponseDTO> {
    private _zestimate?: number; // Estimated market value
    private _zestimateRange?: {
        low?: number,
        high?: number,
    };
    private _zillowRentEstimate?: number; // Estimated rental value
    private _zillowMonthlyPropertyTaxAmount?: number;
    private _zillowMonthlyHomeInsuranceAmount?: number;
    private _zillowMonthlyHOAFeesAmount?: number;

    constructor(
        id: number,
        zestimate?: number,
        low?: number,
        high?: number,
        zillowRentEstimate?: number,
        zillowMonthlyPropertyTaxAmount?: number,
        zillowMonthlyHomeInsuranceAmount?: number,
        zillowMonthlyHOAFeesAmount?: number
    ) {
        super(id);
        this._zestimate = zestimate;
        this._zestimateRange = { low, high };
        this._zillowRentEstimate = zillowRentEstimate;
        this._zillowMonthlyPropertyTaxAmount = zillowMonthlyPropertyTaxAmount;
        this._zillowMonthlyHomeInsuranceAmount = zillowMonthlyHomeInsuranceAmount;
        this._zillowMonthlyHOAFeesAmount = zillowMonthlyHOAFeesAmount;
    }

    get zestimate(): number {
        return this._zestimate;
    }

    get zestimateRangeLow(): number {
        return this._zestimateRange.low;
    }

    get zestimateRangeHigh(): number {
        return this._zestimateRange.high;
    }

    get zillowRentEstimate(): number {
        return this._zillowRentEstimate;
    }

    get zillowMonthlyPropertyTaxAmount(): number {
        return this._zillowMonthlyPropertyTaxAmount;
    }

    get zillowMonthlyHomeInsuranceAmount(): number {
        return this._zillowMonthlyHomeInsuranceAmount;
    }

    get zillowMonthlyHOAFeesAmount(): number {
        return this._zillowMonthlyHOAFeesAmount;
    }

    toDTO(): ZillowMarketEstimatesResponseDTO {
        return {
            zestimate: this.zestimate,
            zestimateRange: this._zestimateRange,
            zillowRentEstimate: this.zillowRentEstimate,
            zillowMonthlyPropertyTaxAmount: this.zillowMonthlyPropertyTaxAmount,
            zillowMonthlyHomeInsuranceAmount: this.zillowMonthlyHomeInsuranceAmount,
            zillowMonthlyHOAFeesAmount: this.zillowMonthlyHOAFeesAmount,
        };
    }
}