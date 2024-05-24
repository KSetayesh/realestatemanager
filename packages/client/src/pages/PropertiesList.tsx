import React, { useState, useEffect } from 'react';
import PropertyDetailsModal from './PropertyDetailsModal';
import '../styles/PropertiesList.css';
import '../styles/StandardForm.css';
import ReusableTable, { TableColumn, TableDataItem } from '../components/ReusableTable';
import { createDefaultRowData } from '../components/TableColumn';
import { RealEstateCalcApi } from '../api/realestatecalcapi';
import { TablesConfig } from './InvestmentBreakdown';
import { ListingWithScenariosResponseDTO } from '@realestatemanager/shared';
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

    const formDetails: FormProperty[] = propertiesListFormDetails.getFormDetails(formData);

    const tablesConfig: TablesConfig<ListingWithScenariosResponseDTO> = propertiesListTable.getTablesConfig();

    const handleRowClick = (property: ListingWithScenariosResponseDTO) => {
        setSelectedProperty(property);
    };

    const handleCloseModal = () => {
        setSelectedProperty(null);
    };

    const tableData: TableDataItem<ListingWithScenariosResponseDTO>[] = propertiesListTable.getTableData(properties, tableType);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const realEstateCalcApi: RealEstateCalcApi = new RealEstateCalcApi();
        // const data: ListingWithScenariosResponseDTO = await realEstateCalcApi.realEstateCalculator(getCalculateRequest());
        // console.log("Calculation result:", data);
        // setProperty(data);
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
    }

    // Inside PropertiesList component

    // Assuming your ReusableTable component and TableColumn interface are set up to handle this
    return (
        <div>
            <h2> Filter Properties </h2>
            {formData && <StandardForm
                formDetails={formDetails}
                // handleChange={handleChange}
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
                        columns={tablesConfig[tableType].columns} //{defaultColumns} // Filter columns based on showColumn
                        tableData={tableData}
                        onRowClick={handleRowClick}
                    />
                    {selectedProperty && <PropertyDetailsModal
                        property={selectedProperty}
                        rowData={createDefaultRowData(selectedProperty)}
                        onClose={handleCloseModal}
                        columns={getDefaultColumns()}
                    />}
                </>
            )}
        </div>
    );
};


export default PropertiesList;
