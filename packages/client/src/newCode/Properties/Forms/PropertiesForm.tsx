import React, { useState } from 'react';
import { FormProperty, StandardForm } from 'react-ui-library-ks-dev';
import { PropertiesFormConfig } from './PropertiesFormConfig';
import { Country, State } from '@realestatemanager/types';

export enum PropertyType {
    SINGLE_FAMILY = 'SINGLE_FAMILY',
    MULTI_FAMILY = 'MULTI_FAMILY',
    TOWNHOUSE = 'TOWNHOUSE',
    CONDO = 'CONDO',
    APARTMENT = 'APARTMENT',
    VACANT_LAND = 'VACANT_LAND',
    OTHER = 'OTHER'
}

export enum PropertyStatus {
    ACTIVE = 'ACTIVE',
    PENDING = 'PENDING',
    SOLD = 'SOLD',
    OFF_MARKET = 'OFF_MARKET'
}

// Property data interface
export interface PropertyData {
    zillowURL: string;
    fullAddress: string;
    state: State;
    zipcode: string;
    city: string;
    county: string;
    country: Country;
    streetAddress: string;
    apartmentNumber: string;
    longitude: number;
    latitude: number;
    numberOfDaysOnMarket: number;
    elementarySchoolRating: number;
    middleSchoolRating: number;
    highSchoolRating: number;
    numberOfBedrooms: number;
    numberOfFullBathrooms: number;
    numberOfHalfBathrooms: number;
    squareFeet: number;
    acres: number;
    yearBuilt: number;
    hasGarage: boolean;
    hasPool: boolean;
    hasBasement: boolean;
    propertyType: PropertyType;
    propertyStatus: PropertyStatus;
    listingPrice: number;
    zestimate: number;
    zillowRentEstimate: number;
    zestimateRangeLow: number;
    zestimateRangeHigh: number;
    zillowMonthlyPropertyTaxAmount: number;
    zillowMonthlyHomeInsuranceAmount: number;
    zillowMonthlyHOAFeesAmount: number;
    description: string;
}

// Props interface
interface PropertyFormProps {
    onPropertyAdded: () => Promise<boolean>;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ onPropertyAdded }) => {
    // Initial form data
    const initialFormData: PropertyData = {
        zillowURL: '',
        fullAddress: '',
        state: State.AL,
        zipcode: '',
        city: '',
        county: '',
        country: Country.UnitedStates,
        streetAddress: '',
        apartmentNumber: '',
        longitude: -1,
        latitude: -1,
        numberOfDaysOnMarket: 0,
        elementarySchoolRating: -1,
        middleSchoolRating: -1,
        highSchoolRating: -1,
        numberOfBedrooms: -1,
        numberOfFullBathrooms: -1,
        numberOfHalfBathrooms: -1,
        squareFeet: -1,
        acres: -1,
        yearBuilt: -1,
        hasGarage: false,
        hasPool: false,
        hasBasement: false,
        propertyType: PropertyType.SINGLE_FAMILY,
        propertyStatus: PropertyStatus.ACTIVE,
        listingPrice: -1,
        zestimate: -1,
        zillowRentEstimate: -1,
        zestimateRangeLow: -1,
        zestimateRangeHigh: -1,
        zillowMonthlyPropertyTaxAmount: -1,
        zillowMonthlyHomeInsuranceAmount: -1,
        zillowMonthlyHOAFeesAmount: -1,
        description: ''
    };

    // State for form data
    const [formData, setFormData] = useState<PropertyData>(initialFormData);

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

        // Required fields
        if (!formData.streetAddress.trim()) {
            errors.streetAddress = 'Street address is required';
            isValid = false;
        }

        if (!formData.city.trim()) {
            errors.city = 'City is required';
            isValid = false;
        }

        if (!formData.zipcode.trim()) {
            errors.zipcode = 'Zipcode is required';
            isValid = false;
        } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipcode)) {
            errors.zipcode = 'Zipcode must be in format 12345 or 12345-6789';
            isValid = false;
        }

        // Numeric validations
        if (formData.listingPrice <= 0) {
            errors.listingPrice = 'Listing price must be greater than 0';
            isValid = false;
        }

        if (formData.squareFeet <= 0) {
            errors.squareFeet = 'Square feet must be greater than 0';
            isValid = false;
        }

        if (formData.numberOfBedrooms < 0) {
            errors.numberOfBedrooms = 'Number of bedrooms must be 0 or greater';
            isValid = false;
        }

        if (formData.numberOfFullBathrooms < 0) {
            errors.numberOfFullBathrooms = 'Number of full bathrooms must be 0 or greater';
            isValid = false;
        }

        // GPS coordinates check
        if (formData.longitude !== -1 && (formData.longitude < -180 || formData.longitude > 180)) {
            errors.longitude = 'Longitude must be between -180 and 180';
            isValid = false;
        }

        if (formData.latitude !== -1 && (formData.latitude < -90 || formData.latitude > 90)) {
            errors.latitude = 'Latitude must be between -90 and 90';
            isValid = false;
        }

        // URL validation
        if (formData.zillowURL && !/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(formData.zillowURL)) {
            errors.zillowURL = 'Please enter a valid URL';
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
            // Make API call to add property
            // const propertyService = new PropertyService();
            // const success = await propertyService.addProperty(formData);

            // Simulating API call with a timeout
            await new Promise(resolve => setTimeout(resolve, 1000));
            const success = true; // Replace with actual API response

            if (success) {
                setSubmitSuccess('Property added successfully!');
                await onPropertyAdded();
                resetForm();
            } else {
                setSubmitError('Failed to add property. Please try again.');
            }
        } catch (error) {
            setSubmitError('An error occurred. Please try again.');
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const createForm = (data: PropertyData): FormProperty[] => {
        return new PropertiesFormConfig().createDefaultForm(data);
    };

    return (
        <StandardForm
            formDetails={createForm(formData)}
            handleSubmit={handleSubmit}
            setFormData={setFormData}
            buttonTitle="Add Property"
            columnsPerRow={3}
            title="Add New Property"
            subtitle="Enter property details to add to the system"
            isSubmitting={isSubmitting}
            submitError={submitError}
            submitSuccess={submitSuccess}
            resetForm={resetForm}
            formErrors={formErrors}
            formTouched={formTouched}
            variant="outlined"
            helpText="Required fields are marked with *. Enter as much information as available."
        />
    );
};

export default PropertyForm;