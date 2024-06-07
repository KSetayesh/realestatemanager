import {
    AddPropertyFilterTitlesAndLabelsGetter,
    CreateFilteredPropertyListRequest,
    Filter,
    PropertyFilterFormFields,
    PropertyType,
    State
} from "@realestatemanager/shared";
import { FormProperty } from "../components/StandardForm";
import { InputType } from "../constants/Constant";
import { FormInterface } from "./FormInterface";
import {
    BasicCheckBoxForm,
    BasicNumberForm,
    BasicStringForm,
    GetOptionsForFormProperty,
    StateForm
} from "./ReusableFormFields";

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

        const getDefaultNumberValue = (value: number | string): number => {
            return typeof value === 'string' ? 0 : Number(value);
        };

        if (formData.state !== '') {
            request.state = formData.state as State;
        }

        if (formData.rentEstimateFilter !== '') {
            request.rentEstimate = {
                filter: formData.rentEstimateFilter as Filter,
                value: getDefaultNumberValue(formData.rentEstimate),
            };
        }

        if (formData.listedPriceFilter !== '') {
            request.listedPrice = {
                filter: formData.listedPriceFilter as Filter,
                value: getDefaultNumberValue(formData.listedPrice),
            };
        }

        if (formData.numberOfBedroomsFilter !== '') {
            request.numberOfBedrooms = {
                filter: formData.numberOfBedroomsFilter as Filter,
                value: getDefaultNumberValue(formData.numberOfBedrooms),
            };
        }

        if (formData.numberOfBathroomsFilter !== '') {
            request.numberOfBathrooms = {
                filter: formData.numberOfBathroomsFilter as Filter,
                value: getDefaultNumberValue(formData.numberOfBathrooms),
            };
        }

        if (formData.squareFeetFilter !== '') {
            request.squareFeet = {
                filter: formData.squareFeetFilter as Filter,
                value: getDefaultNumberValue(formData.squareFeet)
            };
        }

        if (formData.yearBuiltFilter !== '') {
            request.yearBuilt = {
                filter: formData.yearBuiltFilter as Filter,
                value: getDefaultNumberValue(formData.yearBuilt),
            };
        }

        if (formData.maxHoaFilter !== '') {
            request.maxHoa = {
                filter: formData.maxHoaFilter as Filter,
                value: getDefaultNumberValue(formData.maxHoa),
            };
        }

        if (formData.monthlyPropertyTaxAmountFilter !== '') {
            request.monthlyPropertyTaxAmount = {
                filter: formData.monthlyPropertyTaxAmountFilter as Filter,
                value: getDefaultNumberValue(formData.monthlyPropertyTaxAmount),
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
            rentEstimate: '',
            listedPriceFilter: '',
            listedPrice: '',
            numberOfBedroomsFilter: '',
            numberOfBedrooms: '',
            numberOfBathroomsFilter: '',
            numberOfBathrooms: '',
            squareFeetFilter: '',
            squareFeet: '',
            yearBuiltFilter: '',
            yearBuilt: '',
            maxHoaFilter: '',
            maxHoa: '',
            monthlyPropertyTaxAmountFilter: '',
            monthlyPropertyTaxAmount: '',
            homeType: '',
            hasGarage: false,
            hasBasement: false,
            hasPool: false,
            isActive: true,
            limit: 100,
        };
    }

    getFormDetails(formData: PropertyFilterFormFields): FormProperty[] {
        const getterInstance: AddPropertyFilterTitlesAndLabelsGetter = new AddPropertyFilterTitlesAndLabelsGetter();
        return [
            StateForm(
                formData.state,
                true
            ),
            BasicStringForm(
                getterInstance.zipCodeTitle,
                getterInstance.zipCodeName,
                formData.zipCode
            ),
            BasicStringForm(
                getterInstance.cityTitle,
                getterInstance.cityName,
                formData.city
            ),
            {
                title: getterInstance.rentEstimateTitle,
                values: [
                    {
                        name: getterInstance.rentEstimateFilterName,
                        type: InputType.SELECT,
                        value: formData.rentEstimateFilter,
                        options: GetOptionsForFormProperty(Filter, true),
                    },
                    {
                        name: getterInstance.rentEstimateName,
                        type: InputType.NUMBER,
                        value: formData.rentEstimate,
                    },
                ],
            },
            {
                title: getterInstance.listedPriceTitle,
                values: [
                    {
                        name: getterInstance.listedPriceFilterName,
                        type: InputType.SELECT,
                        value: formData.listedPriceFilter,
                        options: GetOptionsForFormProperty(Filter, true),
                    },
                    {
                        name: getterInstance.listedPriceName,
                        type: InputType.NUMBER,
                        value: formData.listedPrice,
                    },
                ],
            },
            {
                title: getterInstance.numberOfBedroomsTitle,
                values: [
                    {
                        name: getterInstance.numberOfBedroomsFilterName,
                        type: InputType.SELECT,
                        value: formData.numberOfBedroomsFilter,
                        options: GetOptionsForFormProperty(Filter, true),
                    },
                    {
                        name: getterInstance.numberOfBedroomsName,
                        type: InputType.NUMBER,
                        value: formData.numberOfBedrooms,
                    },
                ],
            },
            {
                title: getterInstance.numberOfBathroomsTitle,
                values: [
                    {
                        name: getterInstance.numberOfBathroomsFilterName,
                        type: InputType.SELECT,
                        value: formData.numberOfBathroomsFilter,
                        options: GetOptionsForFormProperty(Filter, true),
                    },
                    {
                        name: getterInstance.numberOfBathroomsName,
                        type: InputType.NUMBER,
                        value: formData.numberOfBathrooms,
                    },
                ],
            },
            {
                title: getterInstance.squareFeetTitle,
                values: [
                    {
                        name: getterInstance.squareFeetFilterName,
                        type: InputType.SELECT,
                        value: formData.squareFeetFilter,
                        options: GetOptionsForFormProperty(Filter, true),
                    },
                    {
                        name: getterInstance.squareFeetName,
                        type: InputType.NUMBER,
                        value: formData.squareFeet,
                    },
                ],
            },
            {
                title: getterInstance.yearBuiltTitle,
                values: [
                    {
                        name: getterInstance.yearBuiltFilterName,
                        type: InputType.SELECT,
                        value: formData.yearBuiltFilter,
                        options: GetOptionsForFormProperty(Filter, true),
                    },
                    {
                        name: getterInstance.yearBuiltName,
                        type: InputType.NUMBER,
                        value: formData.yearBuilt,
                    },
                ],
            },
            {
                title: getterInstance.maxHoaTitle,
                values: [
                    {
                        name: getterInstance.maxHoaFilterName,
                        type: InputType.SELECT,
                        value: formData.maxHoaFilter,
                        options: GetOptionsForFormProperty(Filter, true),
                    },
                    {
                        name: getterInstance.maxHoaName,
                        type: InputType.NUMBER,
                        value: formData.maxHoa,
                    },
                ],
            },
            {
                title: getterInstance.monthlyPropertyTaxAmountTitle,
                values: [
                    {
                        name: getterInstance.monthlyPropertyTaxAmountFilterName,
                        type: InputType.SELECT,
                        value: formData.monthlyPropertyTaxAmountFilter,
                        options: GetOptionsForFormProperty(Filter, true),
                    },
                    {
                        name: getterInstance.monthlyPropertyTaxAmountName,
                        type: InputType.NUMBER,
                        value: formData.monthlyPropertyTaxAmount,
                    },
                ],
            },
            {
                title: getterInstance.homeTypeTitle,
                values: [
                    {
                        name: getterInstance.homeTypeName,
                        type: InputType.SELECT,
                        value: formData.homeType,
                        options: GetOptionsForFormProperty(PropertyType, true),
                    },
                ],
            },
            BasicCheckBoxForm(
                getterInstance.hasGarageTitle,
                getterInstance.hasGarageName,
                formData.hasGarage
            ),
            BasicCheckBoxForm(
                getterInstance.hasBasementTitle,
                getterInstance.hasBasementName,
                formData.hasBasement
            ),
            BasicCheckBoxForm(
                getterInstance.hasPoolTitle,
                getterInstance.hasPoolName,
                formData.hasPool
            ),
            BasicCheckBoxForm(
                getterInstance.isActiveTitle,
                getterInstance.isActiveName,
                formData.isActive
            ),
            BasicNumberForm(
                getterInstance.limitTitle,
                getterInstance.limitName,
                formData.limit
            ),
        ];
    }

}

