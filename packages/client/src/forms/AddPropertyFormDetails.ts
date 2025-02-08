import {
    AddPropertyFormData,
    AddPropertyTitlesAndLabelsGetter,
    Country,
    CreateListingDetailsRequest,
    PropertyStatus,
    PropertyType,
    State,
    InputType
} from "@realestatemanager/types";
// import {
//     InputType,
// } from "../constants/Constant";
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

export class AddPropertyFormDetails implements FormInterface<AddPropertyFormData, CreateListingDetailsRequest> {

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