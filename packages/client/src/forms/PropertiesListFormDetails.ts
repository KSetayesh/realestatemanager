import { CreateFilteredPropertyListRequest } from "@realestatemanager/shared";
import { FormProperty } from "../components/StandardForm";
import { Filter, InputType, PropertyType, State, trueAndFalseSelections } from "../constants/Constant";
import { FormInterface } from "./FormInterface";

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
            {
                title: 'State',
                name: 'state',
                value: formData?.state,
                type: InputType.SELECT,
                options: Object.values(State).map((enumValue => {
                    return {
                        value: enumValue,
                        label: enumValue,
                    };
                })),
            },
            {
                title: 'ZipCode',
                name: 'zipCode',
                value: formData?.zipCode,
                type: InputType.STRING,
            },
            {
                title: 'City',
                name: 'city',
                value: formData?.city,
                type: InputType.STRING,
            },
            {
                title: 'Rent Estimate',
                name: 'rentEstimate',
                value: formData?.rentEstimate,
                type: InputType.NUMBER,
                hasFilterOption: true,
                options: Object.values(Filter).map((enumValue => {
                    return {
                        value: enumValue,
                        label: enumValue,
                    };
                })),
            },
            {
                title: 'Listed Price',
                name: 'listedPrice',
                value: formData?.listedPrice,
                type: InputType.NUMBER,
                hasFilterOption: true,
                options: Object.values(Filter).map((enumValue => {
                    return {
                        value: enumValue,
                        label: enumValue,
                    };
                })),
            },
            {
                title: 'Number Of Bedrooms',
                name: 'numberOfBedrooms',
                value: formData?.numberOfBedrooms,
                type: InputType.NUMBER,
                hasFilterOption: true,
                options: Object.values(Filter).map((enumValue => {
                    return {
                        value: enumValue,
                        label: enumValue,
                    };
                })),
            },
            {
                title: 'Number Of Bathrooms',
                name: 'numberOfBathrooms',
                value: formData?.numberOfBathrooms,
                type: InputType.NUMBER,
                hasFilterOption: true,
                options: Object.values(Filter).map((enumValue => {
                    return {
                        value: enumValue,
                        label: enumValue,
                    };
                })),
            },
            {
                title: 'Square Feet',
                name: 'squareFeet',
                value: formData?.squareFeet,
                type: InputType.NUMBER,
                hasFilterOption: true,
                options: Object.values(Filter).map((enumValue => {
                    return {
                        value: enumValue,
                        label: enumValue,
                    };
                })),
            },
            {
                title: 'Year Built',
                name: 'yearBuilt',
                value: formData?.yearBuilt,
                type: InputType.NUMBER,
                hasFilterOption: true,
                options: Object.values(Filter).map((enumValue => {
                    return {
                        value: enumValue,
                        label: enumValue,
                    };
                })),
            },
            {
                title: 'Max Hoa',
                name: 'maxHoa',
                value: formData?.maxHoa,
                type: InputType.NUMBER,
                hasFilterOption: true,
                options: Object.values(Filter).map((enumValue => {
                    return {
                        value: enumValue,
                        label: enumValue,
                    };
                })),
            },
            {
                title: 'Monthly Property Tax Amount',
                name: 'monthlyPropertyTaxAmount',
                value: formData?.monthlyPropertyTaxAmount,
                type: InputType.NUMBER,
                hasFilterOption: true,
                options: Object.values(Filter).map((enumValue => {
                    return {
                        value: enumValue,
                        label: enumValue,
                    };
                })),
            },
            {
                title: 'Home Type',
                name: 'homeType',
                value: formData?.homeType,
                type: InputType.SELECT,
                options: Object.values(PropertyType).map((enumValue => {
                    return {
                        value: enumValue,
                        label: enumValue,
                    };
                })),
            },
            {
                title: 'Has Garage',
                name: 'hasGarage',
                value: formData?.hasGarage ? "true" : "false",
                type: InputType.CHECKBOX,
                options: trueAndFalseSelections(),
            },
            {
                title: 'Has Basement',
                name: 'hasBasement',
                value: formData?.hasBasement ? "true" : "false",
                type: InputType.CHECKBOX,
                options: trueAndFalseSelections(),
            },
            {
                title: 'Has Pool',
                name: 'hasPool',
                value: formData?.hasPool ? "true" : "false",
                type: InputType.CHECKBOX,
                options: trueAndFalseSelections(),
            },
            {
                title: 'Is Active',
                name: 'isActive',
                value: formData?.isActive ? "true" : "false",
                type: InputType.CHECKBOX,
                options: trueAndFalseSelections(),
            },
        ];
    }

}

