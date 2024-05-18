import { ListingCreationType } from "@realestatemanager/shared";
import { ListingDetailsRequestBuilder } from "./listing.details.request.builder";
import { ListingDetailsBuilder } from "./listing.details.builder";

export class ListingDetailsBuilderFactory {

    // static build(listingCreationType: ListingCreationType): ListingDetailsBuilderInterface {
    //     if (ListingCreationType.MANUAL === listingCreationType) {
    //         return new ListingDetailsRequestBuilder(undefined);
    //     }
    //     else if (ListingCreationType.MATCHED_PRE_EXISTING_RENT_CAST_DATA === listingCreationType
    //         || ListingCreationType.RENT_CAST_API === listingCreationType) {
    //         return new ListingDetailsBuilder(undefined);
    //     }
    //     throw new Error('Not a valid ListingCreationType')
    // }
}