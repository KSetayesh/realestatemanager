import { PriceDetailsDTO } from "@realestatemanager/shared";
import { ZillowMarketEstimates } from "./zillowmarketestimates.model";


export class PriceDetails {

    listingPrice: number; // The current listing or sale price
    zillowMarketEstimates?: ZillowMarketEstimates;
    monthlyPropertyTaxAmount?: number;
    monthlyHomeInsuranceAmount?: number;
    monthlyHOAFeesAmount?: number;

    constructor(listingPrice: number,
        zillowMarketEstimates?: ZillowMarketEstimates,
        monthlyPropertyTaxAmount?: number,
        monthlyHomeInsuranceAmount?: number,
        monthlyHOAFeesAmount?: number
    ) {
        this.listingPrice = listingPrice;
        this.zillowMarketEstimates = zillowMarketEstimates;
        this.monthlyPropertyTaxAmount = monthlyPropertyTaxAmount;
        this.monthlyHomeInsuranceAmount = monthlyHomeInsuranceAmount;
        this.monthlyHOAFeesAmount = monthlyHOAFeesAmount;
    }

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