import { GrowthProjections } from "./growth.projections.model";
import { AmortizationDetailsDTO, InvestmentMetricsResponseDTO, Utility } from "@realestatemanager/shared";
import { InitialCostsBreakdown } from "./initialcosts.model";
import { MortgageCalculator } from "./mortgage.calc.model";
import { TaxImplications } from "./tax.implications.model";

export class InvestmentScenario {
    private growthProjections: GrowthProjections;
    private initialCostsBreakdown: InitialCostsBreakdown;
    private mortgageCalculator: MortgageCalculator;
    private taxImplications: TaxImplications;

    constructor(
        growthProjections: GrowthProjections,
        initialCostsBreakdown: InitialCostsBreakdown,
        mortgageCalculator: MortgageCalculator,
        taxImplications: TaxImplications,
    ) {
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
        // const purchasePrice: number = this.purchasePrice;
        // const loanAmount: number = this.calculateLoanAmount();
        // const downPaymentBreakdown: DownPaymentBreakdownDTO = this.createDownPaymentBreakdownDTO();
        // const initialRentAmount: number = this.rentEstimate;
        // const ROI: number = this.calculateROI();
        // const capRate: number = this.calculateCapRate();
        // const initialMortgagePayment: number = this.calculateMortgagePayment();
        // const initialMonthlyAmount: number = this.calculateMortgagePaymentWithFixedMonthlyExpenses();
        // const cashFlow: CashFlowDTO = this.createCashFlowBreakdownDTO();
        // const initialCosts: InitialCostsBreakdownDTO = this.createInitialCostsBreakdownDTO();
        // const additionalIncomeStreams: AdditionalIncomeStreamsDTO = this.additionalIncomeStreams.toDTO();
        // const financingOptions: FinancingOptionDTO[] = this.createFinancingOptionBreakdownDTO();
        // const growthProjections: GrowthProjectionsDTO = this.growthProjections.toDTO();
        // const recurringExpensesBreakdown: RecurringExpensesBreakdownDTO = this.createRecurringExpensesDTO();
        // const fixedMonthlyExpenses: FixedMonthlyExpensesDTO = this.createFixedMonthlyExpensesDTO();
        // const ammortizationDetails: AmortizationDetailsDTO[] = this.calculateAmortizationSchedule();

        const purchasePrice: number = this.getPurchasePrice();
        const loanAmount: number = this.getLoanAmount();
        // const downPaymentBreakdown: DownPaymentBreakdownDTO = this.createDownPaymentBreakdownDTO();
        const annualInterestRate: number = this.getAnnualInterestRate();
        const downPaymentAmount: number = this.getDownPaymentAmount();
        const initialRentAmount: number = this.getRentalAmount();
        const ROI: number = this.calculateROI();
        const capRate: number = this.calculateCapRate();
        const initialMortgagePayment: number = this.getMortgageAmount();
        const initialMonthlyAmount: number = this.getMortgageAmountWithFixedMonthlyExpenses();
        const initialCosts: number = this.getTotalInitialCosts();
        const recurringCosts: number = this.getRecurringExpenses();
        const monthlyCashFlow: number = this.calculateMonthlyCashFlow();
        const yearlyCashFlow: number = this.calculateYearlyCashFlow();

        // const cashFlow: CashFlowDTO = this.createCashFlowBreakdownDTO();
        // const initialCosts: InitialCostsBreakdownDTO = this.createInitialCostsBreakdownDTO();
        // const additionalIncomeStreams: AdditionalIncomeStreamsDTO = this.additionalIncomeStreams.toDTO();
        // const financingOptions: FinancingOptionDTO[] = this.createFinancingOptionBreakdownDTO();
        // const growthProjections: GrowthProjectionsDTO = this.growthProjections.toDTO();
        // const recurringExpensesBreakdown: RecurringExpensesBreakdownDTO = this.createRecurringExpensesDTO();
        // const fixedMonthlyExpenses: FixedMonthlyExpensesDTO = this.createFixedMonthlyExpensesDTO();
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
                value: initialCosts,
            },
            loanAmount: {
                description: 'The amount borrowed from a lender to finance the property purchase.',
                value: loanAmount,
            },
            downPaymentAmount: {
                description: 'The upfront payment made when purchasing a property.',
                value: downPaymentAmount,
            },
            annualInterestRate: {
                description: 'The yearly rate charged by the lender for borrowing money, expressed as a percentage of the loan amount.',
                value: annualInterestRate,
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
                value: recurringCosts,
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
                value: monthlyCashFlow,
            },
            yearlyCashFlow: {
                description: 'The net amount of cash generated yearly after all expenses and mortgage payments have been made.',
                value: yearlyCashFlow,
            },
            ammortizationDetails: ammortizationDetails,
        };

    }

    private getPurchasePrice(): number {
        return this.mortgageCalculator.getPurchasePrice();
    }

    private getLoanAmount(): number {
        return this.mortgageCalculator.getLoanAmount();
    }

    private getDownPaymentAmount(): number {
        return this.mortgageCalculator.getDownPaymentAmount();
    }

    private getRentalAmount(): number {
        return this.mortgageCalculator.getRentalIncome();
    }

    private getAnnualInterestRate(): number {
        return this.mortgageCalculator.getAnnualInterestRate();
    }

    private getRecurringExpenses(): number {
        return this.mortgageCalculator.getRecurringExpenses();
    }

    private getTotalInitialCosts(): number {
        return this.initialCostsBreakdown.getTotalInitialCosts();
    }

    private getMortgageAmount(): number {
        return this.mortgageCalculator.calculateMortgagePayment();
    }

    private getMortgageAmountWithFixedMonthlyExpenses(): number {
        return this.mortgageCalculator.getMortgageAmountWithFixedMonthlyExpenses();
    }

    private calculateROI(): number {
        const downPaymentAmount = this.getDownPaymentAmount();
        // Ensure downPaymentAmount is non-zero to avoid division by zero
        if (downPaymentAmount === 0) {
            throw new Error("Down payment cannot be zero for rate of return calculations.");
        }
        const yearlyReturn = this.calculateYearlyCashFlow();
        const initialExpeses = this.getTotalInitialCosts();

        return Utility.round((yearlyReturn / initialExpeses) * 100);
    }

    private calculateYearlyCashFlow(): number {
        return this.calculateMonthlyCashFlow() * 12;
    }

    private calculateMonthlyCashFlow(rent: number = this.getRentalAmount()): number {
        const recurringExpenses = this.getRecurringExpenses();
        return rent - (this.getMortgageAmountWithFixedMonthlyExpenses() + recurringExpenses);
    }

    private calculateCapRate(): number {
        const annualNetOperatingIncome = (this.calculateMonthlyCashFlow() + this.getMortgageAmount()) * 12;
        return Utility.round((annualNetOperatingIncome / this.getPurchasePrice()) * 100);
    }

    // createInvestmentMetrics(): InvestmentMetricsResponseDTO {
    //     const purchasePrice: number = this.purchasePrice;
    //     const loanAmount: number = this.calculateLoanAmount();
    //     const downPaymentBreakdown: DownPaymentBreakdownDTO = this.createDownPaymentBreakdownDTO();
    //     const initialRentAmount: number = this.rentEstimate;
    //     const ROI: number = this.calculateROI();
    //     const capRate: number = this.calculateCapRate();
    //     const initialMortgagePayment: number = this.calculateMortgagePayment();
    //     const initialMonthlyAmount: number = this.calculateMortgagePaymentWithFixedMonthlyExpenses();
    //     const cashFlow: CashFlowDTO = this.createCashFlowBreakdownDTO();
    //     const initialCosts: InitialCostsBreakdownDTO = this.createInitialCostsBreakdownDTO();
    //     const additionalIncomeStreams: AdditionalIncomeStreamsDTO = this.additionalIncomeStreams.toDTO();
    //     const financingOptions: FinancingOptionDTO[] = this.createFinancingOptionBreakdownDTO();
    //     const growthProjections: GrowthProjectionsDTO = this.growthProjections.toDTO();
    //     const recurringExpensesBreakdown: RecurringExpensesBreakdownDTO = this.createRecurringExpensesDTO();
    //     const fixedMonthlyExpenses: FixedMonthlyExpensesDTO = this.createFixedMonthlyExpensesDTO();
    //     const ammortizationDetails: AmortizationDetailsDTO[] = this.calculateAmortizationSchedule();

    //     return {
    //         purchasePrice: {
    //             description: 'The total amount paid to acquire the property, not including any additional fees or closing costs.',
    //             value: purchasePrice,
    //         },
    //         rentEstimate: {
    //             description: 'An estimated amount a property is expected to earn in rental income per month.',
    //             value: initialRentAmount,
    //         },
    //         initialCosts: {
    //             description: `Expenses incurred at the start of the investment,
    //                         DownPaymentAmount + 
    //                         Legal And Professional Fees + 
    //                         Repair Costs + 
    //                         Closing Costs + 
    //                         Traveling Costs + 
    //                         Other Expenses`,
    //             value: initialCosts.totalCosts,
    //         },
    //         loanAmount: {
    //             description: 'The amount borrowed from a lender to finance the property purchase.',
    //             value: loanAmount,
    //         },
    //         downPaymentAmount: {
    //             description: 'The upfront payment made when purchasing a property.',
    //             value: downPaymentBreakdown.downPaymentAmount,
    //         },
    //         annualInterestRate: {
    //             description: 'The yearly rate charged by the lender for borrowing money, expressed as a percentage of the loan amount.',
    //             value: financingOptions[0].terms.annualInterstRate,
    //         },
    //         ROI: {
    //             description: '(Return on Investment): A measure of the profitability of the investment, calculated as the net income divided by the initial investment cost.',
    //             value: ROI,
    //         },
    //         capRate: {
    //             description: '(Capitalization Rate): A real estate valuation measure used to compare different investments, calculated as the net operating income divided by the property\'s purchase price.',
    //             value: capRate,
    //         },
    //         recurringCosts: {
    //             description: `Ongoing expenses related to the property, 
    //                         Property Management Amount +
    //                         Vacancy Amount +
    //                         Maintenance Amount + 
    //                         Other Expenses Amount + 
    //                         CapEx Reserve Amount`,
    //             value: recurringExpensesBreakdown.totalCosts,
    //         },
    //         monthlyPayment: {
    //             description: `The amount paid monthly for the mortgage, 
    //                         Mortgage (Principal + Interest) +
    //                         Monthly HOA Amount +
    //                         Monthly Property Tax Amount +
    //                         Monthly Home Owners Insurance Amount`,
    //             value: initialMonthlyAmount,
    //         },
    //         mortgageAmount: {
    //             description: `The amount paid monthly for the mortgage, 
    //                         Mortgage (Principal + Interest)`,
    //             value: initialMortgagePayment,
    //         },
    //         monthlyCashFlow: {
    //             description: 'The net amount of cash generated monthly after all expenses and mortgage payments have been made.',
    //             value: cashFlow.monthlyCashFlow.totalAmount,
    //         },
    //         yearlyCashFlow: {
    //             description: 'The net amount of cash generated yearly after all expenses and mortgage payments have been made.',
    //             value: cashFlow.yearlyCashFlow.totalAmount,
    //         },
    //         ammortizationDetails: ammortizationDetails,
    //     };

    // }

    private calculateAmortizationSchedule(): AmortizationDetailsDTO[] {
        return [];
    }

}