import { CreateRentCastApiRequest } from "@realestatemanager/shared";
import { FormInterface } from "./FormInterface";
import { InputType, PropertyStatus, PropertyType, State } from "../constants/Constant";
import { FormProperty } from "../components/StandardForm";

export type CollectPropertiesFormData = {
    address: string;
    city: string;
    state: State;
    zipcode: string;
    latitude: number;
    longitude: number;
    radius: number;
    propertyType: PropertyType;
    bedrooms: number;
    bathrooms: number;
    status: PropertyStatus;
    daysOld: number;
    limit: number;
    offset: number;
    retrieveExtraData: boolean;
};

export class CollectPropertiesFormDetails implements FormInterface<CollectPropertiesFormData, CreateRentCastApiRequest> {

    getDefaultFormData(): CollectPropertiesFormData {
        return {
            address: '',
            city: '',
            state: State.AL,
            zipcode: '',
            latitude: NaN,
            longitude: NaN,
            radius: NaN,
            propertyType: PropertyType.SINGLE_FAMILY,
            bedrooms: NaN,
            bathrooms: NaN,
            status: PropertyStatus.ACTIVE,
            daysOld: NaN,
            limit: 5,
            offset: NaN,
            retrieveExtraData: false,
        };
    }

    getFormDetails(formData: CollectPropertiesFormData): FormProperty[] {
        return [
            {
                title: 'Address',
                name: 'address',
                type: InputType.STRING,
                value: formData.address,
            },
            {
                title: 'City',
                name: 'city',
                type: InputType.STRING,
                value: formData.city,
            },
            {
                title: 'State',
                name: 'state',
                type: InputType.SELECT,
                value: formData.state,
                options: Object.values(State).map((enumValue => {
                    return {
                        value: enumValue,
                        label: enumValue,
                    };
                })),
            },
            {
                title: 'Zipcode',
                name: 'zipcode',
                type: InputType.STRING,
                value: formData.zipcode,
            },
            {
                title: 'Latitude',
                name: 'latitude',
                type: InputType.NUMBER,
                value: formData.latitude,
            },
            {
                title: 'Longitude',
                name: 'longitude',
                type: InputType.NUMBER,
                value: formData.longitude,
            },
            {
                title: 'Radius',
                name: 'radius',
                type: InputType.NUMBER,
                value: formData.radius,
            },
            {
                title: 'Property Type',
                name: 'propertyType',
                type: InputType.SELECT,
                value: formData.propertyType,
                options: Object.values(PropertyType).map((enumValue => {
                    return {
                        value: enumValue,
                        label: enumValue,
                    };
                })),
            },
            {
                title: 'Bedrooms',
                name: 'bedrooms',
                type: InputType.NUMBER,
                value: formData.bedrooms,
            },
            {
                title: 'Bathrooms',
                name: 'bathrooms',
                type: InputType.NUMBER,
                value: formData.bathrooms,
            },
            {
                title: 'Status',
                name: 'status',
                type: InputType.SELECT,
                value: formData.status,
                options: Object.values(PropertyStatus).map((enumValue => {
                    return {
                        value: enumValue,
                        label: enumValue,
                    };
                })),
            },
            {
                title: 'Days Old',
                name: 'daysOld',
                type: InputType.NUMBER,
                value: formData.daysOld,
            },
            {
                title: 'Limit',
                name: 'limit',
                type: InputType.NUMBER,
                value: formData.limit,
            },
            {
                title: 'Offset',
                name: 'offset',
                type: InputType.NUMBER,
                value: formData.offset,
            },
            {
                title: 'Retrieve Extra Data',
                name: 'retrieveExtraData',
                type: InputType.CHECKBOX,
                value: formData.retrieveExtraData.toString(),
            },
        ];
    }

    createRequest(formData: CollectPropertiesFormData): CreateRentCastApiRequest {
        return {
            address: formData.address,
            city: formData.city,
            state: formData.state as State,
            zipCode: formData.zipcode,
            latitude: formData.latitude,
            longitude: formData.longitude,
            radius: formData.radius,
            propertyType: formData.propertyType as PropertyType,
            bedrooms: formData.bedrooms,
            bathrooms: formData.bathrooms,
            status: formData.status as PropertyStatus,
            daysOld: formData.daysOld,
            limit: formData.limit,
            offset: formData.offset,
            retrieveExtraData: formData.retrieveExtraData,
        };
    }

}