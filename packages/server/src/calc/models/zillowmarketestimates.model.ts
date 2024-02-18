import { ZillowMarketEstimatesDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";

export class ZillowMarketEstimates implements IDTOConvertible<ZillowMarketEstimatesDTO>{
    zestimate?: number; // Estimated market value
    zillowRentEstimate?: number; // Estimated rental value

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