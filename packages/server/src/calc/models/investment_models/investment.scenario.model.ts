import { GrowthProjections } from "./growth.projections.model";
import { AmortizationDetailsDTO, AmountAndPercentageDTO, InvestmentMetricsResponseDTO, Utility } from "@realestatemanager/shared";
import { InitialCostsBreakdown } from "./initialcosts.model";
import { MortgageCalculator } from "./mortgage.calc.model";
import { TaxImplications } from "./tax.implications.model";

export class InvestmentScenario {
    private growthProjections: GrowthProjections;
    private initialCostsBreakdown: InitialCostsBreakdown;
    private mortgageCalculator: MortgageCalculator;
    private taxImplications?: TaxImplications;

    constructor(
        growthProjections: GrowthProjections,
        initialCostsBreakdown: InitialCostsBreakdown,
        mortgageCalculator: MortgageCalculator,
        taxImplications?: TaxImplications,
    ) {
        this.growthProjections = growthProjections;
        this.initialCostsBreakdown = initialCostsBreakdown;
        this.mortgageCalculator = mortgageCalculator;
        this.taxImplications = taxImplications;
    }

    createInvestmentMetrics(): InvestmentMetricsResponseDTO {

        const purchasePrice: number = this.getPurchasePrice();
        const loanAmount: number = this.getLoanAmount();
        const loanPercentage: number = this.getLoanPercentage();
        const annualInterestRate: number = this.getAnnualInterestRate();
        const downPayment: AmountAndPercentageDTO = this.getDownpaymentAmountAndPercentage();
        const initialRentAmount: number = this.getRentalAmount();
        const ROI: number = this.calculateROI();
        const capRate: number = this.calculateCapRate();
        const initialMortgagePayment: number = this.getMortgageAmount();
        const initialMonthlyAmount: number = this.getMortgageAmountWithFixedMonthlyExpenses();
        const initialCosts: number = this.getTotalInitialCosts();
        const recurringCosts: number = this.getRecurringExpenses();
        const monthlyCashFlow: number = this.calculateMonthlyCashFlow();
        const yearlyCashFlow: number = this.calculateYearlyCashFlow();
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
                amount: loanAmount,
                percentage: loanPercentage,
            },
            downPayment: downPayment,
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

    private getLoanPercentage(): number {
        return this.mortgageCalculator.getLoanPercentage();
    }

    private getDownpaymentAmountAndPercentage(): AmountAndPercentageDTO {
        return this.mortgageCalculator.getDownpaymentAmountAndPercentage();
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

    private getMonthlyInterestRate(): number {
        return this.mortgageCalculator.getMonthlyInterestRate();
    }

    private getNumberOfPayments(): number {
        return this.mortgageCalculator.getNumberOfPayments();
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

    private calculateAmortizationSchedule(): AmortizationDetailsDTO[] {

        const principal = this.getPurchasePrice();
        const loanAmount = this.getLoanAmount();
        const downPaymentAmount = this.getDownPaymentAmount();
        const monthlyInterestRate = this.getMonthlyInterestRate() / 100;
        const totalPayments = this.getNumberOfPayments();
        const monthlyPayment = this.getMortgageAmount();
        let schedule: AmortizationDetailsDTO[] = [];
        let remainingBalance = loanAmount;
        let cumulativePrincipalPaid = 0;
        let propertyValue = principal;

        // Calculate the equivalent monthly appreciation rate for a 4% annual rate
        const annualAppreciationRate = this.growthProjections.getAnnualAppreciationRate() / 100; //projections.annualAppreciationRate / 100;
        const monthlyAppreciationRate = Math.pow(1 + annualAppreciationRate, 1 / 12) - 1;


        const today = new Date();

        // Get the first day of the next month
        const year = today.getMonth() === 11 ? today.getFullYear() + 1 : today.getFullYear();
        const nextMonth = (today.getMonth() + 1) % 12;

        for (let monthCounter = 1; monthCounter <= totalPayments; monthCounter++) {
            const month = (nextMonth + (monthCounter - 1)) % 12;
            const yearOffset = Math.floor((nextMonth + (monthCounter - 1)) / 12);
            const date: Date = new Date(year + yearOffset, month, 1);
            const dateAsString = date.toLocaleDateString('en-US'); // date.toISOString().split('T')[0];

            const interestPayment = remainingBalance * monthlyInterestRate;
            const principalPayment = monthlyPayment - interestPayment;
            remainingBalance -= principalPayment;
            cumulativePrincipalPaid += principalPayment;

            // Apply monthly appreciation compounded
            if (monthCounter > 1) {
                propertyValue *= (1 + monthlyAppreciationRate);
            }

            const equityWithAppreciation = downPaymentAmount + cumulativePrincipalPaid + (propertyValue - principal);
            const appreciationValue = propertyValue - principal; // Total appreciation from the original value

            const monthMod12 = ((monthCounter - 1) % 12) + 1;
            const yearCounter = Math.floor((monthCounter - 1) / 12) + 1;
            const rentEstimate = Utility.round(this.getRentalAmount());
            const mortgagePaymentRounded = Utility.round(monthlyPayment);
            const monthlyPaymentRounded = Utility.round(this.getMortgageAmountWithFixedMonthlyExpenses());
            const interestPaymentRounded = Utility.round(interestPayment);
            const interestPercentageRounded = Utility.round((interestPaymentRounded / mortgagePaymentRounded) * 100);
            const principalPaymentRounded = Utility.round(principalPayment);
            const principalPercentageRounded = Utility.round((principalPaymentRounded / mortgagePaymentRounded) * 100);
            const remainingBalanceRounded = Utility.round(remainingBalance);
            const equityWithDownPaymentRounded = Utility.round(cumulativePrincipalPaid + downPaymentAmount);
            const equityWithoutDownPaymentRounded = Utility.round(cumulativePrincipalPaid);
            const equityWithAppreciationRounded = Utility.round(equityWithAppreciation);
            const appreciationValueRounded = Utility.round(appreciationValue);
            const recurringExpensesRounded = Utility.round(this.getRecurringExpenses());

            const getMonthlyPaymentAndRecurringCosts = (): number => {
                return this.getMortgageAmountWithFixedMonthlyExpenses() + this.getRecurringExpenses();
            };

            const monthlyPaymentAndRecurringCosts = Utility.round(getMonthlyPaymentAndRecurringCosts());

            const amortizationDetailsDTO: AmortizationDetailsDTO = {
                month: {
                    description: 'The current month in the amortization schedule, modulated by 12 to represent a month in a year.',
                    value: monthMod12,
                },
                date: {
                    description: 'The specific date on which the payment is calculated or applied.',
                    value: dateAsString,
                },
                year: {
                    description: 'The current year in the amortization schedule, indicating the period of the payment.',
                    value: yearCounter,
                },
                recurringCosts: {
                    description: 'Monthly recurring costs, such as taxes and insurance, not including the mortgage payment.',
                    value: recurringExpensesRounded,
                },
                monthlyPayment: {
                    description: 'The total monthly mortgage payment, including both interest and principal components.',
                    value: monthlyPaymentRounded,
                },
                monthlyPaymentAndRecurringCosts: {
                    description: 'The combined total of monthly mortgage payment and recurring costs.',
                    value: monthlyPaymentAndRecurringCosts,
                },
                rentEstimate: {
                    description: 'An estimate of the property\'s rental value, for comparison or income projection.',
                    value: rentEstimate,
                },
                mortgageAmount: {
                    description: 'The portion of the monthly payment that goes towards the mortgage itself.',
                    value: mortgagePaymentRounded,
                },
                amountPaidInInterest: {
                    description: 'The portion of the monthly payment that is allocated towards paying off interest.',
                    amount: interestPaymentRounded,
                    percentage: interestPercentageRounded,
                },
                amountPaidInPrincipal: {
                    description: 'The portion of the monthly payment that goes towards reducing the principal balance.',
                    amount: principalPaymentRounded,
                    percentage: principalPercentageRounded,
                },
                remainingBalance: {
                    description: 'The remaining balance on the mortgage after the current payment is made.',
                    value: remainingBalanceRounded,
                },
                equityWithDownPayment: {
                    description: 'The equity in the property including the initial down payment.',
                    value: equityWithDownPaymentRounded,
                },
                equityAmountWithoutDownPayment: {
                    description: 'The equity accumulated through mortgage payments, excluding the down payment.',
                    value: equityWithoutDownPaymentRounded,
                },
                equityAmountWithAppreciation: {
                    description: 'The total equity accounting for both payments made and property appreciation.',
                    value: equityWithAppreciationRounded,
                },
                appreciationAmount: {
                    description: 'The increase in property value over time, contributing to overall equity.',
                    value: appreciationValueRounded,
                },
            };

            schedule.push(amortizationDetailsDTO);

        }

        return schedule;
    }

}