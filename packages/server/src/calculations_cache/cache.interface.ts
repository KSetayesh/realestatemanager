import { ListingDetails } from "src/modules/realestatecalc/models/listing_models/listingdetails.model";
import { ListingWithScenariosResponseDTO } from "@realestatemanager/shared";

export interface CacheInterface {
    setFreshCache(listingDetailsArr: ListingDetails[]): Promise<void>;
    resetCache(): void;
    setCache(listingDetails: ListingDetails, forceUpdate: boolean): Promise<void>;
    getListingDetailsCalculations(listingDetails: ListingDetails): ListingWithScenariosResponseDTO;
    deleteFromCache(listingDetailsId: number): Promise<boolean>;
}
