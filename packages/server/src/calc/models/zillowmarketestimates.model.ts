import { ZillowMarketEstimatesDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";

export class ZillowMarketEstimates implements IDTOConvertible<ZillowMarketEstimatesDTO>{
    private zestimate?: number; // Estimated market value
    private zestimateRange?: {
        low?: number,
        high?: number,
    };
    private zillowRentEstimate?: number; // Estimated rental value
    private zillowMonthlyPropertyTaxAmount?: number;
    private zillowMonthlyHomeInsuranceAmount?: number;
    private zillowMonthlyHOAFeesAmount?: number;

    constructor(zestimate?: number,
        low?: number,
        high?: number,
        zillowRentEstimate?: number,
        zillowMonthlyPropertyTaxAmount?: number,
        zillowMonthlyHomeInsuranceAmount?: number,
        zillowMonthlyHOAFeesAmount?: number) {

        this.zestimate = zestimate;
        this.zestimateRange = { low, high };
        this.zillowRentEstimate = zillowRentEstimate;
        this.zillowMonthlyPropertyTaxAmount = zillowMonthlyPropertyTaxAmount;
        this.zillowMonthlyHomeInsuranceAmount = zillowMonthlyHomeInsuranceAmount;
        this.zillowMonthlyHOAFeesAmount = zillowMonthlyHOAFeesAmount;
    }

    getZillowRentEstimate(): number {
        return this.zillowRentEstimate;
    }

    getZillowMonthlyPropertyTaxAmount(): number {
        return this.zillowMonthlyPropertyTaxAmount;
    }

    getZillowMonthlyHomeInsuranceAmount(): number {
        return this.zillowMonthlyHomeInsuranceAmount;
    }

    getZillowMonthlyHOAFeesAmount(): number {
        return this.zillowMonthlyHOAFeesAmount;
    }

    toDTO(): ZillowMarketEstimatesDTO {
        return {
            zestimate: this.zestimate,
            zestimateRange: this.zestimateRange,
            zillowRentEstimate: this.zillowRentEstimate,
            zillowMonthlyPropertyTaxAmount: this.zillowMonthlyPropertyTaxAmount,
            zillowMonthlyHomeInsuranceAmount: this.zillowMonthlyHomeInsuranceAmount,
            zillowMonthlyHOAFeesAmount: this.zillowMonthlyHOAFeesAmount,
        };
    }
}