import React, { useState, useEffect } from 'react';
import PropertyDetailsModal from '../components/PropertyDetailsModal';
import '../styles/PropertiesList.css';
import '../styles/StandardForm.css';
import ReusableTable, { TableColumn, TableDataItem } from '../components/ReusableTable';
import { RealEstateCalcApi } from '../api/realestatecalcapi';
import {
    CreateFilteredPropertyListRequest,
    CreateGetAllPropertiesRequest,
    ListingWithScenariosResponseDTO
} from '@realestatemanager/shared';
import StandardForm, { FormProperty } from '../components/StandardForm';
import {
    PropertiesListFormDetails,
    PropertyFilterFormFields
} from '../forms/PropertiesListFormDetails';
import { PropertiesListTable } from '../tables/PropertiesListTable';

export enum PropertiesListTableType {
    ALL = 'ALL',
    STANDARD_BREAKDOWN = "STANDARD_BREAKDOWN",
};

const PropertiesList: React.FC = () => {

    const propertiesListFormDetails: PropertiesListFormDetails = new PropertiesListFormDetails();
    const propertiesListTable: PropertiesListTable = new PropertiesListTable();

    const [properties, setProperties] = useState<ListingWithScenariosResponseDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProperty, setSelectedProperty] = useState<ListingWithScenariosResponseDTO | null>(null);
    const [tableType, setTableType] = useState<PropertiesListTableType>(PropertiesListTableType.STANDARD_BREAKDOWN);

    const realEstateCalcApi: RealEstateCalcApi = new RealEstateCalcApi();

    const handleTableTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value as keyof typeof PropertiesListTableType;
        setTableType(PropertiesListTableType[input]);
    };

    console.log('PropertiesList mounted');
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true); // Set loading state to true before fetching data
                const propertiesData: ListingWithScenariosResponseDTO[] = await realEstateCalcApi.getAllProperties();
                setProperties(propertiesData); // Update state with fetched data
                setFormData(propertiesListFormDetails.getDefaultFormData());
                console.log("Fetched data:", propertiesData);
            } catch (error) {
                // Error handling if fetchProperties fails
                console.error('Failed to fetch properties:', error);
            } finally {
                setIsLoading(false); // Ensure loading state is updated regardless of success or failure
            }
        })();
    }, []); // Empty dependency array means this effect runs once on mount

    const [formData, setFormData] = useState<PropertyFilterFormFields>(propertiesListFormDetails.getDefaultFormData());

    const getFormDetails = (): FormProperty[] => {
        return propertiesListFormDetails.getFormDetails(formData);
    };

    const handleRowClick = (property: ListingWithScenariosResponseDTO) => {
        setSelectedProperty(property);
    };

    const handleCloseModal = () => {
        setSelectedProperty(null);
    };

    const getTableData = (): TableDataItem<ListingWithScenariosResponseDTO>[] => {
        return propertiesListTable.getTableData(properties, tableType);
    };

    const getTableColumns = (): TableColumn[] => {
        return propertiesListTable.getTablesConfig()[tableType].columns;
    };

    const getRequestData = (): CreateFilteredPropertyListRequest => {
        return propertiesListFormDetails.createRequest(formData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const filteredPropertyListRequest: CreateFilteredPropertyListRequest = getRequestData();
        const dataToSubmit: CreateGetAllPropertiesRequest = {
            filteredPropertyListRequest: filteredPropertyListRequest,
        };

        const realEstateCalcApi: RealEstateCalcApi = new RealEstateCalcApi();
        const postSuccess = await realEstateCalcApi.getAllProperties(dataToSubmit);
        if (postSuccess) {
            alert('Data submitted successfully!');
            window.location.reload();
        }
        else {
            alert('Failed to submit data.');
        }
    };

    const getDefaultColumns = (): TableColumn[] => {
        const investmentBreakdownColumn: TableColumn = {
            header: "Investment Breakdown",
            accessor: "investmentBreakdown",
            isURL: false,
            showColumn: true,
            routeTo: 'investmentBreakdown',
            isDollarAmount: false,
            isSortable: false,
        };
        return propertiesListTable.getDefaultColumns([investmentBreakdownColumn]);
    };


    // Inside PropertiesList component

    // Assuming your ReusableTable component and TableColumn interface are set up to handle this
    return (
        <div>
            <h2> Filter Properties </h2>
            {formData && <StandardForm
                formDetails={getFormDetails()}
                handleSubmit={handleSubmit}
                setFormData={setFormData}
                buttonTitle='Submit'
            />
            }
            <h2> Properties List </h2>
            {isLoading ? (
                <p>Loading properties...</p>
            ) : (
                <>
                    <div className="radio-button-group">
                        <h2>Select Table Type</h2>
                        <label>
                            <input
                                type="radio"
                                value={PropertiesListTableType.STANDARD_BREAKDOWN}
                                checked={tableType === PropertiesListTableType.STANDARD_BREAKDOWN}
                                onChange={handleTableTypeChange}
                            />
                            Standard Breakdown
                        </label>
                        <label>
                            <input
                                type="radio"
                                value={PropertiesListTableType.ALL}
                                checked={tableType === PropertiesListTableType.ALL}
                                onChange={handleTableTypeChange}
                            />
                            All
                        </label>
                    </div>
                    <ReusableTable
                        columns={getTableColumns()} //{defaultColumns} // Filter columns based on showColumn
                        tableData={getTableData()}
                        onRowClick={handleRowClick}
                    />
                    {selectedProperty && <PropertyDetailsModal
                        property={selectedProperty}
                        rowData={propertiesListTable.getDefaultRowData(selectedProperty)} // createDefaultRowData(selectedProperty)}
                        onClose={handleCloseModal}
                        columns={getDefaultColumns()}
                    />}
                </>
            )}
        </div>
    );
};


export default PropertiesList;
