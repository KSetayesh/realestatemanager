import { CreateListingDetailsRequest } from "@realestatemanager/shared";
import {
    Country,
    InputType,
    PropertyStatus,
    PropertyType,
    State
} from "../constants/Constant";
import { FormInterface } from "./FormInterface";
import { FormProperty } from "../components/StandardForm";
import {
    BasicCheckBoxForm,
    BasicNumberForm,
    BasicStringForm,
    CountryForm,
    GetOptionsForFormProperty,
    StateForm,
    ratingSelections
} from "./ReusableFormFields";

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

    // name: string;
    // value: number | string | Options | undefined;
    // type: InputType;
    // step?: string;

    getFormDetails(formData: AddPropertyFormData): FormProperty[] {
        return [
            BasicStringForm('Zillow URL', 'zillowURL', formData.zillowURL),
            BasicStringForm('Full Address', 'fullAddress', formData.fullAddress),
            StateForm(formData.state),
            BasicStringForm('Zipcode', 'zipcode', formData.zipcode),
            BasicStringForm('City', 'city', formData.city),
            BasicStringForm('County', 'county', formData.county),
            CountryForm(formData.country),
            BasicStringForm('Street Address', 'streetAddress', formData.streetAddress),
            BasicStringForm('Apartment Number', 'apartmentNumber', formData.apartmentNumber),
            BasicNumberForm('Longitude', 'longitude', formData.longitude),
            BasicNumberForm('Latitude', 'latitude', formData.latitude),
            BasicNumberForm('Number Of Days On Market', 'numberOfDaysOnMarket', formData.numberOfDaysOnMarket),
            {
                title: 'Elementary School Rating',
                values: [
                    {
                        name: 'elementarySchoolRating',
                        type: InputType.SELECT,
                        value: formData.elementarySchoolRating,
                        options: ratingSelections(),
                    },
                ],
            },
            {
                title: 'Middle School Rating',
                values: [
                    {
                        name: 'middleSchoolRating',
                        type: InputType.SELECT,
                        value: formData.middleSchoolRating,
                        options: ratingSelections(),
                    },
                ],
            },
            {
                title: 'High School Rating',
                values: [
                    {
                        name: 'highSchoolRating',
                        type: InputType.SELECT,
                        value: formData.highSchoolRating,
                        options: ratingSelections(),
                    },
                ],
            },
            BasicNumberForm('Number Of Bedrooms', 'numberOfBedrooms', formData.numberOfBedrooms),
            BasicNumberForm('Number Of Full Bathrooms', 'numberOfFullBathrooms', formData.numberOfFullBathrooms),
            BasicNumberForm('Number Of Half Bathrooms', 'numberOfHalfBathrooms', formData.numberOfHalfBathrooms),
            BasicNumberForm('Square Feet', 'squareFeet', formData.squareFeet),
            BasicNumberForm('Acres', 'acres', formData.acres),
            BasicNumberForm('Year Built', 'yearBuilt', formData.yearBuilt),
            BasicCheckBoxForm('Has Garage', 'hasGarage', formData.hasGarage),
            BasicCheckBoxForm('Has Pool', 'hasPool', formData.hasPool),
            BasicCheckBoxForm('Has Basement', 'hasBasement', formData.hasBasement),
            {
                title: 'Property Type',
                values: [
                    {
                        name: 'propertyType',
                        type: InputType.SELECT,
                        value: formData.propertyType,
                        options: GetOptionsForFormProperty(PropertyType),
                    },
                ],
            },
            {
                title: 'Property Status',
                values: [
                    {
                        name: 'propertyStatus',
                        type: InputType.SELECT,
                        value: formData.propertyStatus,
                        options: GetOptionsForFormProperty(PropertyStatus),
                    },
                ],
            },
            BasicNumberForm('Listing Price', 'listingPrice', formData.listingPrice),
            BasicNumberForm('Zestimate', 'zestimate', formData.zestimate),
            BasicNumberForm('Zillow Rent Estimate', 'zillowRentEstimate', formData.zillowRentEstimate),
            BasicNumberForm('Zillow Range Low', 'zestimateRangeLow', formData.zestimateRangeLow),
            BasicNumberForm('Zillow Range High', 'zestimateRangeHigh', formData.zestimateRangeHigh),
            BasicNumberForm('Zillow Monthly Property Tax Amount', 'zillowMonthlyPropertyTaxAmount', formData.zillowMonthlyPropertyTaxAmount),
            BasicNumberForm('Zillow Monthly Home Insurance Amount', 'zillowMonthlyHomeInsuranceAmount', formData.zillowMonthlyHomeInsuranceAmount),
            BasicNumberForm('Zillow Monthly HOA Fees Amount', 'zillowMonthlyHOAFeesAmount', formData.zillowMonthlyHOAFeesAmount),
            BasicStringForm('Discription', 'description', formData.description),
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