import React, { useState, useEffect } from 'react';
import PropertyDetailsModal from './PropertyDetailsModal';
import '../styles/PropertiesList.css';
import '../styles/StandardForm.css';
import ReusableTable, { TableColumn, TableDataItem } from '../components/ReusableTable';
import { createDefaultRowData, defaultColumns } from '../components/TableColumn';
import { RealEstateCalcApi } from '../api/realestatecalcapi';
import { TablesConfig } from './InvestmentBreakdown';
import { ListingWithScenariosResponseDTO } from '@realestatemanager/shared';
import { InputType, PropertyType, State } from '../constants/Constant';
import StandardForm, { FormProperty } from '../components/StandardForm';

enum TableTypeEnum {
    ALL = 'ALL',
    STANDARD_BREAKDOWN = "STANDARD_BREAKDOWN",
};

export type PropertyFilterData = {
    state: State,
    zipCode: string,
    city: string,
    rentEstimate: number,
    listedPrice: number,
    numberOfBedrooms: number,
    numberOfBathrooms: number,
    squareFeet: number,
    yearBuilt: number,
    maxHoa: number,
    monthlyPropertyTaxAmount: number,
    homeType: PropertyType,
    hasGarage: boolean,
    hasBasement: boolean,
    hasPool: boolean,
    isActive: boolean,
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

    // Create a state to store the form data.
    const getDefaultFilterPropertiesFormData = (): PropertyFilterData => {
        return {
            state: State.AL,
            zipCode: '',
            city: '',
            rentEstimate: 0,
            listedPrice: 0,
            numberOfBedrooms: 0,
            numberOfBathrooms: 0,
            squareFeet: 0,
            yearBuilt: 0,
            maxHoa: 0,
            monthlyPropertyTaxAmount: 0,
            homeType: PropertyType.APARTMENT,
            hasGarage: true,
            hasBasement: true,
            hasPool: true,
            isActive: true,
        };
    };

    const [formData, setFormData] = useState<PropertyFilterData>(getDefaultFilterPropertiesFormData());

    const formDetails: FormProperty[] = [
        {
            title: 'State',
            name: 'state',
            value: formData?.state,
            type: InputType.SELECT,
            options: Object.values(State).map((enumValue => {
                return {
                    value: enumValue,
                    label: enumValue,
                };
            })),
        },
        {
            title: 'ZipCode',
            name: 'zipCode',
            value: formData?.zipCode,
            type: InputType.STRING,
        },
        {
            title: 'City',
            name: 'city',
            value: formData?.city,
            type: InputType.STRING,
        },
        {
            title: 'Rent Estimate',
            name: 'rentEstimate',
            value: formData?.rentEstimate,
            type: InputType.NUMBER,
            hasFilterOption: true,
        },
        {
            title: 'Listed Price',
            name: 'listedPrice',
            value: formData?.listedPrice,
            type: InputType.NUMBER,
            hasFilterOption: true,
        },
        {
            title: 'Number Of Bedrooms',
            name: 'numberOfBedrooms',
            value: formData?.numberOfBedrooms,
            type: InputType.NUMBER,
            hasFilterOption: true,
        },
        {
            title: 'Number Of Bathrooms',
            name: 'numberOfBathrooms',
            value: formData?.numberOfBathrooms,
            type: InputType.NUMBER,
            hasFilterOption: true,
        },
        {
            title: 'Square Feet',
            name: 'squareFeet',
            value: formData?.squareFeet,
            type: InputType.NUMBER,
            hasFilterOption: true,
        },
        {
            title: 'Year Built',
            name: 'yearBuilt',
            value: formData?.yearBuilt,
            type: InputType.NUMBER,
            hasFilterOption: true,
        },
        {
            title: 'Max Hoa',
            name: 'maxHoa',
            value: formData?.maxHoa,
            type: InputType.NUMBER,
            hasFilterOption: true,
        },
        {
            title: 'Monthly Property Tax Amount',
            name: 'monthlyPropertyTaxAmount',
            value: formData?.monthlyPropertyTaxAmount,
            type: InputType.NUMBER,
            hasFilterOption: true,
        },
        {
            title: 'Home Type',
            name: 'homeType',
            value: formData?.homeType,
            type: InputType.SELECT,
            options: Object.values(PropertyType).map((enumValue => {
                return {
                    value: enumValue,
                    label: enumValue,
                };
            })),
        },
        {
            title: 'Has Garage',
            name: 'hasGarage',
            value: formData?.hasGarage ? "true" : "false",
            type: InputType.CHECKBOX,
            options: [
                {
                    value: 'true',
                    label: 'true'
                },
                {
                    value: 'false',
                    label: 'false'
                }
            ],
        },
        {
            title: 'Has Basement',
            name: 'hasBasement',
            value: formData?.hasBasement ? "true" : "false",
            type: InputType.CHECKBOX,
            options: [
                {
                    value: 'true',
                    label: 'true'
                },
                {
                    value: 'false',
                    label: 'false'
                }
            ],
        },
        {
            title: 'Has Pool',
            name: 'hasPool',
            value: formData?.hasPool ? "true" : "false",
            type: InputType.CHECKBOX,
            options: [
                {
                    value: 'true',
                    label: 'true'
                },
                {
                    value: 'false',
                    label: 'false'
                }
            ],
        },
        {
            title: 'Is Active',
            name: 'isActive',
            value: formData?.isActive ? "true" : "false",
            type: InputType.CHECKBOX,
            options: [
                {
                    value: 'true',
                    label: 'true'
                },
                {
                    value: 'false',
                    label: 'false'
                }
            ],
        },
    ];

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
