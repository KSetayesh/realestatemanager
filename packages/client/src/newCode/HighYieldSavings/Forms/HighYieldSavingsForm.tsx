import React, { useState } from 'react';
import { FormProperty, StandardForm } from 'react-ui-library-ks-dev';
import { HighYeildSavingsFormConfig } from './HighYieldSavingsFormConfig';

// Define interface for the form data
export interface HighYieldSavingsData {
    initialDeposit: number;
    annualInterestRate: number;
    years: number;
    monthlyDeposit: number;
};

// Define props interface for the component
interface HighYieldSavingsFormProps {
    onSubmit: (formData: HighYieldSavingsData) => Promise<boolean>;
};

const HighYieldSavingsForm: React.FC<HighYieldSavingsFormProps> = ({ onSubmit }) => {
    // Initial form data
    const initialFormData: HighYieldSavingsData = {
        initialDeposit: 1000,
        annualInterestRate: 3.5,
        years: 5,
        monthlyDeposit: 100
    };

    // State for form data
    const [formData, setFormData] = useState<HighYieldSavingsData>(initialFormData);

    // State for form submission
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | undefined>(undefined);
    const [submitSuccess, setSubmitSuccess] = useState<string | undefined>(undefined);

    // Form validation errors
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [formTouched, setFormTouched] = useState<Record<string, boolean>>({});

    // Reset form function
    const resetForm = () => {
        setFormData(initialFormData);
        setFormErrors({});
        setFormTouched({});
        setSubmitError(undefined);
        setSubmitSuccess(undefined);
    };

    // Validate form fields
    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};
        let isValid = true;

        // Validate initialDeposit
        if (formData.initialDeposit === undefined || formData.initialDeposit === null) {
            errors.initialDeposit = 'Initial deposit is required';
            isValid = false;
        } else if (formData.initialDeposit < 0) {
            errors.initialDeposit = 'Initial deposit cannot be negative';
            isValid = false;
        }

        // Validate annualInterestRate
        if (formData.annualInterestRate === undefined || formData.annualInterestRate === null) {
            errors.annualInterestRate = 'Annual interest rate is required';
            isValid = false;
        } else if (formData.annualInterestRate < 0) {
            errors.annualInterestRate = 'Interest rate cannot be negative';
            isValid = false;
        } else if (formData.annualInterestRate > 20) {
            errors.annualInterestRate = 'Interest rate seems too high, please check';
            isValid = false;
        }

        // Validate years
        if (formData.years === undefined || formData.years === null) {
            errors.years = 'Investment period is required';
            isValid = false;
        } else if (formData.years <= 0) {
            errors.years = 'Investment period must be greater than 0';
            isValid = false;
        }

        // Validate monthlyDeposit
        if (formData.monthlyDeposit === undefined || formData.monthlyDeposit === null) {
            errors.monthlyDeposit = 'Monthly deposit is required';
            isValid = false;
        } else if (formData.monthlyDeposit < 0) {
            errors.monthlyDeposit = 'Monthly deposit cannot be negative';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Mark all fields as touched
        const allTouched: Record<string, boolean> = {};
        Object.keys(formData).forEach(key => {
            allTouched[key] = true;
        });
        setFormTouched(allTouched);

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Submit form data
        setIsSubmitting(true);
        setSubmitError(undefined);
        setSubmitSuccess(undefined);

        try {
            // Call parent component's submit handler
            const success = await onSubmit(formData);

            if (success) {
                setSubmitSuccess('Calculation completed successfully!');
            } else {
                setSubmitError('Failed to calculate. Please try again.');
            }
        } catch (error) {
            setSubmitError('An error occurred during calculation. Please try again.');
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Create table from metrics data
    const createForm = (data: HighYieldSavingsData): FormProperty[] => {
        return new HighYeildSavingsFormConfig().createDefaultForm(data);
    };

    return (
        <StandardForm
            formDetails={createForm(formData)}
            handleSubmit={handleSubmit}
            setFormData={setFormData}
            buttonTitle="Calculate Savings"
            columnsPerRow={2}
            title="High Yield Savings Calculator"
            subtitle="Plan your savings and see how your money can grow over time"
            isSubmitting={isSubmitting}
            submitError={submitError}
            submitSuccess={submitSuccess}
            resetForm={resetForm}
            formErrors={formErrors}
            formTouched={formTouched}
            variant="outlined"
            helpText="All fields marked with * are required. Interest is compounded annually."
        />
    );
};

export default HighYieldSavingsForm;