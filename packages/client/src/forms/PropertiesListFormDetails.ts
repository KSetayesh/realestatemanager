import { CreateFilteredPropertyListRequest } from "@realestatemanager/shared";
import { FormProperty } from "../components/StandardForm";
import { Filter, InputType, PropertyType, State } from "../constants/Constant";
import { FormInterface } from "./FormInterface";
import { BasicCheckBoxForm, BasicNumberForm, BasicStringForm, GetOptionsForFormProperty, StateForm } from "./ReusableFormFields";

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
            rentEstimate: -1,
            listedPriceFilter: Filter.gteq,
            listedPrice: -1,
            numberOfBedroomsFilter: Filter.gteq,
            numberOfBedrooms: -1,
            numberOfBathroomsFilter: Filter.gteq,
            numberOfBathrooms: -1,
            squareFeetFilter: Filter.gteq,
            squareFeet: -1,
            yearBuiltFilter: Filter.gteq,
            yearBuilt: -1,
            maxHoaFilter: Filter.gteq,
            maxHoa: -1,
            monthlyPropertyTaxAmountFilter: Filter.gteq,
            monthlyPropertyTaxAmount: -1,
            homeType: PropertyType.SINGLE_FAMILY,
            hasGarage: false,
            hasBasement: false,
            hasPool: false,
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
                        options: GetOptionsForFormProperty(Filter),
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
                        options: GetOptionsForFormProperty(Filter),
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
                        options: GetOptionsForFormProperty(Filter),
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
                        options: GetOptionsForFormProperty(Filter),
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
                        options: GetOptionsForFormProperty(Filter),
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
                        options: GetOptionsForFormProperty(Filter),
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
                        options: GetOptionsForFormProperty(Filter),
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
                        options: GetOptionsForFormProperty(Filter),
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
                        options: GetOptionsForFormProperty(PropertyType),
                    },
                ],
            },
            BasicCheckBoxForm('Has Garage', 'hasGarage', formData.hasGarage),
            BasicCheckBoxForm('Has Basement', 'hasBasement', formData.hasBasement),
            BasicCheckBoxForm('Has Pool', 'hasPool', formData.hasPool),
            BasicCheckBoxForm('Is Active', 'isActive', formData.isActive),
            BasicNumberForm('Limit', 'limit', formData.limit),
        ];
    }

}

