import { ListingDetails } from "../models/listingdetails.model";
import { InvestmentScenario } from "../new_models/investment.scenario.model";
import { getAmountFromValueInput } from "src/shared/Constants";
import { GrowthProjections } from "../new_models/growth.projections.model";
import { InitialCostsBreakdown } from "../new_models/initialcosts.model";
import { MortgageCalculator } from "../new_models/mortgage.calc.model";
import { TaxImplications } from "../new_models/tax.implications.model";
import {
    AdditionalIncomeStreamsRequest,
    GrowthProjectionsRequest,
    InvestmentScenarioRequest,
    MortgageDetailsRequest,
    OperatingExpensesRequest,
    TaxImplicationsRequest
} from "@realestatemanager/shared";
import { FinancingTerms } from "../new_models/financing.terms.model";
import { FixedMonthlyExpenses } from "../new_models/fixed.monthly.expenses.model";
import { PMIDetails } from "../new_models/pmidetails.model";
import { RecurringMonthlyExpenses } from "../new_models/recurring.monthly.expenses.model";
import { AdditionalIncomeStreams } from "../new_models/additional.income.streams.model";
import { RecurringFinancialActivity } from "../new_models/recurring.monthly.financial.activity.model";
import { Incomes } from "../new_models/incomes.model";
import { RentIncome } from "../new_models/rent.income.model";
import { Expenses } from "../new_models/expenses.model";

export class InvestmentMetricBuilder {

    private listingDetails: ListingDetails;
    private investmentScenarioRequest?: InvestmentScenarioRequest;

    constructor(listingDetails: ListingDetails, investmentScenarioRequest?: InvestmentScenarioRequest) {
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
        const investmentScenarioRequest: InvestmentScenarioRequest = this.investmentScenarioRequest.investmentScenario;

        const mortgageDetailsDTO: MortgageDetailsRequest = investmentScenarioRequest.mortgageDetails;
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

        const operatingExpensesDTO: OperatingExpensesRequest = investmentScenarioRequest.operatingExpenses;
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

        const growthProjectionsDTO: GrowthProjectionsRequest = investmentScenarioRequest.growthProjections;
        const annualRentIncreaseRate = growthProjectionsDTO.annualRentIncreaseRate;
        const annualAppreciationRate = growthProjectionsDTO.annualAppreciationRate;
        const annualTaxIncreaseRate = growthProjectionsDTO.annualTaxIncreaseRate;

        const additionalIncomeStreamsDTO: AdditionalIncomeStreamsRequest = investmentScenarioRequest.additionalIncomeStreams;
        const parkingFees = additionalIncomeStreamsDTO.parkingFees;
        const laundryServices = additionalIncomeStreamsDTO.laundryServices;
        const storageUnitFees = additionalIncomeStreamsDTO.storageUnitFees;
        const other = additionalIncomeStreamsDTO.other;

        const taxImplicationsDTO: TaxImplicationsRequest = investmentScenarioRequest.taxImplications;
        const depreciation = taxImplicationsDTO.depreciation;
        const mortgageInterest = taxImplicationsDTO.mortgageInterest;
        const operatingExpenses = taxImplicationsDTO.operatingExpenses;
        const propertyTaxes = taxImplicationsDTO.propertyTaxes;

        //----------------------------------------------------------------------------------------------------------------

        const growthProjections: GrowthProjections = new GrowthProjections(
            annualAppreciationRate,
            annualTaxIncreaseRate,
            annualRentIncreaseRate
        );

        const initialCostsBreakdown: InitialCostsBreakdown = new InitialCostsBreakdown(
            0, // downpaymentAmount
            legalAndProfessionalFees,
            initialRepairCosts,
            closingCosts,
            travelingCosts,
            otherInitialExpenses,
        );

        const taxImplications: TaxImplications = new TaxImplications(
            depreciation,
            mortgageInterest,
            operatingExpenses,
            propertyTaxes
        );

        // private financingTerms: FinancingTerms;
        // private fixedMonthlyExpenses: FixedMonthlyExpenses;
        // private pmiDetails?: PMIDetails;

        const financingTerms: FinancingTerms = new FinancingTerms(
            loanAmount,
            annualInterestRate,
            interestType,
            termInYears,
            0,  // monthlyPayment
            0, // interestOnlyPeriod
        );

        const fixedMonthlyExpenses: FixedMonthlyExpenses = new FixedMonthlyExpenses(
            monthlyPropertyTax,
            monthlyHomeInsuranceAmount,
            monthlyHOAFeesAmount
        );

        const pmiDetails: PMIDetails = new PMIDetails(
            0, // pmiAmount
            pmiRate,
            '', // pmiRateFormula
            pmiDropoffPoint
        );

        const recurringExpensesBreakdown: RecurringMonthlyExpenses = new RecurringMonthlyExpenses(
            propertyManagementRate,
            vacancyRate,
            maintenanceRate,
            otherExpensesRate,
            capExReserveRate,
        );

        const additionalIncomeStreams: AdditionalIncomeStreams = new AdditionalIncomeStreams(
            parkingFees,
            laundryServices,
            storageUnitFees,
            other
        );

        const rentIncome: RentIncome = new RentIncome(rentEstimate);

        const incomes: Incomes[] = [additionalIncomeStreams, rentIncome];

        const expenses: Expenses[] = [recurringExpensesBreakdown, fixedMonthlyExpenses];

        const recurringFinancialActivity: RecurringFinancialActivity = new RecurringFinancialActivity(incomes, expenses);

        const mortgageCalculator: MortgageCalculator = new MortgageCalculator(
            purchasePrice,
            downPaymentPercentage,
            financingTerms,
            recurringFinancialActivity,
            pmiDetails,
        );

        return new InvestmentScenario(
            growthProjections,
            initialCostsBreakdown,
            mortgageCalculator,
            taxImplications,
        );
    }

    // private createInvestmentScenario(): InvestmentScenario {
    //     const investmentScenarioRequest: InvestmentScenarioDTO = this.investmentScenarioRequest.investmentScenario;
    //     const loanAmount = investmentScenarioRequest.mortgageDetails.loanAmount;
    //     const annualInterestRate = investmentScenarioRequest.mortgageDetails.annualInterestRate;
    //     const termInYears = investmentScenarioRequest.mortgageDetails.termInYears;
    //     const interestType = investmentScenarioRequest.mortgageDetails.interestType;
    //     const downPaymentPercentage = investmentScenarioRequest.mortgageDetails.downPaymentPercentage;
    //     const pmiRate = investmentScenarioRequest.mortgageDetails.pmiRate;
    //     const pmiDropoffPoint = investmentScenarioRequest.mortgageDetails.pmiDropoffPoint;
    //     const monthlyPropertyTaxAmount = getAmountFromValueInput(investmentScenarioRequest.mortgageDetails.monthlyPropertyTax);
    //     const monthlyHomeInsuranceAmount = getAmountFromValueInput(investmentScenarioRequest.mortgageDetails.monthlyHomeInsuranceAmount);
    //     const monthlyHOAFeesAmount = getAmountFromValueInput(investmentScenarioRequest.mortgageDetails.monthlyHOAFeesAmount);

    //     const mortgageDetails: MortgageDetails = new MortgageDetails(
    //         loanAmount,
    //         annualInterestRate,
    //         termInYears,
    //         interestType,
    //         downPaymentPercentage,
    //         pmiRate,
    //         pmiDropoffPoint,
    //         monthlyPropertyTaxAmount,
    //         monthlyHomeInsuranceAmount,
    //         monthlyHOAFeesAmount
    //     );

    //     const annualAppreciationRate = investmentScenarioRequest.growthProjections.annualAppreciationRate;
    //     const annualTaxIncreaseRate = investmentScenarioRequest.growthProjections.annualTaxIncreaseRate;
    //     const annualRentIncreaseRate = investmentScenarioRequest.growthProjections.annualRentIncreaseRate;

    //     const growthProjections: GrowthProjections = new GrowthProjections(
    //         annualAppreciationRate,
    //         annualTaxIncreaseRate,
    //         annualRentIncreaseRate
    //     );

    //     const propertyManagementRate = investmentScenarioRequest.operatingExpenses.propertyManagementRate;
    //     const vacancyRate = investmentScenarioRequest.operatingExpenses.vacancyRate;
    //     const maintenanceRate = investmentScenarioRequest.operatingExpenses.maintenanceRate;
    //     const otherExpensesRate = investmentScenarioRequest.operatingExpenses.otherExpensesRate;
    //     const capExReserveRate = investmentScenarioRequest.operatingExpenses.capExReserveRate;
    //     const legalAndProfessionalFees = getAmountFromValueInput(investmentScenarioRequest.operatingExpenses.legalAndProfessionalFees);
    //     const initialRepairCosts = getAmountFromValueInput(investmentScenarioRequest.operatingExpenses.initialRepairCosts);
    //     const travelingCosts = getAmountFromValueInput(investmentScenarioRequest.operatingExpenses.travelingCosts);
    //     const closingCosts = getAmountFromValueInput(investmentScenarioRequest.operatingExpenses.closingCosts);
    //     const otherInitialExpenses = getAmountFromValueInput(investmentScenarioRequest.operatingExpenses.otherInitialExpenses);

    //     const operatingExpenses: OperatingExpenses = new OperatingExpenses(
    //         propertyManagementRate,
    //         vacancyRate,
    //         maintenanceRate,
    //         otherExpensesRate,
    //         capExReserveRate,
    //         legalAndProfessionalFees,
    //         initialRepairCosts,
    //         travelingCosts,
    //         closingCosts,
    //         otherInitialExpenses,
    //     );

    //     const rentEstimate = investmentScenarioRequest.rentEstimate;
    //     const purchasePrice = investmentScenarioRequest.purchasePrice;

    //     const parkingFees = investmentScenarioRequest.additionalIncomeStreams.breakdown.parkingFees;
    //     const laundryServices = investmentScenarioRequest.additionalIncomeStreams.breakdown.laundryServices;
    //     const storageUnitFees = investmentScenarioRequest.additionalIncomeStreams.breakdown.storageUnitFees;
    //     const other = investmentScenarioRequest.additionalIncomeStreams.breakdown.other;

    //     const additionalIncomeStreams: AdditionalIncomeStreams = new AdditionalIncomeStreams(
    //         parkingFees,
    //         laundryServices,
    //         storageUnitFees,
    //         other,
    //     );

    //     const investmentScenario: InvestmentScenario = new InvestmentScenario(
    //         mortgageDetails,
    //         growthProjections,
    //         operatingExpenses,
    //         additionalIncomeStreams,
    //         rentEstimate,
    //         purchasePrice,
    //     );

    //     return investmentScenario;
    // }

    // private createDefaultInvestmentScenario(): InvestmentScenario {
    //     const rentEstimate = this.listingDetails.getZillowRentEstimate();
    //     const purchasePrice = this.listingDetails.getListingPrice();
    //     const annualInterestRate = DefaultInvestmentRates.ANNUAL_INTEREST_RATE;
    //     const termInYears = DefaultInvestmentRates.TERM_IN_YEARS;
    //     const interestType = getInterestTypeEnumValue(DefaultInvestmentRates.INTEREST_TYPE);
    //     const downPaymentPercentage = DefaultInvestmentRates.DOWN_PAYMENT_PERCENTAGE;

    //     // Move this code somewhere else
    //     const loanAmount = Utility.round(purchasePrice * (1 - (downPaymentPercentage / 100)));

    //     const pmiRate = DefaultInvestmentRates.PMI_RATE;
    //     const pmiDropoffPoint = DefaultInvestmentRates.PMI_DROP_OFF_POINT;
    //     const monthlyPropertyTaxAmount = this.listingDetails.getZillowMonthlyPropertyTaxAmount();
    //     const monthlyHomeInsuranceAmount = this.listingDetails.getZillowMonthlyHomeInsuranceAmount();
    //     const monthlyHOAFeesAmount = this.listingDetails.getZillowMonthlyHOAFeesAmount();

    //     const mortgageDetails: MortgageDetails = new MortgageDetails(
    //         loanAmount,
    //         annualInterestRate,
    //         termInYears,
    //         interestType,
    //         downPaymentPercentage,
    //         pmiRate,
    //         pmiDropoffPoint,
    //         monthlyPropertyTaxAmount,
    //         monthlyHomeInsuranceAmount,
    //         monthlyHOAFeesAmount,
    //     );

    //     const annualAppreciationRate = DefaultInvestmentRates.ANNUAL_APPRECIATION_RATE;
    //     const annualTaxIncreaseRate = DefaultInvestmentRates.ANNUAL_TAX_INCREASE_RATE;
    //     const annualRentIncreaseRate = DefaultInvestmentRates.ANNUAL_RENT_INCREASE_RATE;

    //     const growthProjections: GrowthProjections = new GrowthProjections(
    //         annualAppreciationRate,
    //         annualTaxIncreaseRate,
    //         annualRentIncreaseRate,
    //     );

    //     const propertyManagementRate = DefaultInvestmentRates.PROPERTY_MANAGEMENT_RATE;
    //     const vacancyRate = DefaultInvestmentRates.VACANCY_RATE;
    //     const maintenanceRate = DefaultInvestmentRates.MAINTENANCE_RATE;
    //     const otherExpensesRate = DefaultInvestmentRates.OTHER_EXPENSES_RATE;
    //     const capExReserveRate = DefaultInvestmentRates.CAP_EX_RESERVE_RATE;
    //     const legalAndProfessionalFees = DefaultInvestmentRates.LEGAL_AND_PROFESSIONAL_FEES;
    //     const initialRepairCosts = DefaultInvestmentRates.INITIAL_REPAIR_COSTS;
    //     const travelingCosts = DefaultInvestmentRates.TRAVELING_COSTS;
    //     const closingCosts = DefaultInvestmentRates.CLOSING_COSTS;
    //     const otherInitialExpenses = DefaultInvestmentRates.OTHER_INITIAL_EXPENSES;

    //     const operatingExpenses: OperatingExpenses = new OperatingExpenses(
    //         propertyManagementRate,
    //         vacancyRate,
    //         maintenanceRate,
    //         otherExpensesRate,
    //         capExReserveRate,
    //         legalAndProfessionalFees,
    //         initialRepairCosts,
    //         travelingCosts,
    //         closingCosts,
    //         otherInitialExpenses,
    //     );

    //     const parkingFees = DefaultInvestmentRates.PARKING_FEES;
    //     const laundryServices = DefaultInvestmentRates.LAUNDRY_SERVICES;
    //     const storageUnitFees = DefaultInvestmentRates.STORAGE_UNIT_FEES;
    //     const other = DefaultInvestmentRates.OTHER;

    //     const additionalIncomeStreams: AdditionalIncomeStreams = new AdditionalIncomeStreams(
    //         parkingFees,
    //         laundryServices,
    //         storageUnitFees,
    //         other,
    //     );

    //     const investmentScenario: InvestmentScenario = new InvestmentScenario(
    //         mortgageDetails,
    //         growthProjections,
    //         operatingExpenses,
    //         additionalIncomeStreams,
    //         rentEstimate,
    //         purchasePrice,
    //     );

    //     return investmentScenario;
    // }

}