import {
    ValueInput,
    CreateInvestmentScenarioRequest,
    ListingWithScenariosResponseDTO,
    MonthlyInvestmentDetailsResponseDTO
} from '@realestatemanager/shared';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReusableTable, { TableColumn, TableDataItem, TableRow } from '../components/ReusableTable';
import PropertyDetailsModal from './PropertyDetailsModal';
import '../styles/StandardForm.css'; // Make sure to create this CSS file
import { InterestType, PercentageAndAmount, ValueType } from '../constants/Constant';
import { RealEstateCalcApi } from '../api/realestatecalcapi';
import StandardForm, { FormProperty } from '../components/StandardForm';
import { InvestmentBreakdownFormDetails, InvestmentFormData } from '../forms/InvestmentBreakdownFormDetails';
import { PropertiesListTable } from '../tables/PropertiesListTable';
import { InvestmentBreakdownTable } from '../tables/InvestmentBreakdownTable';
import { PropertiesListTableType } from './PropertiesList';

export enum InvestmentBreakdownTableType {
    STANDARD_BREAKDOWN = "STANDARD_BREAKDOWN",
    MORTGAGE_BREAKDOWN = "MORTGAGE_BREAKDOWN",
    EXPENSES_BREAKDOWN = "EXPENSES_BREAKDOWN",
    INVESTMENT_BREAKDOWN = "INVESTMENT_BREAKDOWN",
};

export interface TableConfig<T> {
    columns: TableColumn[];
    data: (ammortizationDetail: T) => TableRow //MonthlyInvestmentDetailsDTO) => TableRow;
}

export interface TablesConfig<T> {
    [type: string]: TableConfig<T>;
}

const InvestmentBreakdown: React.FC = () => {

    const investmentBreakdownFormDetails: InvestmentBreakdownFormDetails = new InvestmentBreakdownFormDetails();
    const propertiesListTable: PropertiesListTable = new PropertiesListTable();
    const investmentBreakdownTable: InvestmentBreakdownTable = new InvestmentBreakdownTable();

    const [property, setProperty] = useState<ListingWithScenariosResponseDTO>(
        useLocation().state.data as ListingWithScenariosResponseDTO
    );

    const [selectedProperty, setSelectedProperty] = useState<ListingWithScenariosResponseDTO | null>(null);

    const [tableType, setTableType] = useState<InvestmentBreakdownTableType>(InvestmentBreakdownTableType.STANDARD_BREAKDOWN);

    const handleTableTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value as keyof typeof InvestmentBreakdownTableType;
        setTableType(InvestmentBreakdownTableType[input]);
    };

    const getTablesConfig = (): TablesConfig<MonthlyInvestmentDetailsResponseDTO> => {
        return investmentBreakdownTable.getTablesConfig();
    };

    const [formData, setFormData] = useState<InvestmentFormData>(investmentBreakdownFormDetails.getDefaultFormData(property));

    useEffect(() => {
        if (property) {
            setProperty(property);
            setFormData(investmentBreakdownFormDetails.getDefaultFormData(property));
        }
    }, [property]);  // Ensure useEffect depends on `property`

    const handleRowClick = (property: ListingWithScenariosResponseDTO) => {
        setSelectedProperty(property);
    };

    const handleCloseModal = () => {
        setSelectedProperty(null);
    };

    const getTableData = (): TableDataItem<ListingWithScenariosResponseDTO> => {
        return propertiesListTable.getTableData([property], PropertiesListTableType.STANDARD_BREAKDOWN)[0];
    };

    const createTableDataForInvestmentMetrics = (): TableDataItem<MonthlyInvestmentDetailsResponseDTO>[] => {
        return investmentBreakdownTable.getTableData([property], tableType);
    };

    const formDetails: FormProperty[] = investmentBreakdownFormDetails.getFormDetails(formData);

    const getCalculateRequest = (): CreateInvestmentScenarioRequest => {

        const convertToValueInput = (type: PercentageAndAmount, value: number): ValueInput | undefined => {
            if (type === PercentageAndAmount.AMOUNT) {
                return {
                    type: ValueType.AMOUNT,
                    amount: value,
                };
            }
            else if (type === PercentageAndAmount.PERCENTAGE) {
                return {
                    type: ValueType.RATE,
                    rate: value,
                };
            }
        };

        const getInterestType = (interestType: string): InterestType | undefined => {
            if (InterestType.FIXED === interestType) {
                return InterestType.FIXED;
            }
            else if (InterestType.VARIABLE === interestType) {
                return InterestType.VARIABLE;
            }
        };

        return {
            useDefaultRequest: false,
            propertyIdentifier: {
                fullAddress: property.listingDetails.propertyDetails.address?.fullAddress ?? '',
                zillowURL: property.listingDetails.zillowURL,
            },
            investmentDetails: {
                mortgageDetails: {
                    annualInterestRate: { type: ValueType.RATE, rate: Number(formData.annualInterestRate) },
                    termInYears: Number(formData.termInYears),
                    interestType: getInterestType(formData.interestType)!,
                    downPayment: convertToValueInput(formData.downPaymentType, Number(formData.downPaymentPercentage))!,
                    pmiRate: { type: ValueType.RATE, rate: Number(formData.pmiRate) },
                    pmiDropoffPoint: Number(formData.pmiDropoffPoint),
                    monthlyPropertyTax: convertToValueInput(formData.monthlyPropertyTaxType, Number(formData.monthlyPropertyTax))!,
                    monthlyHomeInsuranceAmount: convertToValueInput(formData.monthlyHomeInsuranceAmountType, Number(formData.monthlyHomeInsuranceAmount))!,
                    monthlyHOAFeesAmount: convertToValueInput(formData.monthlyHOAFeesAmountType, Number(formData.monthlyHOAFeesAmount))!,
                },
                operatingExpenses: {
                    propertyManagementRate: {
                        rate: Number(formData.propertyManagementRate),
                        type: ValueType.RATE
                    },
                    vacancyRate: {
                        rate: Number(formData.vacancyRate),
                        type: ValueType.RATE,
                    },
                    maintenanceRate: {
                        rate: Number(formData.maintenanceRate),
                        type: ValueType.RATE,
                    },
                    otherExpensesRate: {
                        rate: Number(formData.otherExpensesRate),
                        type: ValueType.RATE,
                    },
                    capExReserveRate: {
                        rate: Number(formData.capExReserveRate),
                        type: ValueType.RATE,
                    },
                    legalAndProfessionalFees: convertToValueInput(formData.legalAndProfessionalFeesType, Number(formData.legalAndProfessionalFees)),
                    initialRepairCosts: convertToValueInput(formData.initialRepairCostsType, Number(formData.initialRepairCosts)),
                    travelingCosts: convertToValueInput(formData.travelingCostsType, Number(formData.travelingCosts)),
                    closingCosts: convertToValueInput(formData.closingCostsType, Number(formData.closingCosts)),
                    otherInitialExpenses: convertToValueInput(formData.otherInitialExpensesType, Number(formData.otherInitialExpenses)),
                },
                rentEstimate: {
                    amount: Number(formData.rentEstimate),
                    type: ValueType.AMOUNT,
                },
                purchasePrice: { type: ValueType.AMOUNT, amount: Number(formData.purchasePrice) },
                growthProjections: {
                    annualRentIncreaseRate: {
                        rate: Number(formData.annualRentIncreaseRate),
                        type: ValueType.RATE,
                    },
                    annualAppreciationRate: {
                        rate: Number(formData.annualAppreciationRate),
                        type: ValueType.RATE,
                    },
                    annualTaxIncreaseRate: {
                        rate: Number(formData.annualTaxIncreaseRate),
                        type: ValueType.RATE,
                    },
                    annualHomeInsuranceIncreaseRate: {
                        rate: Number(formData.annualHomeInsuranceIncreaseRate),
                        type: ValueType.RATE,
                    },
                    annualHOAFeesIncreaseRate: {
                        rate: Number(formData.annualHOAFeesIncreaseRate),
                        type: ValueType.RATE,
                    },
                },
                additionalIncomeStreams: {
                    parkingFees: {
                        amount: Number(formData.parkingFees),
                        type: ValueType.AMOUNT,
                    },
                    laundryServices: {
                        amount: Number(formData.laundryServices),
                        type: ValueType.AMOUNT,
                    },
                    storageUnitFees: {
                        amount: Number(formData.storageUnitFees),
                        type: ValueType.AMOUNT,
                    },
                    other: {
                        amount: Number(formData.other),
                        type: ValueType.AMOUNT,
                    },
                },
                taxImplications: {
                    depreciation: Number(formData.depreciation),
                    mortgageInterest: Number(formData.mortgageInterest),
                    operatingExpenses: Number(formData.operatingExpenses),
                    propertyTaxes: Number(formData.propertyTaxes),
                },
            },
        };
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const realEstateCalcApi: RealEstateCalcApi = new RealEstateCalcApi();
        const data: ListingWithScenariosResponseDTO = await realEstateCalcApi.realEstateCalculator(getCalculateRequest());
        console.log("Calculation result:", data);
        setProperty(data);
    };

    //-----------------------------------------------------------------------------------------------------------

    // Only render the component dependent on properties if properties are loaded
    return (
        <div>
            <h2> Investment Breakdown </h2>
            {formData && <StandardForm //<CalculateForm
                formDetails={formDetails}
                // handleChange={handleChange}
                handleSubmit={handleSubmit}
                setFormData={setFormData}
                buttonTitle='Calculate'
            />
            }
            {property ? (
                <>
                    <ReusableTable
                        columns={propertiesListTable.getDefaultColumns()} //{defaultColumns.slice(0, defaultColumns.length - 1)}
                        tableData={[getTableData()]}
                        onRowClick={handleRowClick}
                    />
                    {selectedProperty && <PropertyDetailsModal
                        property={selectedProperty}
                        rowData={propertiesListTable.getDefaultRowData(selectedProperty)} // createDefaultRowData(selectedProperty)}
                        onClose={handleCloseModal}
                        columns={propertiesListTable.getDefaultColumns()} //{defaultColumns.slice(0, defaultColumns.length - 1)}
                    />}
                    <br />
                    <hr />
                    <br />
                    <div className="radio-button-group">
                        <h2>Select Table Type</h2>
                        <label>
                            <input
                                type="radio"
                                value={InvestmentBreakdownTableType.STANDARD_BREAKDOWN}
                                checked={tableType === InvestmentBreakdownTableType.STANDARD_BREAKDOWN}
                                onChange={handleTableTypeChange}
                            />
                            Standard Breakdown
                        </label>
                        <label>
                            <input
                                type="radio"
                                value={InvestmentBreakdownTableType.MORTGAGE_BREAKDOWN}
                                checked={tableType === InvestmentBreakdownTableType.MORTGAGE_BREAKDOWN}
                                onChange={handleTableTypeChange}
                            />
                            Mortgage Breakdown
                        </label>
                        <label>
                            <input
                                type="radio"
                                value={InvestmentBreakdownTableType.INVESTMENT_BREAKDOWN}
                                checked={tableType === InvestmentBreakdownTableType.INVESTMENT_BREAKDOWN}
                                onChange={handleTableTypeChange}
                            />
                            Investment Breakdown
                        </label>
                        <label>
                            <input
                                type="radio"
                                value={InvestmentBreakdownTableType.EXPENSES_BREAKDOWN}
                                checked={tableType === InvestmentBreakdownTableType.EXPENSES_BREAKDOWN}
                                onChange={handleTableTypeChange}
                            />
                            Expenses Breakdown
                        </label>
                    </div>
                    <ReusableTable
                        columns={getTablesConfig()[tableType].columns} //{columnsForInvestmentMetrics} 
                        tableData={createTableDataForInvestmentMetrics()}
                        includeTableSeparator={true}
                    />
                </>
            ) : (
                <p>Loading property data...</p>
            )}
        </div>
    );

};


export default InvestmentBreakdown;


