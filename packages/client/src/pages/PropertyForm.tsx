import React, { useState } from 'react';
import axios from 'axios';
import { Country, HomeType, State, InputType } from '../constants/Constant';
import '../styles/PropertyForm.css';

const PropertyForm: React.FC = () => {

    const ratingSelections: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    type FormFieldConfig = {
        name: string;
        label: string;
        type: InputType;
        defaultValue: string | Country | HomeType;
        selections?: State[] | Country[] | HomeType[] | number[];
    };

    const formFieldsConfig: FormFieldConfig[] = [
        {
            name: 'zillowURL',
            label: 'Zillow URL',
            type: InputType.TEXT,
            defaultValue: ''
        },
        {
            name: 'fullAddress',
            label: 'Full Address',
            type: InputType.TEXT,
            defaultValue: ''
        },
        {
            name: 'state',
            label: 'State',
            type: InputType.SELECT,
            defaultValue: '',
            selections: Object.values(State)
        },
        {
            name: 'zipcode',
            label: 'Zipcode',
            type: InputType.TEXT,
            defaultValue: ''
        },
        {
            name: 'town',
            label: 'Town',
            type: InputType.TEXT,
            defaultValue: ''
        },
        {
            name: 'county',
            label: 'County',
            type: InputType.TEXT,
            defaultValue: ''
        },
        {
            name: 'country',
            label: 'Country',
            type: InputType.SELECT,
            defaultValue: Country.UnitedStates,
            selections: Object.values(Country)
        },
        {
            name: 'streetAddress',
            label: 'Street Address',
            type: InputType.TEXT,
            defaultValue: ''
        },
        {
            name: 'apartmentNumber',
            label: 'Apartment Number',
            type: InputType.TEXT,
            defaultValue: ''
        },
        {
            name: 'numberOfDaysOnMarket',
            label: 'Number Of Days On Market',
            type: InputType.NUMBER,
            defaultValue: ''
        },
        {
            name: 'elementarySchoolRating',
            label: 'Elementary School Rating',
            type: InputType.SELECT,
            defaultValue: '1',
            selections: ratingSelections
        },
        {
            name: 'middleSchoolRating',
            label: 'Middle School Rating',
            type: InputType.SELECT,
            defaultValue: '1',
            selections: ratingSelections
        },
        {
            name: 'highSchoolRating',
            label: 'High School Rating',
            type: InputType.SELECT,
            defaultValue: '1',
            selections: ratingSelections
        },
        {
            name: 'numberOfBedrooms',
            label: 'Number Of Bedrooms',
            type: InputType.SELECT,
            defaultValue: '0',
            selections: [0, ...ratingSelections]
        },
        {
            name: 'numberOfFullBathrooms',
            label: 'Number Of Full Bathrooms',
            type: InputType.SELECT,
            defaultValue: '0',
            selections: [0, ...ratingSelections]
        },
        {
            name: 'numberOfHalfBathrooms',
            label: 'Number Of Half Bathrooms',
            type: InputType.SELECT,
            defaultValue: '0',
            selections: [0, ...ratingSelections]
        },
        {
            name: 'squareFeet',
            label: 'Square Feet',
            type: InputType.NUMBER,
            defaultValue: ''
        },
        {
            name: 'acres',
            label: 'Acres',
            type: InputType.NUMBER,
            defaultValue: ''
        },
        {
            name: 'yearBuilt',
            label: 'Year Built',
            type: InputType.NUMBER,
            defaultValue: ''
        },
        {
            name: 'homeType',
            label: 'Home Type',
            type: InputType.SELECT,
            defaultValue: HomeType.SingleFamilyHome,
            selections: Object.values(HomeType)
        },
        {
            name: 'listingPrice',
            label: 'Listing Price',
            type: InputType.NUMBER,
            defaultValue: ''
        },
        {
            name: 'zestimate',
            label: 'Zestimate',
            type: InputType.NUMBER,
            defaultValue: ''
        },
        {
            name: 'zillowRentEstimate',
            label: 'Zillow Rent Estimate',
            type: InputType.NUMBER,
            defaultValue: ''
        },
        {
            name: 'monthlyPropertyTaxAmount',
            label: 'Monthly Property Tax Amount',
            type: InputType.NUMBER,
            defaultValue: ''
        },
        {
            name: 'monthlyHomeInsuranceAmount',
            label: 'Monthly Home Insurance Amount',
            type: InputType.NUMBER,
            defaultValue: ''
        },
        {
            name: 'monthlyHOAFeesAmount',
            label: 'Monthly HOA Fees Amount',
            type: InputType.NUMBER,
            defaultValue: ''
        },
    ];

    const initialFormState = formFieldsConfig.reduce((acc, { name, defaultValue }) => {
        acc[name] = defaultValue;
        return acc;
    }, {} as { [key: string]: any });


    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dataToSubmit = {
            listingDetails: {
                zillowURL: formData.zillowURL,
                propertyDetails: {
                    address: {
                        fullAddress: formData.fullAddress,
                        state: formData.state as State,
                        zipcode: formData.zipcode,
                        town: formData.town,
                        county: formData.county,
                        country: formData.country as Country,
                        streetAddress: formData.streetAddress,
                        apartmentNumber: formData.apartmentNumber,
                    },
                    numberOfDaysOnMarket: parseInt(formData.numberOfDaysOnMarket),
                    schoolRating: {
                        elementarySchoolRating: parseInt(formData.elementarySchoolRating),
                        middleSchoolRating: parseInt(formData.middleSchoolRating),
                        highSchoolRating: parseInt(formData.highSchoolRating),
                    },
                    numberOfBedrooms: parseInt(formData.numberOfBedrooms),
                    numberOfFullBathrooms: parseInt(formData.numberOfFullBathrooms),
                    numberOfHalfBathrooms: parseInt(formData.numberOfHalfBathrooms),
                    squareFeet: parseInt(formData.squareFeet),
                    acres: parseFloat(formData.acres),
                    yearBuilt: parseInt(formData.yearBuilt),
                    homeType: formData.homeType as HomeType,
                },
                priceDetails: {
                    listingPrice: parseFloat(formData.listingPrice),
                    zillowMarketEstimates: {
                        zestimate: parseInt(formData.zestimate), // Estimated market value
                        zillowRentEstimate: parseInt(formData.zillowRentEstimate), // Estimated rental value
                    },
                    monthlyPropertyTaxAmount: parseFloat(formData.monthlyPropertyTaxAmount),
                    monthlyHomeInsuranceAmount: parseFloat(formData.monthlyHomeInsuranceAmount),
                    monthlyHOAFeesAmount: parseFloat(formData.monthlyHOAFeesAmount),
                },
            },

        };

        try {
            await axios.post('http://localhost:3000/calc/addProperty', dataToSubmit, {
                headers: { 'Content-Type': 'application/json' },
            });
            alert('Data submitted successfully!');
            window.location.reload();
        } catch (error) {
            console.error('There was an error submitting the form:', error);
            alert('Failed to submit data.');
        }
    };

    return (
        <div className="form-container">
            <h2>Property Listing Form</h2>
            <form onSubmit={handleSubmit}>
                {formFieldsConfig.map(({ name, label, type, selections }) => (
                    <div className="form-field" key={name}>
                        <label htmlFor={name} className="form-label">{label}:</label>
                        {type === 'select' && selections ? (
                            <select name={name} id={name} value={formData[name]} onChange={handleChange} className="form-input">
                                {selections.map((selection, index) => (
                                    <option key={index} value={selection}>
                                        {typeof selection === 'number' ? selection : selection.toString()}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input type={type} id={name} name={name} value={formData[name]} onChange={handleChange} className="form-input" />
                        )}
                    </div>
                ))}
                <div className="submit-button-container">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );


};

export default PropertyForm;




