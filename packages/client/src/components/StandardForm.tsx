import React from 'react';
import { InputType } from '../constants/Constant'; // Import constants as needed
import {
    Box,
    Grid,
    Paper,
    Typography,
    Button,
    SelectChangeEvent
} from '@mui/material';
import RadioButtonComponent from '../basicdatadisplaycomponents/RadioButtonComponent';
import CheckBoxComponent from '../basicdatadisplaycomponents/CheckBoxComponent';
import SelectFieldComponent from '../basicdatadisplaycomponents/SelectFieldComponent';
import TextFieldComponent from '../basicdatadisplaycomponents/TextFieldComponent';

export type Options = { value: string | number, label: string }[];

export type FormValue = {
    name: string;
    value: number | string | undefined;
    options?: Options;
    type: InputType;
    step?: string;
};

export type FormProperty = {
    title: string;
    values: FormValue[];
};

export interface FormProps<T> {
    formDetails: FormProperty[];
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    setFormData: React.Dispatch<React.SetStateAction<T>>;
    buttonTitle: string;
    columnsPerRow?: number; // Optional prop for number of columns per row
    buttonDisableLogic?: () => boolean;
};

const StandardForm = <T,>({
    formDetails,
    handleSubmit,
    setFormData,
    buttonTitle,
    columnsPerRow = 3,
    buttonDisableLogic
}: FormProps<T>) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = event.target;
        let _value: string | boolean | number;

        if (type === 'checkbox') {
            _value = (event.target as HTMLInputElement).checked;
        } else if (type === 'number') {
            _value = parseFloat(value);
        } else {
            _value = value;
        }

        setFormData((prevFormData: T) => ({
            ...prevFormData,
            [name]: _value,
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
        const { name, value } = event.target;

        setFormData((prevFormData: T) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const renderInputField = (valueDetail: FormValue) => {
        switch (valueDetail.type) {
            case InputType.STRING:
                return (
                    <TextFieldComponent
                        name={valueDetail.name}
                        value={valueDetail.value as string}
                        onChange={handleChange}
                        placeholder={valueDetail.name}
                    />
                );
            case InputType.NUMBER:
                return (
                    <TextFieldComponent
                        name={valueDetail.name}
                        value={valueDetail.value as number}
                        onChange={handleChange}
                        type="number"
                        placeholder={valueDetail.name}
                        step={valueDetail.step || "1"}
                    />
                );
            case InputType.SELECT:
                return (
                    <SelectFieldComponent
                        name={valueDetail.name}
                        value={valueDetail.value as string | number}
                        onChange={handleSelectChange}
                        options={valueDetail.options || []}
                        placeholder={valueDetail.name}
                    />
                );
            case InputType.CHECKBOX:
                return (
                    <CheckBoxComponent
                        name={valueDetail.name}
                        checked={valueDetail.value ? valueDetail.value.toString().toLowerCase() === 'true' : false}
                        onChange={handleChange}
                        label={valueDetail.name}
                    />
                );
            case InputType.RADIO:
                return (
                    <RadioButtonComponent
                        name={valueDetail.name}
                        value={valueDetail.value as string | number}
                        onChange={handleChange}
                        options={valueDetail.options || []}
                        label={valueDetail.name}
                    />
                );
            default:
                return null;
        }
    };

    const createFormProperty = (detail: FormProperty, index: number) => {
        return (
            <Grid item xs={12 / columnsPerRow} key={index}>
                {detail.values.map((valueDetail, idx) => (
                    <Box key={idx} marginBottom={1}>
                        {renderInputField(valueDetail)}
                    </Box>
                ))}
            </Grid>
        );
    };

    const isButtonDisabled = (): boolean => {
        return buttonDisableLogic ? buttonDisableLogic() : false;
    };

    return (
        <Box display="flex" justifyContent="center" mt={4}>
            <Paper elevation={3} style={{ padding: '2rem', backgroundColor: '#f9f9f9', maxWidth: '800px', width: '100%' }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Form Title
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        {formDetails.map((detail: FormProperty, index: number) => (
                            createFormProperty(detail, index)
                        ))}
                    </Grid>
                    <Box mt={3} display="flex" justifyContent="center">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={isButtonDisabled()}
                        >
                            {buttonTitle}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default StandardForm;
