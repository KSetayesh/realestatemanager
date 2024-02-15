// import { HomeType } from '@realestatemanager/shared';
import { useState } from 'react';
import axios from 'axios';
import { Country, HomeType, State } from '../constants/Constant';

const PropertyForm: React.FC = () => {

    const [formData, setFormData] = useState({
        zillowURL: '',
        fullAddress: '',
        state: '',
        zipcode: '',
        town: '',
        county: '',
        country: '',
        streetAddress: '',
        apartmentNumber: '',
        numberOfDaysOnMarket: '',
        elementarySchoolRating: '',
        middleSchoolRating: '',
        highSchoolRating: '',
        numberOfBedrooms: '',
        numberOfFullBathrooms: '',
        numberOfHalfBathrooms: '',
        squareFeet: '',
        acres: '',
        yearBuilt: '',
        homeType: '',
        price: '',
        zestimate: '',
        rentEstimate: '',
        monthlyPropertyTaxAmount: '',
        monthlyHomeInsuranceAmount: '',
        monthlyHOAFeesAmount: '',
    });

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const dataToSubmit = {
            listingInformation: {
                zillowURL: formData.zillowURL,
                propertyInformation: {
                    address: {
                        fullAddress: formData.fullAddress,
                        state: formData.state,
                        zipcode: formData.zipcode,
                        town: formData.town,
                        county: formData.county,
                        country: formData.country,
                        streetAddress: formData.streetAddress,
                        apartmentNumber: formData.apartmentNumber,
                    },
                    numberOfDaysOnMarket: parseInt(formData.numberOfDaysOnMarket),
                    elementarySchoolRating: parseInt(formData.elementarySchoolRating),
                    middleSchoolRating: parseInt(formData.middleSchoolRating),
                    highSchoolRating: parseInt(formData.highSchoolRating),
                    numberOfBedrooms: parseInt(formData.numberOfBedrooms),
                    numberOfFullBathrooms: parseInt(formData.numberOfFullBathrooms),
                    numberOfHalfBathrooms: parseInt(formData.numberOfHalfBathrooms),
                    squareFeet: parseInt(formData.squareFeet),
                    acres: parseFloat(formData.acres),
                    yearBuilt: parseInt(formData.yearBuilt),
                    homeType: formData.homeType,
                },
                listingPriceInformation: {
                    price: parseFloat(formData.price),
                    zestimate: parseFloat(formData.zestimate),
                    rentEstimate: parseFloat(formData.rentEstimate),
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
        <div style={{ margin: '20px', maxWidth: '600px' }}>
            <h2>Property Listing Form</h2>
            <form onSubmit={handleSubmit}>

                <div style={{ marginBottom: '10px' }}>
                    <label>Zillow URL: </label>
                    <input
                        type="text"
                        name="zillowURL"
                        value={formData.zillowURL}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '300px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Full Address: </label>
                    <input
                        type="text"
                        name="fullAddress"
                        value={formData.fullAddress}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '300px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Zipcode: </label>
                    <input
                        type="text"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '300px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Town: </label>
                    <input
                        type="text"
                        name="town"
                        value={formData.town}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '300px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>County: </label>
                    <input
                        type="text"
                        name="county"
                        value={formData.county}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '300px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>State: </label>
                    <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '320px' }}
                    >
                        {Object.entries(State).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Country: </label>
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '320px' }}
                    >
                        {Object.entries(Country).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Street Address: </label>
                    <input
                        type="text"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '300px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Apartment Number: </label>
                    <input
                        type="text"
                        name="apartmentNumber"
                        value={formData.apartmentNumber}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '300px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Number Of Days On Market: </label>
                    <input
                        type="text"
                        name="numberOfDaysOnMarket"
                        value={formData.numberOfDaysOnMarket}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '300px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Elementary School Rating: </label>
                    <select
                        name="elementarySchoolRating"
                        value={formData.elementarySchoolRating}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '320px' }}
                    >
                        {Object.entries([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Middle School Rating: </label>
                    <select
                        name="middleSchoolRating"
                        value={formData.middleSchoolRating}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '320px' }}
                    >
                        {Object.entries([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>High School Rating: </label>
                    <select
                        name="highSchoolRating"
                        value={formData.highSchoolRating}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '320px' }}
                    >
                        {Object.entries([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Number Of Bedrooms: </label>
                    <select
                        name="numberOfBedrooms"
                        value={formData.numberOfBedrooms}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '320px' }}
                    >
                        {Object.entries([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Number Of Full Bathrooms: </label>
                    <select
                        name="numberOfFullBathrooms"
                        value={formData.numberOfFullBathrooms}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '320px' }}
                    >
                        {Object.entries([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Number Of Half Bathrooms: </label>
                    <select
                        name="numberOfHalfBathrooms"
                        value={formData.numberOfHalfBathrooms}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '320px' }}
                    >
                        {Object.entries([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Acres: </label>
                    <input
                        type="text"
                        name="acres"
                        value={formData.acres}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '300px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Year Built: </label>
                    <input
                        type="text"
                        name="yearBuilt"
                        value={formData.yearBuilt}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '300px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Square Feet: </label>
                    <input
                        type="text"
                        name="squareFeet"
                        value={formData.squareFeet}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '300px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Home Type: </label>
                    <select
                        name="homeType"
                        value={formData.homeType}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '320px' }}
                    >
                        {Object.entries(HomeType).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Price: </label>
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '300px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Zestimate: </label>
                    <input
                        type="text"
                        name="zestimate"
                        value={formData.zestimate}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '300px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Rent Estimate: </label>
                    <input
                        type="text"
                        name="rentEstimate"
                        value={formData.rentEstimate}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '300px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Monthly Property Tax Amount: </label>
                    <input
                        type="text"
                        name="monthlyPropertyTaxAmount"
                        value={formData.monthlyPropertyTaxAmount}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '300px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Monthly Home Insurance Amount: </label>
                    <input
                        type="text"
                        name="monthlyHomeInsuranceAmount"
                        value={formData.monthlyHomeInsuranceAmount}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '300px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Monthly HOA Fees Amount: </label>
                    <input
                        type="text"
                        name="monthlyHOAFeesAmount"
                        value={formData.monthlyHOAFeesAmount}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', width: '300px' }}
                    />
                </div>

                <div>
                    <br></br>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default PropertyForm;
