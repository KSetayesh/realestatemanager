import { PriceDetailsDTO } from "@realestatemanager/shared";
import { ZillowMarketEstimates } from "./zillowmarketestimates.model";


export class PriceDetails {

    listingPrice: number; // The current listing or sale price
    zillowMarketEstimates?: ZillowMarketEstimates;
    monthlyPropertyTaxAmount?: number;
    monthlyHomeInsuranceAmount?: number;
    monthlyHOAFeesAmount?: number;

    constructor() { }

    toDTO(): PriceDetailsDTO {
        return {
            listingPrice: this.listingPrice,
            zillowMarketEstimates: this.zillowMarketEstimates.toDTO(),
            monthlyPropertyTaxAmount: this.monthlyPropertyTaxAmount,
            monthlyHomeInsuranceAmount: this.monthlyHomeInsuranceAmount,
            monthlyHOAFeesAmount: this.monthlyHOAFeesAmount,
        }
    }
}