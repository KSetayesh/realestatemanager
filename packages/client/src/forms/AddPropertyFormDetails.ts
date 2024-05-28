import { CreateListingDetailsRequest } from "@realestatemanager/shared";
import {
    InputType,
    PropertyStatus,
    PropertyType,
} from "../constants/Constant";
import { FormInterface } from "./FormInterface";
import { FormProperty, FormPropertyMap } from "../components/StandardForm";
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
    zillowURL: FormProperty;
    fullAddress: FormProperty;
    state: FormProperty;
    zipcode: FormProperty;
    city: FormProperty;
    county: FormProperty;
    country: FormProperty;
    streetAddress: FormProperty;
    apartmentNumber: FormProperty;
    longitude: FormProperty;
    latitude: FormProperty;
    numberOfDaysOnMarket: FormProperty;
    elementarySchoolRating: FormProperty;
    middleSchoolRating: FormProperty;
    highSchoolRating: FormProperty;
    numberOfBedrooms: FormProperty;
    numberOfFullBathrooms: FormProperty;
    numberOfHalfBathrooms: FormProperty;
    squareFeet: FormProperty;
    acres: FormProperty;
    yearBuilt: FormProperty;
    hasGarage: FormProperty;
    hasPool: FormProperty;
    hasBasement: FormProperty;
    propertyType: FormProperty;
    propertyStatus: FormProperty;
    listingPrice: FormProperty;
    zestimate: FormProperty;
    zillowRentEstimate: FormProperty;
    zestimateRangeLow: FormProperty;
    zestimateRangeHigh: FormProperty;
    zillowMonthlyPropertyTaxAmount: FormProperty;
    zillowMonthlyHomeInsuranceAmount: FormProperty;
    zillowMonthlyHOAFeesAmount: FormProperty;
    description: FormProperty;
};

export class AddPropertyFormDetails implements FormInterface<AddPropertyFormData, CreateListingDetailsRequest> {

    getFormDetails():  FormPropertyMap<AddPropertyFormData> { //FormProperty[] {
        return {
            zillowURL: BasicStringForm('Zillow URL', 'zillowURL'), //, formData.zillowURL),
            fullAddress: BasicStringForm('Full Address', 'fullAddress'), //, formData.fullAddress),
            state: StateForm(), //formData.state),
            zipcode: BasicStringForm('Zipcode', 'zipcode'), //, formData.zipcode),
            city: BasicStringForm('City', 'city'), //, formData.city),
            county: BasicStringForm('County', 'county'), //, formData.county),
            country: CountryForm(), //(formData.country),
            streetAddress: BasicStringForm('Street Address', 'streetAddress'), //, formData.streetAddress),
            apartmentNumber: BasicStringForm('Apartment Number', 'apartmentNumber'), //, formData.apartmentNumber),
            longitude: BasicNumberForm('Longitude', 'longitude'), //, formData.longitude),
            latitude: BasicNumberForm('Latitude', 'latitude'), //, formData.latitude),
            numberOfDaysOnMarket: BasicNumberForm('Number Of Days On Market', 'numberOfDaysOnMarket'), //, formData.numberOfDaysOnMarket),
            elementarySchoolRating: {
                title: 'Elementary School Rating',
                values: {
                    elementarySchoolRating: {
                        name: 'elementarySchoolRating',
                        type: InputType.SELECT,
                        value: undefined,
                        //value: formData.elementarySchoolRating,
                        defaultValue: -1,
                        options: ratingSelections(),
                    },
                },
            },
            middleSchoolRating: {
                title: 'Middle School Rating',
                values: {
                    middleSchoolRating: {
                        name: 'middleSchoolRating',
                        type: InputType.SELECT,
                        value: undefined,
                        // value: formData.middleSchoolRating,
                        defaultValue: -1,
                        options: ratingSelections(),
                    },
                },
            },
            highSchoolRating: {
                title: 'High School Rating',
                values: {
                    highSchoolRating: {
                        name: 'highSchoolRating',
                        type: InputType.SELECT,
                        value: undefined,
                        // value: formData.highSchoolRating,
                        defaultValue: -1,
                        options: ratingSelections(),
                    },
                },
            },
            numberOfBedrooms: BasicNumberForm('Number Of Bedrooms', 'numberOfBedrooms'), //, formData.numberOfBedrooms),
            numberOfFullBathrooms: BasicNumberForm('Number Of Full Bathrooms', 'numberOfFullBathrooms'), // formData.numberOfFullBathrooms),
            numberOfHalfBathrooms: BasicNumberForm('Number Of Half Bathrooms', 'numberOfHalfBathrooms'), //formData.numberOfHalfBathrooms),
            squareFeet: BasicNumberForm('Square Feet', 'squareFeet'), //, formData.squareFeet),
            acres: BasicNumberForm('Acres', 'acres'), //, formData.acres),
            yearBuilt: BasicNumberForm('Year Built', 'yearBuilt'), //, formData.yearBuilt),
            hasGarage: BasicCheckBoxForm('Has Garage', 'hasGarage'), // formData.hasGarage),
            hasPool: BasicCheckBoxForm('Has Pool', 'hasPool'), //, formData.hasPool),
            hasBasement: BasicCheckBoxForm('Has Basement', 'hasBasement'), //formData.hasBasement),
            propertyType: {
                title: 'Property Type',
                values: {
                    propertyType: {
                        name: 'propertyType',
                        type: InputType.SELECT,
                        value: undefined,
                        // value: formData.propertyType,
                        defaultValue: -1,
                        options: GetOptionsForFormProperty(PropertyType),
                    },
                },
            },
            propertyStatus: {
                title: 'Property Status',
                values: {
                    propertyStatus: {
                        name: 'propertyStatus',
                        type: InputType.SELECT,
                        value: undefined,
                        //value: formData.propertyStatus,
                        defaultValue: -1,
                        options: GetOptionsForFormProperty(PropertyStatus),
                    },
                },
            },
            listingPrice: BasicNumberForm('Listing Price', 'listingPrice'), //, formData.listingPrice),
            zestimate: BasicNumberForm('Zestimate', 'zestimate'),  //formData.zestimate),
            zillowRentEstimate: BasicNumberForm('Zillow Rent Estimate', 'zillowRentEstimate'), //, formData.zillowRentEstimate),
            zestimateRangeLow: BasicNumberForm('Zillow Range Low', 'zestimateRangeLow'), //, formData.zestimateRangeLow),
            zestimateRangeHigh: BasicNumberForm('Zillow Range High', 'zestimateRangeHigh'), //formData.zestimateRangeHigh),
            zillowMonthlyPropertyTaxAmount: BasicNumberForm('Zillow Monthly Property Tax Amount', 'zillowMonthlyPropertyTaxAmount'), //, formData.zillowMonthlyPropertyTaxAmount),
            zillowMonthlyHomeInsuranceAmount: BasicNumberForm('Zillow Monthly Home Insurance Amount', 'zillowMonthlyHomeInsuranceAmount'), //formData.zillowMonthlyHomeInsuranceAmount),
            zillowMonthlyHOAFeesAmount: BasicNumberForm('Zillow Monthly HOA Fees Amount', 'zillowMonthlyHOAFeesAmount'), //, formData.zillowMonthlyHOAFeesAmount),
            description: BasicStringForm('Discription', 'description'), //,formData.description),
        };
    }

    // createRequest(formData: AddPropertyFormData): CreateListingDetailsRequest {
    //     return {
    //         zillowURL: formData.zillowURL,
    //         listingPrice: formData.listingPrice,
    //         // dateListed: getDateNDaysAgo(parseInt(formData.numberOfDaysOnMarket)),
    //         numberOfDaysOnMarket: formData.numberOfDaysOnMarket,
    //         propertyStatus: formData.propertyStatus as PropertyStatus,
    //         propertyDetails: {
    //             address: {
    //                 fullAddress: formData.fullAddress,
    //                 state: formData.state as State,
    //                 zipcode: formData.zipcode,
    //                 city: formData.city,
    //                 county: formData.county,
    //                 country: formData.country as Country,
    //                 streetAddress: formData.streetAddress,
    //                 apartmentNumber: formData.apartmentNumber,
    //                 longitude: formData.longitude,
    //                 latitude: formData.latitude,
    //             },
    //             schoolRating: {
    //                 elementarySchoolRating: formData.elementarySchoolRating,
    //                 middleSchoolRating: formData.middleSchoolRating,
    //                 highSchoolRating: formData.highSchoolRating,
    //             },
    //             numberOfBedrooms: formData.numberOfBedrooms,
    //             numberOfFullBathrooms: formData.numberOfFullBathrooms,
    //             numberOfHalfBathrooms: formData.numberOfHalfBathrooms,
    //             squareFeet: formData.squareFeet,
    //             acres: formData.acres,
    //             yearBuilt: formData.yearBuilt,
    //             hasGarage: formData.hasGarage,
    //             hasPool: formData.hasPool,
    //             hasBasement: formData.hasBasement,
    //             propertyType: formData.propertyType as PropertyType,
    //             description: formData.description,
    //         },
    //         zillowMarketEstimates: {
    //             zestimate: formData.zestimate, // Estimated market value
    //             zestimateRange: {
    //                 low: formData.zestimateRangeLow,
    //                 high: formData.zestimateRangeHigh,
    //             },
    //             zillowRentEstimate: formData.zillowRentEstimate, // Estimated rental value
    //             zillowMonthlyPropertyTaxAmount: formData.zillowMonthlyPropertyTaxAmount,
    //             zillowMonthlyHomeInsuranceAmount: formData.zillowMonthlyHomeInsuranceAmount,
    //             zillowMonthlyHOAFeesAmount: formData.zillowMonthlyHOAFeesAmount,
    //         },
    //     };
    // }

    // // Create a state to store the form data.
    // getDefaultFormData(): AddPropertyFormData {
    //     return {
    //         zillowURL: '',
    //         fullAddress: '',
    //         state: State.AL,
    //         zipcode: '',
    //         city: '',
    //         county: '',
    //         country: Country.UnitedStates,
    //         streetAddress: '',
    //         apartmentNumber: '',
    //         longitude: -1,
    //         latitude: -1,
    //         numberOfDaysOnMarket: 0,
    //         elementarySchoolRating: -1,
    //         middleSchoolRating: -1,
    //         highSchoolRating: -1,
    //         numberOfBedrooms: -1,
    //         numberOfFullBathrooms: -1,
    //         numberOfHalfBathrooms: -1,
    //         squareFeet: -1,
    //         acres: -1,
    //         yearBuilt: -1,
    //         hasGarage: false,
    //         hasPool: false,
    //         hasBasement: false,
    //         propertyType: PropertyType.SINGLE_FAMILY,
    //         propertyStatus: PropertyStatus.ACTIVE,
    //         listingPrice: -1,
    //         zestimate: -1,
    //         zillowRentEstimate: -1,
    //         zestimateRangeLow: -1,
    //         zestimateRangeHigh: -1,
    //         zillowMonthlyPropertyTaxAmount: -1,
    //         zillowMonthlyHomeInsuranceAmount: -1,
    //         zillowMonthlyHOAFeesAmount: -1,
    //         description: '',
    //     };
    // }

} 