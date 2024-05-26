import { FormProperty } from "../components/StandardForm";
import { InputType, InterestType, PercentageAndAmount, ValueType } from "../constants/Constant";
import {
    getAnnualAppreciationRate,
    getAnnualHOAFeesIncreaseRate,
    getAnnualHomeInsuranceIncreaseRate,
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
} from '../utilities/PropertyResponseHelper';
import { CreateInvestmentScenarioRequest, ListingWithScenariosResponseDTO, ValueInput } from "@realestatemanager/shared";
import { FormInterface } from "./FormInterface";
import { BasicNumberForm } from "./ReusableFormFields";

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
    annualHomeInsuranceIncreaseRate: number,
    annualHOAFeesIncreaseRate: number,
    parkingFees: number,
    laundryServices: number,
    storageUnitFees: number,
    other: number,
    depreciation: number,
    mortgageInterest: number,
    operatingExpenses: number,
    propertyTaxes: number,
};

export class InvestmentBreakdownFormDetails implements FormInterface<
    InvestmentFormData,
    CreateInvestmentScenarioRequest,
    ListingWithScenariosResponseDTO
> {

    createRequest(formData: InvestmentFormData, property: ListingWithScenariosResponseDTO): CreateInvestmentScenarioRequest {

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
    }

    // Create a state to store the form data.
    getDefaultFormData(property: ListingWithScenariosResponseDTO): InvestmentFormData {
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
            annualHomeInsuranceIncreaseRate: getAnnualHomeInsuranceIncreaseRate(property),
            annualHOAFeesIncreaseRate: getAnnualHOAFeesIncreaseRate(property),
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

    // Come back to this
    getFormDetails(formData: InvestmentFormData): FormProperty[] {
        return [
            {
                title: 'Down Payment (%)',
                values: [
                    {
                        name: 'downPaymentType',
                        value: formData.downPaymentType, // Default selected value
                        type: InputType.RADIO,
                        options: Object.values(PercentageAndAmount).map((enumValue => {
                            return {
                                value: enumValue,
                                label: enumValue,
                            };
                        })),
                    },
                    {
                        name: 'downPaymentPercentage',
                        value: formData.downPaymentPercentage,
                        type: InputType.STRING
                    }
                ]
            },

            {
                title: 'Monthly Property Tax',
                values: [
                    {
                        name: 'monthlyPropertyTaxType',
                        value: formData.monthlyPropertyTaxType,
                        type: InputType.RADIO,
                        options: Object.values(PercentageAndAmount).map(enumValue => ({
                            value: enumValue,
                            label: enumValue,
                        })),
                    },
                    {
                        name: 'monthlyPropertyTax',
                        value: formData.monthlyPropertyTax,
                        type: InputType.NUMBER,
                    }
                ]
            },
            {
                title: 'Monthly Home Insurance Amount',
                values: [
                    {
                        name: 'monthlyHomeInsuranceAmountType',
                        value: formData.monthlyHomeInsuranceAmountType,
                        type: InputType.RADIO,
                        options: Object.values(PercentageAndAmount).map(enumValue => ({
                            value: enumValue,
                            label: enumValue,
                        })),
                    },
                    {
                        name: 'monthlyHomeInsuranceAmount',
                        value: formData.monthlyHomeInsuranceAmount,
                        type: InputType.NUMBER,
                    }
                ]
            },
            {
                title: 'Monthly HOA Fees Amount',
                values: [
                    {
                        name: 'monthlyHOAFeesAmountType',
                        value: formData.monthlyHOAFeesAmountType,
                        type: InputType.RADIO,
                        options: Object.values(PercentageAndAmount).map(enumValue => ({
                            value: enumValue,
                            label: enumValue,
                        })),
                    },
                    {
                        name: 'monthlyHOAFeesAmount',
                        value: formData.monthlyHOAFeesAmount,
                        type: InputType.NUMBER,
                    }
                ]
            },
            {
                title: 'Legal And Professional Fees (%)',
                values: [
                    {
                        name: 'legalAndProfessionalFeesType',
                        value: formData.legalAndProfessionalFeesType,
                        type: InputType.RADIO,
                        options: Object.values(PercentageAndAmount).map(enumValue => ({
                            value: enumValue,
                            label: enumValue,
                        })),
                    },
                    {
                        name: 'legalAndProfessionalFees',
                        value: formData.legalAndProfessionalFees,
                        type: InputType.NUMBER,
                    }
                ]
            },
            {
                title: 'Initial Repair Costs (%)',
                values: [
                    {
                        name: 'initialRepairCostsType',
                        value: formData.initialRepairCostsType,
                        type: InputType.RADIO,
                        options: Object.values(PercentageAndAmount).map(enumValue => ({
                            value: enumValue,
                            label: enumValue,
                        })),
                    },
                    {
                        name: 'initialRepairCosts',
                        value: formData.initialRepairCosts,
                        type: InputType.NUMBER,
                    }
                ]
            },
            {
                title: 'Traveling Costs',
                values: [
                    {
                        name: 'travelingCostsType',
                        value: formData.travelingCostsType,
                        type: InputType.RADIO,
                        options: Object.values(PercentageAndAmount).map(enumValue => ({
                            value: enumValue,
                            label: enumValue,
                        })),
                    },
                    {
                        name: 'travelingCosts',
                        value: formData.travelingCosts,
                        type: InputType.NUMBER,
                    }
                ]
            },
            {
                title: 'Closing Costs',
                values: [
                    {
                        name: 'closingCostsType',
                        value: formData.closingCostsType,
                        type: InputType.RADIO,
                        options: Object.values(PercentageAndAmount).map(enumValue => ({
                            value: enumValue,
                            label: enumValue,
                        })),
                    },
                    {
                        name: 'closingCosts',
                        value: formData.closingCosts,
                        type: InputType.NUMBER,
                    }
                ]
            },
            {
                title: 'Other Initial Expenses (%)',
                values: [
                    {
                        name: 'otherInitialExpensesType',
                        value: formData.otherInitialExpensesType,
                        type: InputType.RADIO,
                        options: Object.values(PercentageAndAmount).map(enumValue => ({
                            value: enumValue,
                            label: enumValue,
                        })),
                    },
                    {
                        name: 'otherInitialExpenses',
                        value: formData.otherInitialExpenses,
                        type: InputType.NUMBER,
                    }
                ]
            },
            BasicNumberForm('PMI Rate (%)', 'pmiRate', formData.pmiRate),
            BasicNumberForm('PMI Dropoff Point', 'pmiDropoffPoint', formData.pmiDropoffPoint),
            BasicNumberForm('Annual Interest Rate (%)', 'annualInterestRate', formData.annualInterestRate, '0.01'),
            BasicNumberForm('Term In Years', 'termInYears', formData.termInYears),
            {
                title: 'Interest Type',
                values: [
                    {
                        name: 'interestType',
                        type: InputType.SELECT,
                        value: formData.interestType,
                        options: Object.values(InterestType).map((enumValue => {
                            return {
                                value: enumValue,
                                label: enumValue,
                            };
                        })),
                    },
                ],
            },
            BasicNumberForm('Property Management (%)', 'propertyManagementRate', formData.propertyManagementRate),
            BasicNumberForm('Vacancy (%)', 'vacancyRate', formData.vacancyRate),
            BasicNumberForm('Maintenance (%)', 'maintenanceRate', formData.maintenanceRate),
            BasicNumberForm('Other Expenses (%)', 'otherExpensesRate', formData.otherExpensesRate),
            BasicNumberForm('Cap Ex Reserve (%)', 'capExReserveRate', formData.capExReserveRate),
            BasicNumberForm('Rent Estimate', 'rentEstimate', formData.rentEstimate),
            BasicNumberForm('Purchase Price', 'purchasePrice', formData.purchasePrice),
            BasicNumberForm('Annual Rent Increase Rate (%)', 'annualRentIncreaseRate', formData.annualRentIncreaseRate),
            BasicNumberForm('Annual Appreciation Rate (%)', 'annualAppreciationRate', formData.annualAppreciationRate),
            BasicNumberForm('Annual Tax Increase Rate (%)', 'annualTaxIncreaseRate', formData.annualTaxIncreaseRate),
            BasicNumberForm('Annual Home Insurance Increase Rate (%)', 'annualHomeInsuranceIncreaseRate', formData.annualHomeInsuranceIncreaseRate),
            BasicNumberForm('Annual HOA Fees Increase Rate (%)', 'annualHOAFeesIncreaseRate', formData.annualHOAFeesIncreaseRate),
            BasicNumberForm('Parking Fees', 'parkingFees', formData.parkingFees),
            BasicNumberForm('Laundry Services', 'laundryServices', formData.laundryServices),
            BasicNumberForm('Storage Unit Fees', 'storageUnitFees', formData.storageUnitFees),
            BasicNumberForm('Other', 'other', formData.other),
            BasicNumberForm('Depreciation', 'depreciation', formData.depreciation),
            BasicNumberForm('Mortgage Interest', 'mortgageInterest', formData.mortgageInterest),
            BasicNumberForm('Operating Expenses', 'operatingExpenses', formData.operatingExpenses),
            BasicNumberForm('Property Taxes', 'propertyTaxes', formData.propertyTaxes),
        ];

    }

}

