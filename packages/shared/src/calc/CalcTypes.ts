import { ListingDetailsResponseDTO } from "../server/ListingTypes";

export interface CreateSetCacheRequestDTO {
    listingDetails: ListingDetailsResponseDTO;
    forceUpdate: boolean;
};