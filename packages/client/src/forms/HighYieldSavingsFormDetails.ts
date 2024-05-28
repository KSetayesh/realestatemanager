import { HighYeildSavingsRequest } from "@realestatemanager/shared";
import { FormProperty, FormPropertyMap } from "../components/StandardForm";
import { FormInterface } from "./FormInterface";
import { BasicNumberForm } from "./ReusableFormFields";

export type HighYieldSavingsFormData = {
    initialDeposit: FormProperty;
    annualInterestRate: FormProperty;
    years: FormProperty;
    monthlyDeposit?: FormProperty;
};

export class HighYieldSavingsFormDetails implements FormInterface<HighYieldSavingsFormData, HighYeildSavingsRequest> {

    // createRequest(formData: HighYieldSavingsFormData): HighYeildSavingsRequest {
    //     return {
    //         initialDeposit: formData.initialDeposit,
    //         annualInterestRate: formData.annualInterestRate,
    //         years: formData.years,
    //         monthlyDeposit: formData.monthlyDeposit,
    //     };
    // }

    // // Create a state to store the form data.
    // getDefaultFormData(): HighYieldSavingsFormData {
    //     return {
    //         initialDeposit: 1000,
    //         annualInterestRate: 5,
    //         years: 30,
    //         monthlyDeposit: 0,
    //     };
    // }

    getFormDetails(): FormPropertyMap<HighYieldSavingsFormData> {
        return {
            initialDeposit: BasicNumberForm('Initial Deposit', 'initialDeposit'), //, formData.initialDeposit),
            annualInterestRate: BasicNumberForm('Annual Interest Rate (%)', 'annualInterestRate'), //, formData.annualInterestRate),
            years: BasicNumberForm('Years', 'years'), //, formData.years),
            monthlyDeposit: BasicNumberForm('Monthly Deposit', 'monthlyDeposit'), //, formData.monthlyDeposit ?? 0),
        };
    }

}

