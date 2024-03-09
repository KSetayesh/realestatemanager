import { InvestmentScenario } from "../models/investment_models/investment.scenario.model";
import { getAmountFromValueInput, getInterestTypeEnumValue } from "src/shared/Constants";
import { GrowthProjections } from "../models/investment_models/growth.projections.model";
import { InitialCostsBreakdown } from "../models/investment_models/initialcosts.model";
import { MortgageCalculator } from "../models/investment_models/mortgage.calc.model";
import { TaxImplications } from "../models/investment_models/tax.implications.model";
import {
    AdditionalIncomeStreamsRequest,
    DefaultInvestmentRates,
    GrowthProjectionsRequest,
    InterestType,
    InvestmentDetailsRequest,
    InvestmentScenarioRequest,
    MortgageDetailsRequest,
    OperatingExpensesRequest,
    TaxImplicationsRequest,
    Utility
} from "@realestatemanager/shared";
import { FinancingTerms } from "../models/investment_models/financing.terms.model";
import { FixedMonthlyExpenses } from "../models/investment_models/fixed.monthly.expenses.model";
import { PMIDetails } from "../models/investment_models/pmidetails.model";
import { RecurringMonthlyExpenses } from "../models/investment_models/recurring.monthly.expenses.model";
import { AdditionalIncomeStreams } from "../models/investment_models/additional.income.streams.model";
import { FinancialActivity, FinancialActivityMap, RecurringFinancialActivity } from "../models/investment_models/recurring.monthly.financial.activity.model";
import { RentIncome } from "../models/investment_models/rent.income.model";
import { ListingDetails } from "../models/listing_models/listingdetails.model";

export class InvestmentMetricBuilder {

    private listingDetails: ListingDetails;
    private investmentScenarioRequest?: InvestmentScenarioRequest;

    constructor(
        listingDetails: ListingDetails,
        investmentScenarioRequest?: InvestmentScenarioRequest) {

        this.listingDetails = listingDetails;
        this.investmentScenarioRequest = investmentScenarioRequest;
    }

    private _useDefaultRequest(): boolean {
        return !this.investmentScenarioRequest ||
            !this.investmentScenarioRequest.investmentDetails ||
            this.investmentScenarioRequest.useDefaultRequest;
    }

    build(): InvestmentScenario {

        const loanAmount = this.getLoanAmount();

        const annualInterestRate = this.getAnnualInterestRate();

        const termInYears = this.getTermInYears();

        const interestType = this.getInterestType();

        const downPaymentPercentage = this.getDownPaymentPercentage();

        const pmiRate = this.getPMIRate();

        const pmiDropoffPoint = this.getPMIDropoffPoint();

        const monthlyPropertyTax = this.getMonthlyPropertyTax();

        const monthlyHomeInsuranceAmount = this.getMonthlyHomeInsuranceAmount();

        const monthlyHOAFeesAmount = this.getMonthlyHOAFeesAmount();

        const propertyManagementRate = this.getPropertyManagementRate();

        const vacancyRate = this.getVacanyRate();

        const maintenanceRate = this.getMaintenanceRate();

        const otherExpensesRate = this.getOtherExpensesRate();

        const capExReserveRate = this.getCapExReserveRate();

        const legalAndProfessionalFees = this.getLegalAndProfessionalFees();

        const initialRepairCosts = this.getInitialRepairCosts();

        const travelingCosts = this.getTravelingCosts();

        const closingCosts = this.getClosingCosts();

        const otherInitialExpenses = this.getOtherInitialExpenses();

        const rentEstimate = this.getRentEstimate();

        const purchasePrice = this.getPurchasePrice();

        const annualRentIncreaseRate = this.getAnnualRentIncreaseRate();

        const annualAppreciationRate = this.getAnnualAppreciationRate();

        const annualTaxIncreaseRate = this.getAnnualTaxIncreaseRate();

        const parkingFees = this.getParkingFees();

        const laundryServices = this.getLaundryServices();

        const storageUnitFees = this.getStorageUnitFees();

        const otherAdditionalIncomeStreams = this.getOtherAdditionalIncomeStreams();

        const depreciation = this.getTaxDepreciation();

        const mortgageInterest = this.getTaxMortgageInterest();

        const operatingExpenses = this.getTaxOperatingExpenses();

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

        const transactions: FinancialActivityMap = {
            [FinancialActivity.RENT_INCOME]: rentIncome,
            [FinancialActivity.ADDITIONAL_INCOME]: additionalIncomeStreams,
            [FinancialActivity.FIXED_EXPENSES]: fixedMonthlyExpenses,
            [FinancialActivity.RECURRING_EXPENSES]: recurringExpensesBreakdown,
        };

        const recurringFinancialActivity: RecurringFinancialActivity = new RecurringFinancialActivity(transactions);

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

    private getInvestmentDetails(): InvestmentDetailsRequest {
        return this.investmentScenarioRequest.investmentDetails;
    }

    private getMortgageDetails(): MortgageDetailsRequest {
        return this.getInvestmentDetails().mortgageDetails;
    }

    private getOperatingExpenses(): OperatingExpensesRequest {
        return this.getInvestmentDetails().operatingExpenses;
    }

    private getGrowthProjections(): GrowthProjectionsRequest {
        return this.getInvestmentDetails().growthProjections;
    }

    private getAdditionalIncomeStreams(): AdditionalIncomeStreamsRequest {
        return this.getInvestmentDetails().additionalIncomeStreams;
    }

    private getTaxImplications(): TaxImplicationsRequest {
        return this.getInvestmentDetails().taxImplications;
    }

    private getLoanAmount(): number {
        if (this._useDefaultRequest()) {
            // Move this somewhere
            return this.listingDetails.getListingPrice() * (1 - (DefaultInvestmentRates.DOWN_PAYMENT_PERCENTAGE / 100));
        }
        return this.getMortgageDetails().loanAmount;
    }

    private getAnnualInterestRate(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.ANNUAL_INTEREST_RATE;
        }
        return this.getMortgageDetails().annualInterestRate | DefaultInvestmentRates.ANNUAL_INTEREST_RATE;
    }

    private getTermInYears(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.TERM_IN_YEARS;
        }
        return this.getMortgageDetails().termInYears | DefaultInvestmentRates.TERM_IN_YEARS;
    }

    private getInterestType(): InterestType {
        if (this._useDefaultRequest()) {
            return getInterestTypeEnumValue(DefaultInvestmentRates.INTEREST_TYPE);
        }
        return this.getMortgageDetails().interestType || getInterestTypeEnumValue(DefaultInvestmentRates.INTEREST_TYPE);
    }

    private getDownPaymentPercentage(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.DOWN_PAYMENT_PERCENTAGE;
        }
        return this.getMortgageDetails().downPaymentPercentage | DefaultInvestmentRates.DOWN_PAYMENT_PERCENTAGE;
    }

    private getPMIRate(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.PMI_RATE;
        }
        return this.getMortgageDetails().pmiRate | DefaultInvestmentRates.PMI_RATE;
    }

    private getPMIDropoffPoint(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.PMI_DROP_OFF_POINT;
        }
        return this.getMortgageDetails().pmiDropoffPoint | DefaultInvestmentRates.PMI_DROP_OFF_POINT;
    }

    private getMonthlyPropertyTax(): number {
        if (this._useDefaultRequest()) {
            return this.listingDetails.getZillowMonthlyPropertyTaxAmount();
        }
        return getAmountFromValueInput(this.getMortgageDetails().monthlyPropertyTax);
    }

    private getMonthlyHomeInsuranceAmount(): number {
        if (this._useDefaultRequest()) {
            return this.listingDetails.getZillowMonthlyHomeInsuranceAmount();
        }
        return getAmountFromValueInput(this.getMortgageDetails().monthlyHomeInsuranceAmount);
    }

    private getMonthlyHOAFeesAmount(): number {
        if (this._useDefaultRequest()) {
            return this.listingDetails.getZillowMonthlyHOAFeesAmount();
        }
        return getAmountFromValueInput(this.getMortgageDetails().monthlyHOAFeesAmount);
    }

    private getPropertyManagementRate(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.PROPERTY_MANAGEMENT_RATE;
        }
        return this.getOperatingExpenses().propertyManagementRate | DefaultInvestmentRates.PROPERTY_MANAGEMENT_RATE;
    }

    private getVacanyRate(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.VACANCY_RATE;
        }
        return this.getOperatingExpenses().vacancyRate | DefaultInvestmentRates.VACANCY_RATE;
    }

    private getMaintenanceRate(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.MAINTENANCE_RATE;
        }
        return this.getOperatingExpenses().maintenanceRate | DefaultInvestmentRates.MAINTENANCE_RATE;
    }

    private getOtherExpensesRate(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.OTHER_EXPENSES_RATE;
        }
        return this.getOperatingExpenses().otherExpensesRate | DefaultInvestmentRates.OTHER_EXPENSES_RATE;
    }

    private getCapExReserveRate(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.CAP_EX_RESERVE_RATE;
        }
        return this.getOperatingExpenses().capExReserveRate | DefaultInvestmentRates.CAP_EX_RESERVE_RATE;
    }

    private getLegalAndProfessionalFees(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.LEGAL_AND_PROFESSIONAL_FEES;
        }
        return getAmountFromValueInput(this.getOperatingExpenses().legalAndProfessionalFees) | DefaultInvestmentRates.LEGAL_AND_PROFESSIONAL_FEES;
    }

    private getInitialRepairCosts(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.INITIAL_REPAIR_COSTS;
        }
        return getAmountFromValueInput(this.getOperatingExpenses().initialRepairCosts) | DefaultInvestmentRates.INITIAL_REPAIR_COSTS;
    }

    private getTravelingCosts(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.TRAVELING_COSTS;
        }
        return getAmountFromValueInput(this.getOperatingExpenses().travelingCosts) | DefaultInvestmentRates.TRAVELING_COSTS;
    }

    private getClosingCosts(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.CLOSING_COSTS;
        }
        return getAmountFromValueInput(this.getOperatingExpenses().closingCosts) | DefaultInvestmentRates.CLOSING_COSTS;
    }

    private getOtherInitialExpenses(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.OTHER_INITIAL_EXPENSES;
        }
        return getAmountFromValueInput(this.getOperatingExpenses().otherInitialExpenses) | DefaultInvestmentRates.OTHER_INITIAL_EXPENSES;
    }

    private getPurchasePrice(): number {
        if (this._useDefaultRequest()) {
            return this.listingDetails.getListingPrice();
        }
        return this.getInvestmentDetails().purchasePrice;
    }

    private getRentEstimate(): number {
        if (this._useDefaultRequest()) {
            return this.listingDetails.getZillowRentEstimate();
        }
        return this.getInvestmentDetails().purchasePrice;
    }

    private getAnnualRentIncreaseRate(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.ANNUAL_RENT_INCREASE_RATE;
        }
        return this.getGrowthProjections().annualRentIncreaseRate | DefaultInvestmentRates.ANNUAL_RENT_INCREASE_RATE;
    }

    private getAnnualAppreciationRate(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.ANNUAL_APPRECIATION_RATE;
        }
        return this.getGrowthProjections().annualAppreciationRate | DefaultInvestmentRates.ANNUAL_APPRECIATION_RATE;
    }

    private getAnnualTaxIncreaseRate(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.ANNUAL_TAX_INCREASE_RATE;
        }
        return this.getGrowthProjections().annualTaxIncreaseRate | DefaultInvestmentRates.ANNUAL_TAX_INCREASE_RATE;
    }

    private getParkingFees(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.PARKING_FEES;
        }
        return this.getAdditionalIncomeStreams().parkingFees | DefaultInvestmentRates.PARKING_FEES;
    }

    private getLaundryServices(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.LAUNDRY_SERVICES;
        }
        return this.getAdditionalIncomeStreams().laundryServices | DefaultInvestmentRates.LAUNDRY_SERVICES;
    }

    private getStorageUnitFees(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.STORAGE_UNIT_FEES;
        }
        return this.getAdditionalIncomeStreams().storageUnitFees | DefaultInvestmentRates.STORAGE_UNIT_FEES;
    }

    private getOtherAdditionalIncomeStreams(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.OTHER_ADDITIONAL_INCOMES;
        }
        return this.getAdditionalIncomeStreams().other | DefaultInvestmentRates.OTHER_ADDITIONAL_INCOMES;
    }

    private getTaxDepreciation(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.TAX_DEPRECIATION;
        }
        return this.getTaxImplications().depreciation | DefaultInvestmentRates.TAX_DEPRECIATION;
    }

    private getTaxMortgageInterest(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.TAX_MORTGAGE_INTEREST;
        }
        return this.getTaxImplications().mortgageInterest | DefaultInvestmentRates.TAX_MORTGAGE_INTEREST;
    }

    private getTaxOperatingExpenses(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.TAX_OPERATING_EXPENSES;
        }
        return this.getTaxImplications().operatingExpenses | DefaultInvestmentRates.TAX_OPERATING_EXPENSES;
    }

}