import { CreateFilteredPropertyListRequest } from "@realestatemanager/shared";
import { FormProperty } from "../components/StandardForm";
import { Any, Filter, InputType, PropertyType, State } from "../constants/Constant";
import { FormInterface } from "./FormInterface";
import { BasicCheckBoxForm, BasicNumberForm, BasicStringForm, GetOptionsForFormProperty, StateForm } from "./ReusableFormFields";

export type PropertyFilterFormFields = {
    state: State | string;
    zipCode: string;
    city: string;
    rentEstimateFilter: Filter | string;
    rentEstimate: number | undefined;
    listedPriceFilter: Filter | string;
    listedPrice: number | undefined;
    numberOfBedroomsFilter: Filter | string;
    numberOfBedrooms: number | undefined;
    numberOfBathroomsFilter: Filter | string;
    numberOfBathrooms: number | undefined;
    squareFeetFilter: Filter | string;
    squareFeet: number | undefined;
    yearBuiltFilter: Filter | string;
    yearBuilt: number | undefined;
    maxHoaFilter: Filter | string;
    maxHoa: number | undefined;
    monthlyPropertyTaxAmountFilter: Filter | string;
    monthlyPropertyTaxAmount: number | undefined;
    homeType: PropertyType | string;
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
        const request: CreateFilteredPropertyListRequest = {
            zipCode: formData.zipCode,
            city: formData.city,
            hasGarage: formData.hasGarage,
            hasBasement: formData.hasBasement,
            hasPool: formData.hasPool,
            isActive: formData.isActive,
            limit: formData.limit,
        };

        if (formData.state !== '') {
            request.state = formData.state as State;
        }

        if (formData.rentEstimateFilter !== '') {
            request.rentEstimate = {
                filter: formData.rentEstimateFilter as Filter,
                value: formData.rentEstimate ?? 0,
            };
        }

        if (formData.listedPriceFilter !== '') {
            request.listedPrice = {
                filter: formData.listedPriceFilter as Filter,
                value: formData.listedPrice ?? 0
            };
        }

        if (formData.numberOfBedroomsFilter !== '') {
            request.numberOfBedrooms = {
                filter: formData.numberOfBedroomsFilter as Filter,
                value: formData.numberOfBedrooms ?? 0
            };
        }

        if (formData.numberOfBathroomsFilter !== '') {
            request.numberOfBathrooms = {
                filter: formData.numberOfBathroomsFilter as Filter,
                value: formData.numberOfBathrooms ?? 0
            };
        }

        if (formData.squareFeetFilter !== '') {
            request.squareFeet = {
                filter: formData.squareFeetFilter as Filter,
                value: formData.squareFeet ?? 0
            };
        }

        if (formData.yearBuiltFilter !== '') {
            request.yearBuilt = {
                filter: formData.yearBuiltFilter as Filter,
                value: formData.yearBuilt ?? 0
            };
        }

        if (formData.maxHoaFilter !== '') {
            request.maxHoa = {
                filter: formData.maxHoaFilter as Filter,
                value: formData.maxHoa ?? 0
            };
        }

        if (formData.monthlyPropertyTaxAmountFilter !== '') {
            request.monthlyPropertyTaxAmount = {
                filter: formData.monthlyPropertyTaxAmountFilter as Filter,
                value: formData.monthlyPropertyTaxAmount ?? 0
            };
        }

        if (formData.homeType !== '') {
            request.homeType = formData.homeType as PropertyType;
        }

        return request;
    }

    // Create a state to store the form data.
    getDefaultFormData(): PropertyFilterFormFields {
        return {
            state: '',
            zipCode: '',
            city: '',
            rentEstimateFilter: '',
            rentEstimate: undefined,
            listedPriceFilter: '',
            listedPrice: undefined,
            numberOfBedroomsFilter: '',
            numberOfBedrooms: undefined,
            numberOfBathroomsFilter: '',
            numberOfBathrooms: undefined,
            squareFeetFilter: '',
            squareFeet: undefined,
            yearBuiltFilter: '',
            yearBuilt: undefined,
            maxHoaFilter: '',
            maxHoa: undefined,
            monthlyPropertyTaxAmountFilter: '',
            monthlyPropertyTaxAmount: undefined,
            homeType: '',
            hasGarage: false,
            hasBasement: false,
            hasPool: false,
            isActive: true,
            limit: 100,
        };
    }

    getFormDetails(formData: PropertyFilterFormFields): FormProperty[] {

        return [
            StateForm(formData.state, true),
            BasicStringForm('ZipCode', 'zipCode', formData.zipCode),
            BasicStringForm('City', 'city', formData.city),
            {
                title: 'Rent Estimate',
                values: [
                    {
                        name: 'rentEstimateFilter',
                        type: InputType.SELECT,
                        value: formData.rentEstimateFilter,
                        options: GetOptionsForFormProperty(Filter, true),
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
                        options: GetOptionsForFormProperty(Filter, true),
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
                        options: GetOptionsForFormProperty(Filter, true),
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
                        options: GetOptionsForFormProperty(Filter, true),
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
                        options: GetOptionsForFormProperty(Filter, true),
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
                        options: GetOptionsForFormProperty(Filter, true),
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
                        options: GetOptionsForFormProperty(Filter, true),
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
                        options: GetOptionsForFormProperty(Filter, true),
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
                        options: GetOptionsForFormProperty(PropertyType, true),
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

