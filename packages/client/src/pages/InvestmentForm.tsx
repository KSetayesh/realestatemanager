import React, { useState } from 'react';
import '../styles/InvestmentForm.css'; // Make sure to create this CSS file
import axios from 'axios';
import { ListingWithScenariosDTO } from '@realestatemanager/shared';
import {
    getAnnualAppreciationRate,
    getAnnualInterestRate,
    getAnnualRentIncreaseRate,
    getAnnualTaxIncreaseRate,
    getCapExReserveRate,
    getClosingCosts,
    getDownPaymentPercentage,
    getInitialRepairCosts,
    getInterestType,
    getLaundryServices,
    getLegalAndProfessionalFees,
    getMaintenanceRate,
    getMonthlyHOAFeesAmount,
    getMonthlyHomeInsuranceAmount,
    getMonthlyPropertyTax,
    getMortgageInterest,
    getOperatingExpenses,
    getOtherAdditionalIncomeStreams,
    getOtherExpensesRate,
    getOtherInitialExpenses,
    getPMIDropoffPoint,
    getPMIRate,
    getParkingFees,
    getPrice,
    getPropertyManagementRate,
    getPropertyTaxes,
    getRentEstimate,
    getStorageUnitFees,
    getTaxDepreciation,
    getTermInYears,
    getTravelingCosts,
    getVacancyRate
} from '../components/TableColumn';

// const InvestmentForm: React.FC<{ listing: ListingWithScenariosDTO | null; }> = (data) => {
//     if (!data) return null;
const InvestmentForm: React.FC<{ listing: ListingWithScenariosDTO | null; }> = ({ listing }) => {
    if (!listing) return null; // This will handle the case where listing is null


    const [formData, setFormData] = useState(
        {
            downPaymentPercentage: getDownPaymentPercentage(listing),
            pmiRate: getPMIRate(listing),
            pmiDropoffPoint: getPMIDropoffPoint(listing),
            monthlyPropertyTax: getMonthlyPropertyTax(listing),
            monthlyHomeInsuranceAmount: getMonthlyHomeInsuranceAmount(listing),
            monthlyHOAFeesAmount: getMonthlyHOAFeesAmount(listing),
            annualInterestRate: getAnnualInterestRate(listing),
            termInYears: getTermInYears(listing),
            interestType: getInterestType(listing),
            propertyManagementRate: getPropertyManagementRate(listing),
            vacancyRate: getVacancyRate(listing),
            maintenanceRate: getMaintenanceRate(listing),
            otherExpensesRate: getOtherExpensesRate(listing),
            capExReserveRate: getCapExReserveRate(listing),
            legalAndProfessionalFees: getLegalAndProfessionalFees(listing),
            initialRepairCosts: getInitialRepairCosts(listing),
            travelingCosts: getTravelingCosts(listing),
            closingCosts: getClosingCosts(listing),
            otherInitialExpenses: getOtherInitialExpenses(listing),
            rentEstimate: getRentEstimate(listing),
            purchasePrice: getPrice(listing),
            annualRentIncreaseRate: getAnnualRentIncreaseRate(listing),
            annualAppreciationRate: getAnnualAppreciationRate(listing),
            annualTaxIncreaseRate: getAnnualTaxIncreaseRate(listing),
            parkingFees: getParkingFees(listing),
            laundryServices: getLaundryServices(listing),
            storageUnitFees: getStorageUnitFees(listing),
            other: getOtherAdditionalIncomeStreams(listing),
            depreciation: getTaxDepreciation(listing),
            mortgageInterest: getMortgageInterest(listing),
            operatingExpenses: getOperatingExpenses(listing),
            propertyTaxes: getPropertyTaxes(listing),
            setNewDefaultValues: false,
        }
    );

    type FormPropery = {
        title: string,
        name: string,
        value: number | string,
        step?: string,
    }

    const formDetails: FormPropery[] = [
        {
            title: 'Down Payment (%)',
            name: 'downPaymentPercentage',
            value: formData.downPaymentPercentage,
        },
        {
            title: 'PMI Rate (%)',
            name: 'pmiRate',
            value: formData.pmiRate,
        },
        {
            title: 'PMI Dropoff Point',
            name: 'pmiDropoffPoint',
            value: formData.pmiDropoffPoint,
        },
        {
            title: 'Monthly Property Tax',
            name: 'monthlyPropertyTax',
            value: formData.monthlyPropertyTax,
        },
        {
            title: 'Monthly Home Insurance Amount',
            name: 'monthlyHomeInsuranceAmount',
            value: formData.monthlyHomeInsuranceAmount,
        },
        {
            title: 'Monthly HOA Fees Amount',
            name: 'monthlyHOAFeesAmount',
            value: formData.monthlyHOAFeesAmount,
        },
        {
            title: 'Annual Interest Rate (%)',
            name: 'annualInterestRate',
            value: formData.annualInterestRate,
            step: "0.01",
        },
        {
            title: 'Term In Years',
            name: 'termInYears',
            value: formData.termInYears,
        },
        {
            title: 'Interest Type',
            name: 'interestType',
            value: formData.interestType,
        },
        {
            title: 'Property Management (%)',
            name: 'propertyManagementRate',
            value: formData.propertyManagementRate,
        },
        {
            title: 'Vacancy (%)',
            name: 'vacancyRate',
            value: formData.vacancyRate,
        },
        {
            title: 'Maintenance (%)',
            name: 'maintenanceRate',
            value: formData.maintenanceRate,
        },
        {
            title: 'Maintenance (%)',
            name: 'maintenanceRate',
            value: formData.maintenanceRate,
        },
        {
            title: 'Maintenance (%)',
            name: 'maintenanceRate',
            value: formData.maintenanceRate,
        },
        {
            title: 'Other Expenses (%)',
            name: 'otherExpensesRate',
            value: formData.otherExpensesRate,
        },
        {
            title: 'Cap Ex Reserve (%)',
            name: 'capExReserveRate',
            value: formData.capExReserveRate,
        },
        {
            title: 'Legal And Professional Fees (%)',
            name: 'legalAndProfessionalFees',
            value: formData.legalAndProfessionalFees,
        },
        {
            title: 'Initial Repair Costs (%)',
            name: 'initialRepairCosts',
            value: formData.initialRepairCosts,
        },
        {
            title: 'Traveling Costs',
            name: 'travelingCosts',
            value: formData.travelingCosts,
        },
        {
            title: 'Closing Costs',
            name: 'closingCosts',
            value: formData.closingCosts,
        },
        {
            title: 'Other Initial Expenses (%)',
            name: 'otherInitialExpenses',
            value: formData.otherInitialExpenses,
        },
        {
            title: 'Rent Estimate',
            name: 'rentEstimate',
            value: formData.rentEstimate,
        },
        {
            title: 'Purchase Price',
            name: 'purchasePrice',
            value: formData.purchasePrice,
        },
        {
            title: 'Annual Rent Increase Rate (%)',
            name: 'annualRentIncreaseRate',
            value: formData.annualRentIncreaseRate,
        },
        {
            title: 'Annual Appreciation Rate (%)',
            name: 'annualAppreciationRate',
            value: formData.annualAppreciationRate,
        },
        {
            title: 'Annual Tax Increase Rate (%)',
            name: 'annualTaxIncreaseRate',
            value: formData.annualTaxIncreaseRate,
        },
        {
            title: 'Parking Fees',
            name: 'parkingFees',
            value: formData.parkingFees,
        },
        {
            title: 'Laundry Services',
            name: 'laundryServices',
            value: formData.laundryServices,
        },
        {
            title: 'Storage Unit Fees',
            name: 'storageUnitFees',
            value: formData.storageUnitFees,
        },
        {
            title: 'Other',
            name: 'other',
            value: formData.other,
        },
        {
            title: 'Depreciation',
            name: 'depreciation',
            value: formData.depreciation,
        },
        {
            title: 'Mortgage Interest',
            name: 'mortgageInterest',
            value: formData.mortgageInterest,
        },
        {
            title: 'Operating Expenses',
            name: 'operatingExpenses',
            value: formData.operatingExpenses,
        },
        {
            title: 'Property Taxes',
            name: 'propertyTaxes',
            value: formData.propertyTaxes,
        },
    ];

    // const [isExpanded, setIsExpanded] = useState(false);

    // const toggleExpansion = () => {
    //     setIsExpanded(!isExpanded);
    // };

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

    /*
    downPaymentPercentage: number;
    pmiRate ?: number;
    pmiDropoffPoint ?: number;
    monthlyPropertyTax ?: ValueInput; // Now accepts both amount and rate.
    monthlyHomeInsuranceAmount ?: ValueInput; // Now accepts both amount and rate.
    monthlyHOAFeesAmount ?: ValueInput; // Now accepts both amount and rate.
    
    propertyManagementRate?: number;
    vacancyRate?: number;
    maintenanceRate?: number;
    otherExpensesRate?: number;
    capExReserveRate?: number;
    legalAndProfessionalFees?: ValueInput;
    initialRepairCosts?: ValueInput;
    travelingCosts?: ValueInput;
    closingCosts?: ValueInput;
    otherInitialExpenses?: ValueInput;
 
    rentEstimate: number;
    purchasePrice: number;
 
    annualRentIncreaseRate: number; // Expected annual percentage increase in rent.
    annualAppreciationRate: number; // Expected annual percentage increase in property value.
    annualTaxIncreaseRate?: number; // Expected annual percentage increase in property taxes.
 
    parkingFees?: number; // Income from parking facilities, if available.
    laundryServices?: number; // Income from on-site laundry services.
    storageUnitFees?: number; // Income from storage units, if available.
    other?: number; // Any other sources of income not covered above.
 
    depreciation: number; // Annual depreciation expense that can be deducted.
    mortgageInterest?: number; // Deductible mortgage interest expense.
    operatingExpenses?: number; // Deductible operating expenses.
    propertyTaxes?: number; // Deductible property tax expense.
    */

    return (
        <form onSubmit={handleSubmit} className="investment-form">
            <div className="form-row">

                {formDetails.map((detail, index) => (
                    <div className="form-group" key={index}>
                        <label>{detail.title}</label>
                        <input
                            type="number"
                            name={detail.name}
                            value={detail.value}
                            onChange={handleChange}
                            className="form-control"
                            step={detail.step || "1"} // Use provided step or default to "1"
                        />
                    </div>
                ))}

                {/* <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            name="setNewDefaultValues"
                            checked={formData.setNewDefaultValues}
                            onChange={handleChange}
                        /> Set New Default Values
                    </label>
                </div> */}
                {/* ... add other new form groups similarly */}

                {/* Button to toggle additional inputs */}
                {/* <div className="form-group">
                    <button type="button" onClick={toggleExpansion} className="toggle-btn">
                        {isExpanded ? 'Less Options ' : 'More Options '}
                        <span className={`arrow ${isExpanded ? 'up' : 'down'}`}></span>
                    </button>
                </div> */}

                {/* Collapsible Section for Additional Inputs */}
                {/* {isExpanded && (
                    <div className="additional-inputs">
                        <div className="form-group">
                            <label>Test1</label>
                            <input type="number" name="test1" value={formData.vacancyRate} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Test2</label>
                            <input type="number" name="test2" value={formData.managementFees} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                )} */}

            </div>
            <button type="submit" >Calculate</button>
        </form>
    );

};

export default InvestmentForm;
