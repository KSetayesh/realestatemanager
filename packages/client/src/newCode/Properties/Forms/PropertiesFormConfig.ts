import { FormProperty, InputType } from "react-ui-library-ks-dev";
import { CreateFormInterface } from "../../types/CreateFormInterface";
import { PropertyData, PropertyStatus, PropertyType } from "./PropertiesForm";
import { Country, State } from "@realestatemanager/types";

export class PropertiesFormConfig implements CreateFormInterface<PropertyData> {

    createDefaultForm(formData: PropertyData): FormProperty[] {
        // Create select options
        const stateOptions = Object.keys(State).map(key => ({
            value: State[key as keyof typeof State],
            label: State[key as keyof typeof State]
        }));

        const countryOptions = Object.keys(Country).map(key => ({
            value: Country[key as keyof typeof Country],
            label: Country[key as keyof typeof Country]
        }));

        const propertyTypeOptions = Object.keys(PropertyType).map(key => ({
            value: PropertyType[key as keyof typeof PropertyType],
            label: key.replace(/_/g, ' ').toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
        }));

        const propertyStatusOptions = Object.keys(PropertyStatus).map(key => ({
            value: PropertyStatus[key as keyof typeof PropertyStatus],
            label: key.replace(/_/g, ' ').toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
        }));

        // Rating options (1-10)
        const ratingOptions = Array.from({ length: 10 }, (_, i) => ({
            value: i + 1,
            label: `${i + 1}/10`
        }));

        return [
            {
                title: 'Basic Information',
                description: 'Enter the property\'s basic details',
                values: [
                    {
                        name: 'propertyType',
                        value: formData.propertyType,
                        type: InputType.SELECT,
                        options: propertyTypeOptions,
                        required: true,
                        label: 'Property Type',
                        placeholder: 'Select property type',
                        description: 'The type of property'
                    },
                    {
                        name: 'propertyStatus',
                        value: formData.propertyStatus,
                        type: InputType.SELECT,
                        options: propertyStatusOptions,
                        required: true,
                        label: 'Property Status',
                        placeholder: 'Select property status',
                        description: 'Current status of the property'
                    },
                    {
                        name: 'listingPrice',
                        value: formData.listingPrice === -1 ? '' : formData.listingPrice,
                        type: InputType.NUMBER,
                        required: true,
                        label: 'Listing Price ($)',
                        placeholder: 'Enter listing price',
                        step: '1000',
                        description: 'Property listing price'
                    }
                ]
            },
            {
                title: 'Address Information',
                description: 'Enter the property\'s location details',
                values: [
                    {
                        name: 'streetAddress',
                        value: formData.streetAddress,
                        type: InputType.TEXT,
                        required: true,
                        label: 'Street Address',
                        placeholder: 'Enter street address',
                        description: 'Street number and name'
                    },
                    {
                        name: 'apartmentNumber',
                        value: formData.apartmentNumber,
                        type: InputType.TEXT,
                        required: false,
                        label: 'Apartment/Unit Number',
                        placeholder: 'Enter apartment or unit number',
                        description: 'Apartment, unit, or suite number if applicable'
                    },
                    {
                        name: 'city',
                        value: formData.city,
                        type: InputType.TEXT,
                        required: true,
                        label: 'City',
                        placeholder: 'Enter city',
                        description: 'City name'
                    },
                    {
                        name: 'county',
                        value: formData.county,
                        type: InputType.TEXT,
                        required: false,
                        label: 'County',
                        placeholder: 'Enter county',
                        description: 'County name'
                    },
                    {
                        name: 'state',
                        value: formData.state,
                        type: InputType.SELECT,
                        options: stateOptions,
                        required: true,
                        label: 'State',
                        placeholder: 'Select state',
                        description: 'State or province'
                    },
                    {
                        name: 'zipcode',
                        value: formData.zipcode,
                        type: InputType.TEXT,
                        required: true,
                        label: 'Zipcode',
                        placeholder: 'Enter zipcode',
                        description: 'Postal code (5 digits or 5+4 format)'
                    },
                    {
                        name: 'country',
                        value: formData.country,
                        type: InputType.SELECT,
                        options: countryOptions,
                        required: true,
                        label: 'Country',
                        placeholder: 'Select country',
                        description: 'Country name'
                    },
                    {
                        name: 'fullAddress',
                        value: formData.fullAddress,
                        type: InputType.TEXT,
                        required: false,
                        label: 'Full Address (Optional)',
                        placeholder: 'Enter full address',
                        description: 'Complete address if different from above components'
                    }
                ]
            },
            {
                title: 'Property Details',
                description: 'Enter specific details about the property',
                collapsible: true,
                initiallyExpanded: true,
                values: [
                    {
                        name: 'numberOfBedrooms',
                        value: formData.numberOfBedrooms === -1 ? '' : formData.numberOfBedrooms,
                        type: InputType.NUMBER,
                        required: true,
                        label: 'Bedrooms',
                        placeholder: 'Enter number of bedrooms',
                        step: '1',
                        description: 'Number of bedrooms'
                    },
                    {
                        name: 'numberOfFullBathrooms',
                        value: formData.numberOfFullBathrooms === -1 ? '' : formData.numberOfFullBathrooms,
                        type: InputType.NUMBER,
                        required: true,
                        label: 'Full Bathrooms',
                        placeholder: 'Enter number of full bathrooms',
                        step: '1',
                        description: 'Number of full bathrooms'
                    },
                    {
                        name: 'numberOfHalfBathrooms',
                        value: formData.numberOfHalfBathrooms === -1 ? '' : formData.numberOfHalfBathrooms,
                        type: InputType.NUMBER,
                        required: false,
                        label: 'Half Bathrooms',
                        placeholder: 'Enter number of half bathrooms',
                        step: '1',
                        description: 'Number of half bathrooms'
                    },
                    {
                        name: 'squareFeet',
                        value: formData.squareFeet === -1 ? '' : formData.squareFeet,
                        type: InputType.NUMBER,
                        required: true,
                        label: 'Square Feet',
                        placeholder: 'Enter square footage',
                        step: '100',
                        description: 'Total square footage of the property'
                    },
                    {
                        name: 'acres',
                        value: formData.acres === -1 ? '' : formData.acres,
                        type: InputType.NUMBER,
                        required: false,
                        label: 'Acres',
                        placeholder: 'Enter acreage',
                        step: '0.1',
                        description: 'Total land area in acres'
                    },
                    {
                        name: 'yearBuilt',
                        value: formData.yearBuilt === -1 ? '' : formData.yearBuilt,
                        type: InputType.NUMBER,
                        required: false,
                        label: 'Year Built',
                        placeholder: 'Enter year built',
                        step: '1',
                        description: 'Year the property was built'
                    },
                    {
                        name: 'hasGarage',
                        value: formData.hasGarage,
                        type: InputType.CHECKBOX,
                        required: false,
                        label: 'Has Garage',
                        description: 'Property includes a garage'
                    },
                    {
                        name: 'hasPool',
                        value: formData.hasPool,
                        type: InputType.CHECKBOX,
                        required: false,
                        label: 'Has Pool',
                        description: 'Property includes a swimming pool'
                    },
                    {
                        name: 'hasBasement',
                        value: formData.hasBasement,
                        type: InputType.CHECKBOX,
                        required: false,
                        label: 'Has Basement',
                        description: 'Property includes a basement'
                    }
                ]
            },
            {
                title: 'Location and Market Details',
                description: 'Enter geographical and market information',
                collapsible: true,
                initiallyExpanded: false,
                values: [
                    {
                        name: 'longitude',
                        value: formData.longitude === -1 ? '' : formData.longitude,
                        type: InputType.NUMBER,
                        required: false,
                        label: 'Longitude',
                        placeholder: 'Enter longitude (decimal format)',
                        step: '0.000001',
                        description: 'Longitude coordinate (-180 to 180)'
                    },
                    {
                        name: 'latitude',
                        value: formData.latitude === -1 ? '' : formData.latitude,
                        type: InputType.NUMBER,
                        required: false,
                        label: 'Latitude',
                        placeholder: 'Enter latitude (decimal format)',
                        step: '0.000001',
                        description: 'Latitude coordinate (-90 to 90)'
                    },
                    {
                        name: 'numberOfDaysOnMarket',
                        value: formData.numberOfDaysOnMarket,
                        type: InputType.NUMBER,
                        required: false,
                        label: 'Days on Market',
                        placeholder: 'Enter days on market',
                        step: '1',
                        description: 'Number of days the property has been listed'
                    }
                ]
            },
            {
                title: 'School Information',
                description: 'Enter school ratings for the property',
                collapsible: true,
                initiallyExpanded: false,
                values: [
                    {
                        name: 'elementarySchoolRating',
                        value: formData.elementarySchoolRating === -1 ? '' : formData.elementarySchoolRating,
                        type: InputType.SELECT,
                        options: ratingOptions,
                        required: false,
                        label: 'Elementary School Rating',
                        placeholder: 'Select rating',
                        description: 'Rating for the assigned elementary school (1-10)'
                    },
                    {
                        name: 'middleSchoolRating',
                        value: formData.middleSchoolRating === -1 ? '' : formData.middleSchoolRating,
                        type: InputType.SELECT,
                        options: ratingOptions,
                        required: false,
                        label: 'Middle School Rating',
                        placeholder: 'Select rating',
                        description: 'Rating for the assigned middle school (1-10)'
                    },
                    {
                        name: 'highSchoolRating',
                        value: formData.highSchoolRating === -1 ? '' : formData.highSchoolRating,
                        type: InputType.SELECT,
                        options: ratingOptions,
                        required: false,
                        label: 'High School Rating',
                        placeholder: 'Select rating',
                        description: 'Rating for the assigned high school (1-10)'
                    }
                ]
            },
            {
                title: 'Zillow Information',
                description: 'Enter Zillow-specific property details',
                collapsible: true,
                initiallyExpanded: false,
                values: [
                    {
                        name: 'zillowURL',
                        value: formData.zillowURL,
                        type: InputType.TEXT,
                        required: false,
                        label: 'Zillow URL',
                        placeholder: 'Enter Zillow listing URL',
                        description: 'Link to the property on Zillow'
                    },
                    {
                        name: 'zestimate',
                        value: formData.zestimate === -1 ? '' : formData.zestimate,
                        type: InputType.NUMBER,
                        required: false,
                        label: 'Zestimate ($)',
                        placeholder: 'Enter Zestimate value',
                        step: '1000',
                        description: 'Zillow\'s estimated property value'
                    },
                    {
                        name: 'zillowRentEstimate',
                        value: formData.zillowRentEstimate === -1 ? '' : formData.zillowRentEstimate,
                        type: InputType.NUMBER,
                        required: false,
                        label: 'Rent Estimate ($/month)',
                        placeholder: 'Enter rent estimate',
                        step: '100',
                        description: 'Zillow\'s estimated monthly rent'
                    },
                    {
                        name: 'zestimateRangeLow',
                        value: formData.zestimateRangeLow === -1 ? '' : formData.zestimateRangeLow,
                        type: InputType.NUMBER,
                        required: false,
                        label: 'Zestimate Range Low ($)',
                        placeholder: 'Enter low range',
                        step: '1000',
                        description: 'Lower bound of Zestimate range'
                    },
                    {
                        name: 'zestimateRangeHigh',
                        value: formData.zestimateRangeHigh === -1 ? '' : formData.zestimateRangeHigh,
                        type: InputType.NUMBER,
                        required: false,
                        label: 'Zestimate Range High ($)',
                        placeholder: 'Enter high range',
                        step: '1000',
                        description: 'Upper bound of Zestimate range'
                    },
                    {
                        name: 'zillowMonthlyPropertyTaxAmount',
                        value: formData.zillowMonthlyPropertyTaxAmount === -1 ? '' : formData.zillowMonthlyPropertyTaxAmount,
                        type: InputType.NUMBER,
                        required: false,
                        label: 'Monthly Property Tax ($)',
                        placeholder: 'Enter monthly property tax',
                        step: '10',
                        description: 'Estimated monthly property tax'
                    },
                    {
                        name: 'zillowMonthlyHomeInsuranceAmount',
                        value: formData.zillowMonthlyHomeInsuranceAmount === -1 ? '' : formData.zillowMonthlyHomeInsuranceAmount,
                        type: InputType.NUMBER,
                        required: false,
                        label: 'Monthly Home Insurance ($)',
                        placeholder: 'Enter monthly insurance cost',
                        step: '10',
                        description: 'Estimated monthly home insurance cost'
                    },
                    {
                        name: 'zillowMonthlyHOAFeesAmount',
                        value: formData.zillowMonthlyHOAFeesAmount === -1 ? '' : formData.zillowMonthlyHOAFeesAmount,
                        type: InputType.NUMBER,
                        required: false,
                        label: 'Monthly HOA Fees ($)',
                        placeholder: 'Enter monthly HOA fees',
                        step: '10',
                        description: 'Monthly homeowners association fees'
                    }
                ]
            },
            {
                title: 'Description',
                description: 'Enter a detailed description of the property',
                values: [
                    {
                        name: 'description',
                        value: formData.description,
                        type: InputType.TEXT,
                        required: false,
                        label: 'Property Description',
                        placeholder: 'Enter a detailed description of the property',
                        description: 'Detailed information about the property features and amenities'
                    }
                ]
            }
        ];
    }
}