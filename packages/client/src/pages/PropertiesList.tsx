import React, { useState, useEffect } from 'react';
import { ListingWithScenariosDTO } from '@realestatemanager/shared';
import PropertyDetailsModal from './PropertyDetailsModal';
import '../styles/PropertiesList.css';
import ReusableTable, { TableDataItem } from '../components/ReusableTable';
import { createDefaultRowData, defaultColumns } from '../components/TableColumn';
import { RealEstateCalcApi } from '../api/realestatecalcapi';

const PropertiesList: React.FC = () => {
    const [properties, setProperties] = useState<ListingWithScenariosDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProperty, setSelectedProperty] = useState<ListingWithScenariosDTO | null>(null);
    const realEstateCalcApi: RealEstateCalcApi = new RealEstateCalcApi();

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
                        columns={defaultColumns} // Filter columns based on showColumn
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
