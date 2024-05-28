import { CreateFilteredPropertyListRequest } from "@realestatemanager/shared";
import { FormProperty, FormPropertyMap } from "../components/StandardForm";
import { Filter, InputType, PropertyType } from "../constants/Constant";
import { FormInterface } from "./FormInterface";
import { BasicCheckBoxForm, BasicNumberForm, BasicStringForm, GetOptionsForFormProperty, StateForm } from "./ReusableFormFields";

export type PropertyFilterFormFields = {
    state: FormProperty;
    zipCode: FormProperty;
    city: FormProperty;
    rentEstimate: FormProperty;
    listedPrice: FormProperty;
    numberOfBedrooms: FormProperty;
    numberOfBathrooms: FormProperty;
    squareFeet: FormProperty;
    yearBuilt: FormProperty;
    maxHoa: FormProperty;
    monthlyPropertyTaxAmount: FormProperty;
    homeType: FormProperty;
    hasGarage: FormProperty;
    hasBasement: FormProperty;
    hasPool: FormProperty;
    isActive: FormProperty;
    limit: FormProperty;
};

// replace undefined with a type
export class PropertiesListFormDetails implements FormInterface<PropertyFilterFormFields, CreateFilteredPropertyListRequest> {

    // TODO
    // createRequest(formData: PropertyFilterFormFields): CreateFilteredPropertyListRequest {
    //     return {
    //         state: formData.state,
    //         zipCode: formData.zipCode,
    //         city: formData.city,
    //         rentEstimate: {
    //             filter: formData.rentEstimate.rentEstimateFilter,
    //             value: formData.rentEstimate.rentEstimate,
    //         },
    //         listedPrice: {
    //             filter: formData.listedPrice.listedPriceFilter,
    //             value: formData.listedPrice.listedPrice,
    //         },
    //         numberOfBedrooms: {
    //             filter: formData.numberOfBedrooms.numberOfBedroomsFilter,
    //             value: formData.numberOfBedrooms.numberOfBedrooms,
    //         },
    //         numberOfBathrooms: {
    //             filter: formData.numberOfBathrooms.numberOfBathroomsFilter,
    //             value: formData.numberOfBathrooms.numberOfBathrooms,
    //         },
    //         squareFeet: {
    //             filter: formData.squareFeet.squareFeetFilter,
    //             value: formData.squareFeet.squareFeet,
    //         },
    //         yearBuilt: {
    //             filter: formData.yearBuilt.yearBuiltFilter,
    //             value: formData.yearBuilt.yearBuilt,
    //         },
    //         maxHoa: {
    //             filter: formData.maxHoa.maxHoaFilter,
    //             value: formData.maxHoa.maxHoa,
    //         },
    //         monthlyPropertyTaxAmount: {
    //             filter: formData.monthlyPropertyTaxAmount.monthlyPropertyTaxAmountFilter,
    //             value: formData.monthlyPropertyTaxAmount.monthlyPropertyTaxAmount,
    //         },
    //         homeType: formData.homeType,
    //         hasGarage: formData.hasGarage,
    //         hasBasement: formData.hasBasement,
    //         hasPool: formData.hasPool,
    //         isActive: formData.isActive,
    //         limit: formData.limit,
    //     }
    // }

    // Create a state to store the form data.
    // getDefaultFormData(): PropertyFilterFormFields {
    //     return {
    //         state: State.AL,
    //         zipCode: '',
    //         city: '',
    //         rentEstimateFilter: Filter.gteq,
    //         rentEstimate: -1,
    //         listedPriceFilter: Filter.gteq,
    //         listedPrice: -1,
    //         numberOfBedroomsFilter: Filter.gteq,
    //         numberOfBedrooms: -1,
    //         numberOfBathroomsFilter: Filter.gteq,
    //         numberOfBathrooms: -1,
    //         squareFeetFilter: Filter.gteq,
    //         squareFeet: -1,
    //         yearBuiltFilter: Filter.gteq,
    //         yearBuilt: -1,
    //         maxHoaFilter: Filter.gteq,
    //         maxHoa: -1,
    //         monthlyPropertyTaxAmountFilter: Filter.gteq,
    //         monthlyPropertyTaxAmount: -1,
    //         homeType: PropertyType.SINGLE_FAMILY,
    //         hasGarage: false,
    //         hasBasement: false,
    //         hasPool: false,
    //         isActive: true,
    //         limit: 100,
    //     };
    // }

    // getDefaultFormData(): PropertyFilterFormFields {
    //     return {
    //         state: State.AL,
    //         zipCode: '',
    //         city: '',
    //         rentEstimateFilter: Filter.gteq,
    //         rentEstimate: -1,
    //         listedPriceFilter: Filter.gteq,
    //         listedPrice: -1,
    //         numberOfBedroomsFilter: Filter.gteq,
    //         numberOfBedrooms: -1,
    //         numberOfBathroomsFilter: Filter.gteq,
    //         numberOfBathrooms: -1,
    //         squareFeetFilter: Filter.gteq,
    //         squareFeet: -1,
    //         yearBuiltFilter: Filter.gteq,
    //         yearBuilt: -1,
    //         maxHoaFilter: Filter.gteq,
    //         maxHoa: -1,
    //         monthlyPropertyTaxAmountFilter: Filter.gteq,
    //         monthlyPropertyTaxAmount: -1,
    //         homeType: PropertyType.SINGLE_FAMILY,
    //         hasGarage: false,
    //         hasBasement: false,
    //         hasPool: false,
    //         isActive: true,
    //         limit: 100,
    //     };
    // }

    getFormDetails(): FormPropertyMap<PropertyFilterFormFields> { // FormProperty[] {
        return {
            state: StateForm(), //(formData.state),
            zipCode: BasicStringForm('ZipCode', 'zipCode'), // formData.zipCode),
            city: BasicStringForm('City', 'city'), // formData.city),
            rentEstimate: {
                title: 'Rent Estimate',
                values: {
                    rentEstimateFilter: {
                        name: 'rentEstimateFilter',
                        type: InputType.SELECT,
                        //value: formData.rentEstimateFilter,
                        defaultValue: 'Any',
                        value: undefined,
                        options: GetOptionsForFormProperty(Filter, true),
                    },
                    rentEstimate: {
                        name: 'rentEstimate',
                        type: InputType.NUMBER,
                        defaultValue: -1,
                        value: undefined,
                        //value: formData.rentEstimate,
                    },
                },
            },
            listedPrice: {
                title: 'Listed Price',
                values: {
                    listedPriceFilter: {
                        name: 'listedPriceFilter',
                        type: InputType.SELECT,
                        // value: formData.listedPriceFilter,
                        defaultValue: 'Any',
                        value: undefined,
                        options: GetOptionsForFormProperty(Filter, true),
                    },
                    listedPrice: {
                        name: 'listedPrice',
                        type: InputType.NUMBER,
                        defaultValue: -1,
                        value: undefined,
                        // value: formData.listedPrice,
                    },
                },
            },
            numberOfBedrooms: {
                title: 'Number Of Bedrooms',
                values: {
                    numberOfBedroomsFilter: {
                        name: 'numberOfBedroomsFilter',
                        type: InputType.SELECT,
                        // value: formData.numberOfBedroomsFilter,
                        defaultValue: 'Any',
                        value: undefined,
                        options: GetOptionsForFormProperty(Filter, true),
                    },
                    numberOfBedrooms: {
                        name: 'numberOfBedrooms',
                        type: InputType.NUMBER,
                        defaultValue: -1,
                        value: undefined,
                        // value: formData.numberOfBedrooms,
                    },
                },
            },
            numberOfBathrooms: {
                title: 'Number Of Bathrooms',
                values: {
                    numberOfBathroomsFilter: {
                        name: 'numberOfBathroomsFilter',
                        type: InputType.SELECT,
                        // value: formData.numberOfBathroomsFilter,
                        defaultValue: 'Any',
                        value: undefined,
                        options: GetOptionsForFormProperty(Filter, true),
                    },
                    numberOfBathrooms: {
                        name: 'numberOfBathrooms',
                        type: InputType.NUMBER,
                        defaultValue: -1,
                        value: undefined,
                        // value: formData.numberOfBathrooms,
                    },
                },
            },
            squareFeet: {
                title: 'Square Feet',
                values: {
                    squareFeetFilter: {
                        name: 'squareFeetFilter',
                        type: InputType.SELECT,
                        // value: formData.squareFeetFilter,
                        defaultValue: 'Any',
                        value: undefined,
                        options: GetOptionsForFormProperty(Filter, true),
                    },
                    squareFeet: {
                        name: 'squareFeet',
                        type: InputType.NUMBER,
                        defaultValue: -1,
                        value: undefined,
                        // value: formData.squareFeet,
                    },
                },
            },
            yearBuilt: {
                title: 'Year Built',
                values: {
                    yearBuiltFilter: {
                        name: 'yearBuiltFilter',
                        type: InputType.SELECT,
                        // value: formData.yearBuiltFilter,
                        defaultValue: 'Any',
                        value: undefined,
                        options: GetOptionsForFormProperty(Filter, true),
                    },
                    yearBuilt: {
                        name: 'yearBuilt',
                        type: InputType.NUMBER,
                        defaultValue: -1,
                        value: undefined,
                        // value: formData.yearBuilt,
                    },
                },
            },
            maxHoa: {
                title: 'Max Hoa',
                values: {
                    maxHoaFilter: {
                        name: 'maxHoaFilter',
                        type: InputType.SELECT,
                        // value: formData.maxHoaFilter,
                        defaultValue: 'Any',
                        value: undefined,
                        options: GetOptionsForFormProperty(Filter, true),
                    },
                    maxHoa: {
                        name: 'maxHoa',
                        type: InputType.NUMBER,
                        defaultValue: -1,
                        value: undefined,
                        // value: formData.maxHoa,
                    },
                },
            },
            monthlyPropertyTaxAmount: {
                title: 'Monthly Property Tax Amount',
                values: {
                    monthlyPropertyTaxAmountFilter: {
                        name: 'monthlyPropertyTaxAmountFilter',
                        type: InputType.SELECT,
                        // value: formData.monthlyPropertyTaxAmountFilter,
                        defaultValue: 'Any',
                        value: undefined,
                        options: GetOptionsForFormProperty(Filter, true),
                    },
                    monthlyPropertyTaxAmount: {
                        name: 'monthlyPropertyTaxAmount',
                        type: InputType.NUMBER,
                        defaultValue: -1,
                        value: undefined,
                        // value: formData.monthlyPropertyTaxAmount,
                    },
                }
            },
            homeType: {
                title: 'Home Type',
                values: {
                    homeType: {
                        name: 'homeType',
                        type: InputType.SELECT,
                        // value: formData.homeType,
                        defaultValue: 'Any',
                        value: undefined,
                        options: GetOptionsForFormProperty(PropertyType, true),
                    },
                }
            },
            hasGarage: BasicCheckBoxForm('Has Garage', 'hasGarage'), //, formData.hasGarage),
            hasBasement: BasicCheckBoxForm('Has Basement', 'hasBasement'), //, formData.hasBasement),
            hasPool: BasicCheckBoxForm('Has Pool', 'hasPool'), //, formData.hasPool),
            isActive: BasicCheckBoxForm('Is Active', 'isActive'), // formData.isActive),
            limit: BasicNumberForm('Limit', 'limit'), //, formData.limit),
        };
    }

}

