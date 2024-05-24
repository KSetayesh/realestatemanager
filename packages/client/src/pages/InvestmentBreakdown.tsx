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
import {
    createDefaultRowData,
    defaultColumns,
} from '../components/TableColumn';
import '../styles/StandardForm.css'; // Make sure to create this CSS file
import { InterestType, PercentageAndAmount, ValueType } from '../constants/Constant';
import { RealEstateCalcApi } from '../api/realestatecalcapi';
import StandardForm, { FormProperty } from '../components/StandardForm';
import { InvestmentFormData, getDefaultInvestmentFormData, getInvestmentBreakdownFormDetails } from '../forms/InvestmentBreakdownFormDetails';

enum TableTypeEnum {
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

    const [property, setProperty] = useState<ListingWithScenariosResponseDTO>(
        useLocation().state.data as ListingWithScenariosResponseDTO
    );

    const [selectedProperty, setSelectedProperty] = useState<ListingWithScenariosResponseDTO | null>(null);

    const [tableType, setTableType] = useState<TableTypeEnum>(TableTypeEnum.STANDARD_BREAKDOWN);

    const handleTableTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value as keyof typeof TableTypeEnum;
        setTableType(TableTypeEnum[input]);
    };

    const tablesConfig: TablesConfig<MonthlyInvestmentDetailsResponseDTO> = {
        [TableTypeEnum.STANDARD_BREAKDOWN]: {
            columns: [
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
                    header: "Mortgage Amount",
                    accessor: "mortgageAmount",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                    detailedDescription: `Mortgage Amount + PMI`,
                },
                {
                    header: "Total Interest Paid",
                    accessor: "totalInterestPaid",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                },
                {
                    header: "Total Principal Paid",
                    accessor: "totalPrincipalPaid",
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
                    header: "Rent Estimate",
                    accessor: "rentEstimate",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                },
                {
                    header: "Monthly Income",
                    accessor: "monthlyIncome",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                },
                {
                    header: "Monthly Expenses",
                    accessor: "monthlyExpenses",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                },
                {
                    header: "Monthly Cash Flow",
                    accessor: "monthlyCashFlow",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                    detailedDescription: `Rent Estimate - (Monthly Payment + Operational Costs)`,
                },
                {
                    header: "Accumulated Cash Flow",
                    accessor: "accumulatedCashFlow",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                },
                {
                    header: "Appreciation Amount",
                    accessor: "appreciationAmount",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false
                },
            ],
            data: (ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): TableRow => {
                return {
                    year: ammortizationDetail.monthlyDateData.yearCounter,
                    month: ammortizationDetail.monthlyDateData.monthMod12,
                    date: ammortizationDetail.monthlyDateData.dateAsString,
                    mortgageAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.amount,
                    totalInterestPaid: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.totalInterestPaid,
                    totalPrincipalPaid: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.totalPrincipalPaid,
                    remainingBalance: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.balanceAfterPayment,
                    rentEstimate: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Income Streams'].breakdown['Rental Income'].amount,
                    monthlyIncome: ammortizationDetail.monthlyBreakdown.transactions.incomeAmount,
                    monthlyExpenses: ammortizationDetail.monthlyBreakdown.transactions.expenseAmount,
                    monthlyCashFlow: ammortizationDetail.monthlyBreakdown.transactions.cashFlow,
                    accumulatedCashFlow: ammortizationDetail.monthlyBreakdown.investmentBreakdown.accumulatedCashFlow,
                    appreciationAmount: ammortizationDetail.monthlyBreakdown.appreciation.homeValue, //ammortizationDetail.appreciationAmount,

                }
            },
        },
        [TableTypeEnum.MORTGAGE_BREAKDOWN]: {
            columns: [
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
                    header: "Mortgage Amount",
                    accessor: "mortgageAmount",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                    detailedDescription: `Mortgage Amount + PMI`,
                },
                {
                    header: "PMI Amount",
                    accessor: "pmiAmount",
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
                    header: "Interest Payment",
                    accessor: "interestPayment",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                },
                {
                    header: "Percentage of Interest (%)",
                    accessor: "percentageOfInterest",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: false,
                    isSortable: false,
                    addSuffix: '%',
                },
                {
                    header: "Percentage of Principal (%)",
                    accessor: "percentageOfPrincipal",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: false,
                    isSortable: false,
                    addSuffix: '%',
                },
                {
                    header: "Total Interest Paid",
                    accessor: "totalInterestPaid",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                },
                {
                    header: "Total Principal Paid",
                    accessor: "totalPrincipalPaid",
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
            ],
            data: (ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): TableRow => {
                return {
                    year: ammortizationDetail.monthlyDateData.yearCounter,
                    month: ammortizationDetail.monthlyDateData.monthMod12,
                    date: ammortizationDetail.monthlyDateData.dateAsString,
                    mortgageAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.amount,
                    pmiAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.pmiAmount,
                    interestPayment: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.interestAmountForPayment,
                    principalPayment: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.principalAmountForPayment,
                    percentageOfInterest: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.percentageOfInterest,
                    percentageOfPrincipal: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.percentageOfPrincipal,
                    totalInterestPaid: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.totalInterestPaid,
                    totalPrincipalPaid: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.totalPrincipalPaid,
                    remainingBalance: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.balanceAfterPayment,
                };
            },
        },
        [TableTypeEnum.INVESTMENT_BREAKDOWN]: {
            columns: [
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
                    header: "Rent Estimate",
                    accessor: "rentEstimate",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                },
                {
                    header: "Monthly Income",
                    accessor: "monthlyIncome",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                },
                {
                    header: "Monthly Expenses",
                    accessor: "monthlyExpenses",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                },
                {
                    header: "Monthly Cash Flow",
                    accessor: "monthlyCashFlow",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                    detailedDescription: `Rent Estimate - (Monthly Payment + Operational Costs)`,
                },
                {
                    header: "Accumulated Cash Flow",
                    accessor: "accumulatedCashFlow",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                },
                {
                    header: "Equity Amount",
                    accessor: "equityAmount",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                    detailedDescription: `Equity Amount`,
                },
                {
                    header: "Net Operating Income (NOI)",
                    accessor: "netOperatingIncome",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                    detailedDescription: `Net Operating Income (NOI)`,
                },
                {
                    header: "Accumulated Net Operating Income (NOI)",
                    accessor: "accumulatedNetOperatingIncome",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                    detailedDescription: `Accumulated Net Operation Income (NOI)`,
                },
                {
                    header: "Cap Rate (%)",
                    accessor: "capRate",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: false,
                    isSortable: false,
                    detailedDescription: `Cap Rate`,
                    addSuffix: `%`
                },
                {
                    header: "Return On Investment (ROI %)",
                    accessor: "returnOnInvestment",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: false,
                    isSortable: false,
                    detailedDescription: `Return On Investment (ROI)`,
                    addSuffix: `%`
                },
                {
                    header: "Cash On Cash Return (COC %)",
                    accessor: "cashOnCashReturn",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: false,
                    isSortable: false,
                    detailedDescription: `Cash On Cash Return (COC)`,
                    addSuffix: `%`,
                },
                {
                    header: "Monthly Net Income",
                    accessor: "monthlyNetIncome",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                    detailedDescription: `Monthly Net Income`,
                },
                {
                    header: "Accumulated Net Income",
                    accessor: "accumulatedNetIncome",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                    detailedDescription: `Accumulated Net Income`,
                },
                {
                    header: "Appreciation Amount",
                    accessor: "appreciationAmount",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false
                },
            ],
            data: (ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): TableRow => {
                //TODO - Maybe move monthlyPayment calculation to backend
                return {
                    year: ammortizationDetail.monthlyDateData.yearCounter,
                    month: ammortizationDetail.monthlyDateData.monthMod12,
                    date: ammortizationDetail.monthlyDateData.dateAsString,
                    rentEstimate: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Income Streams'].breakdown['Rental Income'].amount,
                    monthlyIncome: ammortizationDetail.monthlyBreakdown.transactions.incomeAmount,
                    monthlyExpenses: ammortizationDetail.monthlyBreakdown.transactions.expenseAmount,
                    monthlyCashFlow: ammortizationDetail.monthlyBreakdown.investmentBreakdown.monthlyCashFlow,
                    // come back to this
                    accumulatedCashFlow: ammortizationDetail.monthlyBreakdown.investmentBreakdown.accumulatedCashFlow,
                    equityAmount: ammortizationDetail.monthlyBreakdown.investmentBreakdown.equityAmount,
                    netOperatingIncome: ammortizationDetail.monthlyBreakdown.investmentBreakdown.NOI,
                    accumulatedNetOperatingIncome: ammortizationDetail.monthlyBreakdown.investmentBreakdown.accumulatedNOI,
                    capRate: ammortizationDetail.monthlyBreakdown.investmentBreakdown.capRate,
                    returnOnInvestment: ammortizationDetail.monthlyBreakdown.investmentBreakdown.ROI,
                    cashOnCashReturn: ammortizationDetail.monthlyBreakdown.investmentBreakdown.cashOnCashReturn,
                    monthlyNetIncome: ammortizationDetail.monthlyBreakdown.investmentBreakdown.monthlyNetIncome,
                    accumulatedNetIncome: ammortizationDetail.monthlyBreakdown.investmentBreakdown.accumulatedNetIncome,
                    appreciationAmount: ammortizationDetail.monthlyBreakdown.appreciation.homeValue, //ammortizationDetail.appreciationAmount,
                };
            },
        },
        // Define type3 and type4 similarly
        [TableTypeEnum.EXPENSES_BREAKDOWN]: {
            columns: [
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
                    header: "Property Management Amount",
                    accessor: "propertyManagementAmount",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                },
                {
                    header: "Vacancy Amount",
                    accessor: "vacancyAmount",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                },
                {
                    header: "Maintenance Amount",
                    accessor: "maintenanceAmount",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                },
                {
                    header: "Cap Ex Reserve Amount",
                    accessor: "capExReserveAmount",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                },
                {
                    header: "Other Expense Amount",
                    accessor: "otherExpenseAmount",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                },
                {
                    header: "Operational Costs",
                    accessor: "operationalCosts",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: true,
                    detailedDescription: `Property Management Amount + 
                        Vacancy Amount +
                        Maintenance Amount +
                        Other Expenses Amount +
                        CapEx Reserve Amount`,
                },
                {
                    header: "Property Tax Amount",
                    accessor: "propertyTaxAmount",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                },
                {
                    header: "Monthly Home Insurance Amount",
                    accessor: "monthlyHomeInsuranceAmount",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                },
                {
                    header: "Monthly HOA Fees Amount",
                    accessor: "monthlyHOAFeesAmount",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                },
                {
                    header: "Fixed Costs",
                    accessor: "fixedCosts",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: true,
                    detailedDescription: `Property Tax Amount +
                                Monthly Home Insurance Amount +
                                Monthly HOA Fees Amount`,
                },
                {
                    header: "Mortgage Amount",
                    accessor: "mortgageAmount",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                    detailedDescription: `Mortgage Amount + PMI`,
                },
                {
                    header: "PMI Amount",
                    accessor: "pmiAmount",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                },
                {
                    header: "Monthly Payment",
                    accessor: "monthlyPayment",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                    detailedDescription: `Mortgage Amount +
                                Property Tax Amount +
                                Monthly Home Insurance Amount +
                                Monthly HOA Fees Amount`,
                },
                {
                    header: "Monthly Payment + Operational Costs",
                    accessor: "monthlyPaymentAndOperationalCosts",
                    isURL: false,
                    showColumn: true,
                    isDollarAmount: true,
                    isSortable: false,
                },
            ],
            data: (ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): TableRow => {
                const mortgageAmount = ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.amount;
                const fixedCosts = ammortizationDetail.monthlyBreakdown.transactions.breakdown['Fixed Recurring Expense'].totalAmount.amount;
                //TODO - Maybe move monthlyPayment calculation to backend
                const monthlyPayment = mortgageAmount + fixedCosts;

                return {
                    year: ammortizationDetail.monthlyDateData.yearCounter,
                    month: ammortizationDetail.monthlyDateData.monthMod12,
                    date: ammortizationDetail.monthlyDateData.dateAsString,
                    propertyManagementAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].breakdown['Property Management Expense'].amount,
                    vacancyAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].breakdown['Vacancy Expense'].amount,
                    maintenanceAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].breakdown['Maintenance Expense'].amount,
                    capExReserveAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].breakdown['Cap Ex Reserve Expense'].amount,
                    otherExpenseAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].breakdown['Other Expeneses'].amount,
                    operationalCosts: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].totalAmount.amount,
                    propertyTaxAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Fixed Recurring Expense'].breakdown['Property Tax'].amount,
                    monthlyHomeInsuranceAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Fixed Recurring Expense'].breakdown['Monthly Home Insurance'].amount,
                    monthlyHOAFeesAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Fixed Recurring Expense'].breakdown['Monthly HOA Fee'].amount,
                    fixedCosts: fixedCosts,
                    mortgageAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.amount,
                    pmiAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.pmiAmount,
                    monthlyPayment: monthlyPayment,
                    monthlyPaymentAndOperationalCosts: ammortizationDetail.monthlyBreakdown.transactions.expenseAmount,
                };
            },
        },
    };

    const [formData, setFormData] = useState<InvestmentFormData>(getDefaultInvestmentFormData(property));

    useEffect(() => {
        if (property) {
            setProperty(property);
            setFormData(getDefaultInvestmentFormData(property));
        }
    }, [property]);  // Ensure useEffect depends on `property`

    const handleRowClick = (property: ListingWithScenariosResponseDTO) => {
        setSelectedProperty(property);
    };

    const handleCloseModal = () => {
        setSelectedProperty(null);
    };

    const tableData: TableDataItem<ListingWithScenariosResponseDTO> = {
        objectData: {
            key: property,
        },
        rowData: createDefaultRowData(property),
    };

    const createTableDataForInvestmentMetrics = (): TableDataItem<MonthlyInvestmentDetailsResponseDTO>[] => {
        const ammortizationDetails: MonthlyInvestmentDetailsResponseDTO[] = property.metrics.amortizationData; // investmentProjections.ammortizationDetails!;
        return ammortizationDetails.map(ammortizationDetail => ({
            objectData: {
                key: ammortizationDetail,
            },
            // Change createRowDataForInvestmentMetrics to the proper function for radio type
            rowData: tablesConfig[tableType].data(ammortizationDetail), //createRowDataForInvestmentMetrics(ammortizationDetail),
        }));
    };

    //-----------------------------------------------------------------------------------------------------------

    const formDetails: FormProperty[] = getInvestmentBreakdownFormDetails(formData);

    //-----------------------------------------------------------------------------------------------------------

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
                        columns={defaultColumns.slice(0, defaultColumns.length - 1)}
                        tableData={[tableData]}
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
                                value={TableTypeEnum.MORTGAGE_BREAKDOWN}
                                checked={tableType === TableTypeEnum.MORTGAGE_BREAKDOWN}
                                onChange={handleTableTypeChange}
                            />
                            Mortgage Breakdown
                        </label>
                        <label>
                            <input
                                type="radio"
                                value={TableTypeEnum.INVESTMENT_BREAKDOWN}
                                checked={tableType === TableTypeEnum.INVESTMENT_BREAKDOWN}
                                onChange={handleTableTypeChange}
                            />
                            Investment Breakdown
                        </label>
                        <label>
                            <input
                                type="radio"
                                value={TableTypeEnum.EXPENSES_BREAKDOWN}
                                checked={tableType === TableTypeEnum.EXPENSES_BREAKDOWN}
                                onChange={handleTableTypeChange}
                            />
                            Expenses Breakdown
                        </label>
                    </div>
                    <ReusableTable
                        columns={tablesConfig[tableType].columns} //{columnsForInvestmentMetrics} 
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


