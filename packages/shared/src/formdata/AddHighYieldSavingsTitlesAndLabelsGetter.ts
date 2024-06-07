import { AddFormTitlesAndLabel, HighYieldSavingsFormData } from "../ApiTypes";

const AddHighYieldSavingsTitlesAndLabels: AddFormTitlesAndLabel<HighYieldSavingsFormData> = {
    initialDeposit: {
        title: "Initial Deposit",
        name: "initialDeposit"
    },
    annualInterestRate: {
        title: "Annual Interest Rate (%)",
        name: "annualInterestRate"
    },
    years: {
        title: "Years",
        name: "years"
    },
    monthlyDeposit: {
        title: "Monthly Deposit",
        name: "monthlyDeposit"
    },
};

export class AddHighYieldSavingsTitlesAndLabelsGetter {
    get initialDepositTitle(): string {
        return AddHighYieldSavingsTitlesAndLabels.initialDeposit.title;
    }

    get initialDepositName(): string {
        return AddHighYieldSavingsTitlesAndLabels.initialDeposit.name;
    }

    get annualInterestRateTitle(): string {
        return AddHighYieldSavingsTitlesAndLabels.annualInterestRate.title;
    }

    get annualInterestRateName(): string {
        return AddHighYieldSavingsTitlesAndLabels.annualInterestRate.name;
    }

    get yearsTitle(): string {
        return AddHighYieldSavingsTitlesAndLabels.years.title;
    }

    get yearsName(): string {
        return AddHighYieldSavingsTitlesAndLabels.years.name;
    }

    get monthlyDepositTitle(): string {
        return AddHighYieldSavingsTitlesAndLabels.monthlyDeposit.title;
    }

    get monthlyDepositName(): string {
        return AddHighYieldSavingsTitlesAndLabels.monthlyDeposit.name;
    }
}