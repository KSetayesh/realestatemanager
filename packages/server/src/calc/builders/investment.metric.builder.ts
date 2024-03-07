import { ListingDetails } from "../models/listingdetails.model";
import { InvestmentScenario } from "../new_models/investment.scenario.model";
import { getAmountFromValueInput, getInterestTypeEnumValue } from "src/shared/Constants";
import { GrowthProjections } from "../new_models/growth.projections.model";
import { InitialCostsBreakdown } from "../new_models/initialcosts.model";
import { MortgageCalculator } from "../new_models/mortgage.calc.model";
import { TaxImplications } from "../new_models/tax.implications.model";
import {
    AdditionalIncomeStreamsRequest,
    DefaultInvestmentRates,
    GrowthProjectionsDTO,
    GrowthProjectionsRequest,
    InterestType,
    InvestmentScenarioRequest,
    MortgageDetailsRequest,
    OperatingExpensesRequest,
    TaxImplicationsRequest,
    Utility
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

    private getAnnualInterestRate(mortgageDetailsDTO: MortgageDetailsRequest): number {
        return mortgageDetailsDTO.annualInterestRate | DefaultInvestmentRates.ANNUAL_INTEREST_RATE;
    }

    private getTermInYears(mortgageDetailsDTO: MortgageDetailsRequest): number {
        return mortgageDetailsDTO.termInYears | DefaultInvestmentRates.TERM_IN_YEARS;
    }

    private getInterestType(mortgageDetailsDTO: MortgageDetailsRequest): InterestType {
        if (mortgageDetailsDTO.interestType) {
            return mortgageDetailsDTO.interestType;
        }
        return getInterestTypeEnumValue(DefaultInvestmentRates.INTEREST_TYPE);
    }

    private getDownPaymentPercentage(mortgageDetailsDTO: MortgageDetailsRequest): number {
        return mortgageDetailsDTO.downPaymentPercentage | DefaultInvestmentRates.DOWN_PAYMENT_PERCENTAGE;
    }

    private getPMIRate(mortgageDetailsDTO: MortgageDetailsRequest): number {
        return mortgageDetailsDTO.pmiRate | DefaultInvestmentRates.PMI_RATE;
    }

    private getPMIDropoffPoint(mortgageDetailsDTO: MortgageDetailsRequest): number {
        return mortgageDetailsDTO.pmiDropoffPoint | DefaultInvestmentRates.PMI_DROP_OFF_POINT;
    }

    private getPropertyManagementRate(operatingExpensesDTO: OperatingExpensesRequest): number {
        return operatingExpensesDTO.propertyManagementRate | DefaultInvestmentRates.PROPERTY_MANAGEMENT_RATE;
    }

    private getVacanyRate(operatingExpensesDTO: OperatingExpensesRequest): number {
        return operatingExpensesDTO.vacancyRate | DefaultInvestmentRates.VACANCY_RATE;
    }

    private getMaintenanceRate(operatingExpensesDTO: OperatingExpensesRequest): number {
        return operatingExpensesDTO.maintenanceRate | DefaultInvestmentRates.MAINTENANCE_RATE;
    }

    private getOtherExpensesRate(operatingExpensesDTO: OperatingExpensesRequest): number {
        return operatingExpensesDTO.otherExpensesRate | DefaultInvestmentRates.OTHER_EXPENSES_RATE;
    }

    private getCapExReserveRate(operatingExpensesDTO: OperatingExpensesRequest): number {
        return operatingExpensesDTO.capExReserveRate | DefaultInvestmentRates.CAP_EX_RESERVE_RATE;
    }

    private getLegalAndProfessionalFees(operatingExpensesDTO: OperatingExpensesRequest): number {
        return getAmountFromValueInput(operatingExpensesDTO.legalAndProfessionalFees) | DefaultInvestmentRates.LEGAL_AND_PROFESSIONAL_FEES;
    }

    private getInitialRepairCosts(operatingExpensesDTO: OperatingExpensesRequest): number {
        return getAmountFromValueInput(operatingExpensesDTO.initialRepairCosts) | DefaultInvestmentRates.INITIAL_REPAIR_COSTS;
    }

    private getTravelingCosts(operatingExpensesDTO: OperatingExpensesRequest): number {
        return getAmountFromValueInput(operatingExpensesDTO.travelingCosts) | DefaultInvestmentRates.TRAVELING_COSTS;
    }

    private getClosingCosts(operatingExpensesDTO: OperatingExpensesRequest): number {
        return getAmountFromValueInput(operatingExpensesDTO.closingCosts) | DefaultInvestmentRates.OTHER_EXPENSES_RATE;
    }

    private getOtherInitialExpenses(operatingExpensesDTO: OperatingExpensesRequest): number {
        return getAmountFromValueInput(operatingExpensesDTO.otherInitialExpenses) | DefaultInvestmentRates.OTHER_INITIAL_EXPENSES;
    }

    private getAnnualRentIncreaseRate(growthProjectionsDTO: GrowthProjectionsDTO): number {
        return growthProjectionsDTO.annualRentIncreaseRate | DefaultInvestmentRates.ANNUAL_RENT_INCREASE_RATE;
    }

    private getAnnualAppreciationRate(growthProjectionsDTO: GrowthProjectionsDTO): number {
        return growthProjectionsDTO.annualAppreciationRate | DefaultInvestmentRates.ANNUAL_APPRECIATION_RATE;
    }

    private getAnnualTaxIncreaseRate(growthProjectionsDTO: GrowthProjectionsDTO): number {
        return growthProjectionsDTO.annualTaxIncreaseRate | DefaultInvestmentRates.ANNUAL_TAX_INCREASE_RATE;
    }

    private getParkingFees(additionalIncomeStreamsDTO: AdditionalIncomeStreamsRequest): number {
        return additionalIncomeStreamsDTO.parkingFees | DefaultInvestmentRates.PARKING_FEES;
    }

    private getLaundryServices(additionalIncomeStreamsDTO: AdditionalIncomeStreamsRequest): number {
        return additionalIncomeStreamsDTO.laundryServices | DefaultInvestmentRates.LAUNDRY_SERVICES;
    }

    private getStorageUnitFees(additionalIncomeStreamsDTO: AdditionalIncomeStreamsRequest): number {
        return additionalIncomeStreamsDTO.storageUnitFees | DefaultInvestmentRates.STORAGE_UNIT_FEES;
    }

    private getOtherAdditionalIncomeStreams(additionalIncomeStreamsDTO: AdditionalIncomeStreamsRequest): number {
        return additionalIncomeStreamsDTO.other | DefaultInvestmentRates.OTHER_ADDITIONAL_INCOMES;
    }

    private getTaxDepreciation(taxImplicationsDTO: TaxImplicationsRequest): number {
        return taxImplicationsDTO.depreciation | DefaultInvestmentRates.TAX_DEPRECIATION;
    }

    private getTaxMortgageInterest(taxImplicationsDTO: TaxImplicationsRequest): number {
        return taxImplicationsDTO.mortgageInterest | DefaultInvestmentRates.TAX_MORTGAGE_INTEREST;
    }

    private getTaxOperatingExpenses(taxImplicationsDTO: TaxImplicationsRequest): number {
        return taxImplicationsDTO.operatingExpenses | DefaultInvestmentRates.TAX_OPERATING_EXPENSES;
    }

    private _createInvestmentScenario(): InvestmentScenario {
        const investmentScenarioRequest: InvestmentScenarioRequest = this.investmentScenarioRequest.investmentScenario;

        const mortgageDetailsDTO: MortgageDetailsRequest = investmentScenarioRequest.mortgageDetails;

        const loanAmount = mortgageDetailsDTO.loanAmount;

        const annualInterestRate = this.getAnnualInterestRate(mortgageDetailsDTO);

        const termInYears = this.getTermInYears(mortgageDetailsDTO);

        const interestType = this.getInterestType(mortgageDetailsDTO);

        const downPaymentPercentage = this.getDownPaymentPercentage(mortgageDetailsDTO);

        const pmiRate = this.getPMIRate(mortgageDetailsDTO);

        const pmiDropoffPoint = this.getPMIDropoffPoint(mortgageDetailsDTO);

        const monthlyPropertyTax = getAmountFromValueInput(mortgageDetailsDTO.monthlyPropertyTax);

        const monthlyHomeInsuranceAmount = getAmountFromValueInput(mortgageDetailsDTO.monthlyHomeInsuranceAmount);

        const monthlyHOAFeesAmount = getAmountFromValueInput(mortgageDetailsDTO.monthlyHOAFeesAmount);

        const operatingExpensesDTO: OperatingExpensesRequest = investmentScenarioRequest.operatingExpenses;

        const propertyManagementRate = this.getPropertyManagementRate(operatingExpensesDTO);

        const vacancyRate = this.getVacanyRate(operatingExpensesDTO);

        const maintenanceRate = this.getMaintenanceRate(operatingExpensesDTO);

        const otherExpensesRate = this.getOtherExpensesRate(operatingExpensesDTO);

        const capExReserveRate = this.getCapExReserveRate(operatingExpensesDTO);

        const legalAndProfessionalFees = this.getLegalAndProfessionalFees(operatingExpensesDTO);

        const initialRepairCosts = this.getInitialRepairCosts(operatingExpensesDTO);

        const travelingCosts = this.getTravelingCosts(operatingExpensesDTO);

        const closingCosts = this.getClosingCosts(operatingExpensesDTO);

        const otherInitialExpenses = this.getOtherInitialExpenses(operatingExpensesDTO);

        const rentEstimate = investmentScenarioRequest.rentEstimate;

        const purchasePrice = investmentScenarioRequest.purchasePrice;

        const growthProjectionsDTO: GrowthProjectionsRequest = investmentScenarioRequest.growthProjections;

        const annualRentIncreaseRate = this.getAnnualRentIncreaseRate(growthProjectionsDTO);

        const annualAppreciationRate = this.getAnnualAppreciationRate(growthProjectionsDTO);

        const annualTaxIncreaseRate = this.getAnnualTaxIncreaseRate(growthProjectionsDTO);

        const additionalIncomeStreamsDTO: AdditionalIncomeStreamsRequest = investmentScenarioRequest.additionalIncomeStreams;

        const parkingFees = this.getParkingFees(additionalIncomeStreamsDTO);

        const laundryServices = this.getLaundryServices(additionalIncomeStreamsDTO);

        const storageUnitFees = this.getStorageUnitFees(additionalIncomeStreamsDTO);

        const otherAdditionalIncomeStreams = this.getOtherAdditionalIncomeStreams(additionalIncomeStreamsDTO);

        const taxImplicationsDTO: TaxImplicationsRequest = investmentScenarioRequest.taxImplications;

        const depreciation = this.getTaxDepreciation(taxImplicationsDTO);

        const mortgageInterest = this.getTaxMortgageInterest(taxImplicationsDTO);

        const operatingExpenses = this.getTaxOperatingExpenses(taxImplicationsDTO);

        //----------------------------------------------------------------------------------------------------------------

        const growthProjections: GrowthProjections = new GrowthProjections(
            annualAppreciationRate,
            annualTaxIncreaseRate,
            annualRentIncreaseRate
        );

        // Move this somewhere else
        const downPaymentAmount = Utility.round(purchasePrice * (downPaymentPercentage / 100));

        const initialCostsBreakdown: InitialCostsBreakdown = new InitialCostsBreakdown(
            downPaymentAmount,
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
            0, // property taxes
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
            otherAdditionalIncomeStreams,
        );

        const rentIncome: RentIncome = new RentIncome(rentEstimate);

        const incomes: Incomes[] = [rentIncome, additionalIncomeStreams];

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