import { FormProperty } from "../components/StandardForm";
import { AgentFormData } from "../pages/AgentForm";
import { HighYieldSavingsFormData } from "../pages/HighYieldSavings";
import { InvestmentFormData } from "../pages/InvestmentBreakdown";
import { PropertyFilterFormFields } from "../pages/PropertiesList";
import { AgentType, Country, InputType, InterestType, PropertyType, State } from "./Constant";

export const getAgentFormDetails = (formData: AgentFormData): FormProperty[] => {
    return [
        {
            title: 'First Name',
            name: 'firstName',
            value: formData.firstName,
            type: InputType.STRING,
        },
        {
            title: 'Last Name',
            name: 'lastName',
            value: formData.lastName,
            type: InputType.STRING,
        },
        {
            title: 'Website',
            name: 'website',
            value: formData.website!,
            type: InputType.STRING,
        },
        {
            title: 'Company Name',
            name: 'companyName',
            value: formData.companyName,
            type: InputType.STRING,
        },
        {
            title: 'Phone Number',
            name: 'phoneNumber',
            value: formData.phoneNumber,
            type: InputType.STRING,
        },
        {
            title: 'Email',
            name: 'email',
            value: formData.email,
            type: InputType.STRING,
        },
        {
            title: 'Country',
            name: 'country',
            value: formData.country,
            type: InputType.SELECT,
            options: Object.values(Country).map((enumValue => {
                return {
                    value: enumValue,
                    label: enumValue,
                };
            })),
        },
        {
            title: 'State',
            name: 'state',
            value: formData.state,
            type: InputType.SELECT,
            options: Object.values(State).map((enumValue => {
                return {
                    value: enumValue,
                    label: enumValue,
                };
            })),
        },
        {
            title: 'Agent Type',
            name: 'agentType',
            value: formData.agentType,
            type: InputType.SELECT,
            options: Object.values(AgentType).map((enumValue => {
                return {
                    value: enumValue,
                    label: enumValue,
                };
            })),
        },
    ];
};

export const getHighYieldSavingsFormDetails = (formData: HighYieldSavingsFormData): FormProperty[] => {
    return [
        {
            title: 'Initial Deposit',
            name: 'initialDeposit',
            value: formData.initialDeposit,
            type: InputType.NUMBER,
        },
        {
            title: 'Annual Interest Rate (%)',
            name: 'annualInterestRate',
            value: formData.annualInterestRate,
            type: InputType.NUMBER,
        },
        {
            title: 'Years',
            name: 'years',
            value: formData.years,
            type: InputType.NUMBER,
        },
        {
            title: 'Monthly Deposit',
            name: 'monthlyDeposit',
            value: formData.monthlyDeposit ?? 0,
            type: InputType.NUMBER,
        },
    ];
};

export const getInvestmentBreakdownFormDetails = (formData: InvestmentFormData): FormProperty[] => {
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
};

export const getPropertiesListFormDetails = (formData: PropertyFilterFormFields): FormProperty[] => {
    return [
        {
            title: 'State',
            name: 'state',
            value: formData?.state,
            type: InputType.SELECT,
            options: Object.values(State).map((enumValue => {
                return {
                    value: enumValue,
                    label: enumValue,
                };
            })),
        },
        {
            title: 'ZipCode',
            name: 'zipCode',
            value: formData?.zipCode,
            type: InputType.STRING,
        },
        {
            title: 'City',
            name: 'city',
            value: formData?.city,
            type: InputType.STRING,
        },
        {
            title: 'Rent Estimate',
            name: 'rentEstimate',
            value: formData?.rentEstimate,
            type: InputType.NUMBER,
            hasFilterOption: true,
        },
        {
            title: 'Listed Price',
            name: 'listedPrice',
            value: formData?.listedPrice,
            type: InputType.NUMBER,
            hasFilterOption: true,
        },
        {
            title: 'Number Of Bedrooms',
            name: 'numberOfBedrooms',
            value: formData?.numberOfBedrooms,
            type: InputType.NUMBER,
            hasFilterOption: true,
        },
        {
            title: 'Number Of Bathrooms',
            name: 'numberOfBathrooms',
            value: formData?.numberOfBathrooms,
            type: InputType.NUMBER,
            hasFilterOption: true,
        },
        {
            title: 'Square Feet',
            name: 'squareFeet',
            value: formData?.squareFeet,
            type: InputType.NUMBER,
            hasFilterOption: true,
        },
        {
            title: 'Year Built',
            name: 'yearBuilt',
            value: formData?.yearBuilt,
            type: InputType.NUMBER,
            hasFilterOption: true,
        },
        {
            title: 'Max Hoa',
            name: 'maxHoa',
            value: formData?.maxHoa,
            type: InputType.NUMBER,
            hasFilterOption: true,
        },
        {
            title: 'Monthly Property Tax Amount',
            name: 'monthlyPropertyTaxAmount',
            value: formData?.monthlyPropertyTaxAmount,
            type: InputType.NUMBER,
            hasFilterOption: true,
        },
        {
            title: 'Home Type',
            name: 'homeType',
            value: formData?.homeType,
            type: InputType.SELECT,
            options: Object.values(PropertyType).map((enumValue => {
                return {
                    value: enumValue,
                    label: enumValue,
                };
            })),
        },
        {
            title: 'Has Garage',
            name: 'hasGarage',
            value: formData?.hasGarage ? "true" : "false",
            type: InputType.CHECKBOX,
            options: [
                {
                    value: 'true',
                    label: 'true'
                },
                {
                    value: 'false',
                    label: 'false'
                }
            ],
        },
        {
            title: 'Has Basement',
            name: 'hasBasement',
            value: formData?.hasBasement ? "true" : "false",
            type: InputType.CHECKBOX,
            options: [
                {
                    value: 'true',
                    label: 'true'
                },
                {
                    value: 'false',
                    label: 'false'
                }
            ],
        },
        {
            title: 'Has Pool',
            name: 'hasPool',
            value: formData?.hasPool ? "true" : "false",
            type: InputType.CHECKBOX,
            options: [
                {
                    value: 'true',
                    label: 'true'
                },
                {
                    value: 'false',
                    label: 'false'
                }
            ],
        },
        {
            title: 'Is Active',
            name: 'isActive',
            value: formData?.isActive ? "true" : "false",
            type: InputType.CHECKBOX,
            options: [
                {
                    value: 'true',
                    label: 'true'
                },
                {
                    value: 'false',
                    label: 'false'
                }
            ],
        },
    ];
};