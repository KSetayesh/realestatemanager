import { CreateRentCastApiRequest } from "@realestatemanager/shared";
import { FormInterface } from "./FormInterface";
import { InputType, PropertyStatus, PropertyType } from "../constants/Constant";
import { FormProperty, FormPropertyMap } from "../components/StandardForm";
import { BasicCheckBoxForm, BasicNumberForm, BasicStringForm, GetOptionsForFormProperty, StateForm } from "./ReusableFormFields";

export type CollectPropertiesFormData = {
    address: FormProperty;
    city: FormProperty;
    state: FormProperty;
    zipcode: FormProperty;
    latitude: FormProperty;
    longitude: FormProperty;
    radius: FormProperty;
    propertyType: FormProperty;
    bedrooms: FormProperty;
    bathrooms: FormProperty;
    status: FormProperty;
    daysOld: FormProperty;
    limit: FormProperty;
    offset: FormProperty;
    retrieveExtraData: FormProperty;
};

export class CollectPropertiesFormDetails implements FormInterface<CollectPropertiesFormData, CreateRentCastApiRequest> {

    // getDefaultFormData(): CollectPropertiesFormData {
    //     return {
    //         address: '',
    //         city: '',
    //         state: State.AL,
    //         zipcode: '',
    //         latitude: NaN,
    //         longitude: NaN,
    //         radius: NaN,
    //         propertyType: PropertyType.SINGLE_FAMILY,
    //         bedrooms: NaN,
    //         bathrooms: NaN,
    //         status: PropertyStatus.ACTIVE,
    //         daysOld: NaN,
    //         limit: 5,
    //         offset: NaN,
    //         retrieveExtraData: false,
    //     };
    // }

    getFormDetails(): FormPropertyMap<CollectPropertiesFormData> {//FormProperty[] {
        return {
            address: BasicStringForm('Address', 'address'), //, formData.city),
            city: BasicStringForm('City', 'city'), // formData.city),
            state: StateForm(),//formData.state),
            zipcode: BasicStringForm('Zipcode', 'zipcode'), //formData.zipcode),
            latitude: BasicNumberForm('Latitude', 'latitude'), //formData.latitude),
            longitude: BasicNumberForm('Longitude', 'longitude'), //formData.longitude),
            radius: BasicNumberForm('Radius', 'radius'), //formData.radius),
            propertyType: {
                title: 'Property Type',
                values: {
                    propertyType: {
                        name: 'propertyType',
                        type: InputType.SELECT,
                        //value: formData.propertyType,
                        defaultValue: 'Any',
                        value: undefined,
                        options: GetOptionsForFormProperty(PropertyType, true),
                    },
                },
            },
            bedrooms: BasicNumberForm('Bedrooms', 'bedrooms'), // formData.bedrooms),
            bathrooms: BasicNumberForm('Bathrooms', 'bathrooms'), //formData.bathrooms),
            status: {
                title: 'Status',
                values: {
                    status: {
                        name: 'status',
                        type: InputType.SELECT,
                        // value: formData.status,
                        defaultValue: PropertyStatus.ACTIVE,
                        value: undefined,
                        options: GetOptionsForFormProperty(PropertyStatus),
                    },
                },
            },
            daysOld: BasicNumberForm('Days Old', 'daysOld'), // formData.daysOld),
            limit: BasicNumberForm('Limit', 'limit'), // formData.limit),
            offset: BasicNumberForm('Offset', 'offset'), // formData.offset),
            retrieveExtraData: BasicCheckBoxForm('Retrieve Extra Data', 'retrieveExtraData'), // formData.retrieveExtraData),
        };
    }

    // createRequest(formData: CollectPropertiesFormData): CreateRentCastApiRequest {
    //     return {
    //         address: formData.address,
    //         city: formData.city,
    //         state: formData.state as State,
    //         zipCode: formData.zipcode,
    //         latitude: formData.latitude,
    //         longitude: formData.longitude,
    //         radius: formData.radius,
    //         propertyType: formData.propertyType as PropertyType,
    //         bedrooms: formData.bedrooms,
    //         bathrooms: formData.bathrooms,
    //         status: formData.status as PropertyStatus,
    //         daysOld: formData.daysOld,
    //         limit: formData.limit,
    //         offset: formData.offset,
    //         retrieveExtraData: formData.retrieveExtraData,
    //     };
    // }

}