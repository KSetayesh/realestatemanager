import React from 'react';
import { InputType, PercentageAndAmount } from '../constants/Constant'; // Import constants as needed

enum Filter {
    all = 'All',
    gt = '>',
    lt = '<',
    eq = '=',
    gteq = '>=',
    lteq = '<=',
};

export type FormProperty = {
    title: string;
    name: string;
    value: number | string | undefined;
    type: InputType;
    hasRadioOptions?: boolean;
    radioDetails?: { name: string, radioValue: PercentageAndAmount }; // 'Percentage' | 'Amount'; // Assuming these are the only two options
    options?: { value: string; label: string }[]; // Correct structure for select options
    step?: string;
    hasFilterOption?: boolean;
};

export interface FormProps<T> {
    formDetails: FormProperty[];
    // handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    setFormData: React.Dispatch<React.SetStateAction<T>>; // React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
    buttonTitle: string;
};

const StandardForm = <T,>({ formDetails, handleSubmit, setFormData, buttonTitle }: FormProps<T>) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;
        if (InputType.RADIO === type) {
            // Radio buttons have names like "{propertyName}_radio"
            // Extract the propertyName to update the corresponding state 

            const propertyName = name.replace("_radio", "");
            setFormData((prevFormData: T) => ({
                ...prevFormData,
                [propertyName]: value,
            }));
        } else {
            // For number and select inputs, simply update based on name and value
            setFormData((prevFormData: T) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const stringOption = (detail: FormProperty) => {
        return (
            <div>
                {detail.hasRadioOptions && detail.radioDetails && (
                    <div className="radio-group">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name={`${detail.radioDetails.name}_radio`}
                                id={`${detail.radioDetails.name}_percentage`}
                                value={PercentageAndAmount.PERCENTAGE}
                                checked={PercentageAndAmount.PERCENTAGE === detail.radioDetails.radioValue}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor={`${detail.radioDetails.name}_percentage`}>
                                Percentage
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name={`${detail.radioDetails.name}_radio`}
                                id={`${detail.radioDetails.name}_amount`}
                                value={PercentageAndAmount.AMOUNT}
                                checked={PercentageAndAmount.AMOUNT === detail.radioDetails.radioValue}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor={`${detail.radioDetails.name}_amount`}>
                                Amount
                            </label>
                        </div>
                    </div>
                )}
                <input
                    type="string"
                    name={detail.name}
                    value={detail.value}
                    onChange={handleChange}
                    className="form-check-input"//"form-control" //{`form-control ${detail.hasFilterOption ? 'has-filter' : ''}`}
                />
            </div>
        );
    };

    const numberOption = (detail: FormProperty) => {
        return (
            <div>
                {detail.hasRadioOptions && detail.radioDetails && (
                    <div className="radio-group">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name={`${detail.radioDetails.name}_radio`}
                                id={`${detail.radioDetails.name}_percentage`}
                                value={PercentageAndAmount.PERCENTAGE}
                                checked={PercentageAndAmount.PERCENTAGE === detail.radioDetails.radioValue}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor={`${detail.radioDetails.name}_percentage`}>
                                Percentage
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name={`${detail.radioDetails.name}_radio`}
                                id={`${detail.radioDetails.name}_amount`}
                                value={PercentageAndAmount.AMOUNT}
                                checked={PercentageAndAmount.AMOUNT === detail.radioDetails.radioValue}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor={`${detail.radioDetails.name}_amount`}>
                                Amount
                            </label>
                        </div>
                    </div>
                )}
                <input
                    type="number"
                    name={detail.name}
                    value={detail.value}
                    onChange={handleChange}
                    className="form-check-input" //"form-control"//{`form-control ${detail.hasFilterOption ? 'has-filter' : ''}`}
                    step={detail.step || "1"}
                />
            </div>
        );
    };

    const selectOption = (detail: FormProperty) => {
        return (
            <select
                name={detail.name}
                value={detail.value}
                onChange={handleChange}
                className="form-check-input"
            >
                {detail.options?.map((option, optionIndex) => (
                    <option key={optionIndex} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    };

    const renderInputField = (detail: FormProperty) => {
        if (detail.type === InputType.STRING) {
            return stringOption(detail);
        } else if (detail.type === InputType.NUMBER) {
            return numberOption(detail);
        } else if (detail.type === InputType.SELECT) {
            return selectOption(detail);
        }
        return null;
    };

    const createFormProperty = (detail: FormProperty, index: number) => {
        if (detail.hasFilterOption) {
            return (
                <div className="form-group" key={index}>
                    <label>{detail.title}</label>
                    <div className="input-group">
                        <select
                            name={`${detail.name}_filter`}
                            // value={detail.filterValue}
                            onChange={handleChange}
                            className="form-control filter-select"
                        >
                            {Object.entries(Filter).map(([key, value]) => (
                                <option key={key} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                        {renderInputField(detail)}
                    </div>
                </div>
            );
        }

        return (
            <div className="form-group" key={index}>
                <label>{detail.title}</label>
                {renderInputField(detail)}
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit} className="investment-form">
            <div className="form-row">
                {formDetails.map((detail: FormProperty, index: number) => (
                    <div className="form-group" key={index}>
                        {createFormProperty(detail, index)}
                    </div>
                ))}
            </div>
            <button type="submit">{buttonTitle}</button>
        </form>
    );
};

export default StandardForm;
