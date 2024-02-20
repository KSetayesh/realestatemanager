import { Injectable } from '@nestjs/common';
import { RealEstateManager } from 'src/db/realestate/realestate.db';
import {
    InterestType,
    InvestmentMetricsDTO,
    InvestmentScenarioDTO,
    InvestmentScenarioRequestDTO,
    ListingDetailsDTO,
    ListingWithScenariosDTO,
    Utility
} from '@realestatemanager/shared';
import { ListingDetails } from '../models/listingdetails.model';
import { InvestmentScenario } from '../models/investmentscenario.model';
import { MortgageDetails } from '../models/mortgagedetails.model';
import { FinancialProjections } from '../models/financialprojections.model';
import { OperatingExpenses } from '../models/operatingexpenses.model';

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
            const investmentMetricsDTO: InvestmentMetricsDTO = investmentScenario.createInvestmentMetrics();
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
        const investmentMetricsDTO: InvestmentMetricsDTO = investmentScenario.createInvestmentMetrics();
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
        const monthlyPropertyTaxAmount = investmentScenarioRequest.mortgageDetails.monthlyPropertyTaxAmount;
        const monthlyHomeInsuranceAmount = investmentScenarioRequest.mortgageDetails.monthlyHomeInsuranceAmount;
        const monthlyHOAFeesAmount = investmentScenarioRequest.mortgageDetails.monthlyHOAFeesAmount;

        const mortgageDetails: MortgageDetails = new MortgageDetails(
            loanAmount,
            annualInterestRate,
            termInYears,
            interestType,
            downPaymentPercentage,
            pmiRate,
            monthlyPropertyTaxAmount,
            monthlyHomeInsuranceAmount,
            monthlyHOAFeesAmount);

        const annualAppreciationRate = investmentScenarioRequest.financialProjections.annualAppreciationRate;
        const annualTaxIncreaseRate = investmentScenarioRequest.financialProjections.annualTaxIncreaseRate;
        const annualRentIncreaseRate = investmentScenarioRequest.financialProjections.annualRentIncreaseRate;

        const financialProjections: FinancialProjections = new FinancialProjections(
            annualAppreciationRate,
            annualTaxIncreaseRate,
            annualRentIncreaseRate
        );

        const propertyManagementRate = investmentScenarioRequest.operatingExpenses.propertyManagementRate;
        const vacancyRate = investmentScenarioRequest.operatingExpenses.vacancyRate;
        const maintenanceRate = investmentScenarioRequest.operatingExpenses.maintenanceRate;
        const otherExpensesRate = investmentScenarioRequest.operatingExpenses.otherExpensesRate;
        const capExReserveRate = investmentScenarioRequest.operatingExpenses.capExReserveRate;
        const legalAndProfessionalFees = investmentScenarioRequest.operatingExpenses.legalAndProfessionalFees;
        const initialRepairCosts = investmentScenarioRequest.operatingExpenses.initialRepairCosts;
        const closingCosts = investmentScenarioRequest.operatingExpenses.closingCosts;

        const operatingExpenses: OperatingExpenses = new OperatingExpenses(
            propertyManagementRate,
            vacancyRate,
            maintenanceRate,
            otherExpensesRate,
            capExReserveRate,
            legalAndProfessionalFees,
            initialRepairCosts,
            closingCosts
        );

        const rentEstimate = investmentScenarioRequest.rentEstimate;
        const purchasePrice = investmentScenarioRequest.purchasePrice;

        const investmentScenario: InvestmentScenario = new InvestmentScenario(
            mortgageDetails,
            financialProjections,
            operatingExpenses,
            rentEstimate,
            purchasePrice
        );

        return investmentScenario;
    }

    private createDefaultInvestmentScenario(listingDetails: ListingDetails): InvestmentScenario {
        const rentEstimate = listingDetails.getZillowRentEstimate();
        const purchasePrice = listingDetails.getListingPrice();
        const annualInterestRate = 6.5;
        const termInYears = 30;
        const interestType = InterestType.FIXED;
        const downPaymentPercentage = 20;

        // Move this code somewhere else
        const loanAmount = Utility.round(purchasePrice * (1 - (downPaymentPercentage / 100)));

        const pmiRate = 0;
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
            monthlyPropertyTaxAmount,
            monthlyHomeInsuranceAmount,
            monthlyHOAFeesAmount);

        const annualAppreciationRate = 5;
        const annualTaxIncreaseRate = 5;
        const annualRentIncreaseRate = 5;

        const financialProjections: FinancialProjections = new FinancialProjections(
            annualAppreciationRate,
            annualTaxIncreaseRate,
            annualRentIncreaseRate
        );

        const propertyManagementRate = 10;
        const vacancyRate = 10;
        const maintenanceRate = 10;
        const otherExpensesRate = 5;
        const capExReserveRate = 5;
        const legalAndProfessionalFees = 5000;
        const initialRepairCosts = 5000;
        const closingCosts = 15000;

        const operatingExpenses: OperatingExpenses = new OperatingExpenses(
            propertyManagementRate,
            vacancyRate,
            maintenanceRate,
            otherExpensesRate,
            capExReserveRate,
            legalAndProfessionalFees,
            initialRepairCosts,
            closingCosts
        );

        const investmentScenario: InvestmentScenario = new InvestmentScenario(
            mortgageDetails,
            financialProjections,
            operatingExpenses,
            rentEstimate,
            purchasePrice
        );

        return investmentScenario;
    }

}
