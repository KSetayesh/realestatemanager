import { FormPropertyMap } from "../components/StandardForm";

export interface FormInterface<T, X = undefined> { //Y, X = undefined> {
    // getDefaultFormData(additionalData: X extends undefined ? never : X): T;
    // getFormDetails(formData: T, additionalData: X extends undefined ? never : X): FormProperty[];
    getFormDetails(additionalData: X extends undefined ? never : X): FormPropertyMap<T>;
    // createRequest(formData: T, additionalData: X): Y;
}