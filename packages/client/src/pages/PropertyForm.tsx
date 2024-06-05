import React, { useState } from 'react';
import { RealEstateCalcApi } from '../api/realestatecalcapi';
import { CreateListingDetailsRequest } from '@realestatemanager/shared';
import StandardForm, { FormProperty } from '../components/StandardForm';
import { AddPropertyFormDetails } from '../forms/AddPropertyFormDetails';
import UploadCSVFile from '../components/UploadCSVFile';
import ReusableTable from '../components/ReusableTable';
import { DummyCSVDataTable } from '../tables/DummyCSVDataTable';
import { DefaultTableType } from '../constants/Constant';
import '../styles/UploadCSVFile.css';

export enum AddPropertyType {
    SINGLE_PROPERTY_INPUT = 'SINGLE_PROPERTY_INPUT',
    BULK_UPLOAD = 'BULK_UPLOAD',
};

export interface DummyCSVDataType {
    firstName: string;
    lastName: string;
    fullName: string;
    website: string;
    companyName: string;
    phoneNumber: string;
    email: string;
    country: string;
    state: string;
    agentType: string;
};

const PropertyForm: React.FC = () => {

    const addPropertyFormDetails: AddPropertyFormDetails = new AddPropertyFormDetails();
    const dummyCSVDataTable: DummyCSVDataTable = new DummyCSVDataTable();

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

    const getExampleData = (): DummyCSVDataType[] => {
        return [{
            firstName: 'Example First Name',
            lastName: 'Example Last Name',
            fullName: 'Example FullName',
            website: 'Example Website',
            companyName: 'Example Company Name',
            phoneNumber: 'Example Phone Number',
            email: 'Example Email',
            country: 'Example Country',
            state: 'Example State',
            agentType: 'Example Agent Type',
        }];
    };

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
                    <hr></hr>

                    <h2>Template CSV</h2>
                    <ReusableTable
                        data={getExampleData()}
                        tableHandler={dummyCSVDataTable}
                        tableType={DefaultTableType.DEFAULT}
                        setTableType={undefined}
                        tableTypeOptions={undefined}
                        onRowClick={undefined}
                        includeTableSeparator={false}
                        canExportIntoCSV={true}
                        exportCSVButtonTitle='Export Template CSV'
                        isEditable={false}
                        handleUpdate={undefined}
                    />
                    <br></br>
                    <hr></hr>
                    <UploadCSVFile onFileUpload={handleCSVUpload} />
                </div>
            )}
        </div>
    );

};

export default PropertyForm;
