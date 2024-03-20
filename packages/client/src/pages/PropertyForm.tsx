import React, { useState } from 'react';
import { Country, HomeType, State, InputType, ratingSelections } from '../constants/Constant';
import '../styles/PropertyForm.css';
import { ListingDetailsDTO } from '@realestatemanager/shared';
import { RealEstateCalcApi } from '../api/realestatecalcapi';

const PropertyForm: React.FC = () => {

    type FormFieldConfig = {
        name: string;
        label: string;
        type: InputType;
        defaultValue: boolean | string | Country | HomeType;
        selections?: State[] | Country[] | HomeType[] | number[] | boolean[];
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
            defaultValue: State.AL,
            selections: Object.values(State)
        },
        {
            name: 'zipcode',
            label: 'Zipcode',
            type: InputType.TEXT,
            defaultValue: ''
        },
        {
            name: 'city',
            label: 'City',
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
            name: 'hasGarage',
            label: 'Has Garage',
            type: InputType.SELECT,
            defaultValue: false,
            selections: [true, false]
        },
        {
            name: 'hasPool',
            label: 'Has Pool',
            type: InputType.SELECT,
            defaultValue: false,
            selections: [true, false]
        },
        {
            name: 'hasBasement',
            label: 'Has Basement',
            type: InputType.SELECT,
            defaultValue: false,
            selections: [true, false]
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
            name: 'zestimateRangeLow',
            label: 'Zillow Range Low',
            type: InputType.NUMBER,
            defaultValue: ''
        },
        {
            name: 'zestimateRangeHigh',
            label: 'Zillow Range High',
            type: InputType.NUMBER,
            defaultValue: ''
        },
        {
            name: 'zillowMonthlyPropertyTaxAmount',
            label: 'Zillow Monthly Property Tax Amount',
            type: InputType.NUMBER,
            defaultValue: ''
        },
        {
            name: 'zillowMonthlyHomeInsuranceAmount',
            label: 'Zillow Monthly Home Insurance Amount',
            type: InputType.NUMBER,
            defaultValue: ''
        },
        {
            name: 'zillowMonthlyHOAFeesAmount',
            label: 'Zillow Monthly HOA Fees Amount',
            type: InputType.NUMBER,
            defaultValue: ''
        },
        {
            name: 'description',
            label: 'Discription',
            type: InputType.TEXT,
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

    const getRequestData = (): ListingDetailsDTO => {

        const getDateNDaysAgo = (daysAgo: number): string => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Remove time component
            today.setDate(today.getDate() - daysAgo);
            return today.toISOString();
        }

        return {
            zillowURL: formData.zillowURL,
            listingPrice: formData.listingPrice,
            dateListed: getDateNDaysAgo(parseInt(formData.numberOfDaysOnMarket)),
            propertyDetails: {
                address: {
                    fullAddress: formData.fullAddress,
                    state: formData.state as State,
                    zipcode: formData.zipcode,
                    city: formData.city,
                    county: formData.county,
                    country: formData.country as Country,
                    streetAddress: formData.streetAddress,
                    apartmentNumber: formData.apartmentNumber,
                },
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
                hasGarage: formData.hasGarage,
                hasPool: formData.hasPool,
                hasBasement: formData.hasBasement,
                homeType: formData.homeType as HomeType,
                description: formData.description,
            },
            zillowMarketEstimates: {
                zestimate: parseInt(formData.zestimate), // Estimated market value
                zestimateRange: {
                    low: parseInt(formData.zestimateLow),
                    high: parseInt(formData.zestimateHigh),
                },
                zillowRentEstimate: parseInt(formData.zillowRentEstimate), // Estimated rental value
                zillowMonthlyPropertyTaxAmount: parseFloat(formData.zillowMonthlyPropertyTaxAmount),
                zillowMonthlyHomeInsuranceAmount: parseFloat(formData.zillowMonthlyHomeInsuranceAmount),
                zillowMonthlyHOAFeesAmount: parseFloat(formData.zillowMonthlyHOAFeesAmount),
            },
        };
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dataToSubmit: ListingDetailsDTO = getRequestData();

        const realEstateCalcApi: RealEstateCalcApi = new RealEstateCalcApi();
        const postSuccess = await realEstateCalcApi.addNewProperty(dataToSubmit);
        if (postSuccess) {
            alert('Data submitted successfully!');
            window.location.reload();
        }
        else {
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
                                    <option key={index} value={selection.toString()}>
                                        {typeof selection === 'number' || typeof selection === 'boolean' ? selection.toString() : selection}
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




