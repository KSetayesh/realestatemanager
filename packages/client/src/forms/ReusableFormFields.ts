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

export const BasicTrueFalseSelectOption = (title: string, name: string, formInput: boolean | undefined): FormProperty => {
    return {
        title: title,
        values: [
            {
                name: name,
                type: InputType.SELECT,
                value: formInput?.toString(),
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

export const CountryForm = (formInput: string | undefined, addAnyOption: boolean = false): FormProperty => {
    return {
        title: 'Country',
        values: [
            {
                name: 'country',
                type: InputType.SELECT,
                value: formInput,
                options: GetOptionsForFormProperty(Country, addAnyOption),
            },
        ],
    };
};

export const StateForm = (formInput: string | undefined, addAnyOption: boolean = false): FormProperty => {
    return {
        title: 'State',
        values: [
            {
                name: 'state',
                type: InputType.SELECT,
                value: formInput,
                options: GetOptionsForFormProperty(State, addAnyOption),
            },
        ],
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