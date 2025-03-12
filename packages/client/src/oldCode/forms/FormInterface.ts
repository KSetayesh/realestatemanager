import { FormProperty } from "../components/StandardForm";

export interface FormInterface<T, Y, X = undefined> {
    getDefaultFormData(additionalData: X extends undefined ? never : X): T;
    getFormDetails(formData: T): FormProperty[];
    createRequest(formData: T, additionalData: X): Y;
}