import React, { useEffect, useState } from 'react';
import { State, InputType, PropertyType, PropertyStatus } from '../constants/Constant';
import '../styles/PropertyForm.css';
import '../styles/CollectProperties.css';
import { RealEstateCalcApi } from '../api/realestatecalcapi';
import { FormFieldConfig } from "./PropertyForm";
import { CreateRentCastApiRequest, RentCastDetailsResponseDTO } from '@realestatemanager/shared';
import { RentCastApi } from '../api/rentcastapi';
import AddPropertyForm from '../components/AddPropertyForm';

const CollectProperties: React.FC = () => {

    const [rentCastDetails, setRentCastDetails] = useState<RentCastDetailsResponseDTO[]>();
    const [isLoading, setIsLoading] = useState(true);
    const rentCastApi: RentCastApi = new RentCastApi();

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const rentCastDetails: RentCastDetailsResponseDTO[] = await rentCastApi.getRentCastApiDetails();
                // For now just show the first rentCastDetails in the list
                setRentCastDetails(rentCastDetails);
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
            defaultValue: PropertyType.SINGLE_FAMILY,
            selections: Object.values(PropertyType)
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
            defaultValue: PropertyStatus.ACTIVE,
            selections: Object.values(PropertyStatus)
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
            defaultValue: '5',
        },
        {
            name: 'offset',
            label: 'Offset',
            type: InputType.NUMBER,
            defaultValue: '',
        },
        {
            name: 'retrieveExtraData',
            label: 'Retrieve Extra Data',
            type: InputType.CHECKBOX,
            defaultValue: false,
        },
    ];

    const initialFormState = formFieldsConfig.reduce((acc, { name, defaultValue }) => {
        acc[name] = defaultValue;
        return acc;
    }, {} as { [key: string]: any });


    const [formData, setFormData] = useState(initialFormState);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dataToSubmit: CreateRentCastApiRequest = getRequestData();
        console.log('dataToSubmit:', dataToSubmit);

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

    const getRequestData = (): CreateRentCastApiRequest => {
        return {
            address: formData.address,
            city: formData.city,
            state: formData.state as State,
            zipCode: formData.zipcode,
            latitude: parseFloat(formData.latitude),
            longitude: parseFloat(formData.longitude),
            radius: parseFloat(formData.radius),
            propertyType: formData.propertyType as PropertyType,
            bedrooms: parseFloat(formData.bedrooms),
            bathrooms: parseFloat(formData.bathrooms),
            status: formData.status as PropertyStatus,
            daysOld: parseInt(formData.daysOld),
            limit: parseInt(formData.limit),
            offset: parseInt(formData.offset),
            retrieveExtraData: formData.retrieveExtraData,
        };
    };

    const buttonDisableLogic = (): boolean => {
        if (!rentCastDetails) {
            return true;
        }
        for (const rentCastDetail of rentCastDetails) {
            if (rentCastDetail?.canMakeApiCalls) {
                return false;
            }
        }
        return true;
    }

    // Content based on loading state
    const getPageContent = () => {
        let content;
        if (isLoading) {
            content = <p>Loading Rent Cast Api Details...</p>;
        } else {
            content = (
                <>
                    <hr />
                    <div className="scrollable-container">
                        {rentCastDetails ? rentCastDetails.map((rentCastDetail, index) => (
                            <div key={index}>
                                <p><b>Api Key Name:</b> {rentCastDetail.apiKeyName}</p>
                                <p><b>Remaining number of free API calls left:</b> {rentCastDetail.remainingNumberOfFreeApiCalls}</p>
                                <p><b>Can make API call:</b> {rentCastDetail.canMakeApiCalls.toString()}</p>
                                <p><b>Days into billing period:</b> {rentCastDetail.daysIntoBillingPeriod}</p>
                                <p><b>Most recent billing date:</b> {new Date(rentCastDetail.mostRecentBillingDate).toLocaleDateString('en-US')}</p>
                                <hr />
                            </div>
                        )) : []}
                    </div>
                    <hr />
                    <br />
                    <AddPropertyForm
                        formFieldsConfig={formFieldsConfig}
                        formData={formData}
                        setFormData={setFormData}
                        // handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        buttonDisableLogic={buttonDisableLogic}
                    />
                </>
            );
        }

        return content;
    };

    return (
        <div className="form-container">
            <h2>Collect Properties Request Form</h2>
            {getPageContent()}
        </div>
    );

};

export default CollectProperties;