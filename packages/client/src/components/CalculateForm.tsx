import React from 'react';
import { InputType, PercentageAndAmount } from '../constants/Constant'; // Import constants as needed

export type FormProperty = {
    title: string;
    name: string;
    value: number | string;
    type: InputType;
    hasRadioOptions?: boolean;
    radioDetails?: { name: string, radioValue: PercentageAndAmount }; // 'Percentage' | 'Amount'; // Assuming these are the only two options
    options?: { value: string; label: string }[]; // Correct structure for select options
    step?: string;
};

interface InvestmentFormProps {
    formDetails: FormProperty[];
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    buttonTitle: string;
};

const CalculateForm: React.FC<InvestmentFormProps> = ({ formDetails, handleChange, handleSubmit, buttonTitle }) => {
    return (
        <form onSubmit={handleSubmit} className="investment-form">
            <div className="form-row">
                {formDetails.map((detail: FormProperty, index: number) => {
                    if (detail.type === InputType.STRING) {
                        return (
                            <div className="form-group" key={index}>
                                <label>{detail.title}</label>
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
                                    className="form-control"
                                />
                            </div>
                        )
                    }
                    else if (detail.type === InputType.NUMBER) {
                        return (
                            <div className="form-group" key={index}>
                                <label>{detail.title}</label>
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
                                    className="form-control"
                                    step={detail.step || "1"}
                                />
                            </div>
                        );
                    } else if (detail.type === InputType.SELECT) {
                        return (
                            <div className="form-group" key={index}>
                                <label>{detail.title}</label>
                                <select
                                    name={detail.name}
                                    value={detail.value}
                                    onChange={handleChange}
                                    className="form-control"
                                >
                                    {detail.options?.map((option, optionIndex) => (
                                        <option key={optionIndex} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <button type="submit">{buttonTitle}</button>
        </form>
    );
};

export default CalculateForm;
