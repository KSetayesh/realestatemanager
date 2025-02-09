import React, { useState, useEffect } from 'react';
// import DetailsModal from '../components/DetailsModal';
// import ReusableTable, { TableDataItem } from '../components/ReusableTable';
// import ReusableTable from '../components/ReusableTable';
import { RealEstateCalcApi } from '../api/realestatecalcapi';
import {
    CreateFilteredPropertyListRequest,
    CreateGetAllPropertiesRequest,
    // CreateUpdatePropertyRequest,
    ListingWithScenariosResponseDTO,
    PropertyFilterFormFields,
} from '@realestatemanager/types';
import StandardForm, { FormProperty } from '../components/StandardForm';
import {
    PropertiesListFormDetails,
} from '../forms/PropertiesListFormDetails';
// import { PropertiesListWithInvestmentBreakdownTable } from '../tables/PropertiesListWithInvestmentBreakdownTable';

export enum PropertiesListTableType {
    ALL = 'ALL',
    STANDARD_BREAKDOWN = "STANDARD_BREAKDOWN",
};

const DEFAULT_NUMBER_OF_ROWS = 100;

const PropertiesList: React.FC = () => {

    const propertiesListFormDetails: PropertiesListFormDetails = new PropertiesListFormDetails();
    // const propertiesListWithInvestmentBreakdownTable: PropertiesListWithInvestmentBreakdownTable =
    //     new PropertiesListWithInvestmentBreakdownTable();

    const [properties, setProperties] = useState<ListingWithScenariosResponseDTO[]>([]);
    console.log('properties:', properties);
    const [isLoading, setIsLoading] = useState(false);
    // const [selectedProperty, setSelectedProperty] = useState<ListingWithScenariosResponseDTO | null>(null);
    // const [filteredRequest, setFilteredRequest] = useState<CreateGetAllPropertiesRequest>();

    const realEstateCalcApi: RealEstateCalcApi = new RealEstateCalcApi();

    useEffect(() => {
        fetchPropertiesFromServer(DEFAULT_NUMBER_OF_ROWS, 0);
    }, []);

    const getDefaultFormData = (): PropertyFilterFormFields => {
        return propertiesListFormDetails.getDefaultFormData();
    };

    const [formData, setFormData] = useState<PropertyFilterFormFields>(getDefaultFormData());

    const getFormDetails = (): FormProperty[] => {
        return propertiesListFormDetails.getFormDetails(formData);
    };

    // const handleRowClick = (property: ListingWithScenariosResponseDTO) => {
    //     setSelectedProperty(property);
    // };

    // const handleCloseModal = () => {
    //     setSelectedProperty(null);
    // };

    const getRequestData = (): CreateFilteredPropertyListRequest => {
        return propertiesListFormDetails.createRequest(formData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchPropertiesFromServer(DEFAULT_NUMBER_OF_ROWS, 0);
    };

    // const handleUpdate = async (tableDataItem: TableDataItem<ListingWithScenariosResponseDTO>): Promise<ListingWithScenariosResponseDTO> => {
    //     const createUpdatePropertyRequest: CreateUpdatePropertyRequest =
    //         propertiesListWithInvestmentBreakdownTable.createUpdatePropertyRequest(tableDataItem);
    //     return realEstateCalcApi.updateProperty(createUpdatePropertyRequest);
    // };

    // const handleDeleteUpdate = async (tableDataItem: TableDataItem<ListingWithScenariosResponseDTO>): Promise<boolean> => {
    //     console.log('I have been deleted', tableDataItem.objectData.key.listingDetails.zillowURL);
    //     return realEstateCalcApi.deleteListingDetails(tableDataItem.objectData.key.listingDetails.zillowURL);
    // };

    // const handlePaginationChange = async (
    //     e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    //     newPage: number,
    //     newRowsPerPage: number,
    // ) => {
    //     e?.preventDefault();
    //     await fetchPropertiesFromServer(newRowsPerPage, newPage);
    //     console.log('In handlePaginationChange()');
    //     console.log(`On page ${newPage}, with ${newRowsPerPage} rows per page`);
    // };

    // const getExpectedNumberOfRows = (): number => {
    //     const rowLimit = filteredRequest?.filteredPropertyListRequest?.limit;
    //     return rowLimit ? rowLimit : DEFAULT_NUMBER_OF_ROWS;
    // }

    const fetchPropertiesFromServer = async (limit: number, offset: number) => {
        const filteredPropertyListRequest: CreateFilteredPropertyListRequest = getRequestData();
        console.log('---filteredPropertyListRequest:', filteredPropertyListRequest);
        const dataToSubmit: CreateGetAllPropertiesRequest = {
            filteredPropertyListRequest: filteredPropertyListRequest,
            paginationDetails: {
                limit: limit,
                offset: offset,
            },
        };
        console.log('---dataToSubmit:', dataToSubmit);

        setIsLoading(true);
        try {
            const properties: ListingWithScenariosResponseDTO[] = await realEstateCalcApi.getAllProperties(dataToSubmit);
            setProperties(properties);
            // setFilteredRequest(dataToSubmit);

            if (properties.length === 0) {
                alert('No properties found with the applied filters.');
            }
        } catch (error) {
            console.error('Failed to submit data.', error);
            alert('Failed to submit data.');
        } finally {
            setFormData(getDefaultFormData());
            setIsLoading(false);
        }
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
            ) : (<p><h3>Hello...</h3></p>)  } </div>
            // ) : (
            //     <>
            //         <ReusableTable
            //             data={properties}
            //             tableHandler={propertiesListWithInvestmentBreakdownTable}
            //             onRowClick={handleRowClick}
            //             tableSeperatorDetails={undefined}
            //             // exportIntoCSV={{
            //             //     buttonTitle: 'Export CSV'
            //             // }}
            //             tableActions={{
            //                 handleEditUpdate: handleUpdate,
            //                 handleDeleteUpdate: handleDeleteUpdate,
            //                 onPaginationChange: handlePaginationChange
            //             }}
            //         // rowLimit={getExpectedNumberOfRows()}
            //         />
            //         {/* {selectedProperty && <DetailsModal
            //             data={selectedProperty}
            //             tableHandler={propertiesListWithInvestmentBreakdownTable}
            //             onClose={handleCloseModal}
            //         />} */}
            //     </>
            // )}
        // </div>
    );
};

export default PropertiesList;
