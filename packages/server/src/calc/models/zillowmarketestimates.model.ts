import { ZillowMarketEstimatesDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";

export class ZillowMarketEstimates implements IDTOConvertible<ZillowMarketEstimatesDTO>{
    private zestimate?: number; // Estimated market value
    private zillowRentEstimate?: number; // Estimated rental value

    constructor(zestimate?: number, zillowRentEstimate?: number) {
        this.zestimate = zestimate;
        this.zillowRentEstimate = zillowRentEstimate;
    }

    toDTO(): ZillowMarketEstimatesDTO {
        return {
            zestimate: this.zestimate,
            zillowRentEstimate: this.zillowRentEstimate,
        };
    }
}