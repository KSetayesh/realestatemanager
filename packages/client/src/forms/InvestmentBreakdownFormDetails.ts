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
import { AddFormTitlesAndLabel, CreateInvestmentScenarioRequest, InvestmentFormData, ListingWithScenariosResponseDTO, ValueInput } from "@realestatemanager/shared";
import { FormInterface } from "./FormInterface";
import { BasicNumberForm, GetOptionsForFormProperty } from "./ReusableFormFields";

export const AddInvestmentBreakdownTitlesAndLabels: AddFormTitlesAndLabel<InvestmentFormData> = {
    downPaymentType: {
        title: 'Down Payment Type',
        name: 'downPaymentType',
    },
    downPaymentPercentage: {
        title: 'Down Payment (%)',
        name: 'downPaymentPercentage',
    },
    pmiRate: {
        title: 'PMI Rate (%)',
        name: "pmiRate"
    },
    pmiDropoffPoint: {
        title: "PMI Dropoff Point",
        name: "pmiDropoffPoint"
    },
    monthlyPropertyTaxType: {
        title: 'Monthly Property Tax Type',
        name: 'monthlyPropertyTaxType',
    },
    monthlyPropertyTax: {
        title: 'Monthly Property Tax',
        name: 'monthlyPropertyTax',
    },
    monthlyHomeInsuranceAmountType: {
        title: 'Monthly Home Insurance Amount Type',
        name: 'monthlyHomeInsuranceAmountType',
    },
    monthlyHomeInsuranceAmount: {
        title: 'Monthly Home Insurance Amount',
        name: 'monthlyHomeInsuranceAmount',
    },
    monthlyHOAFeesAmountType: {
        title: 'Monthly HOA Fees Amount Type',
        name: 'monthlyHOAFeesAmountType',
    },
    monthlyHOAFeesAmount: {
        title: 'Monthly HOA Fees Amount',
        name: 'monthlyHOAFeesAmount',
    },
    annualInterestRate: {
        title: 'Annual Interest Rate (%)',
        name: 'annualInterestRate',
    },
    termInYears: {
        title: 'Term In Years',
        name: 'termInYears',
    },
    interestType: {
        title: 'Interest Type',
        name: 'interestType',
    },
    propertyManagementRate: {
        title: 'Property Management (%)',
        name: 'propertyManagementRate',
    },
    vacancyRate: {
        title: 'Vacancy (%)',
        name: 'vacancyRate',
    },
    maintenanceRate: {
        title: 'Maintenance (%)',
        name: 'maintenanceRate',
    },
    otherExpensesRate: {
        title: 'Other Expenses (%)',
        name: 'otherExpensesRate',
    },
    capExReserveRate: {
        title: 'Cap Ex Reserve (%)',
        name: 'capExReserveRate',
    },
    legalAndProfessionalFeesType: {
        title: 'Legal And Professional Fees Type',
        name: 'legalAndProfessionalFeesType',
    },
    legalAndProfessionalFees: {
        title: 'Legal And Professional Fees (%)',
        name: 'legalAndProfessionalFees',
    },
    initialRepairCostsType: {
        title: 'Initial Repair Costs Type',
        name: 'initialRepairCostsType',
    },
    initialRepairCosts: {
        title: 'Initial Repair Costs (%)',
        name: 'initialRepairCosts',
    },
    travelingCostsType: {
        title: 'Traveling Costs Type',
        name: 'travelingCostsType',
    },
    travelingCosts: {
        title: 'Traveling Costs',
        name: 'travelingCosts',
    },
    closingCostsType: {
        title: 'Closing Costs Type',
        name: 'closingCostsType',
    },
    closingCosts: {
        title: 'Closing Costs',
        name: 'closingCosts',
    },
    otherInitialExpensesType: {
        title: 'Other Initial Expenses Type',
        name: 'otherInitialExpensesType',
    },
    otherInitialExpenses: {
        title: 'Other Initial Expenses (%)',
        name: 'otherInitialExpenses',
    },
    rentEstimate: {
        title: 'Rent Estimate',
        name: 'rentEstimate',
    },
    purchasePrice: {
        title: 'Purchase Price',
        name: 'purchasePrice',
    },
    annualRentIncreaseRate: {
        title: 'Annual Rent Increase Rate (%)',
        name: 'annualRentIncreaseRate',
    },
    annualAppreciationRate: {
        title: 'Annual Appreciation Rate (%)',
        name: 'annualAppreciationRate',
    },
    annualTaxIncreaseRate: {
        title: 'Annual Tax Increase Rate (%)',
        name: 'annualTaxIncreaseRate',
    },
    annualHomeInsuranceIncreaseRate: {
        title: 'Annual Home Insurance Increase Rate (%)',
        name: 'annualHomeInsuranceIncreaseRate',
    },
    annualHOAFeesIncreaseRate: {
        title: 'Annual HOA Fees Increase Rate (%)',
        name: 'annualHOAFeesIncreaseRate',
    },
    parkingFees: {
        title: 'Parking Fees',
        name: 'parkingFees',
    },
    laundryServices: {
        title: 'Laundry Services',
        name: 'laundryServices',
    },
    storageUnitFees: {
        title: 'Storage Unit Fees',
        name: 'storageUnitFees',
    },
    other: {
        title: 'Other',
        name: 'other',
    },
    depreciation: {
        title: 'Depreciation',
        name: 'depreciation',
    },
    mortgageInterest: {
        title: 'Mortgage Interest',
        name: 'mortgageInterest',
    },
    operatingExpenses: {
        title: 'Operating Expenses',
        name: 'operatingExpenses',
    },
    propertyTaxes: {
        title: 'Property Taxes',
        name: 'propertyTaxes',
    }
};

export class AddInvestmentBreakdownTitlesAndLabelsGetter {
    get downPaymentTypeTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.downPaymentType.title;
    }

    get downPaymentTypeName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.downPaymentType.name;
    }

    get downPaymentPercentageTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.downPaymentPercentage.title;
    }

    get downPaymentPercentageName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.downPaymentPercentage.name;
    }

    get pmiRateTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.pmiRate.title;
    }

    get pmiRateName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.pmiRate.name;
    }

    get pmiDropoffPointTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.pmiDropoffPoint.title;
    }

    get pmiDropoffPointName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.pmiDropoffPoint.name;
    }

    get monthlyPropertyTaxTypeTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.monthlyPropertyTaxType.title;
    }

    get monthlyPropertyTaxTypeName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.monthlyPropertyTaxType.name;
    }

    get monthlyPropertyTaxTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.monthlyPropertyTax.title;
    }

    get monthlyPropertyTaxName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.monthlyPropertyTax.name;
    }

    get monthlyHomeInsuranceAmountTypeTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.monthlyHomeInsuranceAmountType.title;
    }

    get monthlyHomeInsuranceAmountTypeName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.monthlyHomeInsuranceAmountType.name;
    }

    get monthlyHomeInsuranceAmountTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.monthlyHomeInsuranceAmount.title;
    }

    get monthlyHomeInsuranceAmountName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.monthlyHomeInsuranceAmount.name;
    }

    get monthlyHOAFeesAmountTypeTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.monthlyHOAFeesAmountType.title;
    }

    get monthlyHOAFeesAmountTypeName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.monthlyHOAFeesAmountType.name;
    }

    get monthlyHOAFeesAmountTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.monthlyHOAFeesAmount.title;
    }

    get monthlyHOAFeesAmountName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.monthlyHOAFeesAmount.name;
    }

    get annualInterestRateTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.annualInterestRate.title;
    }

    get annualInterestRateName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.annualInterestRate.name;
    }

    get termInYearsTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.termInYears.title;
    }

    get termInYearsName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.termInYears.name;
    }

    get interestTypeTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.interestType.title;
    }

    get interestTypeName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.interestType.name;
    }

    get propertyManagementRateTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.propertyManagementRate.title;
    }

    get propertyManagementRateName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.propertyManagementRate.name;
    }

    get vacancyRateTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.vacancyRate.title;
    }

    get vacancyRateName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.vacancyRate.name;
    }

    get maintenanceRateTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.maintenanceRate.title;
    }

    get maintenanceRateName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.maintenanceRate.name;
    }

    get otherExpensesRateTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.otherExpensesRate.title;
    }

    get otherExpensesRateName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.otherExpensesRate.name;
    }

    get capExReserveRateTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.capExReserveRate.title;
    }

    get capExReserveRateName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.capExReserveRate.name;
    }

    get legalAndProfessionalFeesTypeTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.legalAndProfessionalFeesType.title;
    }

    get legalAndProfessionalFeesTypeName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.legalAndProfessionalFeesType.name;
    }

    get legalAndProfessionalFeesTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.legalAndProfessionalFees.title;
    }

    get legalAndProfessionalFeesName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.legalAndProfessionalFees.name;
    }

    get initialRepairCostsTypeTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.initialRepairCostsType.title;
    }

    get initialRepairCostsTypeName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.initialRepairCostsType.name;
    }

    get initialRepairCostsTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.initialRepairCosts.title;
    }

    get initialRepairCostsName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.initialRepairCosts.name;
    }

    get travelingCostsTypeTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.travelingCostsType.title;
    }

    get travelingCostsTypeName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.travelingCostsType.name;
    }

    get travelingCostsTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.travelingCosts.title;
    }

    get travelingCostsName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.travelingCosts.name;
    }

    get closingCostsTypeTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.closingCostsType.title;
    }

    get closingCostsTypeName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.closingCostsType.name;
    }

    get closingCostsTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.closingCosts.title;
    }

    get closingCostsName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.closingCosts.name;
    }

    get otherInitialExpensesTypeTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.otherInitialExpensesType.title;
    }

    get otherInitialExpensesTypeName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.otherInitialExpensesType.name;
    }

    get otherInitialExpensesTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.otherInitialExpenses.title;
    }

    get otherInitialExpensesName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.otherInitialExpenses.name;
    }

    get rentEstimateTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.rentEstimate.title;
    }

    get rentEstimateName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.rentEstimate.name;
    }

    get purchasePriceTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.purchasePrice.title;
    }

    get purchasePriceName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.purchasePrice.name;
    }

    get annualRentIncreaseRateTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.annualRentIncreaseRate.title;
    }

    get annualRentIncreaseRateName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.annualRentIncreaseRate.name;
    }

    get annualAppreciationRateTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.annualAppreciationRate.title;
    }

    get annualAppreciationRateName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.annualAppreciationRate.name;
    }

    get annualTaxIncreaseRateTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.annualTaxIncreaseRate.title;
    }

    get annualTaxIncreaseRateName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.annualTaxIncreaseRate.name;
    }

    get annualHomeInsuranceIncreaseRateTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.annualHomeInsuranceIncreaseRate.title;
    }

    get annualHomeInsuranceIncreaseRateName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.annualHomeInsuranceIncreaseRate.name;
    }

    get annualHOAFeesIncreaseRateTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.annualHOAFeesIncreaseRate.title;
    }

    get annualHOAFeesIncreaseRateName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.annualHOAFeesIncreaseRate.name;
    }

    get parkingFeesTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.parkingFees.title;
    }

    get parkingFeesName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.parkingFees.name;
    }

    get laundryServicesTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.laundryServices.title;
    }

    get laundryServicesName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.laundryServices.name;
    }

    get storageUnitFeesTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.storageUnitFees.title;
    }

    get storageUnitFeesName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.storageUnitFees.name;
    }

    get otherTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.other.title;
    }

    get otherName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.other.name;
    }

    get depreciationTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.depreciation.title;
    }

    get depreciationName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.depreciation.name;
    }

    get mortgageInterestTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.mortgageInterest.title;
    }

    get mortgageInterestName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.mortgageInterest.name;
    }

    get operatingExpensesTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.operatingExpenses.title;
    }

    get operatingExpensesName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.operatingExpenses.name;
    }

    get propertyTaxesTitle(): string {
        return AddInvestmentBreakdownTitlesAndLabels.propertyTaxes.title;
    }

    get propertyTaxesName(): string {
        return AddInvestmentBreakdownTitlesAndLabels.propertyTaxes.name;
    }
}

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
        const getterInstance: AddInvestmentBreakdownTitlesAndLabelsGetter = new AddInvestmentBreakdownTitlesAndLabelsGetter();
        return [
            {
                title: getterInstance.downPaymentPercentageTitle,
                values: [
                    {
                        name: getterInstance.downPaymentTypeName,
                        value: formData.downPaymentType, // Default selected value
                        type: InputType.RADIO,
                        options: GetOptionsForFormProperty(PercentageAndAmount),
                    },
                    {
                        name: getterInstance.downPaymentPercentageName,
                        value: formData.downPaymentPercentage,
                        type: InputType.STRING
                    }
                ]
            },

            {
                title: getterInstance.monthlyPropertyTaxTitle,
                values: [
                    {
                        name: getterInstance.monthlyPropertyTaxTypeName,
                        value: formData.monthlyPropertyTaxType,
                        type: InputType.RADIO,
                        options: GetOptionsForFormProperty(PercentageAndAmount),
                    },
                    {
                        name: getterInstance.monthlyPropertyTaxName,
                        value: formData.monthlyPropertyTax,
                        type: InputType.NUMBER,
                    }
                ]
            },
            {
                title: getterInstance.monthlyHomeInsuranceAmountTitle,
                values: [
                    {
                        name: getterInstance.monthlyHomeInsuranceAmountTypeName,
                        value: formData.monthlyHomeInsuranceAmountType,
                        type: InputType.RADIO,
                        options: GetOptionsForFormProperty(PercentageAndAmount),
                    },
                    {
                        name: getterInstance.monthlyHomeInsuranceAmountName,
                        value: formData.monthlyHomeInsuranceAmount,
                        type: InputType.NUMBER,
                    }
                ]
            },
            {
                title: getterInstance.monthlyHOAFeesAmountTitle,
                values: [
                    {
                        name: getterInstance.monthlyHOAFeesAmountTypeName,
                        value: formData.monthlyHOAFeesAmountType,
                        type: InputType.RADIO,
                        options: GetOptionsForFormProperty(PercentageAndAmount),
                    },
                    {
                        name: getterInstance.monthlyHOAFeesAmountName,
                        value: formData.monthlyHOAFeesAmount,
                        type: InputType.NUMBER,
                    }
                ]
            },
            {
                title: getterInstance.legalAndProfessionalFeesTitle,
                values: [
                    {
                        name: getterInstance.legalAndProfessionalFeesTypeName,
                        value: formData.legalAndProfessionalFeesType,
                        type: InputType.RADIO,
                        options: GetOptionsForFormProperty(PercentageAndAmount),
                    },
                    {
                        name: getterInstance.legalAndProfessionalFeesName,
                        value: formData.legalAndProfessionalFees,
                        type: InputType.NUMBER,
                    }
                ]
            },
            {
                title: getterInstance.initialRepairCostsTitle,
                values: [
                    {
                        name: getterInstance.initialRepairCostsTypeName,
                        value: formData.initialRepairCostsType,
                        type: InputType.RADIO,
                        options: GetOptionsForFormProperty(PercentageAndAmount),
                    },
                    {
                        name: getterInstance.initialRepairCostsName,
                        value: formData.initialRepairCosts,
                        type: InputType.NUMBER,
                    }
                ]
            },
            {
                title: getterInstance.travelingCostsTitle,
                values: [
                    {
                        name: getterInstance.travelingCostsTypeName,
                        value: formData.travelingCostsType,
                        type: InputType.RADIO,
                        options: GetOptionsForFormProperty(PercentageAndAmount),
                    },
                    {
                        name: getterInstance.travelingCostsName,
                        value: formData.travelingCosts,
                        type: InputType.NUMBER,
                    }
                ]
            },
            {
                title: getterInstance.closingCostsTitle,
                values: [
                    {
                        name: getterInstance.closingCostsTypeName,
                        value: formData.closingCostsType,
                        type: InputType.RADIO,
                        options: GetOptionsForFormProperty(PercentageAndAmount),
                    },
                    {
                        name: getterInstance.closingCostsName,
                        value: formData.closingCosts,
                        type: InputType.NUMBER,
                    }
                ]
            },
            {
                title: getterInstance.otherInitialExpensesTitle,
                values: [
                    {
                        name: getterInstance.otherInitialExpensesTypeName,
                        value: formData.otherInitialExpensesType,
                        type: InputType.RADIO,
                        options: GetOptionsForFormProperty(PercentageAndAmount),
                    },
                    {
                        name: getterInstance.otherInitialExpensesName,
                        value: formData.otherInitialExpenses,
                        type: InputType.NUMBER,
                    }
                ]
            },
            BasicNumberForm(
                getterInstance.pmiRateTitle,
                getterInstance.pmiRateName,
                formData.pmiRate
            ),
            BasicNumberForm(
                getterInstance.pmiDropoffPointTitle,
                getterInstance.pmiDropoffPointName,
                formData.pmiDropoffPoint
            ),
            BasicNumberForm(
                getterInstance.annualInterestRateTitle,
                getterInstance.annualInterestRateName,
                formData.annualInterestRate,
                '0.01'
            ),
            BasicNumberForm(
                getterInstance.termInYearsTitle,
                getterInstance.termInYearsName,
                formData.termInYears
            ),
            {
                title: getterInstance.interestTypeTitle,
                values: [
                    {
                        name: getterInstance.interestTypeName,
                        type: InputType.SELECT,
                        value: formData.interestType,
                        options: GetOptionsForFormProperty(InterestType),
                    },
                ],
            },
            BasicNumberForm(
                getterInstance.propertyManagementRateTitle,
                getterInstance.propertyManagementRateName,
                formData.propertyManagementRate
            ),
            BasicNumberForm(
                getterInstance.vacancyRateTitle,
                getterInstance.vacancyRateName,
                formData.vacancyRate
            ),
            BasicNumberForm(
                getterInstance.maintenanceRateTitle,
                getterInstance.maintenanceRateName,
                formData.maintenanceRate
            ),
            BasicNumberForm(
                getterInstance.otherExpensesRateTitle,
                getterInstance.otherExpensesRateName,
                formData.otherExpensesRate
            ),
            BasicNumberForm(
                getterInstance.capExReserveRateTitle,
                getterInstance.capExReserveRateName,
                formData.capExReserveRate
            ),
            BasicNumberForm(
                getterInstance.rentEstimateTitle,
                getterInstance.rentEstimateName,
                formData.rentEstimate
            ),
            BasicNumberForm(
                getterInstance.purchasePriceTitle,
                getterInstance.purchasePriceName,
                formData.purchasePrice
            ),
            BasicNumberForm(
                getterInstance.annualRentIncreaseRateTitle,
                getterInstance.annualRentIncreaseRateName,
                formData.annualRentIncreaseRate
            ),
            BasicNumberForm(
                getterInstance.annualAppreciationRateTitle,
                getterInstance.annualAppreciationRateName,
                formData.annualAppreciationRate
            ),
            BasicNumberForm(
                getterInstance.annualTaxIncreaseRateTitle,
                getterInstance.annualTaxIncreaseRateName,
                formData.annualTaxIncreaseRate
            ),
            BasicNumberForm(
                getterInstance.annualHomeInsuranceIncreaseRateTitle,
                getterInstance.annualHomeInsuranceIncreaseRateName,
                formData.annualHomeInsuranceIncreaseRate
            ),
            BasicNumberForm(
                getterInstance.annualHOAFeesIncreaseRateTitle,
                getterInstance.annualHOAFeesIncreaseRateName,
                formData.annualHOAFeesIncreaseRate
            ),
            BasicNumberForm(
                getterInstance.parkingFeesTitle,
                getterInstance.parkingFeesName,
                formData.parkingFees
            ),
            BasicNumberForm(
                getterInstance.laundryServicesTitle,
                getterInstance.laundryServicesName,
                formData.laundryServices
            ),
            BasicNumberForm(
                getterInstance.storageUnitFeesTitle,
                getterInstance.storageUnitFeesName,
                formData.storageUnitFees
            ),
            BasicNumberForm(
                getterInstance.otherTitle,
                getterInstance.otherName,
                formData.other
            ),
            BasicNumberForm(
                getterInstance.depreciationTitle,
                getterInstance.depreciationName,
                formData.depreciation
            ),
            BasicNumberForm(
                getterInstance.mortgageInterestTitle,
                getterInstance.mortgageInterestName,
                formData.mortgageInterest
            ),
            BasicNumberForm(
                getterInstance.operatingExpensesTitle,
                getterInstance.operatingExpensesName,
                formData.operatingExpenses
            ),
            BasicNumberForm(
                getterInstance.propertyTaxesTitle,
                getterInstance.propertyTaxesName,
                formData.propertyTaxes
            ),
        ];

    }

}

