import React, { useState } from 'react';
import { InputType, StandardForm } from 'react-ui-library-ks-dev';
import { AgentService } from '../../../oldCode/api/agent/agentservice';
import { CreateAgentRequest } from '@realestatemanager/types';
import { AgentFormDetails } from '../../../oldCode/forms/AgentFormDetails';

// Define the Agent data interface
interface AgentData {
    firstName: string;
    lastName: string;
    website: string;
    companyName: string;
    phoneNumber: string;
    email: string;
    country: string;
    state: string;
    agentType: string;
}

// Define props interface for the component
interface AgentFormProps {
    onAgentCreated: () => Promise<boolean>;
}

// Define country options
const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' },
    { value: 'other', label: 'Other' }
];

// Define state options (for US)
const stateOptions = [
    { value: 'al', label: 'Alabama' },
    { value: 'ak', label: 'Alaska' },
    { value: 'az', label: 'Arizona' },
    { value: 'ar', label: 'Arkansas' },
    { value: 'ca', label: 'California' },
    // Add more states as needed
    { value: 'wy', label: 'Wyoming' }
];

// Define agent type options
const agentTypeOptions = [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'both', label: 'Both' }
];

const AgentForm: React.FC<AgentFormProps> = ({ onAgentCreated }) => {
    // Initial form data
    const initialFormData: AgentData = {
        firstName: '',
        lastName: '',
        website: '',
        companyName: '',
        phoneNumber: '',
        email: '',
        country: '',
        state: '',
        agentType: ''
    };

    // Form helper 
    const agentFormDetails: AgentFormDetails = new AgentFormDetails();

    // Api for submitting form    
    const agentservice: AgentService = new AgentService();

    // State for form data
    const [formData, setFormData] = useState<AgentData>(initialFormData);

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

        // Validate firstName
        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required';
            isValid = false;
        }

        // Validate lastName
        if (!formData.lastName.trim()) {
            errors.lastName = 'Last name is required';
            isValid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        }

        // Validate phone number
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
            errors.phoneNumber = 'Please enter a valid phone number';
            isValid = false;
        }

        // Validate website if provided
        if (formData.website) {
            try {
                new URL(formData.website.startsWith('http') ? formData.website : `https://${formData.website}`);
            } catch (e) {
                errors.website = 'Please enter a valid website URL';
                isValid = false;
            }
        }

        // Validate country
        if (!formData.country) {
            errors.country = 'Please select a country';
            isValid = false;
        }

        // Validate agent type
        if (!formData.agentType) {
            errors.agentType = 'Please select an agent type';
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
            const getAgentRequest = (): CreateAgentRequest => {
                return agentFormDetails.createRequest(formData);
            };

            const postSuccess: boolean = await agentservice.addNewAgent(getAgentRequest());

            if (postSuccess) {
                setSubmitSuccess('Agent created successfully!');
                // Notify parent component of successful creation
                await onAgentCreated();
                // Optional: Reset form after successful submission
                resetForm();
            } else {
                setSubmitError('Failed to create agent. Please try again.');
            }
        } catch (error) {
            setSubmitError('Failed to create agent. Please try again.');
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Define form structure
    const formDetails = [
        {
            title: 'Personal Information',
            description: 'Enter the agent\'s personal details',
            values: [
                {
                    name: 'firstName',
                    value: formData.firstName,
                    type: InputType.TEXT,
                    required: true,
                    label: 'First Name',
                    placeholder: 'Enter first name'
                },
                {
                    name: 'lastName',
                    value: formData.lastName,
                    type: InputType.TEXT,
                    required: true,
                    label: 'Last Name',
                    placeholder: 'Enter last name'
                },
                {
                    name: 'email',
                    value: formData.email,
                    type: InputType.TEXT,
                    required: true,
                    label: 'Email Address',
                    placeholder: 'name@example.com'
                }
            ]
        },
        {
            title: 'Contact & Business Information',
            description: 'Enter business and contact details',
            collapsible: true,
            initiallyExpanded: true,
            values: [
                {
                    name: 'phoneNumber',
                    value: formData.phoneNumber,
                    type: InputType.TEXT,
                    label: 'Phone Number',
                    placeholder: 'Enter phone number',
                    description: 'Include country code if international'
                },
                {
                    name: 'companyName',
                    value: formData.companyName,
                    type: InputType.TEXT,
                    label: 'Company Name',
                    placeholder: 'Enter company name'
                },
                {
                    name: 'website',
                    value: formData.website,
                    type: InputType.TEXT,
                    label: 'Website',
                    placeholder: 'https://example.com'
                }
            ]
        },
        {
            title: 'Location & Type',
            description: 'Specify agent location and type',
            values: [
                {
                    name: 'country',
                    value: formData.country,
                    type: InputType.SELECT,
                    options: countryOptions,
                    required: true,
                    label: 'Country',
                    placeholder: 'Select country'
                },
                {
                    name: 'state',
                    value: formData.state,
                    type: InputType.SELECT,
                    options: stateOptions,
                    label: 'State/Province',
                    placeholder: 'Select state',
                    disabled: formData.country !== 'us'
                },
                {
                    name: 'agentType',
                    value: formData.agentType,
                    type: InputType.SELECT,
                    options: agentTypeOptions,
                    required: true,
                    label: 'Agent Type',
                    placeholder: 'Select agent type',
                    description: 'The type of properties this agent works with'
                }
            ]
        }
    ];

    return (
        <StandardForm
            formDetails={formDetails}
            handleSubmit={handleSubmit}
            setFormData={setFormData}
            buttonTitle="Create Agent"
            columnsPerRow={3}
            title="Agent Registration"
            subtitle="Enter agent details to register in the system"
            isSubmitting={isSubmitting}
            submitError={submitError}
            submitSuccess={submitSuccess}
            resetForm={resetForm}
            formErrors={formErrors}
            formTouched={formTouched}
            variant="outlined"
            helpText="All fields marked with * are required"
        />
    );
};

export default AgentForm;