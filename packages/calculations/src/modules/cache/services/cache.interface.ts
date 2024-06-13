import { ListingDetailsResponseDTO, ListingWithScenariosResponseDTO } from "@realestatemanager/types";

export interface CacheInterface {

    setFreshCache(listingDetailsArr: ListingDetailsResponseDTO[]): Promise<void>;

    resetCache(): void;

    setCache(listingDetailsList: ListingDetailsResponseDTO[], forceUpdate: boolean): Promise<void>;

    getFromCache(listingDetailsArr: ListingDetailsResponseDTO[]): Promise<ListingWithScenariosResponseDTO[]>;

    deleteFromCache(listingDetailsIds: number[]): Promise<void>;

}
