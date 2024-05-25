import { CreateFilteredPropertyListRequest, FilterOn } from "@realestatemanager/shared";
import { FormProperty } from "../components/StandardForm";
import { Filter, InputType, PropertyType, State, trueAndFalseSelections } from "../constants/Constant";
import { FormInterface } from "./FormInterface";

export type PropertyFilterFormFields = {
    state: State;
    zipCode: string;
    city: string;
    rentEstimate: FilterOn;
    listedPrice: FilterOn;
    numberOfBedrooms: FilterOn;
    numberOfBathrooms: FilterOn;
    squareFeet: FilterOn;
    yearBuilt: FilterOn;
    maxHoa: FilterOn;
    monthlyPropertyTaxAmount: FilterOn;
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
            rentEstimate: formData.rentEstimate,
            listedPrice: formData.listedPrice,
            numberOfBedrooms: formData.numberOfBedrooms,
            numberOfBathrooms: formData.numberOfBathrooms,
            squareFeet: formData.squareFeet,
            yearBuilt: formData.yearBuilt,
            maxHoa: formData.maxHoa,
            monthlyPropertyTaxAmount: formData.monthlyPropertyTaxAmount,
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
        const defaultFilter: FilterOn = this.getDefaultFilter();
        return {
            state: State.AL,
            zipCode: '',
            city: '',
            rentEstimate: defaultFilter,
            listedPrice: defaultFilter,
            numberOfBedrooms: defaultFilter,
            numberOfBathrooms: defaultFilter,
            squareFeet: defaultFilter,
            yearBuilt: defaultFilter,
            maxHoa: defaultFilter,
            monthlyPropertyTaxAmount: defaultFilter,
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
                value: formData?.rentEstimate?.value,
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
                value: formData?.listedPrice?.value,
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
                value: formData?.numberOfBedrooms?.value,
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
                value: formData?.numberOfBathrooms?.value,
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
                value: formData?.squareFeet?.value,
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
                value: formData?.yearBuilt?.value,
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
                value: formData?.maxHoa.value,
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
                value: formData?.monthlyPropertyTaxAmount?.value,
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

    private getDefaultFilter(): FilterOn {
        return {
            value: 0,
            filter: Filter.gteq,
        };
    }

}

