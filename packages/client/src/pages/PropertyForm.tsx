import React, { useState } from 'react';
import '../styles/PropertyForm.css';
import { RealEstateCalcApi } from '../api/realestatecalcapi';
import { CreateListingDetailsRequest } from '@realestatemanager/shared';
import StandardForm, { FormProperty } from '../components/StandardForm';
import { AddPropertyFormDetails } from '../forms/AddPropertyFormDetails';

const PropertyForm: React.FC = () => {

    const addPropertyFormDetails: AddPropertyFormDetails = new AddPropertyFormDetails();

    const [formData, setFormData] = useState(addPropertyFormDetails.getDefaultFormData()); //useState(initialFormState);

    const getFormDetails = (): FormProperty[] => {
        return addPropertyFormDetails.getFormDetails(formData);
    };

    const getRequestData = (): CreateListingDetailsRequest => {
        return addPropertyFormDetails.createRequest(formData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dataToSubmit: CreateListingDetailsRequest = getRequestData();

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

            {formData && <StandardForm
                formDetails={getFormDetails()}
                handleSubmit={handleSubmit}
                setFormData={setFormData}
                buttonTitle='Submit'
                columnsPerRow={5}
            />
            }

        </div>
    );

};

export default PropertyForm;




