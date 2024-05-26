import { CreateFilteredPropertyListRequest } from "@realestatemanager/shared";
import { FormProperty } from "../components/StandardForm";
import { Filter, InputType, PropertyType, State } from "../constants/Constant";
import { FormInterface } from "./FormInterface";
import { BasicCheckBoxForm, BasicStringForm, StateForm } from "./ReusableFormFields";

export type PropertyFilterFormFields = {
    state: State;
    zipCode: string;
    city: string;
    rentEstimateFilter: Filter;
    rentEstimate: number;
    listedPriceFilter: Filter;
    listedPrice: number;
    numberOfBedroomsFilter: Filter;
    numberOfBedrooms: number;
    numberOfBathroomsFilter: Filter;
    numberOfBathrooms: number;
    squareFeetFilter: Filter;
    squareFeet: number;
    yearBuiltFilter: Filter;
    yearBuilt: number;
    maxHoaFilter: Filter;
    maxHoa: number;
    monthlyPropertyTaxAmountFilter: Filter;
    monthlyPropertyTaxAmount: number;
    homeType: PropertyType;
    hasGarage: boolean;
    hasBasement: boolean;
    hasPool: boolean;
    isActive: boolean;
    limit: number;
};

// replace undefined with a type
export class PropertiesListFormDetails implements FormInterface<PropertyFilterFormFields, CreateFilteredPropertyListRequest> {

    // TODO
    createRequest(formData: PropertyFilterFormFields): CreateFilteredPropertyListRequest {
        return {
            state: formData.state,
            zipCode: formData.zipCode,
            city: formData.city,
            rentEstimate: {
                filter: formData.rentEstimateFilter,
                value: formData.rentEstimate
            },
            listedPrice: {
                filter: formData.listedPriceFilter,
                value: formData.listedPrice,
            },
            numberOfBedrooms: {
                filter: formData.numberOfBathroomsFilter,
                value: formData.numberOfBedrooms,
            },
            numberOfBathrooms: {
                filter: formData.numberOfBathroomsFilter,
                value: formData.numberOfBathrooms,
            },
            squareFeet: {
                filter: formData.squareFeetFilter,
                value: formData.squareFeet,
            },
            yearBuilt: {
                filter: formData.yearBuiltFilter,
                value: formData.yearBuilt,
            },
            maxHoa: {
                filter: formData.maxHoaFilter,
                value: formData.maxHoa,
            },
            monthlyPropertyTaxAmount: {
                filter: formData.monthlyPropertyTaxAmountFilter,
                value: formData.monthlyPropertyTaxAmount,
            },
            homeType: formData.homeType,
            hasGarage: formData.hasGarage,
            hasBasement: formData.hasBasement,
            hasPool: formData.hasPool,
            isActive: formData.isActive,
            limit: formData.limit,
        }
    }

    // Create a state to store the form data.
    getDefaultFormData(): PropertyFilterFormFields {
        return {
            state: State.AL,
            zipCode: '',
            city: '',
            rentEstimateFilter: Filter.gteq,
            rentEstimate: 0,
            listedPriceFilter: Filter.gteq,
            listedPrice: 0,
            numberOfBedroomsFilter: Filter.gteq,
            numberOfBedrooms: 0,
            numberOfBathroomsFilter: Filter.gteq,
            numberOfBathrooms: 0,
            squareFeetFilter: Filter.gteq,
            squareFeet: 0,
            yearBuiltFilter: Filter.gteq,
            yearBuilt: 0,
            maxHoaFilter: Filter.gteq,
            maxHoa: 0,
            monthlyPropertyTaxAmountFilter: Filter.gteq,
            monthlyPropertyTaxAmount: 0,
            homeType: PropertyType.SINGLE_FAMILY,
            hasGarage: true,
            hasBasement: true,
            hasPool: true,
            isActive: true,
            limit: 100,
        };
    }

    getFormDetails(formData: PropertyFilterFormFields): FormProperty[] {
        return [
            StateForm(formData.state),
            BasicStringForm('ZipCode', 'zipCode', formData.zipCode),
            BasicStringForm('City', 'city', formData.city),
            {
                title: 'Rent Estimate',
                values: [
                    {
                        name: 'rentEstimateFilter',
                        type: InputType.SELECT,
                        value: formData.rentEstimateFilter,
                        options: Object.values(Filter).map((enumValue => {
                            return {
                                value: enumValue,
                                label: enumValue,
                            };
                        })),
                    },
                    {
                        name: 'rentEstimate',
                        type: InputType.NUMBER,
                        value: formData.rentEstimate,
                    },
                ],
            },
            {
                title: 'Listed Price',
                values: [
                    {
                        name: 'listedPriceFilter',
                        type: InputType.SELECT,
                        value: formData.listedPriceFilter,
                        options: Object.values(Filter).map((enumValue => {
                            return {
                                value: enumValue,
                                label: enumValue,
                            };
                        })),
                    },
                    {
                        name: 'listedPrice',
                        type: InputType.NUMBER,
                        value: formData.listedPrice,
                    },
                ],
            },
            {
                title: 'Number Of Bedrooms',
                values: [
                    {
                        name: 'numberOfBedroomsFilter',
                        type: InputType.SELECT,
                        value: formData.numberOfBedroomsFilter,
                        options: Object.values(Filter).map((enumValue => {
                            return {
                                value: enumValue,
                                label: enumValue,
                            };
                        })),
                    },
                    {
                        name: 'numberOfBedrooms',
                        type: InputType.NUMBER,
                        value: formData.numberOfBedrooms,
                    },
                ],
            },
            {
                title: 'Number Of Bathrooms',
                values: [
                    {
                        name: 'numberOfBathroomsFilter',
                        type: InputType.SELECT,
                        value: formData.numberOfBathroomsFilter,
                        options: Object.values(Filter).map((enumValue => {
                            return {
                                value: enumValue,
                                label: enumValue,
                            };
                        })),
                    },
                    {
                        name: 'numberOfBathrooms',
                        type: InputType.NUMBER,
                        value: formData.numberOfBathrooms,
                    },
                ],
            },
            {
                title: 'Square Feet',
                values: [
                    {
                        name: 'squareFeetFilter',
                        type: InputType.SELECT,
                        value: formData.squareFeetFilter,
                        options: Object.values(Filter).map((enumValue => {
                            return {
                                value: enumValue,
                                label: enumValue,
                            };
                        })),
                    },
                    {
                        name: 'squareFeet',
                        type: InputType.NUMBER,
                        value: formData.squareFeet,
                    },
                ],
            },
            {
                title: 'Year Built',
                values: [
                    {
                        name: 'yearBuiltFilter',
                        type: InputType.SELECT,
                        value: formData.yearBuiltFilter,
                        options: Object.values(Filter).map((enumValue => {
                            return {
                                value: enumValue,
                                label: enumValue,
                            };
                        })),
                    },
                    {
                        name: 'yearBuilt',
                        type: InputType.NUMBER,
                        value: formData.yearBuilt,
                    },
                ],
            },
            {
                title: 'Max Hoa',
                values: [
                    {
                        name: 'maxHoaFilter',
                        type: InputType.SELECT,
                        value: formData.maxHoaFilter,
                        options: Object.values(Filter).map((enumValue => {
                            return {
                                value: enumValue,
                                label: enumValue,
                            };
                        })),
                    },
                    {
                        name: 'maxHoa',
                        type: InputType.NUMBER,
                        value: formData.maxHoa,
                    },
                ],
            },
            {
                title: 'Monthly Property Tax Amount',
                values: [
                    {
                        name: 'monthlyPropertyTaxAmountFilter',
                        type: InputType.SELECT,
                        value: formData.monthlyPropertyTaxAmountFilter,
                        options: Object.values(Filter).map((enumValue => {
                            return {
                                value: enumValue,
                                label: enumValue,
                            };
                        })),
                    },
                    {
                        name: 'monthlyPropertyTaxAmount',
                        type: InputType.NUMBER,
                        value: formData.monthlyPropertyTaxAmount,
                    },
                ],
            },
            {
                title: 'Home Type',
                values: [
                    {
                        name: 'homeType',
                        type: InputType.SELECT,
                        value: formData.homeType,
                        options: Object.values(PropertyType).map((enumValue => {
                            return {
                                value: enumValue,
                                label: enumValue,
                            };
                        })),
                    },
                ],
            },
            BasicCheckBoxForm('Has Garage', 'hasGarage', formData.hasGarage),
            BasicCheckBoxForm('Has Basement', 'hasBasement', formData.hasBasement),
            BasicCheckBoxForm('Has Pool', 'hasPool', formData.hasPool),
            BasicCheckBoxForm('Is Active', 'isActive', formData.isActive),
        ];
    }

}

