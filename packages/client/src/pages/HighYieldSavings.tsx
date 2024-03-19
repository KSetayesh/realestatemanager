import React, { useState } from 'react';
import { HighYieldSavingsCalcApi } from '../api/highyeildsavingscalcapi';
import { HighYeildSavingsDTO, HighYeildSavingsRequest } from '@realestatemanager/shared';
import CalculateForm, { FormProperty } from '../components/CalculateForm';
import { InputType } from '../constants/Constant';
// import { Link } from 'react-router-dom';

type HighYieldSavingsFormData = {
    initialDeposit: number;
    annualInterestRate: number;
    years: number;
    monthlyDeposit?: number;
};

const HighYieldSavings: React.FC = () => {

    // Create a state to store the form data.
    const getHighYieldSavingsFormData = (): HighYieldSavingsFormData => {
        return {
            initialDeposit: 1000,
            annualInterestRate: 5,
            years: 30,
            monthlyDeposit: 0,
        };
    };

    const [formData, setFormData] = useState<HighYieldSavingsFormData>(getHighYieldSavingsFormData());

    const getCalculateRequest = (): HighYeildSavingsRequest => {
        return {
            initialDeposit: formData.initialDeposit,
            annualInterestRate: formData.annualInterestRate,
            years: formData.years,
            monthlyDeposit: formData.monthlyDeposit,
        };
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const highYieldSavingsCalcApi: HighYieldSavingsCalcApi = new HighYieldSavingsCalcApi();
        const data: HighYeildSavingsDTO = await highYieldSavingsCalcApi.highYieldSavingsCalculator(getCalculateRequest());
        console.log("Calculation result:", data);
        // setProperty(data);
    };

    // useEffect(() => {
    //     if (property) {
    //         setProperty(property);
    //         setFormData(getInvestmentFormData());
    //     }
    // }, [property]);  // Ensure useEffect depends on `property`

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;
        if (InputType.RADIO === type) {
            // Radio buttons have names like "{propertyName}_radio"
            // Extract the propertyName to update the corresponding state 

            const propertyName = name.replace("_radio", "");
            setFormData((prevFormData: HighYieldSavingsFormData) => ({
                ...prevFormData,
                [propertyName]: value,
            }));
        } else {
            // For number and select inputs, simply update based on name and value
            setFormData((prevFormData: HighYieldSavingsFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const formDetails: FormProperty[] = [
        {
            title: 'Initial Deposit',
            name: 'initialDeposit',
            value: formData.initialDeposit,
            type: InputType.NUMBER,
        },
        {
            title: 'Annual Interest Rate (%)',
            name: 'annualInterestRate',
            value: formData.annualInterestRate,
            type: InputType.NUMBER,
        },
        {
            title: 'Years',
            name: 'years',
            value: formData.years,
            type: InputType.NUMBER,
        },
        {
            title: 'Monthly Deposit',
            name: 'monthlyDeposit',
            value: formData.monthlyDeposit ?? 0,
            type: InputType.NUMBER,
        },
    ];

    return (
        <div>
            <h2> Investment Breakdown </h2>
            {formData && <CalculateForm
                formDetails={formDetails}
                // formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            }
        </div>
    );
};

export default HighYieldSavings;