import {
    getInterestTypeEnumValue,
} from "src/shared/Constants";
import { GrowthProjections } from "../models/investment_models/new_new_new/growth.projections.model";
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
    ValueAmountInput,
    ValueInput,
    ValueRateInput,
    ValueType,
} from "@realestatemanager/shared";
import { ListingDetails } from "../models/listing_models/listingdetails.model";
import { TransactionBuilder } from "./transaction.builder";
import { TransactionManager } from "../models/investment_models/txn4/calc/transaction.manager";
import { MortgageCalculator } from "../models/investment_models/txn4/mortgage.calc";
import { PurchasePrice } from "../models/investment_models/txn4/purchase.price";
import { InitialCost } from "../models/investment_models/txn4/initial.cost";
import { RentEstimate } from "../models/investment_models/txn4/rent.estimate";
import { InvestmentCalculator } from "../models/investment_models/txn4/calc/investment.calculator";

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

    build(): InvestmentCalculator {

        const annualInterestRate: ValueRateInput = this.getAnnualInterestRate();

        const termInYears: number = this.getTermInYears();

        const interestType: InterestType = this.getInterestType();

        const downPayment: ValueInput = this.getDownPayment();

        const pmiRate: ValueRateInput = this.getPMIRate();

        const pmiDropoffPoint: number = this.getPMIDropoffPoint();

        const monthlyPropertyTax: ValueInput = this.getMonthlyPropertyTax();

        const monthlyHomeInsuranceAmount: ValueInput = this.getMonthlyHomeInsuranceAmount();

        const monthlyHOAFeesAmount: ValueInput = this.getMonthlyHOAFeesAmount();

        const propertyManagementRate: ValueRateInput = this.getPropertyManagementRate();

        const vacancyRate: ValueRateInput = this.getVacanyRate();

        const maintenanceRate: ValueRateInput = this.getMaintenanceRate();

        const otherExpensesRate: ValueRateInput = this.getOtherExpensesRate();

        const capExReserveRate: ValueRateInput = this.getCapExReserveRate();

        const legalAndProfessionalFees: ValueInput = this.getLegalAndProfessionalFees();

        const initialRepairCosts: ValueInput = this.getInitialRepairCosts();

        const travelingCosts: ValueInput = this.getTravelingCosts();

        const closingCosts: ValueInput = this.getClosingCosts();

        const otherInitialExpenses: ValueInput = this.getOtherInitialExpenses();

        const rentEstimate: ValueAmountInput = this.getRentEstimate();

        const purchasePrice: ValueAmountInput = this.getPurchasePrice();

        const annualRentIncreaseRate: ValueRateInput = this.getAnnualRentIncreaseRate();

        const annualAppreciationRate: ValueRateInput = this.getAnnualAppreciationRate();

        const annualTaxIncreaseRate: ValueRateInput = this.getAnnualTaxIncreaseRate();

        const annualHomeInsuranceIncreaseRate: ValueRateInput = this.getAnnualHomeInsuranceIncreaseRate();

        const annualHOAFeesIncreaseRate: ValueRateInput = this.getAnnualHOAFeesIncreaseRate();

        const parkingFeesIncreaseRate: ValueRateInput = this.getParkingFeesIncreaseRate();

        const laundryServicesIncreaseRate: ValueRateInput = this.getLaundryServicesIncreaseRate();

        const storageUnitFeesIncreaseRate: ValueRateInput = this.getStorageUnitFeesIncreaseRate();

        const otherAdditionalIncomeStreamsIncreaseRate: ValueRateInput = this.getOtherAdditionalIncomeStreamsIncreaseRate();

        const parkingFees: ValueAmountInput = this.getParkingFees();

        const laundryServices: ValueAmountInput = this.getLaundryServices();

        const storageUnitFees: ValueAmountInput = this.getStorageUnitFees();

        const otherAdditionalIncomeStreams: ValueAmountInput = this.getOtherAdditionalIncomeStreams();

        const depreciation: number = this.getTaxDepreciation();

        const mortgageInterest: number = this.getTaxMortgageInterest();

        const operatingExpenses: number = this.getTaxOperatingExpenses();

        //----------------------------------------------------------------------------------------------------------------

        const growthProjections: GrowthProjections = new GrowthProjections(
            annualAppreciationRate,
            annualTaxIncreaseRate,
            annualHomeInsuranceIncreaseRate,
            annualHOAFeesIncreaseRate,
            annualRentIncreaseRate,
            parkingFeesIncreaseRate,
            laundryServicesIncreaseRate,
            storageUnitFeesIncreaseRate,
            otherAdditionalIncomeStreamsIncreaseRate,
        );

        const txnBuilder: TransactionBuilder = new TransactionBuilder({
            growthProjections: growthProjections,
            purchasePrice: purchasePrice,
            annualInterestRate: annualInterestRate,
            termInYears: termInYears,
            interestType: interestType,
            pmiRate: pmiRate,
            pmiDropoffPoint: pmiDropoffPoint,
            downPayment: downPayment,
            monthlyPropertyTax: monthlyPropertyTax,
            monthlyHomeInsuranceAmount: monthlyHomeInsuranceAmount,
            monthlyHOAFeesAmount: monthlyHOAFeesAmount,
            propertyManagementRate: propertyManagementRate,
            vacancyRate: vacancyRate,
            maintenanceRate: maintenanceRate,
            otherExpensesRate: otherExpensesRate,
            capExReserveRate: capExReserveRate,
            rentEstimate: rentEstimate,
            parkingFees: parkingFees,
            laundryServices: laundryServices,
            storageUnitFees: storageUnitFees,
            otherAdditionalIncomeStreams: otherAdditionalIncomeStreams,
            legalAndProfessionalFees: legalAndProfessionalFees,
            initialRepairCosts: initialRepairCosts,
            travelingCosts: travelingCosts,
            closingCosts: closingCosts,
            otherInitialExpenses: otherInitialExpenses,
        });

        const txnManager: TransactionManager = txnBuilder.build();

        const purchasePriceObj: PurchasePrice = txnBuilder.purchasePrice;

        const downPaymentObj: InitialCost = txnBuilder.downPayment;

        const rentEstimateObj: RentEstimate = txnBuilder.rentEstimate;

        const mortgageCalc: MortgageCalculator = new MortgageCalculator(
            purchasePriceObj,
            downPaymentObj,
            termInYears,
            interestType,
            annualInterestRate,
            pmiDropoffPoint,
            pmiRate,
        );

        return new InvestmentCalculator(
            txnManager,
            mortgageCalc,
            purchasePriceObj,
            rentEstimateObj
        );


        // const txnMap: Map<TransactionKey, BaseTransaction> = txnBuilder.build();
        // const txnBreakdown: TransactionBreakdown<TransactionCalculator> = new TransactionBreakdown(txnMap);
        // const txnDetail: TransactionDetail = new TransactionDetail(txnBreakdown);
        // return new InvestmentCalculator(txnDetail);

        // return new InvestmentCalculator(txnBreakdown);
        // const taxImplications: TaxImplications = new TaxImplications(
        //     depreciation,
        //     mortgageInterest,
        //     operatingExpenses,
        //     0, // property taxes
        // );

        // const financingTerms: FinancingTerms = new FinancingTerms(
        //     // loanAmount,
        //     annualInterestRate,
        //     interestType,
        //     termInYears,
        //     0,  // monthlyPayment
        //     0, // interestOnlyPeriod
        // );

        // const pmiDetails: PMIDetails = new PMIDetails(
        //     pmiRate,
        //     pmiDropoffPoint
        // );

        // // const txnBuilder: TransactionBuilder = new TransactionBuilder(growthProjections);

        // const mortgageCalculator: MortgageCalculator = new MortgageCalculator(
        //     purchasePrice,
        //     txnBuilder.createDownPaymentAmount(purchasePrice),
        //     financingTerms,
        //     txnBuilder.build(purchasePrice),
        //     pmiDetails,
        // );

        // return new InvestmentScenario(
        //     growthProjections,
        //     mortgageCalculator,
        //     taxImplications,
        // );
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

    private getAnnualInterestRate(): ValueRateInput {
        const defaultRate: ValueRateInput = {
            type: ValueType.RATE,
            rate: DefaultInvestmentRates.ANNUAL_INTEREST_RATE.valueOf(),
        }
        if (this._useDefaultRequest()) {
            return defaultRate;
        }
        return this.getMortgageDetails().annualInterestRate ?? defaultRate;
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

    private getDownPayment(): ValueInput {
        const defaultDownPayment: ValueRateInput = {
            rate: DefaultInvestmentRates.DOWN_PAYMENT_PERCENTAGE.valueOf(),
            type: ValueType.RATE,
        };
        if (this._useDefaultRequest()) {
            return defaultDownPayment;
        }

        return this.getMortgageDetails().downPayment ?? defaultDownPayment;
    }

    private getPMIRate(): ValueRateInput {
        const defaultRate: ValueRateInput = {
            type: ValueType.RATE,
            rate: DefaultInvestmentRates.PMI_RATE.valueOf(),
        };
        if (this._useDefaultRequest()) {
            return defaultRate;
        }
        return this.getMortgageDetails().pmiRate ?? defaultRate;
    }

    private getPMIDropoffPoint(): number {
        if (this._useDefaultRequest()) {
            return DefaultInvestmentRates.PMI_DROP_OFF_POINT;
        }
        return this.getMortgageDetails().pmiDropoffPoint ?? DefaultInvestmentRates.PMI_DROP_OFF_POINT;
    }

    private getMonthlyPropertyTax(): ValueInput {
        const defaultMonthlyPropertyTax: ValueAmountInput = {
            amount: this.listingDetails.getZillowMonthlyPropertyTaxAmount() ?? 0,
            type: ValueType.AMOUNT,
        };
        if (this._useDefaultRequest()) {
            return defaultMonthlyPropertyTax;
        }
        return this.getMortgageDetails().monthlyPropertyTax ?? defaultMonthlyPropertyTax;
    }

    private getMonthlyHomeInsuranceAmount(): ValueInput {
        const defaultMonthlyHomeInsuranceAmount: ValueAmountInput = {
            amount: this.listingDetails.getZillowMonthlyHomeInsuranceAmount() ?? 0,
            type: ValueType.AMOUNT,
        };
        if (this._useDefaultRequest()) {
            return defaultMonthlyHomeInsuranceAmount;
        }
        return this.getMortgageDetails().monthlyHomeInsuranceAmount ?? defaultMonthlyHomeInsuranceAmount;
    }

    private getMonthlyHOAFeesAmount(): ValueInput {
        const defaultMonthlyHOAFeesAmount: ValueAmountInput = {
            amount: this.listingDetails.getZillowMonthlyHOAFeesAmount() ?? 0,
            type: ValueType.AMOUNT,
        };
        if (this._useDefaultRequest()) {
            return defaultMonthlyHOAFeesAmount;
        }
        return this.getMortgageDetails().monthlyHOAFeesAmount ?? defaultMonthlyHOAFeesAmount;
    }

    private getPropertyManagementRate(): ValueRateInput {
        const defaultPropertyManagementRate: ValueRateInput = {
            rate: DefaultInvestmentRates.PROPERTY_MANAGEMENT_RATE.valueOf(),
            type: ValueType.RATE,
        };
        if (this._useDefaultRequest()) {
            return defaultPropertyManagementRate;
        }
        return this.getOperatingExpenses().propertyManagementRate ?? defaultPropertyManagementRate;
    }

    private getVacanyRate(): ValueRateInput {
        const defaultVacancyRate: ValueRateInput = {
            rate: DefaultInvestmentRates.VACANCY_RATE.valueOf(),
            type: ValueType.RATE,
        };
        if (this._useDefaultRequest()) {
            return defaultVacancyRate;
        }
        return this.getOperatingExpenses().vacancyRate ?? defaultVacancyRate;
    }

    private getMaintenanceRate(): ValueRateInput {
        const defaultMaintenanceRate: ValueRateInput = {
            rate: DefaultInvestmentRates.MAINTENANCE_RATE.valueOf(),
            type: ValueType.RATE,
        };
        if (this._useDefaultRequest()) {
            return defaultMaintenanceRate;
        }
        return this.getOperatingExpenses().maintenanceRate ?? defaultMaintenanceRate;
    }

    private getOtherExpensesRate(): ValueRateInput {
        const defaultOtherExpensesRate: ValueRateInput = {
            rate: DefaultInvestmentRates.OTHER_EXPENSES_RATE.valueOf(),
            type: ValueType.RATE,
        };
        if (this._useDefaultRequest()) {
            return defaultOtherExpensesRate;
        }
        return this.getOperatingExpenses().otherExpensesRate ?? defaultOtherExpensesRate;
    }

    private getCapExReserveRate(): ValueRateInput {
        const defaultCapExReserveRate: ValueRateInput = {
            rate: DefaultInvestmentRates.CAP_EX_RESERVE_RATE.valueOf(),
            type: ValueType.RATE,
        };
        if (this._useDefaultRequest()) {
            return defaultCapExReserveRate;
        }
        return this.getOperatingExpenses().capExReserveRate ?? defaultCapExReserveRate;
    }

    private getLegalAndProfessionalFees(): ValueInput {
        const defaultLegalAndProfessionalFees: ValueAmountInput = {
            amount: DefaultInvestmentRates.LEGAL_AND_PROFESSIONAL_FEES.valueOf(),
            type: ValueType.AMOUNT,
        };
        if (this._useDefaultRequest()) {
            return defaultLegalAndProfessionalFees;
        }
        return this.getOperatingExpenses().legalAndProfessionalFees ?? defaultLegalAndProfessionalFees;
    }

    private getInitialRepairCosts(): ValueInput {
        const defaultInitialRepairCosts: ValueRateInput = {
            rate: DefaultInvestmentRates.INITIAL_REPAIR_COST_RATE.valueOf(),
            type: ValueType.RATE,
        };
        if (this._useDefaultRequest()) {
            return defaultInitialRepairCosts;
        }
        return this.getOperatingExpenses().initialRepairCosts ?? defaultInitialRepairCosts;
    }

    private getTravelingCosts(): ValueInput {
        const defaultTravelingCosts: ValueAmountInput = {
            amount: DefaultInvestmentRates.TRAVELING_COSTS.valueOf(),
            type: ValueType.AMOUNT,
        };
        if (this._useDefaultRequest()) {
            return defaultTravelingCosts;
        }
        return this.getOperatingExpenses().travelingCosts ?? defaultTravelingCosts;
    }

    private getClosingCosts(): ValueInput {
        const defaultClosingCosts: ValueRateInput = {
            rate: DefaultInvestmentRates.CLOSING_COST_RATE.valueOf(),
            type: ValueType.RATE,
        };
        if (this._useDefaultRequest()) {
            return defaultClosingCosts;
        }

        return this.getOperatingExpenses().closingCosts ?? defaultClosingCosts;
    }

    private getOtherInitialExpenses(): ValueInput {
        const defaultOtherInitialExpenses: ValueRateInput = {
            rate: DefaultInvestmentRates.OTHER_INITIAL_EXPENSES_RATE.valueOf(),
            type: ValueType.RATE,
        };
        if (this._useDefaultRequest()) {
            return defaultOtherInitialExpenses;
        }

        return this.getOperatingExpenses().otherInitialExpenses ?? defaultOtherInitialExpenses;
    }

    private getPurchasePrice(): ValueAmountInput {
        const defaultAmount: ValueAmountInput = {
            type: ValueType.AMOUNT,
            amount: this.listingDetails.getListingPrice(),
        };
        if (this._useDefaultRequest()) {
            return defaultAmount
        }
        return this.getInvestmentDetails().purchasePrice ?? defaultAmount;
    }

    private getRentEstimate(): ValueAmountInput {
        const defaultRentEstimate: ValueAmountInput = {
            amount: this.listingDetails.getZillowRentEstimate() ?? 0,
            type: ValueType.AMOUNT,
        };
        if (this._useDefaultRequest()) {
            return defaultRentEstimate;
        }
        return this.getInvestmentDetails().rentEstimate ?? defaultRentEstimate;
    }

    private getAnnualRentIncreaseRate(): ValueRateInput {
        const defaultAnnualRentIncreaseRate: ValueRateInput = {
            rate: DefaultInvestmentRates.ANNUAL_RENT_INCREASE_RATE.valueOf(),
            type: ValueType.RATE,
        };
        if (this._useDefaultRequest()) {
            return defaultAnnualRentIncreaseRate;
        }
        return this.getGrowthProjections().annualRentIncreaseRate ?? defaultAnnualRentIncreaseRate;
    }

    private getAnnualAppreciationRate(): ValueRateInput {
        const defaultAnnualAppreciationRate: ValueRateInput = {
            rate: DefaultInvestmentRates.ANNUAL_APPRECIATION_RATE.valueOf(),
            type: ValueType.RATE,
        };
        if (this._useDefaultRequest()) {
            return defaultAnnualAppreciationRate;
        }
        return this.getGrowthProjections().annualAppreciationRate ?? defaultAnnualAppreciationRate;
    }

    private getAnnualTaxIncreaseRate(): ValueRateInput {
        const defaultAnnualTaxIncreaseRate: ValueRateInput = {
            rate: DefaultInvestmentRates.ANNUAL_TAX_INCREASE_RATE.valueOf(),
            type: ValueType.RATE,
        };
        if (this._useDefaultRequest()) {
            return defaultAnnualTaxIncreaseRate;
        }
        return this.getGrowthProjections().annualTaxIncreaseRate ?? defaultAnnualTaxIncreaseRate;
    }

    private getAnnualHomeInsuranceIncreaseRate(): ValueRateInput {
        const defaultAnnualHomeInsuranceIncreaseRate: ValueRateInput = {
            rate: DefaultInvestmentRates.ANNUAL_HOME_INSURANCE_INCREASE_RATE.valueOf(),
            type: ValueType.RATE,
        };
        if (this._useDefaultRequest()) {
            return defaultAnnualHomeInsuranceIncreaseRate;
        }
        return this.getGrowthProjections().annualHomeInsuranceIncreaseRate ?? defaultAnnualHomeInsuranceIncreaseRate;
    }

    private getAnnualHOAFeesIncreaseRate(): ValueRateInput {
        const defaultAnnualHOAFeesIncreaseRate: ValueRateInput = {
            rate: DefaultInvestmentRates.ANNUAL_HOA_FEES_INCREASE_RATE.valueOf(),
            type: ValueType.RATE,
        };
        if (this._useDefaultRequest()) {
            return defaultAnnualHOAFeesIncreaseRate;
        }
        return this.getGrowthProjections().annualHOAFeesIncreaseRate ?? defaultAnnualHOAFeesIncreaseRate;
    }

    private getParkingFeesIncreaseRate(): ValueRateInput {
        const defaultRate: ValueRateInput = {
            rate: DefaultInvestmentRates.ANNUAL_PARKING_FEES_INCREASE_RATE.valueOf(),
            type: ValueType.RATE,
        };
        if (this._useDefaultRequest()) {
            return defaultRate;
        }
        return this.getGrowthProjections().parkingFeesIncreaseRate ?? defaultRate;
    }

    private getLaundryServicesIncreaseRate(): ValueRateInput {
        const defaultRate: ValueRateInput = {
            rate: DefaultInvestmentRates.ANNUAL_LAUNDRY_SERVICE_INCREASE_RATE.valueOf(),
            type: ValueType.RATE,
        };
        if (this._useDefaultRequest()) {
            return defaultRate;
        }
        return this.getGrowthProjections().laundryServicesIncreaseRate ?? defaultRate;
    }

    private getStorageUnitFeesIncreaseRate(): ValueRateInput {
        const defaultRate: ValueRateInput = {
            rate: DefaultInvestmentRates.ANNUAL_STORAGE_UNIT_FEES_INCREASE_RATE.valueOf(),
            type: ValueType.RATE,
        };
        if (this._useDefaultRequest()) {
            return defaultRate;
        }
        return this.getGrowthProjections().storageUnitFeesIncreaseRate ?? defaultRate;
    }

    private getOtherAdditionalIncomeStreamsIncreaseRate(): ValueRateInput {
        const defaultRate: ValueRateInput = {
            rate: DefaultInvestmentRates.ANNUAL_OTHER_ADDITIONAL_INCOME_STREAMS_INCREASE_RATE.valueOf(),
            type: ValueType.RATE,
        };
        if (this._useDefaultRequest()) {
            return defaultRate;
        }
        return this.getGrowthProjections().otherAdditionalIncomeStreamsIncreaseRate ?? defaultRate;
    }

    private getParkingFees(): ValueAmountInput {
        const defaultParkingFees: ValueAmountInput = {
            amount: DefaultInvestmentRates.PARKING_FEES.valueOf(),
            type: ValueType.AMOUNT,
        };
        if (this._useDefaultRequest()) {
            return defaultParkingFees;
        }
        return this.getAdditionalIncomeStreams().parkingFees ?? defaultParkingFees;
    }

    private getLaundryServices(): ValueAmountInput {
        const defaultLaundryServices: ValueAmountInput = {
            amount: DefaultInvestmentRates.LAUNDRY_SERVICES.valueOf(),
            type: ValueType.AMOUNT,
        };
        if (this._useDefaultRequest()) {
            return defaultLaundryServices;
        }
        return this.getAdditionalIncomeStreams().laundryServices ?? defaultLaundryServices;
    }

    private getStorageUnitFees(): ValueAmountInput {
        const defaultStorageUnitFees: ValueAmountInput = {
            amount: DefaultInvestmentRates.STORAGE_UNIT_FEES.valueOf(),
            type: ValueType.AMOUNT,
        };
        if (this._useDefaultRequest()) {
            return defaultStorageUnitFees;
        }
        return this.getAdditionalIncomeStreams().storageUnitFees ?? defaultStorageUnitFees;
    }

    private getOtherAdditionalIncomeStreams(): ValueAmountInput {
        const defaultOtherAdditionalIncomeStreams: ValueAmountInput = {
            amount: DefaultInvestmentRates.OTHER_ADDITIONAL_INCOMES.valueOf(),
            type: ValueType.AMOUNT,
        };
        if (this._useDefaultRequest()) {
            return defaultOtherAdditionalIncomeStreams;
        }
        return this.getAdditionalIncomeStreams().other ?? defaultOtherAdditionalIncomeStreams;
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