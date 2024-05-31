import React, { useState } from 'react';
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
import { InputType } from '../constants/Constant';

export enum PropertiesListTableType {
    ALL = 'ALL',
    STANDARD_BREAKDOWN = "STANDARD_BREAKDOWN",
};

const PropertiesList: React.FC = () => {

    const propertiesListFormDetails: PropertiesListFormDetails = new PropertiesListFormDetails();
    const propertiesListTable: PropertiesListTable = new PropertiesListTable();

    const [properties, setProperties] = useState<ListingWithScenariosResponseDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<ListingWithScenariosResponseDTO | null>(null);
    const [tableType, setTableType] = useState<PropertiesListTableType>(PropertiesListTableType.STANDARD_BREAKDOWN);

    const realEstateCalcApi: RealEstateCalcApi = new RealEstateCalcApi();

    const handleTableTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value as keyof typeof PropertiesListTableType;
        setTableType(PropertiesListTableType[input]);
    };

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

    const getTableData = (): TableDataItem<ListingWithScenariosResponseDTO>[] => {
        return propertiesListTable.getTableData(properties, tableType);
    };

    const getTableColumns = (): TableColumn[] => {
        return propertiesListTable.getTablesConfig(getAdditionalColumns())[tableType].columns;
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
        };
        console.log('---dataToSubmit:', dataToSubmit);

        setIsLoading(true);
        try {
            const properties: ListingWithScenariosResponseDTO[] = await realEstateCalcApi.getAllProperties(dataToSubmit);
            setProperties(properties);

            if (properties.length > 0) {
                alert('Data submitted successfully!');
            } else {
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
        const property: ListingWithScenariosResponseDTO = tableDataItem.objectData.key;
        console.log('tableDataItem:', tableDataItem);

        // Uncomment code below when ready
        // const createUpdatePropertyRequest: CreateUpdatePropertyRequest = propertiesListTable.createUpdatePropertyRequest(tableDataItem);
        // return realEstateCalcApi.updateProperty(createUpdatePropertyRequest);

        return property;

    };

    const getAdditionalColumns = (): TableColumn[] => {
        return [
            {
                header: "Investment Breakdown",
                accessor: "investmentBreakdown",
                isURL: false,
                showColumn: true,
                inputType: InputType.STRING,
                routeTo: 'investmentBreakdown',
                isDollarAmount: false,
                isSortable: false,
            }
        ];
    }

    const getDefaultColumns = (): TableColumn[] => {
        return propertiesListTable.getDefaultColumns(getAdditionalColumns());
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
                        columns={getTableColumns()}
                        tableData={getTableData()}
                        onRowClick={handleRowClick}
                        includeTableSeparator={false}
                        canExportIntoCSV={true}
                        isEditable={true}
                        handleUpdate={handleUpdate}
                    />
                    {selectedProperty && <PropertyDetailsModal
                        property={selectedProperty}
                        rowData={propertiesListTable.getDefaultRowData(selectedProperty)}
                        onClose={handleCloseModal}
                        columns={getDefaultColumns()}
                    />}
                </>
            )}
        </div>
    );
};

export default PropertiesList;
