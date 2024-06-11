import { AddFormTitlesAndLabel, InvestmentFormData } from "../types/ClientTypes";

const AddInvestmentBreakdownTitlesAndLabels: AddFormTitlesAndLabel<InvestmentFormData> = {
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