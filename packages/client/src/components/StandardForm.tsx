import React from 'react';
import { InputType } from '../constants/Constant'; // Import constants as needed

export type Options = { value: string | number, label: string }[];

export type FormValue = {
    name: string;
    value: number | string | undefined;
    defaultValue: number | string | undefined;
    options?: Options;
    type: InputType;
    step?: string;
};

export type FormProperty = {
    title: string;
    values: Dictionary<FormValue>;
};

export type FormPropertyMap<T> = {
    [K in keyof T]: FormProperty;
};

// This type enforces that `values` cannot be an array
type Dictionary<T> = {
    [key: string]: T;
} & { length?: never };

export interface FormProps<T> {
    formPropertyMap: FormPropertyMap<T>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    setFormData: React.Dispatch<React.SetStateAction<T>>;
    buttonTitle: string;
    columnsPerRow?: number; // Optional prop for number of columns per row
    buttonDisableLogic?: () => boolean;
}

const StandardForm = <T,>({
    formPropertyMap,
    handleSubmit,
    setFormData,
    buttonTitle,
    columnsPerRow = 3,
    buttonDisableLogic,
}: FormProps<T>) => {
   
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;

        let _name = name;
        let _value: string | boolean | number = value;

        if (_name.endsWith('_filter')) {
            _name = _name.replace('_filter', '');
        } else if (InputType.RADIO === type) {
            _name = _name.replace('_radio', '');
        } else if (InputType.CHECKBOX === type && event.target instanceof HTMLInputElement) {
            _value = event.target.checked;
        } else if (InputType.NUMBER === type) {
            _value = parseFloat(value);
        }

        setFormData((prevFormData: T) => ({
            ...prevFormData,
            [_name]: _value,
        }));
    };

    const getRadioButton = (
        name: string,
        radioButtonIdentifier: string,
        value: string,
        radioButtonLabel: string,
        checked: boolean
    ) => (
        <div className="form-check">
            <input
                className="form-check-input"
                type={InputType.RADIO}
                name={`${name}_radio`}
                id={`${name}_${radioButtonIdentifier}`}
                value={value}
                checked={checked}
                onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={`${name}_${radioButtonIdentifier}`}>
                {radioButtonLabel}
            </label>
        </div>
    );

    const renderRadioOptions = (valueDetail: FormValue) => {
        const value = valueDetail.value !== undefined ? valueDetail.value : valueDetail.defaultValue;

        return (
            <div className="radio-group">
                {(valueDetail.options || []).map(option =>
                    getRadioButton(
                        valueDetail.name,
                        value?.toString() as string,
                        option.value.toString(),
                        option.label,
                        value === option.value
                    )
                )}
            </div>
        );
    };

    const renderStringOption = (valueDetail: FormValue) => {
        const value = valueDetail.value !== undefined ? valueDetail.value : valueDetail.defaultValue;

        return (
            <input
                type={InputType.STRING}
                name={valueDetail.name}
                value={value as string}
                onChange={handleChange}
                className="form-check-input"
            />
        );
    };

    const renderNumberOption = (valueDetail: FormValue) => {
        const value = valueDetail.value !== undefined ? valueDetail.value : valueDetail.defaultValue;

        return (
            <input
                type={InputType.NUMBER}
                name={valueDetail.name}
                value={value as number}
                onChange={handleChange}
                className="form-check-input"
                step={valueDetail.step || '1'}
            />
        );
    };

    const renderSelectOption = (valueDetail: FormValue) => {
        const value = valueDetail.value !== undefined ? valueDetail.value : valueDetail.defaultValue;

        return (
            <select
                name={valueDetail.name}
                value={value as string | number}
                onChange={handleChange}
                className="form-check-input"
            >
                {(valueDetail.options || []).map((option, optionIndex) => (
                    <option key={optionIndex} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    };

    const renderCheckBoxOption = (valueDetail: FormValue) => {
        const value = valueDetail.value !== undefined ? valueDetail.value : valueDetail.defaultValue;
        const isChecked: boolean = value ? value.toString().toLowerCase() === 'true' : false;

        return (
            <input
                type={InputType.CHECKBOX}
                name={valueDetail.name}
                checked={isChecked}
                onChange={handleChange}
                className="form-input"
            />
        );
    };

    const renderInputField = (valueDetail: FormValue) => {
        switch (valueDetail.type) {
            case InputType.STRING:
                return renderStringOption(valueDetail);
            case InputType.NUMBER:
                return renderNumberOption(valueDetail);
            case InputType.SELECT:
                return renderSelectOption(valueDetail);
            case InputType.CHECKBOX:
                return renderCheckBoxOption(valueDetail);
            case InputType.RADIO:
                return renderRadioOptions(valueDetail);
            default:
                return null;
        }
    };

    const createFormProperty = (detail: FormProperty, index: number) => (
        <div className="form-group" key={index}>
            <label>{detail.title}</label>
            {Object.keys(detail.values).map((key, idx) => (
                <div key={idx}>{renderInputField(detail.values[key])}</div>
            ))}
        </div>
    );

    const isButtonDisabled = (): boolean => {
        return buttonDisableLogic ? buttonDisableLogic() : false;
    };

    return (
        <form onSubmit={handleSubmit} className="investment-form">
            <div className="form-row" style={{ gridTemplateColumns: `repeat(${columnsPerRow}, 1fr)` }}>
                {Object.keys(formPropertyMap).map((key, index) => {
                    const detail: FormProperty = formPropertyMap[key as keyof T];
                    return <div className="form-group" key={index}>{createFormProperty(detail, index)}</div>;
                })}
            </div>
            <button type="submit" disabled={isButtonDisabled()}>
                {buttonTitle}
            </button>
        </form>
    );
};

export default StandardForm;
