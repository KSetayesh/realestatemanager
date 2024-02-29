import {
    AdditionalIncomeStreamsDTO,
    AmortizationDetailsDTO,
    CashFlowDTO,
    CashFlowDetailsDTO,
    DownPaymentBreakdownDTO,
    EquityBreakdownDTO,
    FinancingOptionDTO,
    FinancingType,
    FixedMonthlyExpensesDTO,
    GrowthProjectionsDTO,
    InitialCostsBreakdownDTO,
    InvestmentMetricsResponseDTO,
    InvestmentScenarioDTO,
    MortgageBreakdownDTO,
    MortgageWithAllExpensesBreakdownDTO,
    MortgageWithFixedExpensesBreakdownDTO,
    PMIDetailsDTO,
    RecurringExpensesBreakdownDTO,
    Utility
} from "@realestatemanager/shared";
import { GrowthProjections } from "./growthprojections.model";
import { MortgageDetails } from "./mortgagedetails.model";
import { OperatingExpenses } from "./operatingexpenses.model";
import { IDTOConvertible } from "./idtoconvertible.model";
import { AdditionalIncomeStreams } from "./additional.income.streams.model";

export class InvestmentScenario implements IDTOConvertible<InvestmentScenarioDTO>{
    private mortgageDetails: MortgageDetails;
    private growthProjections: GrowthProjections;
    private operatingExpenses: OperatingExpenses;
    private additionalIncomeStreams: AdditionalIncomeStreams;
    private rentEstimate: number;
    private purchasePrice: number;

    constructor(
        mortgageDetails: MortgageDetails,
        growthProjections: GrowthProjections,
        operatingExpenses: OperatingExpenses,
        additionalIncomeStreams: AdditionalIncomeStreams,
        rentEstimate: number,
        purchasePrice: number) {

        this.mortgageDetails = mortgageDetails;
        this.growthProjections = growthProjections;
        this.operatingExpenses = operatingExpenses;
        this.additionalIncomeStreams = additionalIncomeStreams;
        this.rentEstimate = rentEstimate;
        this.purchasePrice = purchasePrice;
    }

    toDTO(): InvestmentScenarioDTO {

        return {
            mortgageDetails: this.mortgageDetails.toDTO(),
            growthProjections: this.growthProjections.toDTO(),
            operatingExpenses: this.operatingExpenses.toDTO(),
            additionalIncomeStreams: this.additionalIncomeStreams.toDTO(),
            rentEstimate: this.rentEstimate,
            purchasePrice: this.purchasePrice,
        };
    }

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
            purchasePrice: purchasePrice,
            loanAmount: loanAmount,
            downPaymentAmount: downPaymentBreakdown,
            initialRentAmount: initialRentAmount,
            ROI: ROI,
            capRate: capRate,
            initialMortgagePayment: initialMortgagePayment,
            initialMonthlyAmount: initialMonthlyAmount,
            cashFlow: cashFlow,
            initialCosts: initialCosts,
            additionalIncomeStreams: additionalIncomeStreams,
            financingOptions: financingOptions,
            growthProjections: growthProjections,
            recurringExpensesBreakdown: recurringExpensesBreakdown,
            fixedMonthlyExpenses: fixedMonthlyExpenses,
            ammortizationDetails: ammortizationDetails,
        };

    }

    private calculateAmortizationSchedule(): AmortizationDetailsDTO[] {

        const principal = this.purchasePrice;
        const loanAmount = this.calculateLoanAmount();
        const downPaymentAmount = this.calculateDownPaymentAmount();
        const monthlyInterestRate = this.mortgageDetails.getMonthlyInterestRate() / 100;
        const totalPayments = this.mortgageDetails.getNumberOfPayments();
        const monthlyPayment = this.calculateMortgagePayment();
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
            propertyValue *= (1 + monthlyAppreciationRate);

            const equityWithAppreciation = downPaymentAmount + cumulativePrincipalPaid + (propertyValue - principal);
            const appreciationValue = propertyValue - principal; // Total appreciation from the original value

            const monthMod12 = ((monthCounter - 1) % 12) + 1;
            const yearCounter = Math.floor((monthCounter - 1) / 12) + 1;
            const mortgagePaymentRounded = Utility.round(monthlyPayment);
            const monthlyPaymentRounded = Utility.round(this.calculateMortgagePaymentWithFixedMonthlyExpenses());
            const interestPaymentRounded = Utility.round(interestPayment);
            const principalPaymentRounded = Utility.round(principalPayment);
            const remainingBalanceRounded = Utility.round(remainingBalance);
            const equityWithDownPaymentRounded = Utility.round(cumulativePrincipalPaid + downPaymentAmount);
            const equityWithoutDownPaymentRounded = Utility.round(cumulativePrincipalPaid);
            const equityWithAppreciationRounded = Utility.round(equityWithAppreciation);
            const appreciationValueRounded = Utility.round(appreciationValue);

            const mortgageBreakdownDTO: MortgageBreakdownDTO = {
                remainingLoanAmount: remainingBalanceRounded, // The total loan amount for the mortgage.
                monthlyMortgagePayment: mortgagePaymentRounded, // Base monthly mortgage payment, excluding PMI.
                pmiDetails: this.createPMIDetailsDTO(),
                breakdown: {
                    principalAmount: principalPaymentRounded, // Portion of monthly payment going toward the loan principal.
                    percentTowardsPrincipal: Utility.round((principalPayment / monthlyPayment) * 100), // Percentage of monthly payment applied to the principal.
                    interestAmount: interestPaymentRounded, // Portion of monthly payment going toward interest.
                    percentTowardsInterest: Utility.round((interestPayment / monthlyPayment) * 100), // Percentage of monthly payment applied to interest.
                },
            };

            const fixedMonthlyExpensesDTO: FixedMonthlyExpensesDTO = this.createFixedMonthlyExpensesDTO();
            const recurringExpensesDTO: RecurringExpensesBreakdownDTO = this.createRecurringExpensesDTO();

            const mortgageWithFixedExpensesBreakdownDTO: MortgageWithFixedExpensesBreakdownDTO = {
                totalCosts: mortgageBreakdownDTO.monthlyMortgagePayment + fixedMonthlyExpensesDTO.totalCosts,
                breakdown: {
                    mortgageBreakdown: mortgageBreakdownDTO,
                    fixedMonthlyExpenses: fixedMonthlyExpensesDTO,
                },
            };

            const mortgageWithAllExpensesBreakdownDTO: MortgageWithAllExpensesBreakdownDTO = {
                totalCosts: mortgageWithFixedExpensesBreakdownDTO.totalCosts + recurringExpensesDTO.totalCosts,
                breakdown: {
                    mortgageWithFixedExpenses: mortgageWithFixedExpensesBreakdownDTO,
                    recurringExpensesBreakdown: recurringExpensesDTO,
                },
            };

            const equityBreakdownDTO: EquityBreakdownDTO = {
                equityAmountWithDownPayment: equityWithDownPaymentRounded,
                equityAmountWithoutDownPayment: equityWithoutDownPaymentRounded,
                equityAmountWithAppreciation: equityWithAppreciationRounded,
                appreciationAmount: appreciationValueRounded,
            };

            const amortizationDetailsDTO: AmortizationDetailsDTO = {
                month: monthMod12,
                date: dateAsString,
                year: yearCounter,
                remainingBalance: remainingBalanceRounded,
                mortgageWithAllExpensesBreakdown: mortgageWithAllExpensesBreakdownDTO,
                cashFlowAmount: this.createCashFlowBreakdownDTO(),
                equityBreakdown: equityBreakdownDTO,
            };

            schedule.push(amortizationDetailsDTO);

        }

        return schedule;
    }

    private calculateROI(): number {
        const downPaymentAmount = this.calculateDownPaymentAmount();
        // Ensure downPaymentAmount is non-zero to avoid division by zero
        if (downPaymentAmount === 0) {
            throw new Error("Down payment cannot be zero for rate of return calculations.");
        }
        const yearlyReturn = this.calculateYearlyCashFlow();
        const initialExpeses = this.calculateInitialCosts();

        return Utility.round((yearlyReturn / initialExpeses) * 100);
    }

    private calculateYearlyCashFlow(): number {
        return this.calculateMonthlyCashFlow() * 12;
    }

    private calculateMonthlyCashFlow(rent: number = this.rentEstimate): number {
        const recurringExpenses = this.calculateRecurringExpenses(rent);
        return rent - (this.calculateMortgagePaymentWithFixedMonthlyExpenses() + recurringExpenses);
    }

    private calculateCapRate(): number {
        const annualNetOperatingIncome = (this.calculateMonthlyCashFlow() + this.calculateMortgagePayment()) * 12;
        return Utility.round((annualNetOperatingIncome / this.purchasePrice) * 100);
    }

    private calculateInitialCosts(): number {
        const downPaymentAmount = this.calculateDownPaymentAmount();
        const initialExpenses = this.operatingExpenses.calculateOneTimeExpenses();
        return downPaymentAmount + initialExpenses;
    }

    private calculateDownPaymentAmount(): number {
        return this.purchasePrice * (this.mortgageDetails.getDownPaymentPercentage() / 100);
    }

    private calculateLoanAmount(): number {
        return this.mortgageDetails.getLoanAmount();
    }

    private calculateMortgagePayment(calculateWithPMI: boolean = false): number {
        return this.mortgageDetails.calculateMortgagePayment(calculateWithPMI);
    }

    private calculateMortgagePaymentWithFixedMonthlyExpenses(calculateWithPMI: boolean = false): number {
        return this.mortgageDetails.calculateMortgagePaymentWithFixedMonthlyExpenses(calculateWithPMI);
    }

    private calculateRecurringExpenses(rent: number = this.rentEstimate): number {
        return this.operatingExpenses.calculateRecurringExpenses(rent);
    }

    private calculatePMIAmount(): number {
        return this.mortgageDetails.calculatePMIAmount();
    }

    private createDownPaymentBreakdownDTO(): DownPaymentBreakdownDTO {
        return {
            downPaymentAmount: Utility.round(this.calculateDownPaymentAmount()),
            downPaymentPercentage: this.mortgageDetails.getDownPaymentPercentage(),
        };
    }

    private createInitialCostsBreakdownDTO(): InitialCostsBreakdownDTO {
        const downPaymentAmount = this.calculateDownPaymentAmount();
        return {
            totalCosts: downPaymentAmount + this.operatingExpenses.calculateOneTimeExpenses(),
            breakdown: {
                downPaymentAmount: downPaymentAmount,
                legalAndProfessionalFees: this.operatingExpenses.getLegalAndProfessionalFees(),
                initialRepairCosts: this.operatingExpenses.getInitialRepairCosts(),
                closingCosts: this.operatingExpenses.getClosingCosts(),
                travelingCosts: this.operatingExpenses.getTravelingCosts(),
                otherExpenses: this.operatingExpenses.getOtherInitialExpenses(),
            },
        };
    }

    private createRecurringExpensesDTO(rent: number = this.rentEstimate): RecurringExpensesBreakdownDTO {
        return this.operatingExpenses.createRecurringExpensesDTO(rent);
    }

    private createFinancingOptionBreakdownDTO(): FinancingOptionDTO[] {
        return [{
            type: FinancingType.MORTGAGE,
            terms: {
                loanAmount: this.mortgageDetails.getLoanAmount(),
                annualInterstRate: this.mortgageDetails.getAnnualInterestRate(),
                interestType: this.mortgageDetails.getInterestType(),
                termInYears: this.mortgageDetails.getTermInYears(),
                interestOnlyPeriod: 0,
                monthlyPayment: this.mortgageDetails.calculateMortgagePayment(),
            }
        }];
    }

    private createCashFlowBreakdownDTO(rent: number = this.rentEstimate): CashFlowDTO {

        const monthlyCashFlowDetails: CashFlowDetailsDTO = {
            totalAmount: this.calculateMonthlyCashFlow(),
            breakdown: {
                totalExpenses: {
                    mortgagePayment: this.calculateMortgagePaymentWithFixedMonthlyExpenses(),
                    pmi: this.calculatePMIAmount(),
                    recurringExpensesTotal: this.calculateRecurringExpenses(rent),
                },
                totalIncome: {
                    rent: this.rentEstimate,
                    additionalIncomeStreamsTotal: this.additionalIncomeStreams.getTotalIncomeAmount(),
                },
            },
        };

        const yearlyCashFlowDetails: CashFlowDetailsDTO = {
            totalAmount: this.calculateYearlyCashFlow(),
            breakdown: {
                totalExpenses: {
                    mortgagePayment: this.calculateMortgagePaymentWithFixedMonthlyExpenses() * 12,
                    pmi: this.calculatePMIAmount() * 12,
                    recurringExpensesTotal: this.calculateRecurringExpenses(rent) * 12,
                },
                totalIncome: {
                    rent: this.rentEstimate * 12,
                    additionalIncomeStreamsTotal: this.additionalIncomeStreams.getTotalIncomeAmount() * 12,
                },
            },
        };

        return {
            monthlyCashFlow: monthlyCashFlowDetails,
            yearlyCashFlow: yearlyCashFlowDetails,
        };

    }

    private createFixedMonthlyExpensesDTO(): FixedMonthlyExpensesDTO {
        return this.mortgageDetails.createFixedMonthlyExpensesDTO();
    }

    private createPMIDetailsDTO(): PMIDetailsDTO {
        return {
            pmiAmount: this.mortgageDetails.calculatePMIAmount(),
            pmiRate: this.mortgageDetails.getPMIRate(),
            pmiRateFormula: '',
            pmiDropoffPoint: this.mortgageDetails.getPMIDropoffPoint(),
        };
    }

}
