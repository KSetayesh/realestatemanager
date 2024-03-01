import { AdditionalIncomeStreamsDTO, DefaultInvestmentRates, GrowthProjectionsDTO, InvestmentScenarioDTO, InvestmentScenarioRequestDTO, MortgageDetailsDTO, OperatingExpensesDTO, Utility } from "@realestatemanager/shared";
import { ListingDetails } from "../models/listingdetails.model";
import { InvestmentScenario } from "../new_models/investment.scenario.model";
import { getAmountFromValueInput, getInterestTypeEnumValue } from "src/shared/Constants";
import { EquityBreakdown } from "../new_models/equity.breakdown.model";
import { GrowthProjections } from "../models/growthprojections.model";
import { InitialCostsBreakdown } from "../new_models/initialcosts.model";
import { MortgageCalculator } from "../new_models/mortgage.calc.model";
import { TaxImplications } from "../new_models/tax.implications.model";

export class InvestmentMetricBuilder {

    private listingDetails: ListingDetails;
    private investmentScenarioRequest?: InvestmentScenarioRequestDTO;

    constructor(listingDetails: ListingDetails, investmentScenarioRequest?: InvestmentScenarioRequestDTO) {
        this.listingDetails = listingDetails;
        this.investmentScenarioRequest = investmentScenarioRequest;
    }

    build(): InvestmentScenario {
        if (!this.investmentScenarioRequest || this.investmentScenarioRequest.useDefaultRequest) {
            return this.createDefaultInvestmentScenario();
        }
        return this.createInvestmentScenario();
    }

    private _createInvestmentScenario(): InvestmentScenario {
        const investmentScenarioRequest: InvestmentScenarioDTO = this.investmentScenarioRequest.investmentScenario;

        const mortgageDetailsDTO: MortgageDetailsDTO = investmentScenarioRequest.mortgageDetails;
        const loanAmount = mortgageDetailsDTO.loanAmount;
        const annualInterestRate = mortgageDetailsDTO.annualInterestRate;
        const termInYears = mortgageDetailsDTO.termInYears;
        const interestType = mortgageDetailsDTO.interestType;
        const downPaymentPercentage = mortgageDetailsDTO.downPaymentPercentage;
        const pmiRate = mortgageDetailsDTO.pmiRate;
        const pmiDropoffPoint = mortgageDetailsDTO.pmiDropoffPoint;
        const monthlyPropertyTax = getAmountFromValueInput(mortgageDetailsDTO.monthlyPropertyTax);
        const monthlyHomeInsuranceAmount = getAmountFromValueInput(mortgageDetailsDTO.monthlyHomeInsuranceAmount);
        const monthlyHOAFeesAmount = getAmountFromValueInput(mortgageDetailsDTO.monthlyHOAFeesAmount);

        const operatingExpensesDTO: OperatingExpensesDTO = investmentScenarioRequest.operatingExpenses;
        const propertyManagementRate = operatingExpensesDTO.propertyManagementRate;
        const vacancyRate = operatingExpensesDTO.vacancyRate;
        const maintenanceRate = operatingExpensesDTO.maintenanceRate;
        const otherExpensesRate = operatingExpensesDTO.otherExpensesRate;
        const capExReserveRate = operatingExpensesDTO.capExReserveRate;
        const legalAndProfessionalFees = getAmountFromValueInput(operatingExpensesDTO.legalAndProfessionalFees);
        const initialRepairCosts = getAmountFromValueInput(operatingExpensesDTO.initialRepairCosts);
        const travelingCosts = getAmountFromValueInput(operatingExpensesDTO.travelingCosts);
        const closingCosts = getAmountFromValueInput(operatingExpensesDTO.closingCosts);
        const otherInitialExpenses = getAmountFromValueInput(operatingExpensesDTO.otherInitialExpenses);

        const rentEstimate = investmentScenarioRequest.rentEstimate;
        const purchasePrice = investmentScenarioRequest.purchasePrice;

        const growthProjectionsDTO: GrowthProjectionsDTO = investmentScenarioRequest.growthProjections;
        const annualRentIncreaseRate = growthProjectionsDTO.annualRentIncreaseRate;
        const annualAppreciationRate = growthProjectionsDTO.annualAppreciationRate;
        const annualTaxIncreaseRate = growthProjectionsDTO.annualTaxIncreaseRate;

        const additionalIncomeStreamsDTO: AdditionalIncomeStreamsDTO = investmentScenarioRequest.additionalIncomeStreams;
        const parkingFees = additionalIncomeStreamsDTO.breakdown.parkingFees;
        const laundryServices = additionalIncomeStreamsDTO.breakdown.laundryServices;
        const storageUnitFees = additionalIncomeStreamsDTO.breakdown.storageUnitFees;
        const other = additionalIncomeStreamsDTO.breakdown.other;


        const equityBreakdown: EquityBreakdown = new EquityBreakdown();
        const growthProjections: GrowthProjections;
        const initialCostsBreakdown: InitialCostsBreakdown;
        const mortgageCalculator: MortgageCalculator;
        const taxImplications: TaxImplications;



        return null;
    }

    private createInvestmentScenario(): InvestmentScenario {
        const investmentScenarioRequest: InvestmentScenarioDTO = this.investmentScenarioRequest.investmentScenario;
        const loanAmount = investmentScenarioRequest.mortgageDetails.loanAmount;
        const annualInterestRate = investmentScenarioRequest.mortgageDetails.annualInterestRate;
        const termInYears = investmentScenarioRequest.mortgageDetails.termInYears;
        const interestType = investmentScenarioRequest.mortgageDetails.interestType;
        const downPaymentPercentage = investmentScenarioRequest.mortgageDetails.downPaymentPercentage;
        const pmiRate = investmentScenarioRequest.mortgageDetails.pmiRate;
        const pmiDropoffPoint = investmentScenarioRequest.mortgageDetails.pmiDropoffPoint;
        const monthlyPropertyTaxAmount = getAmountFromValueInput(investmentScenarioRequest.mortgageDetails.monthlyPropertyTax);
        const monthlyHomeInsuranceAmount = getAmountFromValueInput(investmentScenarioRequest.mortgageDetails.monthlyHomeInsuranceAmount);
        const monthlyHOAFeesAmount = getAmountFromValueInput(investmentScenarioRequest.mortgageDetails.monthlyHOAFeesAmount);

        const mortgageDetails: MortgageDetails = new MortgageDetails(
            loanAmount,
            annualInterestRate,
            termInYears,
            interestType,
            downPaymentPercentage,
            pmiRate,
            pmiDropoffPoint,
            monthlyPropertyTaxAmount,
            monthlyHomeInsuranceAmount,
            monthlyHOAFeesAmount
        );

        const annualAppreciationRate = investmentScenarioRequest.growthProjections.annualAppreciationRate;
        const annualTaxIncreaseRate = investmentScenarioRequest.growthProjections.annualTaxIncreaseRate;
        const annualRentIncreaseRate = investmentScenarioRequest.growthProjections.annualRentIncreaseRate;

        const growthProjections: GrowthProjections = new GrowthProjections(
            annualAppreciationRate,
            annualTaxIncreaseRate,
            annualRentIncreaseRate
        );

        const propertyManagementRate = investmentScenarioRequest.operatingExpenses.propertyManagementRate;
        const vacancyRate = investmentScenarioRequest.operatingExpenses.vacancyRate;
        const maintenanceRate = investmentScenarioRequest.operatingExpenses.maintenanceRate;
        const otherExpensesRate = investmentScenarioRequest.operatingExpenses.otherExpensesRate;
        const capExReserveRate = investmentScenarioRequest.operatingExpenses.capExReserveRate;
        const legalAndProfessionalFees = getAmountFromValueInput(investmentScenarioRequest.operatingExpenses.legalAndProfessionalFees);
        const initialRepairCosts = getAmountFromValueInput(investmentScenarioRequest.operatingExpenses.initialRepairCosts);
        const travelingCosts = getAmountFromValueInput(investmentScenarioRequest.operatingExpenses.travelingCosts);
        const closingCosts = getAmountFromValueInput(investmentScenarioRequest.operatingExpenses.closingCosts);
        const otherInitialExpenses = getAmountFromValueInput(investmentScenarioRequest.operatingExpenses.otherInitialExpenses);

        const operatingExpenses: OperatingExpenses = new OperatingExpenses(
            propertyManagementRate,
            vacancyRate,
            maintenanceRate,
            otherExpensesRate,
            capExReserveRate,
            legalAndProfessionalFees,
            initialRepairCosts,
            travelingCosts,
            closingCosts,
            otherInitialExpenses,
        );

        const rentEstimate = investmentScenarioRequest.rentEstimate;
        const purchasePrice = investmentScenarioRequest.purchasePrice;

        const parkingFees = investmentScenarioRequest.additionalIncomeStreams.breakdown.parkingFees;
        const laundryServices = investmentScenarioRequest.additionalIncomeStreams.breakdown.laundryServices;
        const storageUnitFees = investmentScenarioRequest.additionalIncomeStreams.breakdown.storageUnitFees;
        const other = investmentScenarioRequest.additionalIncomeStreams.breakdown.other;

        const additionalIncomeStreams: AdditionalIncomeStreams = new AdditionalIncomeStreams(
            parkingFees,
            laundryServices,
            storageUnitFees,
            other,
        );

        const investmentScenario: InvestmentScenario = new InvestmentScenario(
            mortgageDetails,
            growthProjections,
            operatingExpenses,
            additionalIncomeStreams,
            rentEstimate,
            purchasePrice,
        );

        return investmentScenario;
    }

    private createDefaultInvestmentScenario(): InvestmentScenario {
        const rentEstimate = this.listingDetails.getZillowRentEstimate();
        const purchasePrice = this.listingDetails.getListingPrice();
        const annualInterestRate = DefaultInvestmentRates.ANNUAL_INTEREST_RATE;
        const termInYears = DefaultInvestmentRates.TERM_IN_YEARS;
        const interestType = getInterestTypeEnumValue(DefaultInvestmentRates.INTEREST_TYPE);
        const downPaymentPercentage = DefaultInvestmentRates.DOWN_PAYMENT_PERCENTAGE;

        // Move this code somewhere else
        const loanAmount = Utility.round(purchasePrice * (1 - (downPaymentPercentage / 100)));

        const pmiRate = DefaultInvestmentRates.PMI_RATE;
        const pmiDropoffPoint = DefaultInvestmentRates.PMI_DROP_OFF_POINT;
        const monthlyPropertyTaxAmount = this.listingDetails.getZillowMonthlyPropertyTaxAmount();
        const monthlyHomeInsuranceAmount = this.listingDetails.getZillowMonthlyHomeInsuranceAmount();
        const monthlyHOAFeesAmount = this.listingDetails.getZillowMonthlyHOAFeesAmount();

        const mortgageDetails: MortgageDetails = new MortgageDetails(
            loanAmount,
            annualInterestRate,
            termInYears,
            interestType,
            downPaymentPercentage,
            pmiRate,
            pmiDropoffPoint,
            monthlyPropertyTaxAmount,
            monthlyHomeInsuranceAmount,
            monthlyHOAFeesAmount,
        );

        const annualAppreciationRate = DefaultInvestmentRates.ANNUAL_APPRECIATION_RATE;
        const annualTaxIncreaseRate = DefaultInvestmentRates.ANNUAL_TAX_INCREASE_RATE;
        const annualRentIncreaseRate = DefaultInvestmentRates.ANNUAL_RENT_INCREASE_RATE;

        const growthProjections: GrowthProjections = new GrowthProjections(
            annualAppreciationRate,
            annualTaxIncreaseRate,
            annualRentIncreaseRate,
        );

        const propertyManagementRate = DefaultInvestmentRates.PROPERTY_MANAGEMENT_RATE;
        const vacancyRate = DefaultInvestmentRates.VACANCY_RATE;
        const maintenanceRate = DefaultInvestmentRates.MAINTENANCE_RATE;
        const otherExpensesRate = DefaultInvestmentRates.OTHER_EXPENSES_RATE;
        const capExReserveRate = DefaultInvestmentRates.CAP_EX_RESERVE_RATE;
        const legalAndProfessionalFees = DefaultInvestmentRates.LEGAL_AND_PROFESSIONAL_FEES;
        const initialRepairCosts = DefaultInvestmentRates.INITIAL_REPAIR_COSTS;
        const travelingCosts = DefaultInvestmentRates.TRAVELING_COSTS;
        const closingCosts = DefaultInvestmentRates.CLOSING_COSTS;
        const otherInitialExpenses = DefaultInvestmentRates.OTHER_INITIAL_EXPENSES;

        const operatingExpenses: OperatingExpenses = new OperatingExpenses(
            propertyManagementRate,
            vacancyRate,
            maintenanceRate,
            otherExpensesRate,
            capExReserveRate,
            legalAndProfessionalFees,
            initialRepairCosts,
            travelingCosts,
            closingCosts,
            otherInitialExpenses,
        );

        const parkingFees = DefaultInvestmentRates.PARKING_FEES;
        const laundryServices = DefaultInvestmentRates.LAUNDRY_SERVICES;
        const storageUnitFees = DefaultInvestmentRates.STORAGE_UNIT_FEES;
        const other = DefaultInvestmentRates.OTHER;

        const additionalIncomeStreams: AdditionalIncomeStreams = new AdditionalIncomeStreams(
            parkingFees,
            laundryServices,
            storageUnitFees,
            other,
        );

        const investmentScenario: InvestmentScenario = new InvestmentScenario(
            mortgageDetails,
            growthProjections,
            operatingExpenses,
            additionalIncomeStreams,
            rentEstimate,
            purchasePrice,
        );

        return investmentScenario;
    }

}