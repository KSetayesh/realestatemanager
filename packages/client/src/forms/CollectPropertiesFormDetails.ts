import { AddFormTitlesAndLabel, CollectPropertiesFormData, CreateRentCastApiRequest } from "@realestatemanager/shared";
import { FormInterface } from "./FormInterface";
import { InputType, PropertyStatus, PropertyType, State } from "../constants/Constant";
import { FormProperty } from "../components/StandardForm";
import {
    BasicCheckBoxForm,
    BasicNumberForm,
    BasicStringForm,
    GetOptionsForFormProperty,
    StateForm
} from "./ReusableFormFields";

export const AddCollectPropertiesTitlesAndLabels: AddFormTitlesAndLabel<CollectPropertiesFormData> = {
    address: {
        title: "",
        name: ""
    },
    city: {
        title: "",
        name: ""
    },
    state: {
        title: "",
        name: ""
    },
    zipcode: {
        title: "",
        name: ""
    },
    latitude: {
        title: "",
        name: ""
    },
    longitude: {
        title: "",
        name: ""
    },
    radius: {
        title: "",
        name: ""
    },
    propertyType: {
        title: "",
        name: ""
    },
    bedrooms: {
        title: "",
        name: ""
    },
    bathrooms: {
        title: "",
        name: ""
    },
    status: {
        title: "",
        name: ""
    },
    daysOld: {
        title: "",
        name: ""
    },
    limit: {
        title: "",
        name: ""
    },
    offset: {
        title: "",
        name: ""
    },
    retrieveExtraData: {
        title: "",
        name: ""
    }
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
            BasicStringForm(
                'Address',
                'address',
                formData.city
            ),
            BasicStringForm(
                'City',
                'city',
                formData.city
            ),
            StateForm(
                formData.state
            ),
            BasicStringForm(
                'Zipcode',
                'zipcode',
                formData.zipcode
            ),
            BasicNumberForm(
                'Latitude',
                'latitude',
                formData.latitude
            ),
            BasicNumberForm(
                'Longitude',
                'longitude',
                formData.longitude
            ),
            BasicNumberForm(
                'Radius',
                'radius',
                formData.radius
            ),
            {
                title: 'Property Type',
                values: [
                    {
                        name: 'propertyType',
                        type: InputType.SELECT,
                        value: formData.propertyType,
                        options: GetOptionsForFormProperty(PropertyType),
                    },
                ],
            },
            BasicNumberForm(
                'Bedrooms',
                'bedrooms',
                formData.bedrooms
            ),
            BasicNumberForm(
                'Bathrooms',
                'bathrooms',
                formData.bathrooms
            ),
            {
                title: 'Status',
                values: [
                    {
                        name: 'status',
                        type: InputType.SELECT,
                        value: formData.status,
                        options: GetOptionsForFormProperty(PropertyStatus),
                    },
                ],
            },
            BasicNumberForm(
                'Days Old',
                'daysOld',
                formData.daysOld
            ),
            BasicNumberForm(
                'Limit',
                'limit',
                formData.limit
            ),
            BasicNumberForm(
                'Offset',
                'offset',
                formData.offset
            ),
            BasicCheckBoxForm(
                'Retrieve Extra Data',
                'retrieveExtraData',
                formData.retrieveExtraData
            ),
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