import { FormProperty, InputType } from "react-ui-library-ks-dev";
import { CreateFormInterface } from "../../types/CreateFormInterface";
import { HighYieldSavingsData } from "./HighYieldSavingsForm";

export class HighYeildSavingsFormConfig implements CreateFormInterface<HighYieldSavingsData> {

    createDefaultForm(formData: HighYieldSavingsData): FormProperty[] {
        // Define years options
        const yearOptions = Array.from({ length: 30 }, (_, i) => ({
            value: i + 1,
            label: `${i + 1} ${i + 1 === 1 ? 'Year' : 'Years'}`
        }));

        return [
            {
                title: 'Initial Investment',
                description: 'Enter your initial deposit and monthly contribution',
                values: [
                    {
                        name: 'initialDeposit',
                        value: formData.initialDeposit,
                        type: InputType.NUMBER,
                        required: true,
                        label: 'Initial Deposit ($)',
                        placeholder: 'Enter initial deposit amount',
                        step: '100',
                        description: 'The amount you will deposit to open the account'
                    },
                    {
                        name: 'monthlyDeposit',
                        value: formData.monthlyDeposit,
                        type: InputType.NUMBER,
                        required: true,
                        label: 'Monthly Deposit ($)',
                        placeholder: 'Enter monthly deposit amount',
                        step: '50',
                        description: 'The amount you will deposit every month'
                    }
                ]
            },
            {
                title: 'Interest & Time Period',
                description: 'Set the interest rate and investment period',
                values: [
                    {
                        name: 'annualInterestRate',
                        value: formData.annualInterestRate,
                        type: InputType.NUMBER,
                        required: true,
                        label: 'Annual Interest Rate (%)',
                        placeholder: 'Enter annual interest rate',
                        step: '0.1',
                        description: 'Annual Percentage Yield (APY)'
                    },
                    {
                        name: 'years',
                        value: formData.years,
                        type: InputType.SELECT,
                        options: yearOptions,
                        required: true,
                        label: 'Investment Period',
                        placeholder: 'Select number of years',
                        description: 'How long you plan to keep your savings'
                    }
                ]
            }
        ];
    }

}