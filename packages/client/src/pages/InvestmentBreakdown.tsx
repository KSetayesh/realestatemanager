import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReusableTable from '../components/ReusableTable';
import PropertyDetailsModal from '../components/PropertyDetailsModal';
import { RealEstateCalcApi } from '../api/realestatecalcapi';
import StandardForm, { FormProperty } from '../components/StandardForm';
import { InvestmentBreakdownFormDetails, InvestmentFormData } from '../forms/InvestmentBreakdownFormDetails';
import { PropertiesListTable } from '../tables/PropertiesListTable';
import { InvestmentBreakdownTable } from '../tables/InvestmentBreakdownTable';
import { PropertiesListTableType } from './PropertiesList';
import {
    CreateInvestmentScenarioRequest,
    ListingWithScenariosResponseDTO,
    MonthlyInvestmentDetailsResponseDTO
} from '@realestatemanager/shared';

export enum InvestmentBreakdownTableType {
    STANDARD_BREAKDOWN = "STANDARD_BREAKDOWN",
    MORTGAGE_BREAKDOWN = "MORTGAGE_BREAKDOWN",
    EXPENSES_BREAKDOWN = "EXPENSES_BREAKDOWN",
    INVESTMENT_BREAKDOWN = "INVESTMENT_BREAKDOWN",
};

const InvestmentBreakdown: React.FC = () => {

    const investmentBreakdownFormDetails: InvestmentBreakdownFormDetails = new InvestmentBreakdownFormDetails();
    const propertiesListTable: PropertiesListTable = new PropertiesListTable();
    const investmentBreakdownTable: InvestmentBreakdownTable = new InvestmentBreakdownTable();

    const [property, setProperty] = useState<ListingWithScenariosResponseDTO>(
        useLocation().state.data as ListingWithScenariosResponseDTO
    );

    const [selectedProperty, setSelectedProperty] = useState<ListingWithScenariosResponseDTO | null>(null);

    const [tableType, setTableType] = useState<InvestmentBreakdownTableType>(InvestmentBreakdownTableType.STANDARD_BREAKDOWN);

    const getAmmortizationDetails = (): MonthlyInvestmentDetailsResponseDTO[] => {
        return property.metrics.amortizationData;
    };

    const [formData, setFormData] = useState<InvestmentFormData>(investmentBreakdownFormDetails.getDefaultFormData(property));

    useEffect(() => {
        if (property) {
            setProperty(property);
            setFormData(investmentBreakdownFormDetails.getDefaultFormData(property));
        }
    }, [property]);

    const handleRowClick = (property: ListingWithScenariosResponseDTO) => {
        setSelectedProperty(property);
    };

    const handleCloseModal = () => {
        setSelectedProperty(null);
    };

    const getFormDetails = (): FormProperty[] => {
        return investmentBreakdownFormDetails.getFormDetails(formData);
    };

    const getCalculateRequest = (): CreateInvestmentScenarioRequest => {
        return investmentBreakdownFormDetails.createRequest(formData, property);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const realEstateCalcApi: RealEstateCalcApi = new RealEstateCalcApi();
        const data: ListingWithScenariosResponseDTO = await realEstateCalcApi.realEstateCalculator(getCalculateRequest());
        console.log("Calculation result:", data);
        setProperty(data);
    };

    return (
        <div>
            <h2> Investment Breakdown </h2>
            {formData && <StandardForm
                formDetails={getFormDetails()}
                handleSubmit={handleSubmit}
                setFormData={setFormData}
                buttonTitle='Calculate'
            />
            }
            {property ? (
                <>
                    <ReusableTable
                        data={[property]}
                        tableType={PropertiesListTableType.STANDARD_BREAKDOWN}
                        tableHandler={propertiesListTable}
                        onRowClick={handleRowClick}
                    />
                    {selectedProperty && <PropertyDetailsModal
                        data={selectedProperty}
                        rowData={propertiesListTable.getDefaultRowData(selectedProperty)}
                        onClose={handleCloseModal}
                        columns={propertiesListTable.getDefaultColumns()}
                    />}
                    <br />
                    <hr />
                    <br />
                    <ReusableTable
                        data={getAmmortizationDetails()}
                        tableHandler={investmentBreakdownTable}
                        tableType={tableType}
                        setTableType={setTableType}
                        tableTypeOptions={[
                            InvestmentBreakdownTableType.STANDARD_BREAKDOWN,
                            InvestmentBreakdownTableType.MORTGAGE_BREAKDOWN,
                            InvestmentBreakdownTableType.INVESTMENT_BREAKDOWN,
                            InvestmentBreakdownTableType.EXPENSES_BREAKDOWN
                        ]}
                        includeTableSeparator={true}
                        canExportIntoCSV={true}
                    />
                </>
            ) : (
                <p>Loading property data...</p>
            )}
        </div>
    );
};

export default InvestmentBreakdown;
