import React, { useState } from 'react';
import '../styles/PropertyForm.css';
import StandardForm, { FormPropertyMap } from '../components/StandardForm';
import { AddPropertyFormData, AddPropertyFormDetails } from '../forms/AddPropertyFormDetails';

const PropertyForm: React.FC = () => {

    const addPropertyFormDetails: AddPropertyFormDetails = new AddPropertyFormDetails();

    const [formData, setFormData] = useState<AddPropertyFormData>(addPropertyFormDetails.getFormDetails()); //useState(initialFormState);

    const getFormDetails = (): FormPropertyMap<AddPropertyFormData> => {
        return addPropertyFormDetails.getFormDetails(); //formData);
    };

    // const getRequestData = (): CreateListingDetailsRequest => {
    //     return addPropertyFormDetails.createRequest(formData);
    // };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const dataToSubmit: CreateListingDetailsRequest = getRequestData();
        // console.log('dataToSubmit:', dataToSubmit);
        // const realEstateCalcApi: RealEstateCalcApi = new RealEstateCalcApi();
        // const postSuccess = await realEstateCalcApi.addNewProperty(dataToSubmit);
        // if (postSuccess) {
        //     alert('Data submitted successfully!');
        //     window.location.reload();
        // }
        // else {
        //     alert('Failed to submit data.');
        // }
    };

    return (
        <div className="form-container">
            <h2>Property Listing Form</h2>

            {formData && <StandardForm<AddPropertyFormData>
                formPropertyMap={getFormDetails()}
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




