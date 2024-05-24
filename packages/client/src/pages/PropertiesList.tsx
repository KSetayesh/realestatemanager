import React, { useState, useEffect } from 'react';
import PropertyDetailsModal from './PropertyDetailsModal';
import '../styles/PropertiesList.css';
import '../styles/StandardForm.css';
import ReusableTable, { TableColumn, TableDataItem } from '../components/ReusableTable';
import { createDefaultRowData, defaultColumns } from '../components/TableColumn';
import { RealEstateCalcApi } from '../api/realestatecalcapi';
import { TablesConfig } from './InvestmentBreakdown';
import { ListingWithScenariosResponseDTO } from '@realestatemanager/shared';
import StandardForm, { FormProperty } from '../components/StandardForm';
import {
    PropertyFilterFormFields,
    getDefaultFilterPropertiesFormData,
    getPropertiesListFormDetails
} from '../forms/PropertiesListFormDetails';

enum TableTypeEnum {
    ALL = 'ALL',
    STANDARD_BREAKDOWN = "STANDARD_BREAKDOWN",
};

const PropertiesList: React.FC = () => {
    const [properties, setProperties] = useState<ListingWithScenariosResponseDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProperty, setSelectedProperty] = useState<ListingWithScenariosResponseDTO | null>(null);
    const [tableType, setTableType] = useState<TableTypeEnum>(TableTypeEnum.STANDARD_BREAKDOWN);

    const realEstateCalcApi: RealEstateCalcApi = new RealEstateCalcApi();

    const handleTableTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value as keyof typeof TableTypeEnum;
        setTableType(TableTypeEnum[input]);
    };

    console.log('PropertiesList mounted');
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true); // Set loading state to true before fetching data
                const propertiesData: ListingWithScenariosResponseDTO[] = await realEstateCalcApi.getAllProperties();
                setProperties(propertiesData); // Update state with fetched data
                setFormData(getDefaultFilterPropertiesFormData());
                console.log("Fetched data:", propertiesData);
            } catch (error) {
                // Error handling if fetchProperties fails
                console.error('Failed to fetch properties:', error);
            } finally {
                setIsLoading(false); // Ensure loading state is updated regardless of success or failure
            }
        })();
    }, []); // Empty dependency array means this effect runs once on mount

    const [formData, setFormData] = useState<PropertyFilterFormFields>(getDefaultFilterPropertiesFormData());

    const formDetails: FormProperty[] = getPropertiesListFormDetails(formData);

    const getAllColumns = (): TableColumn[] => {
        return defaultColumns.map(column => ({
            ...column,
            showColumn: true  // Set showColumn to true for each object
        }));
    }

    const tablesConfig: TablesConfig<ListingWithScenariosResponseDTO> = {
        [TableTypeEnum.STANDARD_BREAKDOWN]: {
            columns: defaultColumns,
            data: createDefaultRowData,
        },
        [TableTypeEnum.ALL]: {
            columns: getAllColumns(),
            data: createDefaultRowData,
        },
    };

    const handleRowClick = (property: ListingWithScenariosResponseDTO) => {
        setSelectedProperty(property);
    };

    const handleCloseModal = () => {
        setSelectedProperty(null);
    };

    const tableData: TableDataItem<ListingWithScenariosResponseDTO>[] = properties.map(property => ({
        objectData: {
            key: property,
        },
        rowData: tablesConfig[tableType].data(property),
    }
    ));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const realEstateCalcApi: RealEstateCalcApi = new RealEstateCalcApi();
        // const data: ListingWithScenariosResponseDTO = await realEstateCalcApi.realEstateCalculator(getCalculateRequest());
        // console.log("Calculation result:", data);
        // setProperty(data);
    };

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
                                value={TableTypeEnum.STANDARD_BREAKDOWN}
                                checked={tableType === TableTypeEnum.STANDARD_BREAKDOWN}
                                onChange={handleTableTypeChange}
                            />
                            Standard Breakdown
                        </label>
                        <label>
                            <input
                                type="radio"
                                value={TableTypeEnum.ALL}
                                checked={tableType === TableTypeEnum.ALL}
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
                        columns={defaultColumns}
                    />}
                </>
            )}
        </div>
    );
};


export default PropertiesList;
