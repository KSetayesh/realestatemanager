import {
    AddHighYieldSavingsTitlesAndLabelsGetter,
    HighYeildSavingsRequest,
    HighYieldSavingsFormData
} from "@realestatemanager/shared";
import { FormProperty } from "../components/StandardForm";
import { FormInterface } from "./FormInterface";
import { BasicNumberForm } from "./ReusableFormFields";


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
        const getterInstance: AddHighYieldSavingsTitlesAndLabelsGetter = new AddHighYieldSavingsTitlesAndLabelsGetter();
        return [
            BasicNumberForm(
                getterInstance.initialDepositTitle,
                getterInstance.initialDepositName,
                formData.initialDeposit
            ),
            BasicNumberForm(
                getterInstance.annualInterestRateTitle,
                getterInstance.annualInterestRateName,
                formData.annualInterestRate
            ),
            BasicNumberForm(
                getterInstance.yearsTitle,
                getterInstance.yearsName,
                formData.years
            ),
            BasicNumberForm(
                getterInstance.monthlyDepositTitle,
                getterInstance.monthlyDepositName,
                formData.monthlyDeposit ?? 0
            ),
        ];
    }

}

