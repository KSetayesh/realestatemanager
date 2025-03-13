import { FormProperty } from "react-ui-library-ks-dev";

export interface CreateFormInterface<T> {
    createDefaultForm: (formData: T) => FormProperty[];
};