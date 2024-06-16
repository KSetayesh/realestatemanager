import React, { useState } from 'react';
import DetailsModal from '../components/DetailsModal';
import ReusableTable, { TableDataItem } from '../components/ReusableTable';
import { RealEstateCalcApi } from '../api/realestatecalcapi';
import {
    CreateFilteredPropertyListRequest,
    CreateGetAllPropertiesRequest,
    CreateUpdatePropertyRequest,
    ListingWithScenariosResponseDTO,
    PropertyFilterFormFields
} from '@realestatemanager/types';
import StandardForm, { FormProperty } from '../components/StandardForm';
import {
    PropertiesListFormDetails,
} from '../forms/PropertiesListFormDetails';
import { PropertiesListWithInvestmentBreakdownTable } from '../tables/PropertiesListWithInvestmentBreakdownTable';

export enum PropertiesListTableType {
    ALL = 'ALL',
    STANDARD_BREAKDOWN = "STANDARD_BREAKDOWN",
};

const PropertiesList: React.FC = () => {

    const propertiesListFormDetails: PropertiesListFormDetails = new PropertiesListFormDetails();
    const propertiesListWithInvestmentBreakdownTable: PropertiesListWithInvestmentBreakdownTable =
        new PropertiesListWithInvestmentBreakdownTable();

    const [properties, setProperties] = useState<ListingWithScenariosResponseDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<ListingWithScenariosResponseDTO | null>(null);

    const realEstateCalcApi: RealEstateCalcApi = new RealEstateCalcApi();

    const getDefaultFormData = (): PropertyFilterFormFields => {
        return propertiesListFormDetails.getDefaultFormData();
    };

    const [formData, setFormData] = useState<PropertyFilterFormFields>(getDefaultFormData());

    const getFormDetails = (): FormProperty[] => {
        return propertiesListFormDetails.getFormDetails(formData);
    };

    const handleRowClick = (property: ListingWithScenariosResponseDTO) => {
        setSelectedProperty(property);
    };

    const handleCloseModal = () => {
        setSelectedProperty(null);
    };

    const getRequestData = (): CreateFilteredPropertyListRequest => {
        return propertiesListFormDetails.createRequest(formData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const filteredPropertyListRequest: CreateFilteredPropertyListRequest = getRequestData();
        console.log('---filteredPropertyListRequest:', filteredPropertyListRequest);
        const dataToSubmit: CreateGetAllPropertiesRequest = {
            filteredPropertyListRequest: filteredPropertyListRequest,
            paginationDetails: {
                limit: 100,
                offset: 0,
            },
        };
        console.log('---dataToSubmit:', dataToSubmit);

        setIsLoading(true);
        try {
            const properties: ListingWithScenariosResponseDTO[] = await realEstateCalcApi.getAllProperties(dataToSubmit);
            setProperties(properties);

            if (properties.length === 0) {
                alert('No properties found with the applied filters.');
            }
            // window.location.reload();
        } catch (error) {
            console.error('Failed to submit data.', error);
            alert('Failed to submit data.');
        } finally {
            setFormData(getDefaultFormData());
            setIsLoading(false);
        }
    };

    const handleUpdate = async (tableDataItem: TableDataItem<ListingWithScenariosResponseDTO>): Promise<ListingWithScenariosResponseDTO> => {
        const createUpdatePropertyRequest: CreateUpdatePropertyRequest =
            propertiesListWithInvestmentBreakdownTable.createUpdatePropertyRequest(tableDataItem);
        return realEstateCalcApi.updateProperty(createUpdatePropertyRequest);
    };

    const handleDeleteUpdate = async (tableDataItem: TableDataItem<ListingWithScenariosResponseDTO>): Promise<boolean> => {
        console.log('I have been deleted', tableDataItem.objectData.key.listingDetails.zillowURL);
        return realEstateCalcApi.deleteListingDetails(tableDataItem.objectData.key.listingDetails.zillowURL);
    };

    const handlePaginationChange = (newPage: number, newRowsPerPage: number) => {
        console.log('In handlePaginationChange()');
        console.log(`On page ${newPage}, with ${newRowsPerPage} rows per page`);
        // setPage(newPage);
        // setRowsPerPage(newRowsPerPage);
    };

    return (
        <div>
            <h2> Filter Properties </h2>
            {formData && <StandardForm
                formDetails={getFormDetails()}
                handleSubmit={handleSubmit}
                setFormData={setFormData}
                buttonTitle='Submit'
            />}
            <h2> Properties List </h2>
            {isLoading ? (
                <p><h3>Loading properties...</h3></p>
            ) : (
                <>
                    <ReusableTable
                        data={properties}
                        tableHandler={propertiesListWithInvestmentBreakdownTable}
                        onRowClick={handleRowClick}
                        tableSeperatorDetails={undefined}
                        exportIntoCSV={{
                            buttonTitle: 'Export CSV'
                        }}
                        tableActions={{
                            handleEditUpdate: handleUpdate,
                            handleDeleteUpdate: handleDeleteUpdate,
                        }}
                        onPaginationChange={handlePaginationChange}
                    />
                    {selectedProperty && <DetailsModal
                        data={selectedProperty}
                        tableHandler={propertiesListWithInvestmentBreakdownTable}
                        onClose={handleCloseModal}
                    />}
                </>
            )}
        </div>
    );
};

export default PropertiesList;
