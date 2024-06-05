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

export type AddPropertyTitlesAndLabelsType = {
    [K in keyof AddPropertyFormData]: {
        title: string;
        name: string;
    };
};

export const AddPropertyTitlesAndLabels: AddPropertyTitlesAndLabelsType = {
    zillowURL: {
        title: 'Zillow URL',
        name: 'zillowURL',
    },
    fullAddress: {
        title: 'Full Address',
        name: 'fullAddress',
    },
    state: {
        title: 'State',
        name: 'state',
    },
    zipcode: {
        title: 'Zipcode',
        name: 'zipcode',
    },
    city: {
        title: 'City',
        name: 'city',
    },
    county: {
        title: 'County',
        name: 'county',
    },
    country: {
        title: 'Country',
        name: 'country',
    },
    streetAddress: {
        title: 'Street Address',
        name: 'streetAddress',
    },
    apartmentNumber: {
        title: 'Apartment Number',
        name: 'apartmentNumber',
    },
    longitude: {
        title: 'Longitude',
        name: 'longitude',
    },
    latitude: {
        title: 'Latitude',
        name: 'latitude',
    },
    numberOfDaysOnMarket: {
        title: 'Number Of Days On Market',
        name: 'number Of Days On Market',
    },
    elementarySchoolRating: {
        title: 'Elementary School Rating',
        name: 'elementarySchoolRating',
    },
    middleSchoolRating: {
        title: 'Middle School Rating',
        name: 'middleSchoolRating',
    },
    highSchoolRating: {
        title: 'High School Rating',
        name: 'highSchoolRating',
    },
    numberOfBedrooms: {
        title: 'Number Of Bedrooms',
        name: 'numberOfBedrooms',
    },
    numberOfFullBathrooms: {
        title: 'Number Of Full Bathrooms',
        name: 'numberOfFullBathrooms',
    },
    numberOfHalfBathrooms: {
        title: 'Number Of Half Bathrooms',
        name: 'numberOfHalfBathrooms',
    },
    squareFeet: {
        title: 'Square Feet',
        name: 'squareFeet',
    },
    acres: {
        title: 'Acres',
        name: 'acres',
    },
    yearBuilt: {
        title: 'Year Built',
        name: 'yearBuilt',
    },
    hasGarage: {
        title: 'Has Garage',
        name: 'hasGarage',
    },
    hasPool: {
        title: 'Has Pool',
        name: 'hasPool',
    },
    hasBasement: {
        title: 'Has Basement',
        name: 'hasBasement',
    },
    propertyType: {
        title: 'Property Type',
        name: 'propertyType',
    },
    propertyStatus: {
        title: 'Property Status',
        name: 'propertyStatus',
    },
    listingPrice: {
        title: 'Listing Price',
        name: 'listingPrice',
    },
    zestimate: {
        title: 'Zestimate',
        name: 'zestimate',
    },
    zillowRentEstimate: {
        title: 'Zillow Rent Estimate',
        name: 'zillowRentEstimate',
    },
    zestimateRangeLow: {
        title: 'Zillow Range Low',
        name: 'zestimateRangeLow',
    },
    zestimateRangeHigh: {
        title: 'Zillow Range High',
        name: 'zestimateRangeHigh',
    },
    zillowMonthlyPropertyTaxAmount: {
        title: 'Zillow Monthly Property Tax Amount',
        name: 'zillowMonthlyPropertyTaxAmount',
    },
    zillowMonthlyHomeInsuranceAmount: {
        title: 'Zillow Monthly Home Insurance Amount',
        name: 'zillowMonthlyHomeInsuranceAmount',
    },
    zillowMonthlyHOAFeesAmount: {
        title: 'Zillow Monthly HOA Fees Amount',
        name: 'zillowMonthlyHOAFeesAmount',
    },
    description: {
        title: 'Description',
        name: 'description',
    },
};

export class AddPropertyTitlesAndLabelsGetter {

    get zillowURLTitle(): string {
        return AddPropertyTitlesAndLabels.zillowURL.title;
    }

    get zillowURLName(): string {
        return AddPropertyTitlesAndLabels.zillowURL.name;
    }

    get fullAddressTitle(): string {
        return AddPropertyTitlesAndLabels.fullAddress.title;
    }

    get fullAddressName(): string {
        return AddPropertyTitlesAndLabels.fullAddress.name;
    }

    get stateTitle(): string {
        return AddPropertyTitlesAndLabels.state.title;
    }

    get stateName(): string {
        return AddPropertyTitlesAndLabels.state.name;
    }

    get zipcodeTitle(): string {
        return AddPropertyTitlesAndLabels.zipcode.title;
    }

    get zipcodeName(): string {
        return AddPropertyTitlesAndLabels.zipcode.name;
    }

    get cityTitle(): string {
        return AddPropertyTitlesAndLabels.city.title;
    }

    get cityName(): string {
        return AddPropertyTitlesAndLabels.city.name;
    }

    get countyTitle(): string {
        return AddPropertyTitlesAndLabels.county.title;
    }

    get countyName(): string {
        return AddPropertyTitlesAndLabels.county.name;
    }

    get countryTitle(): string {
        return AddPropertyTitlesAndLabels.country.title;
    }

    get countryName(): string {
        return AddPropertyTitlesAndLabels.country.name;
    }

    get streetAddressTitle(): string {
        return AddPropertyTitlesAndLabels.streetAddress.title;
    }

    get streetAddressName(): string {
        return AddPropertyTitlesAndLabels.streetAddress.name;
    }

    get apartmentNumberTitle(): string {
        return AddPropertyTitlesAndLabels.apartmentNumber.title;
    }

    get apartmentNumberName(): string {
        return AddPropertyTitlesAndLabels.apartmentNumber.name;
    }

    get longitudeTitle(): string {
        return AddPropertyTitlesAndLabels.longitude.title;
    }

    get longitudeName(): string {
        return AddPropertyTitlesAndLabels.longitude.name;
    }

    get latitudeTitle(): string {
        return AddPropertyTitlesAndLabels.latitude.title;
    }

    get latitudeName(): string {
        return AddPropertyTitlesAndLabels.latitude.name;
    }

    get numberOfDaysOnMarketTitle(): string {
        return AddPropertyTitlesAndLabels.numberOfDaysOnMarket.title;
    }

    get numberOfDaysOnMarketName(): string {
        return AddPropertyTitlesAndLabels.numberOfDaysOnMarket.name;
    }

    get elementarySchoolRatingTitle(): string {
        return AddPropertyTitlesAndLabels.elementarySchoolRating.title;
    }

    get elementarySchoolRatingName(): string {
        return AddPropertyTitlesAndLabels.elementarySchoolRating.name;
    }

    get middleSchoolRatingTitle(): string {
        return AddPropertyTitlesAndLabels.middleSchoolRating.title;
    }

    get middleSchoolRatingName(): string {
        return AddPropertyTitlesAndLabels.middleSchoolRating.name;
    }

    get highSchoolRatingTitle(): string {
        return AddPropertyTitlesAndLabels.highSchoolRating.title;
    }

    get highSchoolRatingName(): string {
        return AddPropertyTitlesAndLabels.highSchoolRating.name;
    }

    get numberOfBedroomsTitle(): string {
        return AddPropertyTitlesAndLabels.numberOfBedrooms.title;
    }

    get numberOfBedroomsName(): string {
        return AddPropertyTitlesAndLabels.numberOfBedrooms.name;
    }

    get numberOfFullBathroomsTitle(): string {
        return AddPropertyTitlesAndLabels.numberOfFullBathrooms.title;
    }

    get numberOfFullBathroomsName(): string {
        return AddPropertyTitlesAndLabels.numberOfFullBathrooms.name;
    }

    get numberOfHalfBathroomsTitle(): string {
        return AddPropertyTitlesAndLabels.numberOfHalfBathrooms.title;
    }

    get numberOfHalfBathroomsName(): string {
        return AddPropertyTitlesAndLabels.numberOfHalfBathrooms.name;
    }

    get squareFeetTitle(): string {
        return AddPropertyTitlesAndLabels.squareFeet.title;
    }

    get squareFeetName(): string {
        return AddPropertyTitlesAndLabels.squareFeet.name;
    }

    get acresTitle(): string {
        return AddPropertyTitlesAndLabels.acres.title;
    }

    get acresName(): string {
        return AddPropertyTitlesAndLabels.acres.name;
    }

    get yearBuiltTitle(): string {
        return AddPropertyTitlesAndLabels.yearBuilt.title;
    }

    get yearBuiltName(): string {
        return AddPropertyTitlesAndLabels.yearBuilt.name;
    }

    get hasGarageTitle(): string {
        return AddPropertyTitlesAndLabels.hasGarage.title;
    }

    get hasGarageName(): string {
        return AddPropertyTitlesAndLabels.hasGarage.name;
    }

    get hasPoolTitle(): string {
        return AddPropertyTitlesAndLabels.hasPool.title;
    }

    get hasPoolName(): string {
        return AddPropertyTitlesAndLabels.hasPool.name;
    }

    get hasBasementTitle(): string {
        return AddPropertyTitlesAndLabels.hasBasement.title;
    }

    get hasBasementName(): string {
        return AddPropertyTitlesAndLabels.hasBasement.name;
    }

    get propertyTypeTitle(): string {
        return AddPropertyTitlesAndLabels.propertyType.title;
    }

    get propertyTypeName(): string {
        return AddPropertyTitlesAndLabels.propertyType.name;
    }

    get propertyStatusTitle(): string {
        return AddPropertyTitlesAndLabels.propertyStatus.title;
    }

    get propertyStatusName(): string {
        return AddPropertyTitlesAndLabels.propertyStatus.name;
    }

    get listingPriceTitle(): string {
        return AddPropertyTitlesAndLabels.listingPrice.title;
    }

    get listingPriceName(): string {
        return AddPropertyTitlesAndLabels.listingPrice.name;
    }

    get zestimateTitle(): string {
        return AddPropertyTitlesAndLabels.zestimate.title;
    }

    get zestimateName(): string {
        return AddPropertyTitlesAndLabels.zestimate.name;
    }

    get zillowRentEstimateTitle(): string {
        return AddPropertyTitlesAndLabels.zillowRentEstimate.title;
    }

    get zillowRentEstimateName(): string {
        return AddPropertyTitlesAndLabels.zillowRentEstimate.name;
    }

    get zestimateRangeLowTitle(): string {
        return AddPropertyTitlesAndLabels.zestimateRangeLow.title;
    }

    get zestimateRangeLowName(): string {
        return AddPropertyTitlesAndLabels.zestimateRangeLow.name;
    }

    get zestimateRangeHighTitle(): string {
        return AddPropertyTitlesAndLabels.zestimateRangeHigh.title;
    }

    get zestimateRangeHighName(): string {
        return AddPropertyTitlesAndLabels.zestimateRangeHigh.name;
    }

    get zillowMonthlyPropertyTaxAmountTitle(): string {
        return AddPropertyTitlesAndLabels.zillowMonthlyPropertyTaxAmount.title;
    }

    get zillowMonthlyPropertyTaxAmountName(): string {
        return AddPropertyTitlesAndLabels.zillowMonthlyPropertyTaxAmount.name;
    }

    get zillowMonthlyHomeInsuranceAmountTitle(): string {
        return AddPropertyTitlesAndLabels.zillowMonthlyHomeInsuranceAmount.title;
    }

    get zillowMonthlyHomeInsuranceAmountName(): string {
        return AddPropertyTitlesAndLabels.zillowMonthlyHomeInsuranceAmount.name;
    }

    get zillowMonthlyHOAFeesAmountTitle(): string {
        return AddPropertyTitlesAndLabels.zillowMonthlyHOAFeesAmount.title;
    }

    get zillowMonthlyHOAFeesAmountName(): string {
        return AddPropertyTitlesAndLabels.zillowMonthlyHOAFeesAmount.name;
    }

    get descriptionTitle(): string {
        return AddPropertyTitlesAndLabels.description.title;
    }

    get descriptionName(): string {
        return AddPropertyTitlesAndLabels.description.name;
    }
}

export class AddPropertyFormDetails implements FormInterface<AddPropertyFormData, CreateListingDetailsRequest> {

    // name: string;
    // value: number | string | Options | undefined;
    // type: InputType;
    // step?: string;

    getFormDetails(formData: AddPropertyFormData): FormProperty[] {
        const getterInstance: AddPropertyTitlesAndLabelsGetter = new AddPropertyTitlesAndLabelsGetter();
        return [
            BasicStringForm(
                getterInstance.zillowURLTitle,
                getterInstance.zillowURLName,
                formData.zillowURL,
            ),
            BasicStringForm(
                getterInstance.fullAddressTitle,
                getterInstance.fullAddressName,
                formData.fullAddress,
            ),
            StateForm(    // Update to pass in data
                formData.state,
            ),
            BasicStringForm(
                getterInstance.zipcodeTitle,
                getterInstance.zipcodeName,
                formData.zipcode,
            ),
            BasicStringForm(
                getterInstance.cityTitle,
                getterInstance.cityName,
                formData.city,
            ),
            BasicStringForm(
                getterInstance.countyTitle,
                getterInstance.countyName,
                formData.county,
            ),
            CountryForm(    // Update to pass in data
                formData.country,
            ),
            BasicStringForm(
                getterInstance.streetAddressTitle,
                getterInstance.streetAddressName,
                formData.streetAddress,
            ),
            BasicStringForm(
                getterInstance.apartmentNumberTitle,
                getterInstance.apartmentNumberName,
                formData.apartmentNumber,
            ),
            BasicNumberForm(
                getterInstance.longitudeTitle,
                getterInstance.longitudeName,
                formData.longitude,
            ),
            BasicNumberForm(
                getterInstance.latitudeTitle,
                getterInstance.latitudeName,
                formData.latitude,
            ),
            BasicNumberForm(
                getterInstance.numberOfDaysOnMarketTitle,
                getterInstance.numberOfDaysOnMarketName,
                formData.numberOfDaysOnMarket,
            ),
            {
                title: getterInstance.elementarySchoolRatingTitle,
                values: [
                    {
                        name: getterInstance.elementarySchoolRatingName,
                        type: InputType.SELECT,
                        value: formData.elementarySchoolRating,
                        options: ratingSelections(),
                    },
                ],
            },
            {
                title: getterInstance.middleSchoolRatingTitle,
                values: [
                    {
                        name: getterInstance.middleSchoolRatingName,
                        type: InputType.SELECT,
                        value: formData.middleSchoolRating,
                        options: ratingSelections(),
                    },
                ],
            },
            {
                title: getterInstance.highSchoolRatingTitle,
                values: [
                    {
                        name: getterInstance.highSchoolRatingName,
                        type: InputType.SELECT,
                        value: formData.highSchoolRating,
                        options: ratingSelections(),
                    },
                ],
            },
            BasicNumberForm(
                getterInstance.numberOfBedroomsTitle,
                getterInstance.numberOfBedroomsName,
                formData.numberOfBedrooms,
            ),
            BasicNumberForm(
                getterInstance.numberOfFullBathroomsTitle,
                getterInstance.numberOfFullBathroomsName,
                formData.numberOfFullBathrooms,
            ),
            BasicNumberForm(
                getterInstance.numberOfHalfBathroomsTitle,
                getterInstance.numberOfHalfBathroomsName,
                formData.numberOfHalfBathrooms,
            ),
            BasicNumberForm(
                getterInstance.squareFeetTitle,
                getterInstance.squareFeetName,
                formData.squareFeet,
            ),
            BasicNumberForm(
                getterInstance.acresTitle,
                getterInstance.acresName,
                formData.acres,
            ),
            BasicNumberForm(
                getterInstance.yearBuiltTitle,
                getterInstance.yearBuiltName,
                formData.yearBuilt,
            ),
            BasicCheckBoxForm(
                getterInstance.hasGarageTitle,
                getterInstance.hasGarageName,
                formData.hasGarage,
            ),
            BasicCheckBoxForm(
                getterInstance.hasPoolTitle,
                getterInstance.hasPoolName,
                formData.hasPool,
            ),
            BasicCheckBoxForm(
                getterInstance.hasBasementTitle,
                getterInstance.hasBasementName,
                formData.hasBasement,
            ),
            {
                title: getterInstance.propertyTypeTitle,
                values: [
                    {
                        name: getterInstance.propertyTypeName,
                        type: InputType.SELECT,
                        value: formData.propertyType,
                        options: GetOptionsForFormProperty(PropertyType),
                    },
                ],
            },
            {
                title: getterInstance.propertyStatusTitle,
                values: [
                    {
                        name: getterInstance.propertyStatusName,
                        type: InputType.SELECT,
                        value: formData.propertyStatus,
                        options: GetOptionsForFormProperty(PropertyStatus),
                    },
                ],
            },
            BasicNumberForm(
                getterInstance.listingPriceTitle,
                getterInstance.listingPriceName,
                formData.listingPrice,
            ),
            BasicNumberForm(
                getterInstance.zestimateTitle,
                getterInstance.zestimateName,
                formData.zestimate,
            ),
            BasicNumberForm(
                getterInstance.zillowRentEstimateTitle,
                getterInstance.zillowRentEstimateName,
                formData.zillowRentEstimate,
            ),
            BasicNumberForm(
                getterInstance.zestimateRangeLowTitle,
                getterInstance.zestimateRangeLowName,
                formData.zestimateRangeLow,
            ),
            BasicNumberForm(
                getterInstance.zestimateRangeHighTitle,
                getterInstance.zestimateRangeHighName,
                formData.zestimateRangeHigh,
            ),
            BasicNumberForm(
                getterInstance.zillowMonthlyPropertyTaxAmountTitle,
                getterInstance.zillowMonthlyPropertyTaxAmountName,
                formData.zillowMonthlyPropertyTaxAmount,
            ),
            BasicNumberForm(
                getterInstance.zillowMonthlyHomeInsuranceAmountTitle,
                getterInstance.zillowMonthlyHomeInsuranceAmountName,
                formData.zillowMonthlyHomeInsuranceAmount,
            ),
            BasicNumberForm(
                getterInstance.zillowMonthlyHOAFeesAmountTitle,
                getterInstance.zillowMonthlyHOAFeesAmountName,
                formData.zillowMonthlyHOAFeesAmount,
            ),
            BasicStringForm(
                getterInstance.descriptionTitle,
                getterInstance.descriptionName,
                formData.description,
            ),
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