import { CreateInvestmentScenarioRequest } from "../server/InvestmentTypes";
import { ListingDetailsResponseDTO } from "../server/ListingTypes";

export interface CreateSetCacheRequest {
    listingDetailsList: ListingDetailsResponseDTO[];
    forceUpdate: boolean;
};

export interface CreateListingDetailsCalculationsRequest {
    investmentScenarioRequest?: CreateInvestmentScenarioRequest;
    listingDetails: ListingDetailsResponseDTO;
};
