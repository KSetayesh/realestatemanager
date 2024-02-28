import { Injectable } from '@nestjs/common';
import { RealEstateManager } from 'src/db/realestate/realestate.db';
import {
    DefaultInvestmentRates,
    InvestmentMetricsResponseDTO,
    InvestmentScenarioDTO,
    InvestmentScenarioRequestDTO,
    ListingDetailsDTO,
    ListingWithScenariosDTO,
    Utility,
} from '@realestatemanager/shared';
import { ListingDetails } from '../models/listingdetails.model';
import { InvestmentScenario } from '../models/investmentscenario.model';
import { MortgageDetails } from '../models/mortgagedetails.model';
import { GrowthProjections } from '../models/growthprojections.model';
import { OperatingExpenses } from '../models/operatingexpenses.model';
import { getAmountFromValueInput, getInterestTypeEnumValue } from 'src/shared/Constants';
import { AdditionalIncomeStreams } from '../models/additional.income.streams.model';

@Injectable()
export class CalcService {

    private realEstateManager: RealEstateManager;

    constructor() {
        this.realEstateManager = new RealEstateManager();
    }

    async getAllProperties(investmentScenarioRequest?: InvestmentScenarioRequestDTO): Promise<ListingWithScenariosDTO[]> {

        const listingWithScenariosArr: ListingWithScenariosDTO[] = [];
        const listingDetailsArr: ListingDetails[] = await this.realEstateManager.getAllListings();
        for (const listingDetails of listingDetailsArr) {
            const investmentScenario: InvestmentScenario = this.determineScenarioRequest(listingDetails, investmentScenarioRequest);
            const investmentMetricsDTO: InvestmentMetricsResponseDTO = investmentScenario.createInvestmentMetrics();
            const listingWithScenariosDTO: ListingWithScenariosDTO = {
                listingDetails: listingDetails.toDTO(),
                metrics: [investmentMetricsDTO]
            };
            listingWithScenariosArr.push(listingWithScenariosDTO);
        }
        return listingWithScenariosArr;
    }

    async getPropertyByZillowURL(zillowURL: string, investmentScenarioRequest?: InvestmentScenarioRequestDTO): Promise<ListingWithScenariosDTO> {

        const listingDetails: ListingDetails = await this.realEstateManager.getPropertyByZillowURL(zillowURL);
        const investmentScenario: InvestmentScenario = this.determineScenarioRequest(listingDetails, investmentScenarioRequest);
        const investmentMetricsDTO: InvestmentMetricsResponseDTO = investmentScenario.createInvestmentMetrics();
        return {
            listingDetails: listingDetails.toDTO(),
            metrics: [investmentMetricsDTO]
        };
    }

    async addNewProperty(listingDetailsDTO: ListingDetailsDTO): Promise<void> {
        this.realEstateManager.insertListingDetails(listingDetailsDTO);
    }

    private determineScenarioRequest(listingDetails: ListingDetails, investmentScenarioRequest?: InvestmentScenarioRequestDTO): InvestmentScenario {
        if (!investmentScenarioRequest || investmentScenarioRequest.useDefaultRequest) {
            return this.createDefaultInvestmentScenario(listingDetails);
        }
        return this.createInvestmentScenario(investmentScenarioRequest.investmentScenario);
    }

    private createInvestmentScenario(investmentScenarioRequest: InvestmentScenarioDTO): InvestmentScenario {
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

        const parkingFees = investmentScenarioRequest.additionalIncomeStreams.parkingFees;
        const laundryServices = investmentScenarioRequest.additionalIncomeStreams.laundryServices;
        const storageUnitFees = investmentScenarioRequest.additionalIncomeStreams.storageUnitFees;
        const other = investmentScenarioRequest.additionalIncomeStreams.other;

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

    private createDefaultInvestmentScenario(listingDetails: ListingDetails): InvestmentScenario {
        const rentEstimate = listingDetails.getZillowRentEstimate();
        const purchasePrice = listingDetails.getListingPrice();
        const annualInterestRate = DefaultInvestmentRates.ANNUAL_INTEREST_RATE;
        const termInYears = DefaultInvestmentRates.TERM_IN_YEARS;
        const interestType = getInterestTypeEnumValue(DefaultInvestmentRates.INTEREST_TYPE);
        const downPaymentPercentage = DefaultInvestmentRates.DOWN_PAYMENT_PERCENTAGE;

        // Move this code somewhere else
        const loanAmount = Utility.round(purchasePrice * (1 - (downPaymentPercentage / 100)));

        const pmiRate = DefaultInvestmentRates.PMI_RATE;
        const pmiDropoffPoint = DefaultInvestmentRates.PMI_DROP_OFF_POINT;
        const monthlyPropertyTaxAmount = listingDetails.getZillowMonthlyPropertyTaxAmount();
        const monthlyHomeInsuranceAmount = listingDetails.getZillowMonthlyHomeInsuranceAmount();
        const monthlyHOAFeesAmount = listingDetails.getZillowMonthlyHOAFeesAmount();

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
