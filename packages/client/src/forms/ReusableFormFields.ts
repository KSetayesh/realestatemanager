import { FormProperty } from "../components/StandardForm";
import { Country, InputType, State, trueAndFalseSelections } from "../constants/Constant";

export const BasicTrueFalseSelectOption = (title: string, name: string, formInput: boolean | undefined): FormProperty => {
    return {
        title: title,
        values: [
            {
                name: name,
                type: InputType.SELECT,
                value: formInput?.toString(),
                options: trueAndFalseSelections(),
            },
        ],
    };
};

export const BasicCheckBoxForm = (title: string, name: string, formInput: boolean | undefined): FormProperty => {
    return {
        title: title,
        values: [
            {
                name: name,
                type: InputType.CHECKBOX,
                value: formInput?.toString(),
            },
        ],
    };
};

export const BasicStringForm = (title: string, name: string, formInput: string | undefined): FormProperty => {
    return {
        title: title,
        values: [
            {
                name: name,
                type: InputType.STRING,
                value: formInput,
            },
        ],
    };
};

export const BasicNumberForm = (title: string, name: string, formInput: number | undefined, step?: string): FormProperty => {
    return {
        title: title,
        values: [
            {
                name: name,
                type: InputType.NUMBER,
                value: formInput,
                step: step,
            },
        ],
    };

}

export const CountryForm = (formInput: string | undefined): FormProperty => {
    return {
        title: 'Country',
        values: [
            {
                name: 'state',
                type: InputType.SELECT,
                value: formInput,
                options: Object.values(Country).map((enumValue => {
                    return {
                        value: enumValue,
                        label: enumValue,
                    };
                })),
            },
        ],
    };
};

export const StateForm = (formInput: string | undefined): FormProperty => {
    return {
        title: 'State',
        values: [
            {
                name: 'state',
                type: InputType.SELECT,
                value: formInput,
                options: Object.values(State).map((enumValue => {
                    return {
                        value: enumValue,
                        label: enumValue,
                    };
                })),
            },
        ],
    };
};