import { ZillowMarketEstimatesDTO } from "@realestatemanager/shared";

export class ZillowMarketEstimates {
    zestimate?: number; // Estimated market value
    zillowRentEstimate?: number; // Estimated rental value

    constructor() { }

    toDTO(): ZillowMarketEstimatesDTO {
        return {
            zestimate: this.zestimate,
            zillowRentEstimate: this.zillowRentEstimate,
        };
    }
}