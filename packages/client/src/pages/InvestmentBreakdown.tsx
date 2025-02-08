import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReusableTable from '../components/ReusableTable';
import DetailsModal from '../components/DetailsModal';
import { RealEstateCalcApi } from '../api/realestatecalcapi';
import StandardForm, { FormProperty } from '../components/StandardForm';
import { InvestmentBreakdownFormDetails } from '../forms/InvestmentBreakdownFormDetails';
// import { PropertiesListTable } from '../tables/PropertiesListTable';
// import { InvestmentBreakdownTable } from '../tables/InvestmentBreakdownTable';
import {
    CreateInvestmentScenarioRequest,
    InvestmentFormData,
    ListingWithScenariosResponseDTO,
    MonthlyInvestmentDetailsResponseDTO
} from '@realestatemanager/types';
import { PropertiesListTable } from '../newtabledata/tabledata/PropertiesListTable';
import { InvestmentBreakdownTable } from '../newtabledata/tabledata/InvestmentBreakdownTable';

const InvestmentBreakdown: React.FC = () => {

    const investmentBreakdownFormDetails: InvestmentBreakdownFormDetails = new InvestmentBreakdownFormDetails();
    const propertiesListTable: PropertiesListTable = new PropertiesListTable();
    const investmentBreakdownTable: InvestmentBreakdownTable = new InvestmentBreakdownTable();

    const [property, setProperty] = useState<ListingWithScenariosResponseDTO>(
        useLocation().state.data as ListingWithScenariosResponseDTO
    );

    const [selectedProperty, setSelectedProperty] = useState<ListingWithScenariosResponseDTO | null>(null);

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
                        tableHandler={propertiesListTable}
                        onRowClick={handleRowClick}
                    />
                    {selectedProperty && <DetailsModal
                        data={selectedProperty}
                        tableHandler={propertiesListTable}
                        onClose={handleCloseModal}
                    />}
                    <br />
                    <hr />
                    <br />
                    <ReusableTable
                        data={getAmmortizationDetails()}
                        tableHandler={investmentBreakdownTable}
                        tableSeperatorDetails={{
                            separatorText: (rowCounter: number) => {
                                const intervalCount = (rowCounter + 1) / 12;
                                return `End of year ${intervalCount}`;
                            },
                            rowsInterval: 12,
                        }}
                        exportIntoCSV={{
                            buttonTitle: 'Export CSV'
                        }}
                    />
                </>
            ) : (
                <p>Loading property data...</p>
            )}
        </div>
    );
};

export default InvestmentBreakdown;
