import React, { useState } from 'react';
import { RealEstateCalcApi } from '../api/realestatecalcapi';
import { CreateListingDetailsRequest } from '@realestatemanager/shared';
import StandardForm, { FormProperty } from '../components/StandardForm';
import { AddPropertyFormDetails } from '../forms/AddPropertyFormDetails';
import UploadCSVFile from '../components/UploadCSVFile';

export enum AddPropertyType {
    SINGLE_PROPERTY_INPUT = 'SINGLE_PROPERTY_INPUT',
    BULK_UPLOAD = 'BULK_UPLOAD',
};

const PropertyForm: React.FC = () => {

    const addPropertyFormDetails: AddPropertyFormDetails = new AddPropertyFormDetails();

    const [formData, setFormData] = useState(addPropertyFormDetails.getDefaultFormData());
    const [formType, setFormType] = useState<AddPropertyType>(AddPropertyType.SINGLE_PROPERTY_INPUT);

    const handleFormTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value as keyof typeof AddPropertyType;
        setFormType(AddPropertyType[input]);
    };

    const getFormDetails = (): FormProperty[] => {
        return addPropertyFormDetails.getFormDetails(formData);
    };

    const getRequestData = (): CreateListingDetailsRequest => {
        return addPropertyFormDetails.createRequest(formData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dataToSubmit: CreateListingDetailsRequest = getRequestData();
        console.log('dataToSubmit:', dataToSubmit);
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

    const handleCSVUpload = async (data: any): Promise<number> => {
        console.log('CSV Data:', data);
        // Process the CSV data as needed
        return data.length;
    };

    const expectedHeaders: string[] = [
        'Property Name',
        'Address',
        'Price',
        'Bedrooms',
        'Bathrooms',
        'Square Feet'
    ];

    const exampleData: { [key: string]: string }[] = [{
        'Property Name': 'Example Property',
        'Address': '123 Example St',
        'Price': '500000',
        'Bedrooms': '3',
        'Bathrooms': '2',
        'Square Feet': '1500'
    }];

    return (
        <div className="form-container">
            <h2>Property Listing Form</h2>
            <div className="radio-button-group">
                <h2>Select Property Upload Type</h2>
                <label>
                    <input
                        type="radio"
                        value={AddPropertyType.SINGLE_PROPERTY_INPUT}
                        checked={formType === AddPropertyType.SINGLE_PROPERTY_INPUT}
                        onChange={handleFormTypeChange}
                    />
                    Add Single Property
                </label>
                <label>
                    <input
                        type="radio"
                        value={AddPropertyType.BULK_UPLOAD}
                        checked={formType === AddPropertyType.BULK_UPLOAD}
                        onChange={handleFormTypeChange}
                    />
                    Upload properties in bulk
                </label>
            </div>
            {formType === AddPropertyType.SINGLE_PROPERTY_INPUT && (
                <StandardForm
                    formDetails={getFormDetails()}
                    handleSubmit={handleSubmit}
                    setFormData={setFormData}
                    buttonTitle='Submit'
                    columnsPerRow={5}
                />
            )}
            {formType === AddPropertyType.BULK_UPLOAD && (
                <div>
                    <h3>Expected CSV Headers</h3>
                    <table className="expected-headers-table">
                        <thead>
                            <tr>
                                {expectedHeaders.map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {expectedHeaders.map((header, index) => (
                                    <td key={index}>{exampleData[0][header]}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                    <UploadCSVFile onFileUpload={handleCSVUpload} />
                </div>
            )}
        </div>
    );

};

export default PropertyForm;
