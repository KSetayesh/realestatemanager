import { FormProperty, Options } from "../components/StandardForm";
import { Country, InputType, State } from "../constants/Constant";

export const ratingSelections = (from: number = 1, limit: number = 10): Options => {
    const array = [];

    for (let i = from; i <= limit; i++) {
        array.push({
            label: i.toString(),
            value: i,
        });
    }

    return array;
};

export const BasicTrueFalseSelectOption = (
    title: string,
    name: string,
    // formInput: boolean | undefined,
    defaultValue?: boolean
): FormProperty => {

    return {
        title: title,
        values: {
            [name]: {
                name: name,
                type: InputType.SELECT,
                // value: formInput?.toString(),
                value: undefined,
                defaultValue: defaultValue ? 'true' : 'false',
                options: [
                    {
                        label: 'true',
                        value: 'true',
                    },
                    {
                        label: 'false',
                        value: 'false',
                    },
                ],
            },
        }

    };
};

export const BasicCheckBoxForm = (
    title: string,
    name: string,
    // formInput: boolean | undefined,
    defaultValue?: boolean
): FormProperty => {

    return {
        title: title,
        values: {
            [name]: {
                name: name,
                type: InputType.CHECKBOX,
                value: undefined,
                // value: formInput?.toString(),
                defaultValue: defaultValue ? 'true' : 'false',
            },
        }
    };
};

export const BasicStringForm = (
    title: string,
    name: string,
    // formInput: string | undefined,
    defaultValue?: string): FormProperty => {

    return {
        title: title,
        values: {
            [name]: {
                name: name,
                type: InputType.STRING,
                value: undefined,
                // value: formInput,
                defaultValue: defaultValue ? defaultValue : '',
            },
        },
    };
};

export const BasicNumberForm = (
    title: string,
    name: string,
    // formInput: number | undefined,
    defaultValue?: number,
    step?: string
): FormProperty => {
    return {
        title: title,
        values: {
            [name]: {
                name: name,
                type: InputType.NUMBER,
                value: undefined,
                // value: formInput,
                defaultValue: defaultValue ? defaultValue : -1,
                step: step,
            },
        },
    };

}

export const CountryForm = (addAnyOption: boolean = false): FormProperty => {
    return {
        title: 'Country',
        values: {
            country: {
                name: 'country',
                type: InputType.SELECT,
                value: undefined,
                // value: formInput,
                defaultValue: Country.UnitedStates,
                options: GetOptionsForFormProperty(Country, addAnyOption),
            },
        },
    };
};

export const StateForm = (addAnyOption: boolean = false): FormProperty => {
    return {
        title: 'State',
        values: {
            state: {
                name: 'state',
                type: InputType.SELECT,
                value: undefined,
                // value: formInput,
                defaultValue: addAnyOption ? 'Any' : State.AL,
                options: GetOptionsForFormProperty(State, addAnyOption),
            },
        },
    };
};

export const GetOptionsForFormProperty = <T extends Object>(enumType: T, addAnyOption: boolean = false): Options => {

    const optionsList = Object.values(enumType).map((enumValue => {
        return {
            value: enumValue,
            label: enumValue,
        };
    }));

    if (addAnyOption) {
        optionsList.unshift({ value: 'Any', label: 'Any' });
    }
    return optionsList;
}