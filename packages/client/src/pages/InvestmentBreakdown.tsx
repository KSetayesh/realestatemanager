import { AmortizationDetailsDTO, ListingWithScenariosDTO, ValueInput, InvestmentScenarioRequest } from '@realestatemanager/shared';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReusableTable, { TableColumn, TableDataItem, TableRow } from '../components/ReusableTable';
import PropertyDetailsModal from './PropertyDetailsModal';
import { createDefaultRowData, defaultColumns } from '../components/TableColumn';
import '../styles/InvestmentForm.css'; // Make sure to create this CSS file
import {
    getAnnualAppreciationRate,
    getAnnualInterestRate,
    getAnnualRentIncreaseRate,
    getAnnualTaxIncreaseRate,
    getCapExReserveRate,
    getClosingCosts,
    getDownPaymentPercentage,
    getInitialRepairCosts,
    getInterestType,
    getLaundryServices,
    getLegalAndProfessionalFees,
    getMaintenanceRate,
    getMonthlyHOAFeesAmount,
    getMonthlyHomeInsuranceAmount,
    getMonthlyPropertyTax,
    getMortgageInterest,
    getOperatingExpenses,
    getOtherAdditionalIncomeStreams,
    getOtherExpensesRate,
    getOtherInitialExpenses,
    getPMIDropoffPoint,
    getPMIRate,
    getParkingFees,
    getPrice,
    getPropertyManagementRate,
    getPropertyTaxes,
    getRentEstimate,
    getStorageUnitFees,
    getTaxDepreciation,
    getTermInYears,
    getTravelingCosts,
    getVacancyRate
} from '../components/TableColumn';
import { InputType, InterestType, PercentageAndAmount, ValueType } from '../constants/Constant';
import { RealEstateCalcApi } from '../api/realestatecalcapi';
import CalculateForm, { FormProperty } from '../components/CalculateForm';

export type InvestmentFormData = {
    downPaymentType: PercentageAndAmount,
    downPaymentPercentage: number,
    pmiRate: number,
    pmiDropoffPoint: number,
    monthlyPropertyTaxType: PercentageAndAmount,
    monthlyPropertyTax: number,
    monthlyHomeInsuranceAmountType: PercentageAndAmount,
    monthlyHomeInsuranceAmount: number,
    monthlyHOAFeesAmountType: PercentageAndAmount,
    monthlyHOAFeesAmount: number,
    annualInterestRate: number,
    termInYears: number,
    interestType: string,
    propertyManagementRate: number,
    vacancyRate: number,
    maintenanceRate: number,
    otherExpensesRate: number,
    capExReserveRate: number,
    legalAndProfessionalFeesType: PercentageAndAmount,
    legalAndProfessionalFees: number,
    initialRepairCostsType: PercentageAndAmount,
    initialRepairCosts: number,
    travelingCostsType: PercentageAndAmount,
    travelingCosts: number,
    closingCostsType: PercentageAndAmount,
    closingCosts: number,
    otherInitialExpensesType: PercentageAndAmount,
    otherInitialExpenses: number,
    rentEstimate: number,
    purchasePrice: number,
    annualRentIncreaseRate: number,
    annualAppreciationRate: number,
    annualTaxIncreaseRate: number,
    parkingFees: number,
    laundryServices: number,
    storageUnitFees: number,
    other: number,
    depreciation: number,
    mortgageInterest: number,
    operatingExpenses: number,
    propertyTaxes: number,
};

const InvestmentBreakdown: React.FC = () => {

    const [property, setProperty] = useState<ListingWithScenariosDTO>(
        useLocation().state.data as ListingWithScenariosDTO
    );

    const [selectedProperty, setSelectedProperty] = useState<ListingWithScenariosDTO | null>(null);

    // Create a state to store the form data.
    const getInvestmentFormData = (): InvestmentFormData => {
        return {
            downPaymentType: PercentageAndAmount.PERCENTAGE,
            downPaymentPercentage: getDownPaymentPercentage(property),
            pmiRate: getPMIRate(property),
            pmiDropoffPoint: getPMIDropoffPoint(property),
            monthlyPropertyTaxType: PercentageAndAmount.AMOUNT,
            monthlyPropertyTax: getMonthlyPropertyTax(property),
            monthlyHomeInsuranceAmountType: PercentageAndAmount.AMOUNT,
            monthlyHomeInsuranceAmount: getMonthlyHomeInsuranceAmount(property),
            monthlyHOAFeesAmountType: PercentageAndAmount.AMOUNT,
            monthlyHOAFeesAmount: getMonthlyHOAFeesAmount(property),
            annualInterestRate: getAnnualInterestRate(property),
            termInYears: getTermInYears(property),
            interestType: getInterestType(property),
            propertyManagementRate: getPropertyManagementRate(property),
            vacancyRate: getVacancyRate(property),
            maintenanceRate: getMaintenanceRate(property),
            otherExpensesRate: getOtherExpensesRate(property),
            capExReserveRate: getCapExReserveRate(property),
            legalAndProfessionalFeesType: PercentageAndAmount.AMOUNT,
            legalAndProfessionalFees: getLegalAndProfessionalFees(property),
            initialRepairCostsType: PercentageAndAmount.AMOUNT,
            initialRepairCosts: getInitialRepairCosts(property),
            travelingCostsType: PercentageAndAmount.AMOUNT,
            travelingCosts: getTravelingCosts(property),
            closingCostsType: PercentageAndAmount.AMOUNT,
            closingCosts: getClosingCosts(property),
            otherInitialExpensesType: PercentageAndAmount.AMOUNT,
            otherInitialExpenses: getOtherInitialExpenses(property),
            rentEstimate: getRentEstimate(property),
            purchasePrice: getPrice(property),
            annualRentIncreaseRate: getAnnualRentIncreaseRate(property),
            annualAppreciationRate: getAnnualAppreciationRate(property),
            annualTaxIncreaseRate: getAnnualTaxIncreaseRate(property),
            parkingFees: getParkingFees(property),
            laundryServices: getLaundryServices(property),
            storageUnitFees: getStorageUnitFees(property),
            other: getOtherAdditionalIncomeStreams(property),
            depreciation: getTaxDepreciation(property),
            mortgageInterest: getMortgageInterest(property),
            operatingExpenses: getOperatingExpenses(property),
            propertyTaxes: getPropertyTaxes(property),
            // setNewDefaultValues: false,
        };
    }

    const [formData, setFormData] = useState<InvestmentFormData>(getInvestmentFormData());

    useEffect(() => {
        if (property) {
            setProperty(property);
            setFormData(getInvestmentFormData());
        }
    }, [property]);  // Ensure useEffect depends on `property`

    const handleRowClick = (property: ListingWithScenariosDTO) => {
        setSelectedProperty(property);
    };

    const handleCloseModal = () => {
        setSelectedProperty(null);
    };

    const tableData: TableDataItem<ListingWithScenariosDTO> = {
        objectData: {
            key: property,
        },
        rowData: createDefaultRowData(property),
    };


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
            year: ammortizationDetail.year,
            month: ammortizationDetail.month,
            date: ammortizationDetail.date,
            recurringCosts: ammortizationDetail.recurringCosts,
            monthlyPayment: ammortizationDetail.monthlyPayment,
            monthlyPaymentAndRecurringCosts: ammortizationDetail.monthlyPaymentAndRecurringCosts,
            rentEstimate: ammortizationDetail.rentEstimate,
            mortgageAmount: ammortizationDetail.mortgageAmount,
            interestPayment: ammortizationDetail.amountPaidInInterest.amount,
            principalPayment: ammortizationDetail.amountPaidInPrincipal.amount,
            remainingBalance: ammortizationDetail.remainingBalance,
            equityAmountWithDownPayment: ammortizationDetail.equityWithDownPayment,
            equityAmountWithoutDownPayment: ammortizationDetail.equityAmountWithoutDownPayment,
            equityAmountWithAppreciation: ammortizationDetail.equityAmountWithAppreciation,
            appreciationAmount: ammortizationDetail.appreciationAmount,
        };
    };

    const createTableDataForInvestmentMetrics = (): TableDataItem<AmortizationDetailsDTO>[] => {
        const ammortizationDetails: AmortizationDetailsDTO[] = property.metrics[0].investmentProjections.ammortizationDetails!;
        return ammortizationDetails.map(ammortizationDetail => ({
            objectData: {
                key: ammortizationDetail,
            },
            rowData: createRowDataForInvestmentMetrics(ammortizationDetail),
        }));
    };

    //-----------------------------------------------------------------------------------------------------------

    const formDetails: FormProperty[] = [
        {
            title: 'Down Payment (%)',
            name: 'downPaymentPercentage',
            value: formData.downPaymentPercentage,
            type: InputType.NUMBER,
            hasRadioOptions: true,
            radioDetails: {
                name: 'downPaymentType',
                radioValue: formData.downPaymentType,
            },
        },
        {
            title: 'Monthly Property Tax',
            name: 'monthlyPropertyTax',
            value: formData.monthlyPropertyTax,
            type: InputType.NUMBER,
            hasRadioOptions: true,
            radioDetails: {
                name: 'monthlyPropertyTaxType',
                radioValue: formData.monthlyPropertyTaxType,
            },
        },
        {
            title: 'Monthly Home Insurance Amount',
            name: 'monthlyHomeInsuranceAmount',
            value: formData.monthlyHomeInsuranceAmount,
            type: InputType.NUMBER,
            hasRadioOptions: true,
            radioDetails: {
                name: 'monthlyHomeInsuranceAmountType',
                radioValue: formData.monthlyHomeInsuranceAmountType,
            }
        },
        {
            title: 'Monthly HOA Fees Amount',
            name: 'monthlyHOAFeesAmount',
            value: formData.monthlyHOAFeesAmount,
            type: InputType.NUMBER,
            hasRadioOptions: true,
            radioDetails: {
                name: 'monthlyHOAFeesAmountType',
                radioValue: formData.monthlyHOAFeesAmountType,
            }
        },
        {
            title: 'Legal And Professional Fees (%)',
            name: 'legalAndProfessionalFees',
            value: formData.legalAndProfessionalFees,
            type: InputType.NUMBER,
            hasRadioOptions: true,
            radioDetails: {
                name: 'legalAndProfessionalFeesType',
                radioValue: formData.legalAndProfessionalFeesType,
            }
        },
        {
            title: 'Initial Repair Costs (%)',
            name: 'initialRepairCosts',
            value: formData.initialRepairCosts,
            type: InputType.NUMBER,
            hasRadioOptions: true,
            radioDetails: {
                name: 'initialRepairCostsType',
                radioValue: formData.initialRepairCostsType,
            }
        },
        {
            title: 'Traveling Costs',
            name: 'travelingCosts',
            value: formData.travelingCosts,
            type: InputType.NUMBER,
            hasRadioOptions: true,
            radioDetails: {
                name: 'travelingCostsType',
                radioValue: formData.travelingCostsType,
            }
        },
        {
            title: 'Closing Costs',
            name: 'closingCosts',
            value: formData.closingCosts,
            type: InputType.NUMBER,
            hasRadioOptions: true,
            radioDetails: {
                name: 'closingCostsType',
                radioValue: formData.closingCostsType,
            }
        },
        {
            title: 'Other Initial Expenses (%)',
            name: 'otherInitialExpenses',
            value: formData.otherInitialExpenses,
            type: InputType.NUMBER,
            hasRadioOptions: true,
            radioDetails: {
                name: 'otherInitialExpensesType',
                radioValue: formData.otherInitialExpensesType,
            }
        },
        {
            title: 'PMI Rate (%)',
            name: 'pmiRate',
            value: formData.pmiRate,
            type: InputType.NUMBER,
        },
        {
            title: 'PMI Dropoff Point',
            name: 'pmiDropoffPoint',
            value: formData.pmiDropoffPoint,
            type: InputType.NUMBER,
        },
        {
            title: 'Annual Interest Rate (%)',
            name: 'annualInterestRate',
            value: formData.annualInterestRate,
            type: InputType.NUMBER,
            step: "0.01",
        },
        {
            title: 'Term In Years',
            name: 'termInYears',
            value: formData.termInYears,
            type: InputType.NUMBER,
        },
        {
            title: 'Interest Type',
            name: 'interestType',
            value: formData.interestType,
            type: InputType.SELECT,
            options: Object.values(InterestType).map((enumValue => {
                return {
                    value: enumValue,
                    label: enumValue,
                };
            })),
        },
        {
            title: 'Property Management (%)',
            name: 'propertyManagementRate',
            value: formData.propertyManagementRate,
            type: InputType.NUMBER,
        },
        {
            title: 'Vacancy (%)',
            name: 'vacancyRate',
            value: formData.vacancyRate,
            type: InputType.NUMBER,
        },
        {
            title: 'Maintenance (%)',
            name: 'maintenanceRate',
            value: formData.maintenanceRate,
            type: InputType.NUMBER,
        },
        {
            title: 'Other Expenses (%)',
            name: 'otherExpensesRate',
            value: formData.otherExpensesRate,
            type: InputType.NUMBER,
        },
        {
            title: 'Cap Ex Reserve (%)',
            name: 'capExReserveRate',
            value: formData.capExReserveRate,
            type: InputType.NUMBER,
        },
        {
            title: 'Rent Estimate',
            name: 'rentEstimate',
            value: formData.rentEstimate,
            type: InputType.NUMBER,
        },
        {
            title: 'Purchase Price',
            name: 'purchasePrice',
            value: formData.purchasePrice,
            type: InputType.NUMBER,
        },
        {
            title: 'Annual Rent Increase Rate (%)',
            name: 'annualRentIncreaseRate',
            value: formData.annualRentIncreaseRate,
            type: InputType.NUMBER,
        },
        {
            title: 'Annual Appreciation Rate (%)',
            name: 'annualAppreciationRate',
            value: formData.annualAppreciationRate,
            type: InputType.NUMBER,
        },
        {
            title: 'Annual Tax Increase Rate (%)',
            name: 'annualTaxIncreaseRate',
            value: formData.annualTaxIncreaseRate,
            type: InputType.NUMBER,
        },
        {
            title: 'Parking Fees',
            name: 'parkingFees',
            value: formData.parkingFees,
            type: InputType.NUMBER,
        },
        {
            title: 'Laundry Services',
            name: 'laundryServices',
            value: formData.laundryServices,
            type: InputType.NUMBER,
        },
        {
            title: 'Storage Unit Fees',
            name: 'storageUnitFees',
            value: formData.storageUnitFees,
            type: InputType.NUMBER,
        },
        {
            title: 'Other',
            name: 'other',
            value: formData.other,
            type: InputType.NUMBER,
        },
        {
            title: 'Depreciation',
            name: 'depreciation',
            value: formData.depreciation,
            type: InputType.NUMBER,
        },
        {
            title: 'Mortgage Interest',
            name: 'mortgageInterest',
            value: formData.mortgageInterest,
            type: InputType.NUMBER,
        },
        {
            title: 'Operating Expenses',
            name: 'operatingExpenses',
            value: formData.operatingExpenses,
            type: InputType.NUMBER,
        },
        {
            title: 'Property Taxes',
            name: 'propertyTaxes',
            value: formData.propertyTaxes,
            type: InputType.NUMBER,
        },
    ];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;
        if (InputType.RADIO === type) {
            // Radio buttons have names like "{propertyName}_radio"
            // Extract the propertyName to update the corresponding state 

            const propertyName = name.replace("_radio", "");
            setFormData((prevFormData: InvestmentFormData) => ({
                ...prevFormData,
                [propertyName]: value,
            }));
        } else {
            // For number and select inputs, simply update based on name and value
            setFormData((prevFormData: InvestmentFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const getCalculateRequest = (): InvestmentScenarioRequest => {

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
                    annualInterestRate: formData.annualInterestRate,
                    termInYears: formData.termInYears,
                    interestType: getInterestType(formData.interestType)!,
                    downPayment: convertToValueInput(formData.downPaymentType, Number(formData.downPaymentPercentage))!,
                    pmiRate: formData.pmiRate,
                    pmiDropoffPoint: formData.pmiDropoffPoint,
                    monthlyPropertyTax: convertToValueInput(formData.monthlyPropertyTaxType, Number(formData.monthlyPropertyTax))!,
                    monthlyHomeInsuranceAmount: convertToValueInput(formData.monthlyHomeInsuranceAmountType, Number(formData.monthlyHomeInsuranceAmount))!,
                    monthlyHOAFeesAmount: convertToValueInput(formData.monthlyHOAFeesAmountType, Number(formData.monthlyHOAFeesAmount))!,
                },
                operatingExpenses: {
                    propertyManagementRate: formData.propertyManagementRate,
                    vacancyRate: formData.vacancyRate,
                    maintenanceRate: formData.maintenanceRate,
                    otherExpensesRate: formData.otherExpensesRate,
                    capExReserveRate: formData.capExReserveRate,
                    legalAndProfessionalFees: convertToValueInput(formData.legalAndProfessionalFeesType, Number(formData.legalAndProfessionalFees)),
                    initialRepairCosts: convertToValueInput(formData.initialRepairCostsType, Number(formData.initialRepairCosts)),
                    travelingCosts: convertToValueInput(formData.travelingCostsType, Number(formData.travelingCosts)),
                    closingCosts: convertToValueInput(formData.closingCostsType, Number(formData.closingCosts)),
                    otherInitialExpenses: convertToValueInput(formData.otherInitialExpensesType, Number(formData.otherInitialExpenses)),
                },
                rentEstimate: formData.rentEstimate,
                purchasePrice: formData.purchasePrice,
                growthProjections: {
                    annualRentIncreaseRate: formData.annualRentIncreaseRate,
                    annualAppreciationRate: formData.annualAppreciationRate,
                    annualTaxIncreaseRate: formData.annualTaxIncreaseRate,
                },
                additionalIncomeStreams: {
                    parkingFees: formData.parkingFees,
                    laundryServices: formData.laundryServices,
                    storageUnitFees: formData.storageUnitFees,
                    other: formData.other,
                },
                taxImplications: {
                    depreciation: formData.depreciation,
                    mortgageInterest: formData.mortgageInterest,
                    operatingExpenses: formData.operatingExpenses,
                    propertyTaxes: formData.propertyTaxes,
                },
            },
        };
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const realEstateCalcApi: RealEstateCalcApi = new RealEstateCalcApi();
        const data: ListingWithScenariosDTO = await realEstateCalcApi.realEstateCalculator(getCalculateRequest());
        console.log("Calculation result:", data);
        setProperty(data);
    };

    //-----------------------------------------------------------------------------------------------------------

    // Only render the component dependent on properties if properties are loaded
    return (
        <div>
            <h2> Investment Breakdown </h2>
            {formData && <CalculateForm
                formDetails={formDetails}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
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


