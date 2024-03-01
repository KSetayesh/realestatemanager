import { GrowthProjections } from "./growth.projections.model";
import { AmortizationDetailsDTO, InvestmentMetricsResponseDTO } from "@realestatemanager/shared";
import { EquityBreakdown } from "./equity.breakdown.model";
import { InitialCostsBreakdown } from "./initialcosts.model";
import { MortgageCalculator } from "./mortgage.calc.model";
import { TaxImplications } from "./tax.implications.model";

export class InvestmentScenario {
    private equityBreakdown: EquityBreakdown;
    private growthProjections: GrowthProjections;
    private initialCostsBreakdown: InitialCostsBreakdown;
    private mortgageCalculator: MortgageCalculator;
    private taxImplications: TaxImplications;

    constructor(
        equityBreakdown: EquityBreakdown,
        growthProjections: GrowthProjections,
        initialCostsBreakdown: InitialCostsBreakdown,
        mortgageCalculator: MortgageCalculator,
        taxImplications: TaxImplications,
    ) {
        this.equityBreakdown = equityBreakdown;
        this.growthProjections = growthProjections;
        this.initialCostsBreakdown = initialCostsBreakdown;
        this.mortgageCalculator = mortgageCalculator;
        this.taxImplications = taxImplications;
    }

    // private mortgageDetails: MortgageDetails;
    // private growthProjections: GrowthProjections;
    // private operatingExpenses: OperatingExpenses;
    // private additionalIncomeStreams: AdditionalIncomeStreams;
    // private rentEstimate: number;
    // private purchasePrice: number;

    // constructor(
    //     mortgageDetails: MortgageDetails,
    //     growthProjections: GrowthProjections,
    //     operatingExpenses: OperatingExpenses,
    //     additionalIncomeStreams: AdditionalIncomeStreams,
    //     rentEstimate: number,
    //     purchasePrice: number) {

    //     this.mortgageDetails = mortgageDetails;
    //     this.growthProjections = growthProjections;
    //     this.operatingExpenses = operatingExpenses;
    //     this.additionalIncomeStreams = additionalIncomeStreams;
    //     this.rentEstimate = rentEstimate;
    //     this.purchasePrice = purchasePrice;
    // }

    createInvestmentMetrics(): InvestmentMetricsResponseDTO {
        const purchasePrice: number = this.purchasePrice;
        const loanAmount: number = this.calculateLoanAmount();
        const downPaymentBreakdown: DownPaymentBreakdownDTO = this.createDownPaymentBreakdownDTO();
        const initialRentAmount: number = this.rentEstimate;
        const ROI: number = this.calculateROI();
        const capRate: number = this.calculateCapRate();
        const initialMortgagePayment: number = this.calculateMortgagePayment();
        const initialMonthlyAmount: number = this.calculateMortgagePaymentWithFixedMonthlyExpenses();
        const cashFlow: CashFlowDTO = this.createCashFlowBreakdownDTO();
        const initialCosts: InitialCostsBreakdownDTO = this.createInitialCostsBreakdownDTO();
        const additionalIncomeStreams: AdditionalIncomeStreamsDTO = this.additionalIncomeStreams.toDTO();
        const financingOptions: FinancingOptionDTO[] = this.createFinancingOptionBreakdownDTO();
        const growthProjections: GrowthProjectionsDTO = this.growthProjections.toDTO();
        const recurringExpensesBreakdown: RecurringExpensesBreakdownDTO = this.createRecurringExpensesDTO();
        const fixedMonthlyExpenses: FixedMonthlyExpensesDTO = this.createFixedMonthlyExpensesDTO();
        const ammortizationDetails: AmortizationDetailsDTO[] = this.calculateAmortizationSchedule();

        return {
            purchasePrice: {
                description: 'The total amount paid to acquire the property, not including any additional fees or closing costs.',
                value: purchasePrice,
            },
            rentEstimate: {
                description: 'An estimated amount a property is expected to earn in rental income per month.',
                value: initialRentAmount,
            },
            initialCosts: {
                description: `Expenses incurred at the start of the investment,
                            DownPaymentAmount + 
                            Legal And Professional Fees + 
                            Repair Costs + 
                            Closing Costs + 
                            Traveling Costs + 
                            Other Expenses`,
                value: initialCosts.totalCosts,
            },
            loanAmount: {
                description: 'The amount borrowed from a lender to finance the property purchase.',
                value: loanAmount,
            },
            downPaymentAmount: {
                description: 'The upfront payment made when purchasing a property.',
                value: downPaymentBreakdown.downPaymentAmount,
            },
            annualInterestRate: {
                description: 'The yearly rate charged by the lender for borrowing money, expressed as a percentage of the loan amount.',
                value: financingOptions[0].terms.annualInterstRate,
            },
            ROI: {
                description: '(Return on Investment): A measure of the profitability of the investment, calculated as the net income divided by the initial investment cost.',
                value: ROI,
            },
            capRate: {
                description: '(Capitalization Rate): A real estate valuation measure used to compare different investments, calculated as the net operating income divided by the property\'s purchase price.',
                value: capRate,
            },
            recurringCosts: {
                description: `Ongoing expenses related to the property, 
                            Property Management Amount +
                            Vacancy Amount +
                            Maintenance Amount + 
                            Other Expenses Amount + 
                            CapEx Reserve Amount`,
                value: recurringExpensesBreakdown.totalCosts,
            },
            monthlyPayment: {
                description: `The amount paid monthly for the mortgage, 
                            Mortgage (Principal + Interest) +
                            Monthly HOA Amount +
                            Monthly Property Tax Amount +
                            Monthly Home Owners Insurance Amount`,
                value: initialMonthlyAmount,
            },
            mortgageAmount: {
                description: `The amount paid monthly for the mortgage, 
                            Mortgage (Principal + Interest)`,
                value: initialMortgagePayment,
            },
            monthlyCashFlow: {
                description: 'The net amount of cash generated monthly after all expenses and mortgage payments have been made.',
                value: cashFlow.monthlyCashFlow.totalAmount,
            },
            yearlyCashFlow: {
                description: 'The net amount of cash generated yearly after all expenses and mortgage payments have been made.',
                value: cashFlow.yearlyCashFlow.totalAmount,
            },
            ammortizationDetails: ammortizationDetails,
        };

    }

    private calculateAmortizationSchedule(): AmortizationDetailsDTO[] {
        return null;
    }

}