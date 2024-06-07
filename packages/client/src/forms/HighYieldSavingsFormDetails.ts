import { AddFormTitlesAndLabel, HighYeildSavingsRequest, HighYieldSavingsFormData } from "@realestatemanager/shared";
import { FormProperty } from "../components/StandardForm";
import { FormInterface } from "./FormInterface";
import { BasicNumberForm } from "./ReusableFormFields";

export const AddHighYieldSavingsTitlesAndLabels: AddFormTitlesAndLabel<HighYieldSavingsFormData> = {
    initialDeposit: {
        title: "",
        name: ""
    },
    annualInterestRate: {
        title: "",
        name: ""
    },
    years: {
        title: "",
        name: ""
    },
    monthlyDeposit: {
        title: "",
        name: ""
    }
};

export class HighYieldSavingsFormDetails implements FormInterface<HighYieldSavingsFormData, HighYeildSavingsRequest> {

    createRequest(formData: HighYieldSavingsFormData): HighYeildSavingsRequest {
        return {
            initialDeposit: formData.initialDeposit,
            annualInterestRate: formData.annualInterestRate,
            years: formData.years,
            monthlyDeposit: formData.monthlyDeposit,
        };
    }

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
            BasicNumberForm(
                'Initial Deposit', 
                'initialDeposit', 
                formData.initialDeposit
            ),
            BasicNumberForm(
                'Annual Interest Rate (%)', 
                'annualInterestRate', 
                formData.annualInterestRate
            ),
            BasicNumberForm(
                'Years', 
                'years', 
                formData.years
            ),
            BasicNumberForm(
                'Monthly Deposit', 
                'monthlyDeposit', 
                formData.monthlyDeposit ?? 0
            ),
        ];
    }

}

