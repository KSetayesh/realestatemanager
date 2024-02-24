import { AmortizationDetailsDTO, CashFlowDTO, CashFlowDetailsDTO, DownPaymentBreakdownDTO, InitialCostsBreakdownDTO, InvestmentMetricsResponseDTO, InvestmentScenarioDTO, PropertyIdentifierDTO, Utility } from "@realestatemanager/shared";
import { AmortizationDetails } from "./amortizationdetails.model";
import { GrowthProjections } from "./growthprojections.model";
import { MortgageDetails } from "./mortgagedetails.model";
import { OperatingExpenses } from "./operatingexpenses.model";
import { IDTOConvertible } from "./idtoconvertible.model";

export class InvestmentScenario implements IDTOConvertible<InvestmentScenarioDTO>{
    private mortgageDetails: MortgageDetails;
    private growthProjections: GrowthProjections;
    private operatingExpenses: OperatingExpenses;
    private rentEstimate: number;
    private purchasePrice: number;

    constructor(
        mortgageDetails: MortgageDetails,
        growthProjections: GrowthProjections,
        operatingExpenses: OperatingExpenses,
        rentEstimate: number,
        purchasePrice: number) {

        this.mortgageDetails = mortgageDetails;
        this.growthProjections = growthProjections;
        this.operatingExpenses = operatingExpenses;
        this.rentEstimate = rentEstimate;
        this.purchasePrice = purchasePrice;
    }

    toDTO(): InvestmentScenarioDTO {
        return {
            mortgageDetails: this.mortgageDetails.toDTO(),
            growthProjections: this.growthProjections.toDTO(),
            operatingExpenses: this.operatingExpenses.toDTO(),
            rentEstimate: this.rentEstimate,
            purchasePrice: this.purchasePrice
        };
    }

    createInvestmentMetrics(): InvestmentMetricsResponseDTO {
        const principalAmount: number = this.purchasePrice;
        const downPaymentBreakdown: DownPaymentBreakdownDTO = this.createDownPaymentBreakdownDTO();
        const initialRentAmount: number = this.rentEstimate;
        const ROI: number = this.calculateROI();
        const initialMortgagePayment: number = this.calculateMortgagePayment();
        const cashFlow: CashFlowDTO = this.createCashFlowBreakdownDTO();
        const initialCosts: InitialCostsBreakdownDTO = undefined;


        // const loanAmount = this.calculateLoanAmount();
        // const ROI = this.calculateROI();
        // const capRate = this.calculateCapRate();
        // const monthlyCashFlow = this.calculateMonthlyCashFlow();
        // const yearlyCashFlow = this.calculateYearlyCashFlow();
        // const initialCosts = this.calculateInitialCosts();
        // const mortgage = this.calculateMortgagePayment();


        // principalAmount: number;
        // downPaymentAmount: DownPaymentBreakdownDTO;
        // initialRentAmount: number;
        // ROI: number;
        // capRate: number;
        // initialMortgagePayment: number;
        // cashFlow: CashFlowDTO;
        // initialCosts: InitialCostsBreakdownDTO;
        // additionalIncomeStreams: AdditionalIncomeStreamsDTO;
        // financingOptions: FinancingOptionDTO[];
        // growthProjections: GrowthProjectionsDTO;
        // recurringExpensesBreakdown: RecurringExpensesBreakdownDTO;
        // fixedMonthlyExpenses: FixedMonthlyExpensesDTO;
        // ammortizationDetails?: AmortizationDetailsDTO[];

        return {
            investmentScenario: this.toDTO(),
            downPaymentAmount: downPaymentBreakdown,
            loanAmount: Utility.round(loanAmount),
            ROI: Utility.round(ROI),
            capRate: Utility.round(capRate),
            monthlyCashFlow: Utility.round(monthlyCashFlow),
            yearlyCashFlow: Utility.round(yearlyCashFlow),
            initialCosts: Utility.round(initialCosts),
            mortgage: Utility.round(mortgage),
            ammortizationDetails: this.calculateAmortizationSchedule()
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

            const amortizationDetails: AmortizationDetails = new AmortizationDetails(
                monthMod12,
                year,
                monthlyPaymentRounded,
                interestPaymentRounded,
                principalPaymentRounded,
                remainingBalanceRounded,
                equityWithDownPaymentRounded,
                equityWithoutDownPaymentRounded,
                equityWithAppreciationRounded,
                appreciationValueRounded);

            schedule.push(amortizationDetails.toDTO());
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

    private calculateMortgagePayment(): number {
        return this.mortgageDetails.calculateMortgagePayment();
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
                },
            },
        };

        return {
            monthlyCashFlow: monthlyCashFlowDetails,
            yearlyCashFlow: yearlyCashFlowDetails,
        };
    }

    createInitialCostsDTO(): InitialCostsBreakdownDTO {
        return null;
    }

}
