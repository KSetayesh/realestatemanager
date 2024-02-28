import { AmortizationDetailsDTO, ListingWithScenariosDTO } from '@realestatemanager/shared';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import InvestmentForm from './InvestmentForm';
import ReusableTable, { TableColumn, TableDataItem, TableRow } from '../components/ReusableTable';
import PropertyDetailsModal from './PropertyDetailsModal';
import { createDefaultRowData, defaultColumns } from '../components/TableColumn';


const InvestmentBreakdown: React.FC = () => {

    const [properties, setProperties] = useState<ListingWithScenariosDTO[]>([]);
    const [selectedProperty, setSelectedProperty] = useState<ListingWithScenariosDTO | null>(null);
    const location = useLocation();
    const state = location.state as { data: ListingWithScenariosDTO };

    useEffect(() => {
        if (state && state.data) {
            console.log("In useEffect");
            setProperties([state.data]);
        }
    }, [state]); // Ensure useEffect depends on `state`

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

    const columnsForInvestmentMetrics: TableColumn[] = [
        { header: "Year", accessor: "year", isURL: false, showColumn: true, isDollarAmount: false, isSortable: false },
        { header: "Month", accessor: "month", isURL: false, showColumn: true, isDollarAmount: false, isSortable: false },
        { header: "Date", accessor: "date", isURL: false, showColumn: true, isDollarAmount: false, isSortable: false },
        { header: "Monthly Payment", accessor: "monthlyPayment", isURL: false, showColumn: true, isDollarAmount: true, isSortable: false },
        { header: "Mortgage Amount", accessor: "mortgageAmount", isURL: false, showColumn: true, isDollarAmount: true, isSortable: false },
        { header: "Interest Payment", accessor: "interestPayment", isURL: false, showColumn: true, isDollarAmount: true, isSortable: false },
        { header: "Principal Payment", accessor: "principalPayment", isURL: false, showColumn: true, isDollarAmount: true, isSortable: false },
        { header: "Remaining Balance", accessor: "remainingBalance", isURL: false, showColumn: true, isDollarAmount: true, isSortable: false },
        { header: "Equity Amount With Down Payment", accessor: "equityAmountWithDownPayment", isURL: false, showColumn: true, isDollarAmount: true, isSortable: false },
        { header: "Equity Amount Without Down Payment", accessor: "equityAmountWithoutDownPayment", isURL: false, showColumn: true, isDollarAmount: true, isSortable: false },
        { header: "Equity Amount With Appreciation", accessor: "equityAmountWithAppreciation", isURL: false, showColumn: true, isDollarAmount: true, isSortable: false },
        { header: "Appreciation Amount", accessor: "appreciationAmount", isURL: false, showColumn: true, isDollarAmount: true, isSortable: false },
    ];

    const createRowDataForInvestmentMetrics = (ammortizationDetail: AmortizationDetailsDTO): TableRow => {
        return {
            year: ammortizationDetail.year,
            month: ammortizationDetail.month,
            date: ammortizationDetail.date,
            monthlyPayment: ammortizationDetail.mortgageWithRecurringExpensesBreakdown.breakdown.mortgageBreakdown.monthlyPayment,
            mortgageAmount: ammortizationDetail.mortgageWithRecurringExpensesBreakdown.breakdown.mortgageBreakdown.mortgageAmount,
            interestPayment: ammortizationDetail.mortgageWithRecurringExpensesBreakdown.breakdown.mortgageBreakdown.breakdown?.interestAmount,
            principalPayment: ammortizationDetail.mortgageWithRecurringExpensesBreakdown.breakdown.mortgageBreakdown.breakdown?.principalAmount,
            remainingBalance: ammortizationDetail.remainingBalance,
            equityAmountWithDownPayment: ammortizationDetail.equityBreakdown.equityAmountWithDownPayment,
            equityAmountWithoutDownPayment: ammortizationDetail.equityBreakdown.equityAmountWithoutDownPayment,
            equityAmountWithAppreciation: ammortizationDetail.equityBreakdown.equityAmountWithAppreciation,
            appreciationAmount: ammortizationDetail.equityBreakdown.appreciationAmount,
        };
    };

    const createTableDataForInvestmentMetrics = (): TableDataItem<AmortizationDetailsDTO>[] => {
        console.log("In createTableDataForInvestmentMetrics");
        if (properties.length < 1) {
            throw new Error('Property not found on page');
        }
        const property = properties[0];
        const ammortizationDetails: AmortizationDetailsDTO[] = property.metrics[0].ammortizationDetails!;
        return ammortizationDetails.map(ammortizationDetail => ({
            objectData: {
                key: ammortizationDetail,
            },
            rowData: createRowDataForInvestmentMetrics(ammortizationDetail),
        }));
    };

    // Only render the component dependent on properties if properties are loaded
    return (
        <div>
            <h2> Investment Breakdown </h2>
            <InvestmentForm />
            {properties.length > 0 ? (
                <>
                    <ReusableTable
                        columns={defaultColumns.slice(0, defaultColumns.length - 1)}
                        tableData={tableData}
                        onRowClick={handleRowClick}
                    />
                    {selectedProperty && <PropertyDetailsModal
                        property={selectedProperty}
                        rowData={createDefaultRowData(selectedProperty)}
                        onClose={handleCloseModal}
                        columns={defaultColumns.slice(0, defaultColumns.length - 1)}
                    />}
                    <br />
                    <hr />
                    <br />
                    <ReusableTable
                        columns={columnsForInvestmentMetrics} // Adjust based on your needs
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


