import React, { useState } from 'react';
import { HighYieldSavingsCalcApi } from '../api/highyeildsavingscalcapi';
import { HighYeildSavingsDTO, HighYeildSavingsRequest } from '@realestatemanager/shared';
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

    return (
        <div>
            <br></br>
            <h1>Welcome to the HighYieldSavings Page</h1>
            <p>This is a simple home component.</p>
            {/* <Link to="/propertyForm">Go to Property Form Page</Link>
            <Link to="/propertiesList">Go to Properties List Page</Link> */}
        </div>
    );
};

export default HighYieldSavings;