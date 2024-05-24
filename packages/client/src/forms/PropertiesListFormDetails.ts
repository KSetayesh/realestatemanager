import { FormProperty } from "../components/StandardForm";
import { InputType, PropertyType, State, trueAndFalseSelections } from "../constants/Constant";
import { FormInterface } from "./FormInterface";

export type PropertyFilterFormFields = {
    state: State,
    zipCode: string,
    city: string,
    rentEstimate: number,
    listedPrice: number,
    numberOfBedrooms: number,
    numberOfBathrooms: number,
    squareFeet: number,
    yearBuilt: number,
    maxHoa: number,
    monthlyPropertyTaxAmount: number,
    homeType: PropertyType,
    hasGarage: boolean,
    hasBasement: boolean,
    hasPool: boolean,
    isActive: boolean,
};

// replace undefined with a type
export class PropertiesListFormDetails implements FormInterface<PropertyFilterFormFields, undefined> {

    // TODO
    createRequest(formData: PropertyFilterFormFields): undefined {
        console.log('State:', formData.state);
        return;
    }

    // Create a state to store the form data.
    getDefaultFormData(): PropertyFilterFormFields {
        return {
            state: State.AL,
            zipCode: '',
            city: '',
            rentEstimate: 0,
            listedPrice: 0,
            numberOfBedrooms: 0,
            numberOfBathrooms: 0,
            squareFeet: 0,
            yearBuilt: 0,
            maxHoa: 0,
            monthlyPropertyTaxAmount: 0,
            homeType: PropertyType.SINGLE_FAMILY,
            hasGarage: true,
            hasBasement: true,
            hasPool: true,
            isActive: true,
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
            },
            {
                title: 'Listed Price',
                name: 'listedPrice',
                value: formData?.listedPrice,
                type: InputType.NUMBER,
                hasFilterOption: true,
            },
            {
                title: 'Number Of Bedrooms',
                name: 'numberOfBedrooms',
                value: formData?.numberOfBedrooms,
                type: InputType.NUMBER,
                hasFilterOption: true,
            },
            {
                title: 'Number Of Bathrooms',
                name: 'numberOfBathrooms',
                value: formData?.numberOfBathrooms,
                type: InputType.NUMBER,
                hasFilterOption: true,
            },
            {
                title: 'Square Feet',
                name: 'squareFeet',
                value: formData?.squareFeet,
                type: InputType.NUMBER,
                hasFilterOption: true,
            },
            {
                title: 'Year Built',
                name: 'yearBuilt',
                value: formData?.yearBuilt,
                type: InputType.NUMBER,
                hasFilterOption: true,
            },
            {
                title: 'Max Hoa',
                name: 'maxHoa',
                value: formData?.maxHoa,
                type: InputType.NUMBER,
                hasFilterOption: true,
            },
            {
                title: 'Monthly Property Tax Amount',
                name: 'monthlyPropertyTaxAmount',
                value: formData?.monthlyPropertyTaxAmount,
                type: InputType.NUMBER,
                hasFilterOption: true,
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

