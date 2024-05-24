import { CreateListingDetailsRequest } from "@realestatemanager/shared";
import { Country, InputType, PropertyStatus, PropertyType, State, ratingSelections, trueAndFalseSelections } from "../constants/Constant";
import { FormInterface } from "./FormInterface";
import { FormProperty } from "../components/StandardForm";

export type AddPropertyFormData = {
    zillowURL: string;
    fullAddress: string;
    state: State;
    zipcode: string;
    city: string;
    county: string;
    country: Country;
    streetAddress: string;
    apartmentNumber: string;
    longitude: number;
    latitude: number;
    numberOfDaysOnMarket: number;
    elementarySchoolRating: number;
    middleSchoolRating: number;
    highSchoolRating: number;
    numberOfBedrooms: number;
    numberOfFullBathrooms: number;
    numberOfHalfBathrooms: number;
    squareFeet: number;
    acres: number;
    yearBuilt: number;
    hasGarage: boolean;
    hasPool: boolean;
    hasBasement: boolean;
    propertyType: PropertyType;
    propertyStatus: PropertyStatus;
    listingPrice: number;
    zestimate: number;
    zillowRentEstimate: number;
    zestimateRangeLow: number;
    zestimateRangeHigh: number;
    zillowMonthlyPropertyTaxAmount: number;
    zillowMonthlyHomeInsuranceAmount: number;
    zillowMonthlyHOAFeesAmount: number;
    description: string;
};

export class AddPropertyFormDetails implements FormInterface<AddPropertyFormData, CreateListingDetailsRequest> {

    getFormDetails(formData: AddPropertyFormData): FormProperty[] {
        return [
            {
                title: 'Zillow URL',
                name: 'zillowURL',
                type: InputType.STRING,
                value: formData.zillowURL,
            },
            {
                title: 'Full Address',
                name: 'fullAddress',
                type: InputType.STRING,
                value: formData.fullAddress,
            },
            {
                title: 'State',
                name: 'state',
                type: InputType.SELECT,
                value: formData.state,
                options: Object.values(State).map((enumValue => {
                    return {
                        value: enumValue,
                        label: enumValue,
                    };
                })),
            },
            {
                title: 'Zipcode',
                name: 'zipcode',
                type: InputType.STRING,
                value: formData.zipcode,
            },
            {
                title: 'City',
                name: 'city',
                type: InputType.STRING,
                value: formData.city,
            },
            {
                title: 'County',
                name: 'county',
                type: InputType.STRING,
                value: formData.county,
            },
            {
                title: 'Country',
                name: 'country',
                type: InputType.SELECT,
                value: formData.country,
                options: Object.values(Country).map((enumValue => {
                    return {
                        value: enumValue,
                        label: enumValue,
                    };
                })),
            },
            {
                title: 'Street Address',
                name: 'streetAddress',
                type: InputType.STRING,
                value: formData.streetAddress,
            },
            {
                title: 'Apartment Number',
                name: 'apartmentNumber',
                type: InputType.STRING,
                value: formData.apartmentNumber,
            },
            {
                title: 'Longitude',
                name: 'longitude',
                type: InputType.NUMBER,
                value: formData.longitude,
            },
            {
                title: 'Latitude',
                name: 'latitude',
                type: InputType.NUMBER,
                value: formData.latitude,
            },
            {
                title: 'Number Of Days On Market',
                name: 'numberOfDaysOnMarket',
                type: InputType.NUMBER,
                value: formData.numberOfDaysOnMarket,
            },
            {
                title: 'Elementary School Rating',
                name: 'elementarySchoolRating',
                type: InputType.SELECT,
                value: formData.elementarySchoolRating,
                options: ratingSelections(),
            },
            {
                title: 'Middle School Rating',
                name: 'middleSchoolRating',
                type: InputType.SELECT,
                value: formData.middleSchoolRating,
                options: ratingSelections(),
            },
            {
                title: 'High School Rating',
                name: 'highSchoolRating',
                type: InputType.SELECT,
                value: formData.highSchoolRating,
                options: ratingSelections(),
            },
            {
                title: 'Number Of Bedrooms',
                name: 'numberOfBedrooms',
                type: InputType.SELECT,
                value: formData.numberOfBedrooms,
                options: ratingSelections(0),
            },
            {
                title: 'Number Of Full Bathrooms',
                name: 'numberOfFullBathrooms',
                type: InputType.SELECT,
                value: formData.numberOfFullBathrooms,
                options: ratingSelections(0),
            },
            {
                title: 'Number Of Half Bathrooms',
                name: 'numberOfHalfBathrooms',
                type: InputType.SELECT,
                value: formData.numberOfHalfBathrooms,
                options: ratingSelections(0),
            },
            {
                title: 'Square Feet',
                name: 'squareFeet',
                type: InputType.NUMBER,
                value: formData.squareFeet,
            },
            {
                title: 'Acres',
                name: 'acres',
                type: InputType.NUMBER,
                value: formData.acres,
            },
            {
                title: 'Year Built',
                name: 'yearBuilt',
                type: InputType.NUMBER,
                value: formData.yearBuilt,
            },
            {
                title: 'Has Garage',
                name: 'hasGarage',
                type: InputType.SELECT,
                value: formData.hasGarage.toString(),
                options: trueAndFalseSelections(),
            },
            {
                title: 'Has Pool',
                name: 'hasPool',
                type: InputType.SELECT,
                value: formData.hasPool.toString(),
                options: trueAndFalseSelections(),
            },
            {
                title: 'Has Basement',
                name: 'hasBasement',
                type: InputType.SELECT,
                value: formData.hasBasement.toString(),
                options: trueAndFalseSelections(),
            },
            {
                title: 'Property Type',
                name: 'propertyType',
                type: InputType.SELECT,
                value: formData.propertyType,
                options: Object.values(PropertyType).map((enumValue => {
                    return {
                        value: enumValue,
                        label: enumValue,
                    };
                })),
            },
            {
                title: 'Property Status',
                name: 'propertyStatus',
                type: InputType.SELECT,
                value: formData.propertyStatus,
                options: Object.values(PropertyStatus).map((enumValue => {
                    return {
                        value: enumValue,
                        label: enumValue,
                    };
                })),
            },
            {
                title: 'Listing Price',
                name: 'listingPrice',
                type: InputType.NUMBER,
                value: formData.listingPrice,
            },
            {
                title: 'Zestimate',
                name: 'zestimate',
                type: InputType.NUMBER,
                value: formData.zestimate,
            },
            {
                title: 'Zillow Rent Estimate',
                name: 'zillowRentEstimate',
                type: InputType.NUMBER,
                value: formData.zillowRentEstimate,
            },
            {
                title: 'Zillow Range Low',
                name: 'zestimateRangeLow',
                type: InputType.NUMBER,
                value: formData.zestimateRangeLow,
            },
            {
                title: 'Zillow Range High',
                name: 'zestimateRangeHigh',
                type: InputType.NUMBER,
                value: formData.zestimateRangeHigh,
            },
            {
                title: 'Zillow Monthly Property Tax Amount',
                name: 'zillowMonthlyPropertyTaxAmount',
                type: InputType.NUMBER,
                value: formData.zillowMonthlyPropertyTaxAmount,
            },
            {
                title: 'Zillow Monthly Home Insurance Amount',
                name: 'zillowMonthlyHomeInsuranceAmount',
                type: InputType.NUMBER,
                value: formData.zillowMonthlyHomeInsuranceAmount,
            },
            {
                title: 'Zillow Monthly HOA Fees Amount',
                name: 'zillowMonthlyHOAFeesAmount',
                type: InputType.NUMBER,
                value: formData.zillowMonthlyHOAFeesAmount,
            },
            {
                title: 'Discription',
                name: 'description',
                type: InputType.STRING,
                value: formData.description,
            },
        ];
    }

    createRequest(formData: AddPropertyFormData): CreateListingDetailsRequest {

        return {
            zillowURL: formData.zillowURL,
            listingPrice: formData.listingPrice,
            // dateListed: getDateNDaysAgo(parseInt(formData.numberOfDaysOnMarket)),
            numberOfDaysOnMarket: formData.numberOfDaysOnMarket,
            propertyStatus: formData.propertyStatus as PropertyStatus,
            propertyDetails: {
                address: {
                    fullAddress: formData.fullAddress,
                    state: formData.state as State,
                    zipcode: formData.zipcode,
                    city: formData.city,
                    county: formData.county,
                    country: formData.country as Country,
                    streetAddress: formData.streetAddress,
                    apartmentNumber: formData.apartmentNumber,
                    longitude: formData.longitude,
                    latitude: formData.latitude,
                },
                schoolRating: {
                    elementarySchoolRating: formData.elementarySchoolRating,
                    middleSchoolRating: formData.middleSchoolRating,
                    highSchoolRating: formData.highSchoolRating,
                },
                numberOfBedrooms: formData.numberOfBedrooms,
                numberOfFullBathrooms: formData.numberOfFullBathrooms,
                numberOfHalfBathrooms: formData.numberOfHalfBathrooms,
                squareFeet: formData.squareFeet,
                acres: formData.acres,
                yearBuilt: formData.yearBuilt,
                hasGarage: formData.hasGarage,
                hasPool: formData.hasPool,
                hasBasement: formData.hasBasement,
                propertyType: formData.propertyType as PropertyType,
                description: formData.description,
            },
            zillowMarketEstimates: {
                zestimate: formData.zestimate, // Estimated market value
                zestimateRange: {
                    low: formData.zestimateRangeLow,
                    high: formData.zestimateRangeHigh,
                },
                zillowRentEstimate: formData.zillowRentEstimate, // Estimated rental value
                zillowMonthlyPropertyTaxAmount: formData.zillowMonthlyPropertyTaxAmount,
                zillowMonthlyHomeInsuranceAmount: formData.zillowMonthlyHomeInsuranceAmount,
                zillowMonthlyHOAFeesAmount: formData.zillowMonthlyHOAFeesAmount,
            },
        };
    }

    // Create a state to store the form data.
    getDefaultFormData(): AddPropertyFormData {
        return {
            zillowURL: '',
            fullAddress: '',
            state: State.AL,
            zipcode: '',
            city: '',
            county: '',
            country: Country.UnitedStates,
            streetAddress: '',
            apartmentNumber: '',
            longitude: -1,
            latitude: -1,
            numberOfDaysOnMarket: 0,
            elementarySchoolRating: -1,
            middleSchoolRating: -1,
            highSchoolRating: -1,
            numberOfBedrooms: -1,
            numberOfFullBathrooms: -1,
            numberOfHalfBathrooms: -1,
            squareFeet: -1,
            acres: -1,
            yearBuilt: -1,
            hasGarage: false,
            hasPool: false,
            hasBasement: false,
            propertyType: PropertyType.SINGLE_FAMILY,
            propertyStatus: PropertyStatus.ACTIVE,
            listingPrice: -1,
            zestimate: -1,
            zillowRentEstimate: -1,
            zestimateRangeLow: -1,
            zestimateRangeHigh: -1,
            zillowMonthlyPropertyTaxAmount: -1,
            zillowMonthlyHomeInsuranceAmount: -1,
            zillowMonthlyHOAFeesAmount: -1,
            description: '',
        };
    }
    
} 