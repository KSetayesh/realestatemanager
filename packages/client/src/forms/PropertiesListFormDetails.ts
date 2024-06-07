import { AddFormTitlesAndLabel, CreateFilteredPropertyListRequest, PropertyFilterFormFields } from "@realestatemanager/shared";
import { FormProperty } from "../components/StandardForm";
import { Filter, InputType, PropertyType, State } from "../constants/Constant";
import { FormInterface } from "./FormInterface";
import {
    BasicCheckBoxForm,
    BasicNumberForm,
    BasicStringForm,
    GetOptionsForFormProperty,
    StateForm
} from "./ReusableFormFields";

export const AddPropertyFilterTitlesAndLabels: AddFormTitlesAndLabel<PropertyFilterFormFields> = {
    state: {
        title: "State",
        name: "state"
    },
    zipCode: {
        title: "ZipCode",
        name: "zipCode"
    },
    city: {
        title: "City",
        name: "city"
    },
    rentEstimateFilter: {
        title: "Rent Estimate Filter",
        name: "rentEstimateFilter",
    },
    rentEstimate: {
        title: "Rent Estimate",
        name: "rentEstimate",
    },
    listedPriceFilter: {
        title: "Listed Price Filter",
        name: "listedPriceFilter"
    },
    listedPrice: {
        title: "Listed Price",
        name: "listedPrice"
    },
    numberOfBedroomsFilter: {
        title: "Number Of Bedrooms Filter",
        name: "numberOfBedroomsFilter"
    },
    numberOfBedrooms: {
        title: "Number Of Bedrooms",
        name: "numberOfBedrooms"
    },
    numberOfBathroomsFilter: {
        title: "Number Of Bathrooms Filter",
        name: "numberOfBathroomsFilter"
    },
    numberOfBathrooms: {
        title: "Number Of Bathrooms",
        name: "numberOfBathrooms"
    },
    squareFeetFilter: {
        title: "Square Feet Filter",
        name: "squareFeetFilter"
    },
    squareFeet: {
        title: "Square Feet",
        name: "squareFeet"
    },
    yearBuiltFilter: {
        title: "Year Built Filter",
        name: "yearBuiltFilter"
    },
    yearBuilt: {
        title: "Year Built",
        name: "yearBuilt"
    },
    maxHoaFilter: {
        title: "Max Hoa Filter",
        name: "maxHoaFilter"
    },
    maxHoa: {
        title: "Max Hoa",
        name: "maxHoa"
    },
    monthlyPropertyTaxAmountFilter: {
        title: "Monthly Property Tax Amount Filter",
        name: "monthlyPropertyTaxAmountFilter"
    },
    monthlyPropertyTaxAmount: {
        title: "Monthly Property Tax Amount",
        name: "monthlyPropertyTaxAmount"
    },
    homeType: {
        title: "Home Type",
        name: "homeType"
    },
    hasGarage: {
        title: "Has Garage",
        name: "hasGarage"
    },
    hasBasement: {
        title: "Has Basement",
        name: "hasBasement"
    },
    hasPool: {
        title: "Has Pool",
        name: "hasPool"
    },
    isActive: {
        title: "Is Active",
        name: "isActive"
    },
    limit: {
        title: "Limit",
        name: "limit"
    },
};

export class AddPropertyFilterTitlesAndLabelsGetter {
    get stateTitle(): string {
        return AddPropertyFilterTitlesAndLabels.state.title;
    }

    get stateName(): string {
        return AddPropertyFilterTitlesAndLabels.state.name;
    }

    get zipCodeTitle(): string {
        return AddPropertyFilterTitlesAndLabels.zipCode.title;
    }

    get zipCodeName(): string {
        return AddPropertyFilterTitlesAndLabels.zipCode.name;
    }

    get cityTitle(): string {
        return AddPropertyFilterTitlesAndLabels.city.title;
    }

    get cityName(): string {
        return AddPropertyFilterTitlesAndLabels.city.name;
    }

    get rentEstimateFilterTitle(): string {
        return AddPropertyFilterTitlesAndLabels.rentEstimateFilter.title;
    }

    get rentEstimateFilterName(): string {
        return AddPropertyFilterTitlesAndLabels.rentEstimateFilter.name;
    }

    get rentEstimateTitle(): string {
        return AddPropertyFilterTitlesAndLabels.rentEstimate.title;
    }

    get rentEstimateName(): string {
        return AddPropertyFilterTitlesAndLabels.rentEstimate.name;
    }

    get listedPriceFilterTitle(): string {
        return AddPropertyFilterTitlesAndLabels.listedPriceFilter.title;
    }

    get listedPriceFilterName(): string {
        return AddPropertyFilterTitlesAndLabels.listedPriceFilter.name;
    }

    get listedPriceTitle(): string {
        return AddPropertyFilterTitlesAndLabels.listedPrice.title;
    }

    get listedPriceName(): string {
        return AddPropertyFilterTitlesAndLabels.listedPrice.name;
    }

    get numberOfBedroomsFilterTitle(): string {
        return AddPropertyFilterTitlesAndLabels.numberOfBedroomsFilter.title;
    }

    get numberOfBedroomsFilterName(): string {
        return AddPropertyFilterTitlesAndLabels.numberOfBedroomsFilter.name;
    }

    get numberOfBedroomsTitle(): string {
        return AddPropertyFilterTitlesAndLabels.numberOfBedrooms.title;
    }

    get numberOfBedroomsName(): string {
        return AddPropertyFilterTitlesAndLabels.numberOfBedrooms.name;
    }

    get numberOfBathroomsFilterTitle(): string {
        return AddPropertyFilterTitlesAndLabels.numberOfBathroomsFilter.title;
    }

    get numberOfBathroomsFilterName(): string {
        return AddPropertyFilterTitlesAndLabels.numberOfBathroomsFilter.name;
    }

    get numberOfBathroomsTitle(): string {
        return AddPropertyFilterTitlesAndLabels.numberOfBathrooms.title;
    }

    get numberOfBathroomsName(): string {
        return AddPropertyFilterTitlesAndLabels.numberOfBathrooms.name;
    }

    get squareFeetFilterTitle(): string {
        return AddPropertyFilterTitlesAndLabels.squareFeetFilter.title;
    }

    get squareFeetFilterName(): string {
        return AddPropertyFilterTitlesAndLabels.squareFeetFilter.name;
    }

    get squareFeetTitle(): string {
        return AddPropertyFilterTitlesAndLabels.squareFeet.title;
    }

    get squareFeetName(): string {
        return AddPropertyFilterTitlesAndLabels.squareFeet.name;
    }

    get yearBuiltFilterTitle(): string {
        return AddPropertyFilterTitlesAndLabels.yearBuiltFilter.title;
    }

    get yearBuiltFilterName(): string {
        return AddPropertyFilterTitlesAndLabels.yearBuiltFilter.name;
    }

    get yearBuiltTitle(): string {
        return AddPropertyFilterTitlesAndLabels.yearBuilt.title;
    }

    get yearBuiltName(): string {
        return AddPropertyFilterTitlesAndLabels.yearBuilt.name;
    }

    get maxHoaFilterTitle(): string {
        return AddPropertyFilterTitlesAndLabels.maxHoaFilter.title;
    }

    get maxHoaFilterName(): string {
        return AddPropertyFilterTitlesAndLabels.maxHoaFilter.name;
    }

    get maxHoaTitle(): string {
        return AddPropertyFilterTitlesAndLabels.maxHoa.title;
    }

    get maxHoaName(): string {
        return AddPropertyFilterTitlesAndLabels.maxHoa.name;
    }

    get monthlyPropertyTaxAmountFilterTitle(): string {
        return AddPropertyFilterTitlesAndLabels.monthlyPropertyTaxAmountFilter.title;
    }

    get monthlyPropertyTaxAmountFilterName(): string {
        return AddPropertyFilterTitlesAndLabels.monthlyPropertyTaxAmountFilter.name;
    }

    get monthlyPropertyTaxAmountTitle(): string {
        return AddPropertyFilterTitlesAndLabels.monthlyPropertyTaxAmount.title;
    }

    get monthlyPropertyTaxAmountName(): string {
        return AddPropertyFilterTitlesAndLabels.monthlyPropertyTaxAmount.name;
    }

    get homeTypeTitle(): string {
        return AddPropertyFilterTitlesAndLabels.homeType.title;
    }

    get homeTypeName(): string {
        return AddPropertyFilterTitlesAndLabels.homeType.name;
    }

    get hasGarageTitle(): string {
        return AddPropertyFilterTitlesAndLabels.hasGarage.title;
    }

    get hasGarageName(): string {
        return AddPropertyFilterTitlesAndLabels.hasGarage.name;
    }

    get hasBasementTitle(): string {
        return AddPropertyFilterTitlesAndLabels.hasBasement.title;
    }

    get hasBasementName(): string {
        return AddPropertyFilterTitlesAndLabels.hasBasement.name;
    }

    get hasPoolTitle(): string {
        return AddPropertyFilterTitlesAndLabels.hasPool.title;
    }

    get hasPoolName(): string {
        return AddPropertyFilterTitlesAndLabels.hasPool.name;
    }

    get isActiveTitle(): string {
        return AddPropertyFilterTitlesAndLabels.isActive.title;
    }

    get isActiveName(): string {
        return AddPropertyFilterTitlesAndLabels.isActive.name;
    }

    get limitTitle(): string {
        return AddPropertyFilterTitlesAndLabels.limit.title;
    }

    get limitName(): string {
        return AddPropertyFilterTitlesAndLabels.limit.name;
    }
}

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

