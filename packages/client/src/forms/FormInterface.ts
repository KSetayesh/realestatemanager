import { FormProperty } from "../components/StandardForm";

export interface FormInterface<T, X = undefined> {
    getDefaultFormData(additionalData?: X extends undefined ? never : X): T;
    getFormDetails(formData: T): FormProperty[];
}