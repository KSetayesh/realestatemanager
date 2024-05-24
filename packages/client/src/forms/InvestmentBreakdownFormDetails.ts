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

    getFormDetails(formData: InvestmentFormData): FormProperty[] {
        return [
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
                title: 'Annual Home Insurance Increase Rate (%)',
                name: 'annualHomeInsuranceIncreaseRate',
                value: formData.annualHomeInsuranceIncreaseRate,
                type: InputType.NUMBER,
            },
            {
                title: 'Annual HOA Fees Increase Rate (%)',
                name: 'annualHOAFeesIncreaseRate',
                value: formData.annualHOAFeesIncreaseRate,
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
    }

}

