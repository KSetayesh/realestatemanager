import { FormProperty } from "../components/StandardForm";
import { InputType } from "../constants/Constant";
import { FormInterface } from "./FormInterface";

export type HighYieldSavingsFormData = {
    initialDeposit: number;
    annualInterestRate: number;
    years: number;
    monthlyDeposit?: number;
};

export class HighYieldSavingsFormDetails implements FormInterface<HighYieldSavingsFormData> {

    // Create a state to store the form data.
    getDefaultFormData(): HighYieldSavingsFormData {
        return {
            initialDeposit: 1000,
            annualInterestRate: 5,
            years: 30,
            monthlyDeposit: 0,
        };
    }

    getFormDetails(formData: HighYieldSavingsFormData): FormProperty[] {
        return [
            {
                title: 'Initial Deposit',
                name: 'initialDeposit',
                value: formData.initialDeposit,
                type: InputType.NUMBER,
            },
            {
                title: 'Annual Interest Rate (%)',
                name: 'annualInterestRate',
                value: formData.annualInterestRate,
                type: InputType.NUMBER,
            },
            {
                title: 'Years',
                name: 'years',
                value: formData.years,
                type: InputType.NUMBER,
            },
            {
                title: 'Monthly Deposit',
                name: 'monthlyDeposit',
                value: formData.monthlyDeposit ?? 0,
                type: InputType.NUMBER,
            },
        ];
    }

}

