import { FormProperty, FormPropertyMap } from "../components/StandardForm";
import { InputType, InterestType, PercentageAndAmount } from "../constants/Constant";
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
    // getListingPrice,
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
import { ListingWithScenariosResponseDTO } from "@realestatemanager/shared";
import { FormInterface } from "./FormInterface";
import { BasicNumberForm, GetOptionsForFormProperty } from "./ReusableFormFields";

export type InvestmentFormData = {
    downPayment: FormProperty,
    pmiRate: FormProperty,
    pmiDropoffPoint: FormProperty,
    monthlyPropertyTax: FormProperty,
    monthlyHomeInsuranceAmount: FormProperty,
    monthlyHOAFeesAmount: FormProperty,
    annualInterestRate: FormProperty,
    termInYears: FormProperty,
    interestType: FormProperty,
    propertyManagementRate: FormProperty,
    vacancyRate: FormProperty,
    maintenanceRate: FormProperty,
    otherExpensesRate: FormProperty,
    capExReserveRate: FormProperty,
    legalAndProfessionalFees: FormProperty,
    initialRepairCosts: FormProperty,
    travelingCosts: FormProperty,
    closingCosts: FormProperty,
    otherInitialExpenses: FormProperty,
    rentEstimate: FormProperty,
    purchasePrice: FormProperty,
    annualRentIncreaseRate: FormProperty,
    annualAppreciationRate: FormProperty,
    annualTaxIncreaseRate: FormProperty,
    annualHomeInsuranceIncreaseRate: FormProperty,
    annualHOAFeesIncreaseRate: FormProperty,
    parkingFees: FormProperty,
    laundryServices: FormProperty,
    storageUnitFees: FormProperty,
    other: FormProperty,
    depreciation: FormProperty,
    mortgageInterest: FormProperty,
    operatingExpenses: FormProperty,
    propertyTaxes: FormProperty,
};

export class InvestmentBreakdownFormDetails implements FormInterface<
    InvestmentFormData,
    // CreateInvestmentScenarioRequest,
    ListingWithScenariosResponseDTO
> {

    // createRequest(formData: InvestmentFormData, property: ListingWithScenariosResponseDTO): CreateInvestmentScenarioRequest {

    //     const convertToValueInput = (type: PercentageAndAmount, value: number): ValueInput | undefined => {
    //         if (type === PercentageAndAmount.AMOUNT) {
    //             return {
    //                 type: ValueType.AMOUNT,
    //                 amount: value,
    //             };
    //         }
    //         else if (type === PercentageAndAmount.PERCENTAGE) {
    //             return {
    //                 type: ValueType.RATE,
    //                 rate: value,
    //             };
    //         }
    //     };

    //     const getInterestType = (interestType: string): InterestType | undefined => {
    //         if (InterestType.FIXED === interestType) {
    //             return InterestType.FIXED;
    //         }
    //         else if (InterestType.VARIABLE === interestType) {
    //             return InterestType.VARIABLE;
    //         }
    //     };

    //     return {
    //         useDefaultRequest: false,
    //         propertyIdentifier: {
    //             fullAddress: property.listingDetails.propertyDetails.address?.fullAddress ?? '',
    //             zillowURL: property.listingDetails.zillowURL,
    //         },
    //         investmentDetails: {
    //             mortgageDetails: {
    //                 annualInterestRate: { type: ValueType.RATE, rate: Number(formData.annualInterestRate) },
    //                 termInYears: Number(formData.termInYears),
    //                 interestType: getInterestType(formData.interestType)!,
    //                 downPayment: convertToValueInput(formData.downPaymentType, Number(formData.downPaymentPercentage))!,
    //                 pmiRate: { type: ValueType.RATE, rate: Number(formData.pmiRate) },
    //                 pmiDropoffPoint: Number(formData.pmiDropoffPoint),
    //                 monthlyPropertyTax: convertToValueInput(formData.monthlyPropertyTaxType, Number(formData.monthlyPropertyTax))!,
    //                 monthlyHomeInsuranceAmount: convertToValueInput(formData.monthlyHomeInsuranceAmountType, Number(formData.monthlyHomeInsuranceAmount))!,
    //                 monthlyHOAFeesAmount: convertToValueInput(formData.monthlyHOAFeesAmountType, Number(formData.monthlyHOAFeesAmount))!,
    //             },
    //             operatingExpenses: {
    //                 propertyManagementRate: {
    //                     rate: Number(formData.propertyManagementRate),
    //                     type: ValueType.RATE
    //                 },
    //                 vacancyRate: {
    //                     rate: Number(formData.vacancyRate),
    //                     type: ValueType.RATE,
    //                 },
    //                 maintenanceRate: {
    //                     rate: Number(formData.maintenanceRate),
    //                     type: ValueType.RATE,
    //                 },
    //                 otherExpensesRate: {
    //                     rate: Number(formData.otherExpensesRate),
    //                     type: ValueType.RATE,
    //                 },
    //                 capExReserveRate: {
    //                     rate: Number(formData.capExReserveRate),
    //                     type: ValueType.RATE,
    //                 },
    //                 legalAndProfessionalFees: convertToValueInput(formData.legalAndProfessionalFeesType, Number(formData.legalAndProfessionalFees)),
    //                 initialRepairCosts: convertToValueInput(formData.initialRepairCostsType, Number(formData.initialRepairCosts)),
    //                 travelingCosts: convertToValueInput(formData.travelingCostsType, Number(formData.travelingCosts)),
    //                 closingCosts: convertToValueInput(formData.closingCostsType, Number(formData.closingCosts)),
    //                 otherInitialExpenses: convertToValueInput(formData.otherInitialExpensesType, Number(formData.otherInitialExpenses)),
    //             },
    //             rentEstimate: {
    //                 amount: Number(formData.rentEstimate),
    //                 type: ValueType.AMOUNT,
    //             },
    //             purchasePrice: { type: ValueType.AMOUNT, amount: Number(formData.purchasePrice) },
    //             growthProjections: {
    //                 annualRentIncreaseRate: {
    //                     rate: Number(formData.annualRentIncreaseRate),
    //                     type: ValueType.RATE,
    //                 },
    //                 annualAppreciationRate: {
    //                     rate: Number(formData.annualAppreciationRate),
    //                     type: ValueType.RATE,
    //                 },
    //                 annualTaxIncreaseRate: {
    //                     rate: Number(formData.annualTaxIncreaseRate),
    //                     type: ValueType.RATE,
    //                 },
    //                 annualHomeInsuranceIncreaseRate: {
    //                     rate: Number(formData.annualHomeInsuranceIncreaseRate),
    //                     type: ValueType.RATE,
    //                 },
    //                 annualHOAFeesIncreaseRate: {
    //                     rate: Number(formData.annualHOAFeesIncreaseRate),
    //                     type: ValueType.RATE,
    //                 },
    //             },
    //             additionalIncomeStreams: {
    //                 parkingFees: {
    //                     amount: Number(formData.parkingFees),
    //                     type: ValueType.AMOUNT,
    //                 },
    //                 laundryServices: {
    //                     amount: Number(formData.laundryServices),
    //                     type: ValueType.AMOUNT,
    //                 },
    //                 storageUnitFees: {
    //                     amount: Number(formData.storageUnitFees),
    //                     type: ValueType.AMOUNT,
    //                 },
    //                 other: {
    //                     amount: Number(formData.other),
    //                     type: ValueType.AMOUNT,
    //                 },
    //             },
    //             taxImplications: {
    //                 depreciation: Number(formData.depreciation),
    //                 mortgageInterest: Number(formData.mortgageInterest),
    //                 operatingExpenses: Number(formData.operatingExpenses),
    //                 propertyTaxes: Number(formData.propertyTaxes),
    //             },
    //         },
    //     };
    // }

    // // Create a state to store the form data.
    // getDefaultFormData(property: ListingWithScenariosResponseDTO): InvestmentFormData {
    //     return {
    //         downPaymentType: PercentageAndAmount.PERCENTAGE,
    //         downPaymentPercentage: getDownPaymentPercentage(property),
    //         pmiRate: getPMIRate(property),
    //         pmiDropoffPoint: getPMIDropoffPoint(property),
    //         monthlyPropertyTaxType: PercentageAndAmount.AMOUNT,
    //         monthlyPropertyTax: getMonthlyPropertyTax(property),
    //         monthlyHomeInsuranceAmountType: PercentageAndAmount.AMOUNT,
    //         monthlyHomeInsuranceAmount: getMonthlyHomeInsuranceAmount(property),
    //         monthlyHOAFeesAmountType: PercentageAndAmount.AMOUNT,
    //         monthlyHOAFeesAmount: getMonthlyHOAFeesAmount(property),
    //         annualInterestRate: getAnnualInterestRate(property),
    //         termInYears: getTermInYears(property),
    //         interestType: getInterestType(property),
    //         propertyManagementRate: getPropertyManagementRate(property),
    //         vacancyRate: getVacancyRate(property),
    //         maintenanceRate: getMaintenanceRate(property),
    //         otherExpensesRate: getOtherExpensesRate(property),
    //         capExReserveRate: getCapExReserveRate(property),
    //         legalAndProfessionalFeesType: PercentageAndAmount.AMOUNT,
    //         legalAndProfessionalFees: getLegalAndProfessionalFees(property),
    //         initialRepairCostsType: PercentageAndAmount.AMOUNT,
    //         initialRepairCosts: getInitialRepairCosts(property),
    //         travelingCostsType: PercentageAndAmount.AMOUNT,
    //         travelingCosts: getTravelingCosts(property),
    //         closingCostsType: PercentageAndAmount.AMOUNT,
    //         closingCosts: getClosingCosts(property),
    //         otherInitialExpensesType: PercentageAndAmount.AMOUNT,
    //         otherInitialExpenses: getOtherInitialExpenses(property),
    //         rentEstimate: getRentEstimate(property),
    //         purchasePrice: getPrice(property),
    //         annualRentIncreaseRate: getAnnualRentIncreaseRate(property),
    //         annualAppreciationRate: getAnnualAppreciationRate(property),
    //         annualTaxIncreaseRate: getAnnualTaxIncreaseRate(property),
    //         annualHomeInsuranceIncreaseRate: getAnnualHomeInsuranceIncreaseRate(property),
    //         annualHOAFeesIncreaseRate: getAnnualHOAFeesIncreaseRate(property),
    //         parkingFees: getParkingFees(property),
    //         laundryServices: getLaundryServices(property),
    //         storageUnitFees: getStorageUnitFees(property),
    //         other: getOtherAdditionalIncomeStreams(property),
    //         depreciation: getTaxDepreciation(property),
    //         mortgageInterest: getMortgageInterest(property),
    //         operatingExpenses: getOperatingExpenses(property),
    //         propertyTaxes: getPropertyTaxes(property),
    //         // setNewDefaultValues: false,
    //     };
    // }

    // Come back to this
    getFormDetails(property: ListingWithScenariosResponseDTO): FormPropertyMap<InvestmentFormData> {
        return {
            downPayment: {
                title: 'Down Payment (%)',
                values: {
                    downPaymentType: {
                        name: 'downPaymentType',
                        // value: formData.downPaymentType, // Default selected value
                        type: InputType.RADIO,
                        defaultValue: PercentageAndAmount.PERCENTAGE,
                        value: undefined,
                        options: GetOptionsForFormProperty(PercentageAndAmount),
                    },

                    downPaymentPercentage: {
                        name: 'downPaymentPercentage',
                        // value: formData.downPaymentPercentage,
                        defaultValue: getDownPaymentPercentage(property),
                        value: undefined,
                        type: InputType.STRING
                    }
                },
            },
            monthlyPropertyTax: {
                title: 'Monthly Property Tax',
                values: {
                    monthlyPropertyTaxType: {
                        name: 'monthlyPropertyTaxType',
                        // value: formData.monthlyPropertyTaxType,
                        type: InputType.RADIO,
                        defaultValue: PercentageAndAmount.AMOUNT,
                        value: undefined,
                        options: GetOptionsForFormProperty(PercentageAndAmount),
                    },
                    monthlyPropertyTax: {
                        name: 'monthlyPropertyTax',
                        // value: formData.monthlyPropertyTax,
                        defaultValue: getMonthlyPropertyTax(property),
                        value: undefined,
                        type: InputType.NUMBER,
                    }
                }
            },
            monthlyHomeInsuranceAmount: {
                title: 'Monthly Home Insurance Amount',
                values: {
                    monthlyHomeInsuranceAmountType: {
                        name: 'monthlyHomeInsuranceAmountType',
                        // value: formData.monthlyHomeInsuranceAmountType,
                        type: InputType.RADIO,
                        defaultValue: PercentageAndAmount.AMOUNT,
                        value: undefined,
                        options: GetOptionsForFormProperty(PercentageAndAmount),
                    },
                    monthlyHomeInsuranceAmount: {
                        name: 'monthlyHomeInsuranceAmount',
                        // value: formData.monthlyHomeInsuranceAmount,
                        defaultValue: getMonthlyHomeInsuranceAmount(property),
                        value: undefined,
                        type: InputType.NUMBER,
                    }
                }
            },
            monthlyHOAFeesAmount: {
                title: 'Monthly HOA Fees Amount',
                values: {
                    monthlyHOAFeesAmountType: {
                        name: 'monthlyHOAFeesAmountType',
                        // value: formData.monthlyHOAFeesAmountType,
                        type: InputType.RADIO,
                        defaultValue: PercentageAndAmount.AMOUNT,
                        value: undefined,
                        options: GetOptionsForFormProperty(PercentageAndAmount),
                    },
                    monthlyHOAFeesAmount: {
                        name: 'monthlyHOAFeesAmount',
                        // value: formData.monthlyHOAFeesAmount,
                        defaultValue: getMonthlyHOAFeesAmount(property),
                        value: undefined,
                        type: InputType.NUMBER,
                    }
                }
            },
            legalAndProfessionalFees: {
                title: 'Legal And Professional Fees (%)',
                values: {
                    legalAndProfessionalFeesType: {
                        name: 'legalAndProfessionalFeesType',
                        // value: formData.legalAndProfessionalFeesType,
                        type: InputType.RADIO,
                        defaultValue: PercentageAndAmount.AMOUNT,
                        value: undefined,
                        options: GetOptionsForFormProperty(PercentageAndAmount),
                    },
                    legalAndProfessionalFees: {
                        name: 'legalAndProfessionalFees',
                        // value: formData.legalAndProfessionalFees,
                        defaultValue: getLegalAndProfessionalFees(property),
                        value: undefined,
                        type: InputType.NUMBER,
                    }
                }
            },
            initialRepairCosts: {
                title: 'Initial Repair Costs (%)',
                values: {
                    initialRepairCostsType: {
                        name: 'initialRepairCostsType',
                        // value: formData.initialRepairCostsType,
                        type: InputType.RADIO,
                        defaultValue: PercentageAndAmount.AMOUNT,
                        value: undefined,
                        options: GetOptionsForFormProperty(PercentageAndAmount),
                    },
                    initialRepairCosts: {
                        name: 'initialRepairCosts',
                        // value: formData.initialRepairCosts,
                        defaultValue: getInitialRepairCosts(property),
                        value: undefined,
                        type: InputType.NUMBER,
                    }
                }
            },
            travelingCosts: {
                title: 'Traveling Costs',
                values: {
                    travelingCostsType: {
                        name: 'travelingCostsType',
                        // value: formData.travelingCostsType,
                        type: InputType.RADIO,
                        defaultValue: PercentageAndAmount.AMOUNT,
                        value: undefined,
                        options: GetOptionsForFormProperty(PercentageAndAmount),
                    },
                    travelingCosts: {
                        name: 'travelingCosts',
                        // value: formData.travelingCosts,
                        defaultValue: getTravelingCosts(property),
                        value: undefined,
                        type: InputType.NUMBER,
                    }
                }
            },
            closingCosts: {
                title: 'Closing Costs',
                values: {
                    closingCostsType: {
                        name: 'closingCostsType',
                        // value: formData.closingCostsType,
                        type: InputType.RADIO,
                        defaultValue: PercentageAndAmount.AMOUNT,
                        value: undefined,
                        options: GetOptionsForFormProperty(PercentageAndAmount),
                    },
                    closingCosts: {
                        name: 'closingCosts',
                        // value: formData.closingCosts,
                        defaultValue: getClosingCosts(property),
                        value: undefined,
                        type: InputType.NUMBER,
                    }
                }
            },
            otherInitialExpenses: {
                title: 'Other Initial Expenses (%)',
                values: {
                    otherInitialExpensesType: {
                        name: 'otherInitialExpensesType',
                        // value: formData.otherInitialExpensesType,
                        type: InputType.RADIO,
                        defaultValue: PercentageAndAmount.AMOUNT,
                        value: undefined,
                        options: GetOptionsForFormProperty(PercentageAndAmount),
                    },
                    otherInitialExpenses: {
                        name: 'otherInitialExpenses',
                        // value: formData.otherInitialExpenses,
                        defaultValue: getOtherInitialExpenses(property),
                        value: undefined,
                        type: InputType.NUMBER,
                    }
                },
            },
            pmiRate: BasicNumberForm(
                'PMI Rate (%)',
                'pmiRate',
                // formData.pmiRate,
                getPMIRate(property),
            ),
            pmiDropoffPoint: BasicNumberForm(
                'PMI Dropoff Point',
                'pmiDropoffPoint',
                // formData.pmiDropoffPoint,
                getPMIDropoffPoint(property),
            ),
            annualInterestRate: BasicNumberForm(
                'Annual Interest Rate (%)',
                'annualInterestRate',
                // formData.annualInterestRate,
                getAnnualInterestRate(property),
                '0.01'
            ),
            termInYears: BasicNumberForm(
                'Term In Years',
                'termInYears',
                // formData.termInYears,
                getTermInYears(property),
            ),
            interestType: {
                title: 'Interest Type',
                values: {
                    interestType: {
                        name: 'interestType',
                        type: InputType.SELECT,
                        // value: formData.interestType,
                        defaultValue: getInterestType(property),
                        value: undefined,
                        options: GetOptionsForFormProperty(InterestType),
                    },
                },
            },
            propertyManagementRate: BasicNumberForm(
                'Property Management (%)',
                'propertyManagementRate',
                // formData.propertyManagementRate,
                getPropertyManagementRate(property),
            ),
            vacancyRate: BasicNumberForm(
                'Vacancy (%)',
                'vacancyRate',
                // formData.vacancyRate,
                getVacancyRate(property),
            ),
            maintenanceRate: BasicNumberForm(
                'Maintenance (%)',
                'maintenanceRate',
                // formData.maintenanceRate,
                getMaintenanceRate(property),
            ),
            otherExpensesRate: BasicNumberForm(
                'Other Expenses (%)',
                'otherExpensesRate',
                // formData.otherExpensesRate,
                getOtherExpensesRate(property),
            ),
            capExReserveRate: BasicNumberForm(
                'Cap Ex Reserve (%)',
                'capExReserveRate',
                // formData.capExReserveRate,
                getCapExReserveRate(property),
            ),
            rentEstimate: BasicNumberForm(
                'Rent Estimate',
                'rentEstimate',
                // formData.rentEstimate,
                getRentEstimate(property),
            ),
            purchasePrice: BasicNumberForm(
                'Purchase Price',
                'purchasePrice',
                // formData.purchasePrice,
                getPrice(property),
            ),
            annualRentIncreaseRate: BasicNumberForm(
                'Annual Rent Increase Rate (%)',
                'annualRentIncreaseRate',
                // formData.annualRentIncreaseRate,
                getAnnualRentIncreaseRate(property),
            ),
            annualAppreciationRate: BasicNumberForm(
                'Annual Appreciation Rate (%)',
                'annualAppreciationRate',
                // formData.annualAppreciationRate,
                getAnnualAppreciationRate(property),
            ),
            annualTaxIncreaseRate: BasicNumberForm(
                'Annual Tax Increase Rate (%)',
                'annualTaxIncreaseRate',
                // formData.annualTaxIncreaseRate,
                getAnnualTaxIncreaseRate(property),
            ),
            annualHomeInsuranceIncreaseRate: BasicNumberForm(
                'Annual Home Insurance Increase Rate (%)',
                'annualHomeInsuranceIncreaseRate',
                // formData.annualHomeInsuranceIncreaseRate,
                getAnnualHomeInsuranceIncreaseRate(property),
            ),
            annualHOAFeesIncreaseRate: BasicNumberForm(
                'Annual HOA Fees Increase Rate (%)',
                'annualHOAFeesIncreaseRate',
                // formData.annualHOAFeesIncreaseRate,
                getAnnualHOAFeesIncreaseRate(property),
            ),
            parkingFees: BasicNumberForm(
                'Parking Fees',
                'parkingFees',
                // formData.parkingFees,
                getParkingFees(property),
            ),
            laundryServices: BasicNumberForm(
                'Laundry Services',
                'laundryServices',
                // formData.laundryServices,
                getLaundryServices(property),
            ),
            storageUnitFees: BasicNumberForm(
                'Storage Unit Fees',
                'storageUnitFees',
                // formData.storageUnitFees,
                getStorageUnitFees(property),
            ),
            other: BasicNumberForm(
                'Other',
                'other',
                // formData.other,
                getOtherAdditionalIncomeStreams(property),
            ),
            depreciation: BasicNumberForm(
                'Depreciation',
                'depreciation',
                // formData.depreciation,
                getTaxDepreciation(property),
            ),
            mortgageInterest: BasicNumberForm(
                'Mortgage Interest',
                'mortgageInterest',
                // formData.mortgageInterest,
                getMortgageInterest(property),
            ),
            operatingExpenses: BasicNumberForm(
                'Operating Expenses',
                'operatingExpenses',
                // formData.operatingExpenses,
                getOperatingExpenses(property),
            ),
            propertyTaxes: BasicNumberForm(
                'Property Taxes',
                'propertyTaxes',
                // formData.propertyTaxes,
                getPropertyTaxes(property),
            ),
        };

    }

}

