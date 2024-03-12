import { InvestmentScenario } from "../models/investment_models/investment.scenario.model";
import { getAmountFromValueInput, getInterestTypeEnumValue, getRateFromValueInput } from "src/shared/Constants";
import { GrowthProjections } from "../models/investment_models/growth.projections.model";
import { InitialCostsBreakdown } from "../models/investment_models/initialcosts.model";
import { MortgageCalculator } from "../models/investment_models/mortgage.calc.model";
import { TaxImplications } from "../models/investment_models/tax.implications.model";
import {
    AdditionalIncomeStreamsRequest,
    AmountAndPercentageDTO,
    DefaultInvestmentRates,
    GrowthProjectionsRequest,
    InterestType,
    InvestmentDetailsRequest,
    InvestmentScenarioRequest,
    MortgageDetailsRequest,
    OperatingExpensesRequest,
    TaxImplicationsRequest,
} from "@realestatemanager/shared";
import { FinancingTerms } from "../models/investment_models/financing.terms.model";
import { FixedMonthlyExpenses } from "../models/investment_models/fixed.monthly.expenses.model";
import { PMIDetails } from "../models/investment_models/pmidetails.model";
import { RecurringMonthlyExpenses } from "../models/investment_models/recurring.monthly.expenses.model";
import { AdditionalIncomeStreams } from "../models/investment_models/additional.income.streams.model";
import { RentIncome } from "../models/investment_models/rent.income.model";
import { ListingDetails } from "../models/listing_models/listingdetails.model";
import { FinancialTransaction } from "../models/investment_models/financial.transaction";
import { Incomes } from "../models/investment_models/incomes.model";
import { Expenses } from "../models/investment_models/expenses.model";

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

        // const loanAmount: RateAndValueDTO = this.getLoanAmount();

        const annualInterestRate: number = this.getAnnualInterestRate();

        const termInYears: number = this.getTermInYears();

        const interestType: InterestType = this.getInterestType();

        const downPayment: AmountAndPercentageDTO = this.getDownPayment();

        const pmiRate: number = this.getPMIRate();

        const pmiDropoffPoint: number = this.getPMIDropoffPoint();

        const monthlyPropertyTax: number = this.getMonthlyPropertyTax();

        const monthlyHomeInsuranceAmount: number = this.getMonthlyHomeInsuranceAmount();

        const monthlyHOAFeesAmount: number = this.getMonthlyHOAFeesAmount();

        const propertyManagementRate: number = this.getPropertyManagementRate();

        const vacancyRate: number = this.getVacanyRate();

        const maintenanceRate: number = this.getMaintenanceRate();

        const otherExpensesRate: number = this.getOtherExpensesRate();

        const capExReserveRate: number = this.getCapExReserveRate();

        const legalAndProfessionalFees: number = this.getLegalAndProfessionalFees();

        const initialRepairCosts: AmountAndPercentageDTO = this.getInitialRepairCosts();

        const travelingCosts: number = this.getTravelingCosts();

        const closingCosts: AmountAndPercentageDTO = this.getClosingCosts();

        const otherInitialExpenses: AmountAndPercentageDTO = this.getOtherInitialExpenses();

        const rentEstimate: number = this.getRentEstimate();

        const purchasePrice: number = this.getPurchasePrice();

        const annualRentIncreaseRate: number = this.getAnnualRentIncreaseRate();

        const annualAppreciationRate: number = this.getAnnualAppreciationRate();

        const annualTaxIncreaseRate: number = this.getAnnualTaxIncreaseRate();

        const parkingFees: number = this.getParkingFees();

        const laundryServices: number = this.getLaundryServices();

        const storageUnitFees: number = this.getStorageUnitFees();

        const otherAdditionalIncomeStreams: number = this.getOtherAdditionalIncomeStreams();

        const depreciation: number = this.getTaxDepreciation();

        const mortgageInterest: number = this.getTaxMortgageInterest();

        const operatingExpenses: number = this.getTaxOperatingExpenses();

        //----------------------------------------------------------------------------------------------------------------

        const growthProjections: GrowthProjections = new GrowthProjections(
            annualAppreciationRate,
            annualTaxIncreaseRate,
            annualRentIncreaseRate
        );

        // Move this somewhere else
        // const downPaymentAmount = Utility.round(purchasePrice * (downPaymentPercentage / 100));

        const initialCostsBreakdown: InitialCostsBreakdown = new InitialCostsBreakdown(
            downPayment.amount,
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
            // loanAmount,
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

        const incomes: Incomes = new Incomes(additionalIncomeStreams, rentIncome);

        const expenses: Expenses = new Expenses(fixedMonthlyExpenses, recurringExpensesBreakdown);

        const financialTransaction: FinancialTransaction = new FinancialTransaction(incomes, expenses);

        const mortgageCalculator: MortgageCalculator = new MortgageCalculator(
            purchasePrice,
            downPayment,
            financingTerms,
            financialTransaction,
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

    //----------------------------------------------------------------------------------------------------

    // private createRateAndValueDTO(amount: number, rate: number): RateAndValueDTO {
    //     return {
    //         value: {
    //             type: ValueType.AMOUNT,
    //             amount: amount,
    //         },
    //         percentage: {
    //             type: ValueType.RATE,
    //             rate: rate,
    //         },
    //     };
    // }

    // private getLoanAmount(): RateAndValueDTO {
    //     if (this._useDefaultRequest()) {
    //         // Move this somewhere
    //         const loanPercentage = 100 - DefaultInvestmentRates.DOWN_PAYMENT_PERCENTAGE;
    //         const loanAmount = this.listingDetails.getListingPrice() * (loanPercentage / 100);
    //         return this.createRateAndValueDTO(loanAmount, loanPercentage);
    //     }

    //     const loanPercentage = 100 - (this.getMortgageDetails().downPaymentPercentage ?? DefaultInvestmentRates.DOWN_PAYMENT_PERCENTAGE);
    //     const loanAmount = this.getInvestmentDetails().purchasePrice * (loanPercentage / 100);
    //     return this.createRateAndValueDTO(loanAmount, loanPercentage);
    // }

    private getAnnualInterestRate(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.ANNUAL_INTEREST_RATE;
        }
        return this.getMortgageDetails().annualInterestRate ?? DefaultInvestmentRates.ANNUAL_INTEREST_RATE;
    }

    private getTermInYears(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.TERM_IN_YEARS;
        }
        return this.getMortgageDetails().termInYears ?? DefaultInvestmentRates.TERM_IN_YEARS;
    }

    private getInterestType(): InterestType {
        if (this._useDefaultRequest()) {
            return getInterestTypeEnumValue(DefaultInvestmentRates.INTEREST_TYPE);
        }
        return this.getMortgageDetails().interestType ?? getInterestTypeEnumValue(DefaultInvestmentRates.INTEREST_TYPE);
    }

    private getDownPayment(): AmountAndPercentageDTO {
        const description = '';
        if (this._useDefaultRequest()) {
            // Move this somewhere
            const purchasePrice = this.listingDetails.getListingPrice();
            const downPaymentPercentage = DefaultInvestmentRates.DOWN_PAYMENT_PERCENTAGE.valueOf();
            const downPaymentAmount = purchasePrice * (downPaymentPercentage / 100);
            return {
                description: description,
                amount: downPaymentAmount,
                percentage: downPaymentPercentage,
            };
        }

        const purchasePrice = this.getInvestmentDetails().purchasePrice;
        const downPayment = this.getMortgageDetails().downPayment;
        const downPaymentPercentage = getRateFromValueInput(downPayment, purchasePrice);
        const downPaymentAmount = getAmountFromValueInput(downPayment, purchasePrice);

        return {
            description: description,
            amount: downPaymentAmount,
            percentage: downPaymentPercentage,
        };
    }

    private getPMIRate(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.PMI_RATE;
        }
        return this.getMortgageDetails().pmiRate ?? DefaultInvestmentRates.PMI_RATE;
    }

    private getPMIDropoffPoint(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.PMI_DROP_OFF_POINT;
        }
        return this.getMortgageDetails().pmiDropoffPoint ?? DefaultInvestmentRates.PMI_DROP_OFF_POINT;
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
        return this.getOperatingExpenses().propertyManagementRate ?? DefaultInvestmentRates.PROPERTY_MANAGEMENT_RATE;
    }

    private getVacanyRate(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.VACANCY_RATE;
        }
        return this.getOperatingExpenses().vacancyRate ?? DefaultInvestmentRates.VACANCY_RATE;
    }

    private getMaintenanceRate(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.MAINTENANCE_RATE;
        }
        return this.getOperatingExpenses().maintenanceRate ?? DefaultInvestmentRates.MAINTENANCE_RATE;
    }

    private getOtherExpensesRate(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.OTHER_EXPENSES_RATE;
        }
        return this.getOperatingExpenses().otherExpensesRate ?? DefaultInvestmentRates.OTHER_EXPENSES_RATE;
    }

    private getCapExReserveRate(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.CAP_EX_RESERVE_RATE;
        }
        return this.getOperatingExpenses().capExReserveRate ?? DefaultInvestmentRates.CAP_EX_RESERVE_RATE;
    }

    private getLegalAndProfessionalFees(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.LEGAL_AND_PROFESSIONAL_FEES;
        }
        return getAmountFromValueInput(this.getOperatingExpenses().legalAndProfessionalFees) ?? DefaultInvestmentRates.LEGAL_AND_PROFESSIONAL_FEES;
    }

    private getInitialRepairCosts(): AmountAndPercentageDTO {
        const description = '';
        if (this._useDefaultRequest()) {
            const purchasePrice = this.listingDetails.getListingPrice();
            const initialRepairCostsRate = DefaultInvestmentRates.INITIAL_REPAIR_COST_RATE.valueOf();
            const initialRepairCostsAmount = purchasePrice * (initialRepairCostsRate / 100);
            return {
                description: description,
                amount: initialRepairCostsAmount,
                percentage: initialRepairCostsRate,
            };
        }

        const purchasePrice = this.getInvestmentDetails().purchasePrice;
        const initialRepairCosts = this.getOperatingExpenses().initialRepairCosts;
        const initialRepairCostsPercentage = getRateFromValueInput(initialRepairCosts, purchasePrice);
        const initialRepairCostsAmount = getAmountFromValueInput(initialRepairCosts, purchasePrice);

        return {
            description: description,
            amount: initialRepairCostsAmount,
            percentage: initialRepairCostsPercentage,
        };
    }

    private getTravelingCosts(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.TRAVELING_COSTS;
        }
        return getAmountFromValueInput(this.getOperatingExpenses().travelingCosts) ?? DefaultInvestmentRates.TRAVELING_COSTS;
    }

    private getClosingCosts(): AmountAndPercentageDTO {
        const description = '';
        if (this._useDefaultRequest()) {
            const purchasePrice = this.listingDetails.getListingPrice();
            const closingCostsRate = DefaultInvestmentRates.CLOSING_COST_RATE.valueOf();
            const closingCostsAmount = purchasePrice * (closingCostsRate / 100);
            return {
                description: description,
                amount: closingCostsAmount,
                percentage: closingCostsRate,
            };
        }

        const purchasePrice = this.getInvestmentDetails().purchasePrice;
        const closingCosts = this.getOperatingExpenses().closingCosts;
        const closingCostsRate = getRateFromValueInput(closingCosts, purchasePrice);
        const closingCostsAmount = getAmountFromValueInput(closingCosts, purchasePrice)
        return {
            description: description,
            amount: closingCostsAmount,
            percentage: closingCostsRate,
        };
    }

    private getOtherInitialExpenses(): AmountAndPercentageDTO {
        const description = '';
        if (this._useDefaultRequest()) {
            const purchasePrice = this.listingDetails.getListingPrice();
            const otherInitialExpensesRate = DefaultInvestmentRates.OTHER_INITIAL_EXPENSES_RATE.valueOf();
            const otherInitialExpensesAmount = purchasePrice * (otherInitialExpensesRate / 100);
            return {
                description: description,
                amount: otherInitialExpensesAmount,
                percentage: otherInitialExpensesRate,
            };
        }

        const purchasePrice = this.getInvestmentDetails().purchasePrice;
        const otherInitialExpenses = this.getOperatingExpenses().otherInitialExpenses;
        const otherInitialExpensesRate = getRateFromValueInput(otherInitialExpenses, purchasePrice);
        const otherInitialExpensesAmount = getAmountFromValueInput(otherInitialExpenses, purchasePrice)
        return {
            description: description,
            amount: otherInitialExpensesAmount,
            percentage: otherInitialExpensesRate,
        };
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
        return this.getGrowthProjections().annualRentIncreaseRate ?? DefaultInvestmentRates.ANNUAL_RENT_INCREASE_RATE;
    }

    private getAnnualAppreciationRate(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.ANNUAL_APPRECIATION_RATE;
        }
        return this.getGrowthProjections().annualAppreciationRate ?? DefaultInvestmentRates.ANNUAL_APPRECIATION_RATE;
    }

    private getAnnualTaxIncreaseRate(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.ANNUAL_TAX_INCREASE_RATE;
        }
        return this.getGrowthProjections().annualTaxIncreaseRate ?? DefaultInvestmentRates.ANNUAL_TAX_INCREASE_RATE;
    }

    private getParkingFees(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.PARKING_FEES;
        }
        return this.getAdditionalIncomeStreams().parkingFees ?? DefaultInvestmentRates.PARKING_FEES;
    }

    private getLaundryServices(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.LAUNDRY_SERVICES;
        }
        return this.getAdditionalIncomeStreams().laundryServices ?? DefaultInvestmentRates.LAUNDRY_SERVICES;
    }

    private getStorageUnitFees(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.STORAGE_UNIT_FEES;
        }
        return this.getAdditionalIncomeStreams().storageUnitFees ?? DefaultInvestmentRates.STORAGE_UNIT_FEES;
    }

    private getOtherAdditionalIncomeStreams(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.OTHER_ADDITIONAL_INCOMES;
        }
        return this.getAdditionalIncomeStreams().other ?? DefaultInvestmentRates.OTHER_ADDITIONAL_INCOMES;
    }

    private getTaxDepreciation(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.TAX_DEPRECIATION;
        }
        return this.getTaxImplications().depreciation ?? DefaultInvestmentRates.TAX_DEPRECIATION;
    }

    private getTaxMortgageInterest(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.TAX_MORTGAGE_INTEREST;
        }
        return this.getTaxImplications().mortgageInterest ?? DefaultInvestmentRates.TAX_MORTGAGE_INTEREST;
    }

    private getTaxOperatingExpenses(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.TAX_OPERATING_EXPENSES;
        }
        return this.getTaxImplications().operatingExpenses ?? DefaultInvestmentRates.TAX_OPERATING_EXPENSES;
    }

}