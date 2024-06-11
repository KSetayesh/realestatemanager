import { CreateInvestmentScenarioRequest } from "../server/InvestmentTypes";
import { ListingDetailsResponseDTO } from "../server/ListingTypes";

export interface CreateSetCacheRequest {
    listingDetails: ListingDetailsResponseDTO;
    forceUpdate: boolean;
};

export interface CreateListingDetailsCalculationsRequest {
    investmentScenarioRequest: CreateInvestmentScenarioRequest;
    listingDetails: ListingDetailsResponseDTO;
};