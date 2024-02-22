import React, { useState, useEffect } from 'react';
import { ListingWithScenariosDTO } from '@realestatemanager/shared';
import PropertyDetailsModal from './PropertyDetailsModal';
import '../styles/PropertiesList.css';
import ReusableTable, { TableColumn, TableDataItem } from '../components/ReusableTable';
import { createDefaultRowData, defaultColumns } from '../components/TableColumn';

const PropertiesList: React.FC = () => {
    const [properties, setProperties] = useState<ListingWithScenariosDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProperty, setSelectedProperty] = useState<ListingWithScenariosDTO | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/calc')
            .then(response => response.json())
            .then((data: ListingWithScenariosDTO[]) => {
                setProperties(data);
                console.log("data:", data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching properties:', error);
                setIsLoading(false);
            });
    }, []);

    const handleRowClick = (property: ListingWithScenariosDTO) => {
        setSelectedProperty(property);
    };

    const handleCloseModal = () => {
        setSelectedProperty(null);
    };

    // const booleanToYesNo = (value: boolean | undefined) => value ? 'Yes' : 'No';

    // // Function to render the cell data based on its type
    // const renderCellData = (cellData: any): string => {
    //     if (typeof cellData === 'boolean') {
    //         return booleanToYesNo(cellData);
    //     } else if (typeof cellData === 'string' || typeof cellData === 'number') {
    //         return cellData.toString();
    //     } else if (Array.isArray(cellData)) {
    //         return cellData.join(', '); // Example: array to comma-separated string
    //     } else if (typeof cellData === 'object' && cellData !== null) {
    //         return JSON.stringify(cellData); // Or extract specific properties to render
    //     }
    //     return ''; // Fallback for undefined or null
    // };

    // const createRowData = createDefaultRowData;

    // investmentBreakdown: property.listingDetails.propertyDetails.address!.fullAddress,

    const columns: TableColumn[] = defaultColumns;
    columns.push({ header: "Investment Breakdown", accessor: "investmentBreakdown", isURL: false, showColumn: true, routeTo: 'investmentBreakdown', isDollarAmount: false },);

    // const tableData: { [key: string]: string }[] = properties.map(property => ({
    const tableData: TableDataItem<ListingWithScenariosDTO>[] = properties.map(property => ({
        objectData: {
            key: property,
        },
        rowData: createDefaultRowData(property),
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
                    <ReusableTable
                        columns={columns} // Filter columns based on showColumn
                        tableData={tableData}
                        onRowClick={handleRowClick}
                    />
                    {selectedProperty && <PropertyDetailsModal
                        property={selectedProperty}
                        rowData={createDefaultRowData(selectedProperty)}
                        onClose={handleCloseModal}
                        columns={columns}
                    />}
                </>
            )}
        </div>
    );
};


export default PropertiesList;
