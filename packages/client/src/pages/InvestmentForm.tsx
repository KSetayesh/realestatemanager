import React, { useState } from 'react';
import '../styles/InvestmentForm.css'; // Make sure to create this CSS file
import axios from 'axios';

const InvestmentForm: React.FC = () => {

    const [formData, setFormData] = useState({
        purchasePrice: '',
        downPayment: '',
        interestRate: '',
        rentalIncome: '',
        operatingExpenses: '',
        maintenanceCosts: '',
        propertyTaxes: '',
        insuranceCosts: '',
        vacancyRate: '',
        managementFees: '',
        useDefaultValues: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            // Handle checkbox changes
            setFormData(prevState => ({
                ...prevState,
                [name]: checked
            }));
        } else {
            // Handle changes for other inputs
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Replace 'http://localhost:3000/api/calculate' with your actual backend endpoint URL
        try {
            const response = await axios.post('http://localhost:3000/api/calculate', formData);
            console.log("Calculation result:", response.data);
            // Handle response data here
        } catch (error) {
            console.error("Error sending form data to backend:", error);
            // Handle errors as needed
        }
    };

    return (
        <form onSubmit={handleSubmit} className="investment-form">
            <div className="form-row">
                {/* Original 5 inputs */}
                <div className="form-group">
                    <label>Purchase Price</label>
                    <input type="number" name="purchasePrice" value={formData.purchasePrice} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Down Payment</label>
                    <input type="number" name="downPayment" value={formData.downPayment} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Interest Rate (%)</label>
                    <input type="number" step="0.01" name="interestRate" value={formData.interestRate} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Rental Income</label>
                    <input type="number" name="rentalIncome" value={formData.rentalIncome} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Operating Expenses</label>
                    <input type="number" name="operatingExpenses" value={formData.operatingExpenses} onChange={handleChange} className="form-control" />
                </div>
                {/* ... other original form groups */}

                {/* 5 new inputs */}
                <div className="form-group">
                    <label>Maintenance Costs</label>
                    <input type="number" name="maintenanceCosts" value={formData.maintenanceCosts} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Property Taxes</label>
                    <input type="number" name="propertyTaxes" value={formData.propertyTaxes} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Insurance Costs</label>
                    <input type="number" name="insuranceCosts" value={formData.insuranceCosts} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Vacancy Rate</label>
                    <input type="number" name="vacancyRate" value={formData.vacancyRate} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Management Fees</label>
                    <input type="number" name="managementFees" value={formData.managementFees} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            name="useDefaultValues"
                            checked={formData.useDefaultValues}
                            onChange={handleChange}
                        /> Use Default Values
                    </label>
                </div>
                {/* ... add other new form groups similarly */}
            </div>
            <button type="submit" >Calculate</button>
        </form>
    );

};

export default InvestmentForm;
