import React from 'react';
import { TextField, styled } from '@mui/material';

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        height: '40px',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderWidth: '2px',
        },
        '&:hover fieldset': {
            borderWidth: '2px',
        },
        '&.Mui-focused fieldset': {
            borderWidth: '2px',
        },
    },
    margin: theme.spacing(0.5),
}));

type TextFieldComponentProps = {
    name: string;
    value: string | number;
    type?: 'text' | 'number';
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder: string;
    step?: string;
};

const TextFieldComponent: React.FC<TextFieldComponentProps> = ({ name, value, type = 'text', onChange, placeholder, step }) => {
    return (
        <StyledTextField
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            variant="outlined"
            size="small"
            fullWidth
            label={placeholder}
            InputLabelProps={{ shrink: true }}
            InputProps={type === 'number' ? { inputProps: { step } } : undefined}
        />
    );
};

export default TextFieldComponent;
