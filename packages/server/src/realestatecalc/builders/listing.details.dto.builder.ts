import { Country, ListingDetailsDTO, Utility } from "@realestatemanager/shared";
import { ListingDetails } from "../models/listing_models/listingdetails.model";
import { RentCastPropertyResponseType, RentCastSaleResponseType } from "../services/rentcast.service";
import { convertSquareFeetToAcres } from "src/shared/Constants";

export class ListingDetailsDTOBuilder {

    build(
        rentCastSalesResponseTyped: RentCastSaleResponseType,
        rentCastPropertyTyped?: RentCastPropertyResponseType,
        listingDetails?: ListingDetails,
    ): ListingDetailsDTO {

        const daysOnMarket = rentCastSalesResponseTyped.daysOnMarket ?? 0;
        const listedDate = rentCastSalesResponseTyped.listedDate ?? Utility.getDateNDaysAgo(daysOnMarket);
        const numberOfBathrooms = rentCastSalesResponseTyped.bathrooms ?? rentCastPropertyTyped?.bathrooms ?? -1;
        const numberOfFullBathrooms = Math.floor(numberOfBathrooms);
        const numberOfHalfBathrooms = Utility.isDecimal(numberOfBathrooms) ? 1 : 0;
        const lotSize = rentCastSalesResponseTyped.lotSize ?? rentCastPropertyTyped?.lotSize;
        const acres = lotSize ? convertSquareFeetToAcres(lotSize) : -1;
        let propertyTax = -1;
        if (rentCastPropertyTyped && rentCastPropertyTyped.previousYearPropertyTaxes > -1) {
            propertyTax = Utility.round(rentCastPropertyTyped.previousYearPropertyTaxes / 12);
        }

        const listingDetail: ListingDetailsDTO = {
            zillowURL: `NEED TO UPDATE_${rentCastSalesResponseTyped.id}`,
            propertyDetails: {
                address: {
                    fullAddress: rentCastSalesResponseTyped.formattedAddress ?? rentCastPropertyTyped?.formattedAddress ?? '',
                    state: rentCastSalesResponseTyped.state ?? rentCastPropertyTyped?.state, // Let it be undefined
                    zipcode: rentCastSalesResponseTyped.zipCode ?? rentCastPropertyTyped?.zipCode ?? '',
                    city: rentCastSalesResponseTyped.city ?? rentCastPropertyTyped?.city ?? '',
                    county: rentCastSalesResponseTyped.county ?? rentCastPropertyTyped?.county ?? '',
                    country: Country.UnitedStates,
                    streetAddress: rentCastSalesResponseTyped.addressLine1 ?? rentCastPropertyTyped?.addressLine1 ?? '',
                    apartmentNumber: rentCastSalesResponseTyped.addressLine2 ?? rentCastPropertyTyped?.addressLine2 ?? '',
                    longitude: rentCastSalesResponseTyped.longitude ?? rentCastPropertyTyped?.longitude ?? -1,
                    latitude: rentCastSalesResponseTyped.latitude ?? rentCastPropertyTyped?.latitude ?? -1,
                },
                schoolRating: {
                    elementarySchoolRating: -1,
                    middleSchoolRating: -1,
                    highSchoolRating: -1,
                },
                numberOfBedrooms: rentCastSalesResponseTyped.bedrooms ?? rentCastPropertyTyped?.bedrooms ?? -1,
                numberOfFullBathrooms: numberOfFullBathrooms,
                numberOfHalfBathrooms: numberOfHalfBathrooms,
                squareFeet: rentCastSalesResponseTyped.squareFootage ?? rentCastPropertyTyped?.squareFootage ?? -1,
                acres: acres,
                yearBuilt: rentCastSalesResponseTyped.yearBuilt ?? rentCastPropertyTyped?.yearBuilt ?? -1,
                hasGarage: rentCastPropertyTyped?.features?.garage ?? false,
                hasPool: rentCastPropertyTyped?.features?.pool ?? false,
                hasBasement: false, // No info here
                propertyType: rentCastSalesResponseTyped.propertyType ?? rentCastPropertyTyped?.propertyType, // Let it be undefined
                description: '',
            },
            zillowMarketEstimates: {
                zestimate: -1,
                zestimateRange: {
                    low: -1,
                    high: -1,
                },
                zillowRentEstimate: -1,
                zillowMonthlyPropertyTaxAmount: propertyTax,
                zillowMonthlyHomeInsuranceAmount: -1,
                zillowMonthlyHOAFeesAmount: -1,
            },
            listingPrice: rentCastSalesResponseTyped.price ?? -1,
            dateListed: listedDate,
            numberOfDaysOnMarket: daysOnMarket,
            propertyStatus: rentCastSalesResponseTyped.status, // Let it be undefined
        };

        console.log("listingDetails:", listingDetail);

        return listingDetail;
    }
}