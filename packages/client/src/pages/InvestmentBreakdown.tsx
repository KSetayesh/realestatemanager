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
        {
            header: "Year",
            accessor: "year",
            isURL: false,
            showColumn: true,
            isDollarAmount: false,
            isSortable: false,
        },
        {
            header: "Month",
            accessor: "month",
            isURL: false,
            showColumn: true,
            isDollarAmount: false,
            isSortable: false,
        },
        {
            header: "Date",
            accessor: "date",
            isURL: false,
            showColumn: true,
            isDollarAmount: false,
            isSortable: false,
        },
        {
            header: "Recurring Costs",
            accessor: "recurringCosts",
            isURL: false,
            showColumn: true,
            isDollarAmount: true,
            isSortable: true,
            detailedDescription: `propertyManagementAmount + 
                        vacancyAmount +
                        maintenanceAmount +
                        otherExpensesAmount +
                        capExReserveAmount`,
        },
        {
            header: "Monthly Payment",
            accessor: "monthlyPayment",
            isURL: false,
            showColumn: true,
            isDollarAmount: true,
            isSortable: false,
            detailedDescription: ` Mortgage Amount +
                                Property Tax Amount +
                                Monthly Home Insurance Amount +
                                Monthly HOA Fees Amount`,
        },
        {
            header: "Monthly Payment + RecurringCosts",
            accessor: "monthlyPaymentAndRecurringCosts",
            isURL: false,
            showColumn: true,
            isDollarAmount: true,
            isSortable: false,
        },
        {
            header: "Rent Estimate",
            accessor: "rentEstimate",
            isURL: false,
            showColumn: true,
            isDollarAmount: true,
            isSortable: false,
        },
        {
            header: "Mortgage Amount",
            accessor: "mortgageAmount",
            isURL: false,
            showColumn: true,
            isDollarAmount: true,
            isSortable: false,
        },
        {
            header: "Interest Payment",
            accessor: "interestPayment",
            isURL: false,
            showColumn: true,
            isDollarAmount: true,
            isSortable: false,
        },
        {
            header: "Principal Payment",
            accessor: "principalPayment",
            isURL: false,
            showColumn: true,
            isDollarAmount: true,
            isSortable: false,
        },
        {
            header: "Remaining Balance",
            accessor: "remainingBalance",
            isURL: false,
            showColumn: true,
            isDollarAmount: true,
            isSortable: false,
        },
        {
            header: "Equity Amount With Down Payment",
            accessor: "equityAmountWithDownPayment",
            isURL: false,
            showColumn: true,
            isDollarAmount: true,
            isSortable: false,
            detailedDescription: `Equity Amount +
                                Down Payment Amount`,
        },
        {
            header: "Equity Amount Without Down Payment",
            accessor: "equityAmountWithoutDownPayment",
            isURL: false,
            showColumn: true,
            isDollarAmount: true,
            isSortable: false,
        },
        {
            header: "Equity Amount With Appreciation",
            accessor: "equityAmountWithAppreciation",
            isURL: false,
            showColumn: true,
            isDollarAmount: true,
            isSortable: false,
            detailedDescription: `Equity Amount +
                                Down Payment Amount +
                                Expected Appreciation Amount`,
        },
        {
            header: "Appreciation Amount",
            accessor: "appreciationAmount",
            isURL: false,
            showColumn: true,
            isDollarAmount: true,
            isSortable: false
        },
    ];

    const createRowDataForInvestmentMetrics = (ammortizationDetail: AmortizationDetailsDTO): TableRow => {
        return {
            year: ammortizationDetail.year.value,
            month: ammortizationDetail.month.value,
            date: ammortizationDetail.date.value,
            recurringCosts: ammortizationDetail.recurringCosts.value,
            monthlyPayment: ammortizationDetail.monthlyPayment.value,
            monthlyPaymentAndRecurringCosts: ammortizationDetail.monthlyPaymentAndRecurringCosts.value,
            rentEstimate: ammortizationDetail.rentEstimate.value,
            mortgageAmount: ammortizationDetail.mortgageAmount.value,
            interestPayment: ammortizationDetail.amountPaidInInterest.amount,
            principalPayment: ammortizationDetail.amountPaidInPrincipal.amount,
            remainingBalance: ammortizationDetail.remainingBalance.value,
            equityAmountWithDownPayment: ammortizationDetail.equityWithDownPayment.value,
            equityAmountWithoutDownPayment: ammortizationDetail.equityAmountWithoutDownPayment.value,
            equityAmountWithAppreciation: ammortizationDetail.equityAmountWithAppreciation.value,
            appreciationAmount: ammortizationDetail.appreciationAmount.value,
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
            <InvestmentForm
                listing={properties[0]}
            />
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


