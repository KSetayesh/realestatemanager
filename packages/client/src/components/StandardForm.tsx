import React from 'react';
import { Filter, InputType, PercentageAndAmount } from '../constants/Constant'; // Import constants as needed

export type FormProperty = {
    title: string;
    name: string;
    value: number | string | undefined;
    type: InputType;
    hasRadioOptions?: boolean;
    radioDetails?: { name: string, radioValue: PercentageAndAmount }; // 'Percentage' | 'Amount'; // Assuming these are the only two options
    options?: { value: string | number, label: string }[]; // Correct structure for select options
    step?: string;
    hasFilterOption?: boolean;
};

export interface FormProps<T> {
    formDetails: FormProperty[];
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    setFormData: React.Dispatch<React.SetStateAction<T>>;
    buttonTitle: string;
    columnsPerRow?: number; // Optional prop for number of columns per row
    buttonDisableLogic?: () => boolean;
};

const StandardForm = <T,>({
    formDetails,
    handleSubmit,
    setFormData,
    buttonTitle,
    columnsPerRow = 3,
    buttonDisableLogic
}: FormProps<T>) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;

        let _name = name;
        let _value: string | boolean | number = value;

        console.log("_name:", _name);
        console.log("_value:", _value);
        console.log("_type:", type);

        if (_name.endsWith('_filter')) {
            _name = _name.replace("_filter", "");
        }
        else if (InputType.RADIO === type) {
            _name = _name.replace("_radio", "");
        }
        else if (InputType.CHECKBOX === type && event.target instanceof HTMLInputElement) {
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
        detail: FormProperty,
        radioButtonIdentifier: string,
        value: string,
        radioButtonLabel: string,
    ) => {
        return (
            <div className="form-check">
                <input
                    className="form-check-input"
                    type={InputType.RADIO}
                    name={`${detail.radioDetails!.name}_radio`}
                    id={`${detail.radioDetails!.name}_${radioButtonIdentifier}`}
                    value={value}
                    checked={value === detail.radioDetails!.radioValue}
                    onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={`${detail.radioDetails!.name}_${radioButtonIdentifier}`}>
                    {radioButtonLabel}
                </label>
            </div>
        );
    }

    const getRadioOptionDetails = (detail: FormProperty) => {
        return (
            <div className="radio-group">
                {getRadioButton(detail, 'percentage', PercentageAndAmount.PERCENTAGE, 'Percentage')}
                {getRadioButton(detail, 'amount', PercentageAndAmount.AMOUNT, 'Amount')}
            </div>
        );
    };

    const stringOption = (detail: FormProperty) => {
        return (
            <div>
                {detail.hasRadioOptions && detail.radioDetails && getRadioOptionDetails(detail)}
                <input
                    type={InputType.STRING}
                    name={detail.name}
                    value={detail.value as string}
                    onChange={handleChange}
                    className="form-check-input"
                />
            </div>
        );
    };

    const numberOption = (detail: FormProperty) => {
        return (
            <div>
                {detail.hasRadioOptions && detail.radioDetails && getRadioOptionDetails(detail)}
                <input
                    type={InputType.NUMBER}
                    name={detail.name}
                    value={detail.value as number}
                    onChange={handleChange}
                    className="form-check-input"
                    step={detail.step || "1"}
                />
            </div>
        );
    };

    const selectOption = (detail: FormProperty) => {
        return (
            <select
                name={detail.name}
                value={detail.value as string | number}
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

    const checkBoxOption = (detail: FormProperty) => {
        const isChecked: boolean = detail.value ? detail.value.toString().toLowerCase() === 'true' : false;

        return (
            <input
                type={InputType.CHECKBOX}
                name={detail.name}
                checked={isChecked}
                onChange={handleChange}
                className="form-input"
            />
        );
    };

    const renderInputField = (detail: FormProperty) => {
        switch (detail.type) {
            case InputType.STRING:
                return stringOption(detail);
            case InputType.NUMBER:
                return numberOption(detail);
            case InputType.SELECT:
                return selectOption(detail);
            case InputType.CHECKBOX:
                return checkBoxOption(detail);
            default:
                return null;
        }
    };

    const createFormProperty = (detail: FormProperty, index: number) => {
        if (detail.hasFilterOption) {
            return (
                <div className="form-group" key={index}>
                    <label>{detail.title}</label>
                    <div className="input-group">
                        <select
                            name={`${detail.name}_filter`}
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

    const isButtonDisabled = (): boolean => {
        return buttonDisableLogic ? buttonDisableLogic() : false;
    };

    return (
        <form onSubmit={handleSubmit} className="investment-form">
            <div className="form-row" style={{ gridTemplateColumns: `repeat(${columnsPerRow}, 1fr)` }}>
                {formDetails.map((detail: FormProperty, index: number) => (
                    <div className="form-group" key={index}>
                        {createFormProperty(detail, index)}
                    </div>
                ))}
            </div>
            <button type="submit" disabled={isButtonDisabled()}>{buttonTitle}</button>
        </form>
    );
};

export default StandardForm;
