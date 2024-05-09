import { FormFieldConfig } from "../pages/PropertyForm";
import { InputType } from "../constants/Constant";

interface AddPropertyFormProps {
    formFieldsConfig: FormFieldConfig[];
    formData: { [key: string]: any };
    // handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    buttonDisableLogic?: () => boolean;
};

const AddPropertyForm: React.FC<AddPropertyFormProps> = ({ formFieldsConfig, formData, setFormData, handleSubmit, buttonDisableLogic }) => {
    // Prepare form fields

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let value: string | boolean;
        const name = e.target.name;

        if (e.target instanceof HTMLInputElement && e.target.type === InputType.CHECKBOX) {
            value = e.target.checked;
        } else {
            value = e.target.value;
        }

        setFormData((prevFormData: FormData) => ({
            ...prevFormData,
            [name]: value
        }));

    };

    const pageContent = formFieldsConfig.map(({ name, label, type, selections }) => {
        let inputElement;

        if (InputType.SELECT === type && selections) {
            inputElement = (
                <select name={name} id={name} value={formData[name]} onChange={handleChange} className="form-input">
                    {selections.map((selection, index) => (
                        <option key={index} value={selection.toString()}>
                            {typeof selection === 'number' || typeof selection === 'boolean' ? selection.toString() : selection}
                        </option>
                    ))}
                </select>
            );
        } else if (InputType.CHECKBOX === type) {
            inputElement = (
                <input type={type} id={name} name={name} checked={formData[name]} value={formData[name]} onChange={handleChange} className="form-input" />
            );
        }
        else {
            inputElement = (
                <input type={type} id={name} name={name} value={formData[name]} onChange={handleChange} className="form-input" />
            );
        }

        return (
            <div className="form-field" key={name}>
                <label htmlFor={name} className="form-label">{label}:</label>
                {inputElement}
            </div>
        );
    });

    // Determine if the submit button should be disabled
    const isButtonDisabled = buttonDisableLogic ? buttonDisableLogic() : false;

    return (
        <form onSubmit={handleSubmit}>
            {pageContent}
            <div className="submit-button-container">
                <button type="submit" disabled={isButtonDisabled}>Submit</button>
            </div>
        </form>
    );

};


export default AddPropertyForm;
