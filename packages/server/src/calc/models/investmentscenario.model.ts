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
    MortgageWithRecurringExpensesBreakdownDTO,
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
        const principalAmount: number = this.purchasePrice;
        const downPaymentBreakdown: DownPaymentBreakdownDTO = this.createDownPaymentBreakdownDTO();
        const initialRentAmount: number = this.rentEstimate;
        const ROI: number = this.calculateROI();
        const capRate: number = this.calculateCapRate();
        const initialMortgagePayment: number = this.calculateMortgagePayment();
        const cashFlow: CashFlowDTO = this.createCashFlowBreakdownDTO();
        const initialCosts: InitialCostsBreakdownDTO = this.createInitialCostsBreakdownDTO();
        const additionalIncomeStreams: AdditionalIncomeStreamsDTO = this.additionalIncomeStreams.toDTO();
        const financingOptions: FinancingOptionDTO[] = this.createFinancingOptionBreakdownDTO();
        const growthProjections: GrowthProjectionsDTO = this.growthProjections.toDTO();
        const recurringExpensesBreakdown: RecurringExpensesBreakdownDTO = this.createRecurringExpensesDTO();
        const fixedMonthlyExpenses: FixedMonthlyExpensesDTO = this.createFixedMonthlyExpensesDTO();
        const ammortizationDetails: AmortizationDetailsDTO[] = this.calculateAmortizationSchedule();

        return {
            principalAmount: principalAmount,
            downPaymentAmount: downPaymentBreakdown,
            initialRentAmount: initialRentAmount,
            ROI: ROI,
            capRate: capRate,
            initialMortgagePayment: initialMortgagePayment,
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

        for (let month = 1; month <= totalPayments; month++) {
            const interestPayment = remainingBalance * monthlyInterestRate;
            const principalPayment = monthlyPayment - interestPayment;
            remainingBalance -= principalPayment;
            cumulativePrincipalPaid += principalPayment;

            // Apply monthly appreciation compounded
            propertyValue *= (1 + monthlyAppreciationRate);

            const equityWithAppreciation = downPaymentAmount + cumulativePrincipalPaid + (propertyValue - principal);
            const appreciationValue = propertyValue - principal; // Total appreciation from the original value

            const monthMod12 = ((month - 1) % 12) + 1;
            const year = Math.floor((month - 1) / 12) + 1;
            const monthlyPaymentRounded = Utility.round(monthlyPayment);
            const interestPaymentRounded = Utility.round(interestPayment);
            const principalPaymentRounded = Utility.round(principalPayment);
            const remainingBalanceRounded = Utility.round(remainingBalance);
            const equityWithDownPaymentRounded = Utility.round(cumulativePrincipalPaid + downPaymentAmount);
            const equityWithoutDownPaymentRounded = Utility.round(cumulativePrincipalPaid);
            const equityWithAppreciationRounded = Utility.round(equityWithAppreciation);
            const appreciationValueRounded = Utility.round(appreciationValue);

            const mortgageBreakdownDTO: MortgageBreakdownDTO = {
                mortgageAmount: 0,
                monthlyPayment: monthlyPaymentRounded,
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
            const totalCosts = mortgageBreakdownDTO.monthlyPayment +
                fixedMonthlyExpensesDTO.totalCosts +
                recurringExpensesDTO.totalCosts;

            const mortgageWithRecurringExpensesBreakdownDTO: MortgageWithRecurringExpensesBreakdownDTO = {
                totalCosts: totalCosts,
                breakdown: {
                    mortgageBreakdown: mortgageBreakdownDTO,
                    fixedMonthlyExpenses: fixedMonthlyExpensesDTO,
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
                year: year,
                remainingBalance: remainingBalanceRounded,
                mortgageWithRecurringExpensesBreakdown: mortgageWithRecurringExpensesBreakdownDTO,
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

    private calculateMonthlyCashFlow(): number {
        const recurringExpenses = this.calculateRecurringExpenses();
        return this.rentEstimate - (this.calculateMortgagePayment() + recurringExpenses);
    }

    private calculateCapRate(): number {
        const annualNetOperatingIncome = (this.calculateMonthlyCashFlow() + this.calculateMortgagePayment()) * 12;
        return (annualNetOperatingIncome / this.purchasePrice) * 100;
    }

    private calculateInitialCosts(): number {
        const downPaymentAmount = this.calculateDownPaymentAmount();
        const initialExpeses = this.operatingExpenses.calculateOneTimeExpenses();
        return downPaymentAmount + initialExpeses;
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

    private calculateRecurringExpenses(): number {
        return this.operatingExpenses.calculateRecurringExpenses();
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
        return {
            totalCosts: this.operatingExpenses.calculateOneTimeExpenses(),
            breakdown: {
                legalAndProfessionalFees: this.operatingExpenses.getLegalAndProfessionalFees(),
                initialRepairCosts: this.operatingExpenses.getInitialRepairCosts(),
                closingCosts: this.operatingExpenses.getClosingCosts(),
                travelingCosts: this.operatingExpenses.getTravelingCosts(),
                otherExpenses: this.operatingExpenses.getOtherInitialExpenses(),
            },
        };
    }

    private createRecurringExpensesDTO(): RecurringExpensesBreakdownDTO {

        return {
            totalCosts: this.operatingExpenses.calculateRecurringExpenses(),
            breakdown: {
                propertyManagementRate: this.operatingExpenses.getPropertyManagementRate(),
                vacancyRate: this.operatingExpenses.getVacancyRate(),
                maintenanceRate: this.operatingExpenses.getMaintenanceRate(),
                otherExpensesRate: this.operatingExpenses.getOtherExpensesRate(),
                capExReserveRate: this.operatingExpenses.getCapExReserveRate(),
            },
        };
    }

    private createFinancingOptionBreakdownDTO(): FinancingOptionDTO[] {
        return [{
            type: FinancingType.MORTGAGE,
            terms: {
                loanAmount: this.mortgageDetails.getLoanAmount(),
                rate: this.mortgageDetails.getAnnualInterestRate(),
                interestType: this.mortgageDetails.getInterestType(),
                termInYears: this.mortgageDetails.getTermInYears(),
                interestOnlyPeriod: 0,
                monthlyPayment: this.mortgageDetails.calculateMortgagePayment(),
            }
        }];
    }

    private createCashFlowBreakdownDTO(): CashFlowDTO {

        const monthlyCashFlowDetails: CashFlowDetailsDTO = {
            totalAmount: this.calculateMonthlyCashFlow(),
            breakdown: {
                totalExpenses: {
                    mortgagePayment: this.calculateMortgagePayment(),
                    pmi: this.calculatePMIAmount(),
                    recurringExpensesTotal: this.calculateRecurringExpenses(),
                },
                totalIncome: {
                    rent: this.rentEstimate,
                    additionalIncomeStreams: null,
                },
            },
        };

        const yearlyCashFlowDetails: CashFlowDetailsDTO = {
            totalAmount: this.calculateYearlyCashFlow(),
            breakdown: {
                totalExpenses: {
                    mortgagePayment: this.calculateMortgagePayment() * 12,
                    pmi: this.calculatePMIAmount() * 12,
                    recurringExpensesTotal: this.calculateRecurringExpenses() * 12,
                },
                totalIncome: {
                    rent: this.rentEstimate * 12,
                    additionalIncomeStreams: null,
                },
            },
        };

        return {
            monthlyCashFlow: monthlyCashFlowDetails,
            yearlyCashFlow: yearlyCashFlowDetails,
        };
    }

    private createFixedMonthlyExpensesDTO(): FixedMonthlyExpensesDTO {
        return {
            totalCosts: this.mortgageDetails.calculateFixedMonthlyExpenses(),
            breakdown: {
                monthlyPropertyTaxAmount: this.mortgageDetails.getMonthlyPropertyTaxAmount(),
                monthlyHomeInsuranceAmount: this.mortgageDetails.getMonthlyHomeInsuranceAmount(),
                monthlyHOAFeesAmount: this.mortgageDetails.getMonthlyHOAFeesAmount(),
            },
        };
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
