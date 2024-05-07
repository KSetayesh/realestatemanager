import React, { useEffect, useState } from 'react';
import { State, InputType, RentCastPropertyType, RentCastStatus } from '../constants/Constant';
import '../styles/PropertyForm.css';
import { RealEstateCalcApi } from '../api/realestatecalcapi';
import { FormFieldConfig } from "./PropertyForm";
import { RentCastApiRequestDTO, RentCastDetailsDTO } from '@realestatemanager/shared';
import { RentCastApi } from '../api/rentcastapi';

const CollectProperties: React.FC = () => {

    const [rentCastDetails, setRentCastDetails] = useState<RentCastDetailsDTO>();
    const [isLoading, setIsLoading] = useState(true);
    const rentCastApi: RentCastApi = new RentCastApi();

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true); // Set loading state to true before fetching data
                const rentCastDetails: RentCastDetailsDTO = await rentCastApi.getRentCastApiDetails();
                setRentCastDetails(rentCastDetails); // Update state with fetched data
                console.log("Fetched data:", rentCastDetails);
            } catch (error) {
                // Error handling if fetchProperties fails
                console.error('Failed to fetch rentCastApi details:', error);
            } finally {
                setIsLoading(false); // Ensure loading state is updated regardless of success or failure
            }
        })();
    }, []); // Empty dependency array means this effect runs once on mount

    const formFieldsConfig: FormFieldConfig[] = [
        {
            name: 'address',
            label: 'Address',
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
            name: 'latitude',
            label: 'Latitude',
            type: InputType.NUMBER,
            defaultValue: ''
        },
        {
            name: 'longitude',
            label: 'Longitude',
            type: InputType.NUMBER,
            defaultValue: ''
        },
        {
            name: 'radius',
            label: 'Radius',
            type: InputType.NUMBER,
            defaultValue: ''
        },
        {
            name: 'propertyType',
            label: 'Property Type',
            type: InputType.SELECT,
            defaultValue: RentCastPropertyType.SINGLE_FAMILY,
            selections: Object.values(RentCastPropertyType)
        },
        {
            name: 'bedrooms',
            label: 'Bedrooms',
            type: InputType.NUMBER,
            defaultValue: ''
        },
        {
            name: 'bathrooms',
            label: 'Bathrooms',
            type: InputType.NUMBER,
            defaultValue: ''
        },
        {
            name: 'status',
            label: 'Status',
            type: InputType.SELECT,
            defaultValue: RentCastStatus.ACTIVE,
            selections: Object.values(RentCastStatus)
        },
        {
            name: 'daysOld',
            label: 'Days Old',
            type: InputType.NUMBER,
            defaultValue: ''
        },
        {
            name: 'limit',
            label: 'Limit',
            type: InputType.NUMBER,
            defaultValue: '',
        },
        {
            name: 'offset',
            label: 'Offset',
            type: InputType.NUMBER,
            defaultValue: '',
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
        const dataToSubmit: RentCastApiRequestDTO = getRequestData();

        const realEstateCalcApi: RealEstateCalcApi = new RealEstateCalcApi();
        const postSuccess = await realEstateCalcApi.addNewPropertyWithRentCastAPI(dataToSubmit);
        if (postSuccess) {
            alert('Data submitted successfully!');
            window.location.reload();
        }
        else {
            alert('Failed to submit data.');
        }
    };

    const getRequestData = (): RentCastApiRequestDTO => {

        return {
            address: formData.address,
            city: formData.city,
            state: formData.state as State,
            zipCode: formData.zipcode,
            latitude: parseFloat(formData.latitude),
            longitude: parseFloat(formData.longitude),
            radius: parseFloat(formData.radius),
            propertyType: formData.propertyType as RentCastPropertyType,
            bedrooms: parseFloat(formData.bedrooms),
            bathrooms: parseFloat(formData.bathrooms),
            status: formData.status as RentCastStatus,
            daysOld: parseInt(formData.daysOld),
            limit: parseInt(formData.limit),
            offset: parseInt(formData.offset),

        };
    };

    return (
        <div className="form-container">
            <h2>Collect Properties Request Form</h2>
            {isLoading ? (
                <p>Loading Rent Cast Api Details...</p>
            ) : (
                <>
                    <hr></hr>
                    <p>Remaining number of free api calls left: {rentCastDetails!.remainingNumberOfFreeApiCalls}</p>
                    <p>Can make API call: {rentCastDetails!.canMakeApiCalls.toString()}</p>
                    <p>Days into billing period: {rentCastDetails!.daysIntoBillingPeriod}</p>
                    <hr></hr>
                    <br></br>
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
                            <button type="submit" disabled={!rentCastDetails?.canMakeApiCalls}>Submit</button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default CollectProperties;