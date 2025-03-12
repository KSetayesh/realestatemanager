import React, { useState } from 'react';
import { RealEstateCalcApi } from '../../api/realestatecalc/realestatecalcapi';
import {
    CreateListingDetailsRequest,
    CreatePropertiesInBulkRequest,
    DummyCSVDataType
} from '@realestatemanager/types';
import StandardForm, { FormProperty } from '../components/StandardForm';
import { AddPropertyFormDetails } from '../forms/AddPropertyFormDetails';
import UploadCSVFile from '../components/UploadCSVFile';
import ReusableTable from '../components/ReusableTable';
import RadioButtonComponent from '../basicdatadisplaycomponents/RadioButtonComponent';
import { Box, Paper, Typography } from '@mui/material';
import { AddPropertyType } from '../constants/Constant';
import { DummyCSVDataTable } from '../newtabledata/tabledata/DummyCSVDataTable';

// New type with all properties as strings
// export type DummyCSVDataType = {
//     [K in keyof AddPropertyFormData]: string;
// };

const PropertyForm: React.FC = () => {

    const addPropertyFormDetails: AddPropertyFormDetails = new AddPropertyFormDetails();
    const dummyCSVDataTable: DummyCSVDataTable = new DummyCSVDataTable();
    const realEstateCalcApi: RealEstateCalcApi = new RealEstateCalcApi();

    const [formData, setFormData] = useState(addPropertyFormDetails.getDefaultFormData());
    const [formType, setFormType] = useState<AddPropertyType>((AddPropertyType.SINGLE_PROPERTY_INPUT));
    const [isLoadingBulkData, setIsLoadingBulkData] = useState(false);

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
        const postSuccess = await realEstateCalcApi.addNewProperty(dataToSubmit);
        if (postSuccess) {
            alert('Data submitted successfully!');
            window.location.reload();
        }
        else {
            alert('Failed to submit data.');
        }
    };

    const handleCSVUpload = async (data: Record<string, string | number>[]): Promise<void> => {
        console.log('CSV Data:', data);
        const createRequestData = (): CreatePropertiesInBulkRequest => {
            return {
                csvData: data,
            };
        };

        const dataToSubmit: CreatePropertiesInBulkRequest = createRequestData();

        setIsLoadingBulkData(true);
        try {
            const numberOfPropertiesUploaded: number = await realEstateCalcApi.addPropertiesInBulk(dataToSubmit);
            if (numberOfPropertiesUploaded > 0) {
                alert(`${numberOfPropertiesUploaded} new properties added!`);
            } else {
                alert('No properties added');
            }
        } catch (error) {
            console.error('Failed to submit data.', error);
            alert('Failed to submit data.');
        } finally {
            window.location.reload(); // Reset the page
            setIsLoadingBulkData(false);
        }
    };

    const getExampleData = (): DummyCSVDataType[] => {
        return [{
            zillowURL: '1_example_ZillowUrl.com',
            fullAddress: '1234 example st, my_town, NY, 11021',
            state: 'NY',
            zipcode: '11021',
            city: 'my_town',
            county: 'my_county',
            country: 'US',
            streetAddress: '123 example st',
            apartmentNumber: '123',
            longitude: '0.0001',
            latitude: '0.0001',
            numberOfDaysOnMarket: '3',
            elementarySchoolRating: '4',
            middleSchoolRating: '5',
            highSchoolRating: '3',
            numberOfBedrooms: '4',
            numberOfFullBathrooms: '2',
            numberOfHalfBathrooms: '1',
            squareFeet: '2300',
            acres: '1.2',
            yearBuilt: '1989',
            hasGarage: 'true',
            hasPool: 'false',
            hasBasement: 'false',
            propertyType: 'Single Family',
            propertyStatus: 'Active',
            listingPrice: '890200',
            zestimate: '843000',
            zillowRentEstimate: '3230',
            zestimateRangeLow: '820000',
            zestimateRangeHigh: '900000',
            zillowMonthlyPropertyTaxAmount: '320',
            zillowMonthlyHomeInsuranceAmount: '200',
            zillowMonthlyHOAFeesAmount: '0',
            description: 'My Example Property Data',
        }];
    };

    return (
        <div className="form-container">
            <Typography variant="h4" gutterBottom>
                Property Listing Form
            </Typography>
            <Box component={Paper} padding={2} marginBottom={2} bgcolor="#f0f0f0">
                <Typography variant="h5" gutterBottom>
                    Select Property Upload Type
                </Typography>
                <RadioButtonComponent
                    name="propertyUploadType"
                    value={formType}
                    onChange={handleFormTypeChange}
                    options={[
                        { value: AddPropertyType.SINGLE_PROPERTY_INPUT, label: 'Add Single Property' },
                        { value: AddPropertyType.BULK_UPLOAD, label: 'Upload properties in bulk' }
                    ]}
                    label=""
                />
            </Box>
            {formType === AddPropertyType.SINGLE_PROPERTY_INPUT && (
                <StandardForm
                    formDetails={getFormDetails()}
                    handleSubmit={handleSubmit}
                    setFormData={setFormData}
                    buttonTitle='Submit'
                />
            )}
            {formType === AddPropertyType.BULK_UPLOAD && (
                <div>
                    <hr></hr>
                    {isLoadingBulkData ? (
                        <Typography variant="h5" gutterBottom>Processing Bulk Upload...</Typography>
                    ) : (
                        <>
                            <Typography variant="h5" gutterBottom>Template CSV</Typography>
                            <ReusableTable
                                data={getExampleData()}
                                tableHandler={dummyCSVDataTable}
                                onRowClick={undefined}
                                tableSeperatorDetails={undefined}
                                // exportIntoCSV={{
                                //     buttonTitle: 'Export Template CSV'
                                // }}
                                // isEditable={false}
                                // handleUpdate={undefined}
                                tableActions={undefined} //{true}
                            />
                            <br></br>
                            <hr></hr>
                            <UploadCSVFile onFileUpload={handleCSVUpload} />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default PropertyForm;
