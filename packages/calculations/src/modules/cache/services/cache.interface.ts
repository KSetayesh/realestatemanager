import { ListingDetailsResponseDTO, ListingWithScenariosResponseDTO } from "@realestatemanager/shared";

export interface CacheInterface {
    setFreshCache(listingDetailsArr: ListingDetailsResponseDTO[]): Promise<void>;
    resetCache(): void;
    setCache(listingDetails: ListingDetailsResponseDTO, forceUpdate: boolean): Promise<void>;
    getFromCache(listingDetails: ListingDetailsResponseDTO): Promise<ListingWithScenariosResponseDTO>;
    deleteFromCache(listingDetailsId: number): Promise<boolean>;
}
