import {
    GrowthProjectionsResponseDTO,
    InitialInvestmentBreakdownResponseDTO,
    ListingWithScenariosResponseDTO,
    TaxImplicationsResponseDTO
} from "../../server/InvestmentTypes";
import { ListingDetailsResponseDTO } from "../../server/ListingTypes";

export class TableHelper {

    static getInitialInvestmentDetails(property: ListingWithScenariosResponseDTO): InitialInvestmentBreakdownResponseDTO {
        return property.metrics.initialInvestmentDetails;
    }

    static getGrowthProjections(property: ListingWithScenariosResponseDTO): GrowthProjectionsResponseDTO {
        return property.metrics.growthProjections;
    }

    static getTaxImplications(property: ListingWithScenariosResponseDTO): TaxImplicationsResponseDTO {
        return property.metrics.taxImplications;
    }

    static getListingDetails(property: ListingWithScenariosResponseDTO): ListingDetailsResponseDTO {
        return property.listingDetails;
    }
}