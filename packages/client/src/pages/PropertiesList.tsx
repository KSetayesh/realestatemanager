import React, { useState, useEffect } from 'react';
import { ListingWithScenariosDTO } from '@realestatemanager/shared';
import PropertyDetailsModal from './PropertyDetailsModal';
import '../styles/PropertiesList.css';
import ReusableTable, { TableColumn, TableDataItem } from '../components/ReusableTable';
import { createDefaultRowData, defaultColumns } from '../components/TableColumn';
import { RealEstateCalcApi } from '../api/realestatecalcapi';
import { TablesConfig } from './InvestmentBreakdown';

enum TableTypeEnum {
    ALL = 'ALL',
    STANDARD_BREAKDOWN = "STANDARD_BREAKDOWN",
};

const PropertiesList: React.FC = () => {
    const [properties, setProperties] = useState<ListingWithScenariosDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProperty, setSelectedProperty] = useState<ListingWithScenariosDTO | null>(null);
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
                const propertiesData: ListingWithScenariosDTO[] = await realEstateCalcApi.getAllProperties();
                setProperties(propertiesData); // Update state with fetched data
                console.log("Fetched data:", propertiesData);
            } catch (error) {
                // Error handling if fetchProperties fails
                console.error('Failed to fetch properties:', error);
            } finally {
                setIsLoading(false); // Ensure loading state is updated regardless of success or failure
            }
        })();
    }, []); // Empty dependency array means this effect runs once on mount

    const getAllColumns = (): TableColumn[] => {
        return defaultColumns.map(column => ({
            ...column,
            showColumn: true  // Set showColumn to true for each object
        }));
    }

    const tablesConfig: TablesConfig<ListingWithScenariosDTO> = {
        [TableTypeEnum.STANDARD_BREAKDOWN]: {
            columns: defaultColumns,
            data: createDefaultRowData,
        },
        [TableTypeEnum.ALL]: {
            columns: getAllColumns(),
            data: createDefaultRowData,
        },
    };

    const handleRowClick = (property: ListingWithScenariosDTO) => {
        setSelectedProperty(property);
    };

    const handleCloseModal = () => {
        setSelectedProperty(null);
    };

    const tableData: TableDataItem<ListingWithScenariosDTO>[] = properties.map(property => ({
        objectData: {
            key: property,
        },
        rowData: tablesConfig[tableType].data(property),
    }
    ));

    // Inside PropertiesList component

    // Assuming your ReusableTable component and TableColumn interface are set up to handle this
    return (
        <div>
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
