import { FormProperty } from "../components/StandardForm";
import { InputType } from "../constants/Constant";
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
import {
    AddInvestmentBreakdownTitlesAndLabelsGetter,
    CreateInvestmentScenarioRequest,
    InterestType,
    InvestmentFormData,
    ListingWithScenariosResponseDTO,
    PercentageAndAmount,
    ValueInput,
    ValueType
} from "@realestatemanager/shared";
import { FormInterface } from "./FormInterface";
import { BasicNumberForm, GetOptionsForFormProperty } from "./ReusableFormFields";

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

