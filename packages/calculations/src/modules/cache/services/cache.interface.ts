import { ListingDetailsResponseDTO, ListingWithScenariosResponseDTO } from "@realestatemanager/shared";

export interface CacheInterface {

    setFreshCache(listingDetailsArr: ListingDetailsResponseDTO[]): Promise<void>;

    resetCache(): void;

    setCache(listingDetailsList: ListingDetailsResponseDTO[], forceUpdate: boolean): Promise<void>;

    getFromCache(listingDetailsArr: ListingDetailsResponseDTO[]): Promise<ListingWithScenariosResponseDTO[]>;

    deleteFromCache(listingDetailsIds: number[]): Promise<boolean>;

}
