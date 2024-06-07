import React from 'react';
import {
    FormControl,
    MenuItem,
    TextField,
    styled,
    SelectChangeEvent
} from '@mui/material';

type Options = { value: string | number, label: string }[];

type SelectFieldComponentProps = {
    name: string;
    value: string | number;
    onChange: (event: SelectChangeEvent<string | number>) => void;
    options: Options;
    placeholder: string;
};

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    margin: theme.spacing(0.5),
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
    '& .MuiInputLabel-root': {
        top: '-4px',
    },
    '& .MuiInputLabel-shrink': {
        top: '0px',
    },
}));

const SelectFieldComponent: React.FC<SelectFieldComponentProps> = ({ name, value, onChange, options, placeholder }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectEvent = {
            target: {
                name: event.target.name,
                value: event.target.value
            }
        } as SelectChangeEvent<string | number>;
        onChange(selectEvent);
    };

    return (
        <StyledFormControl variant="outlined" size="small" fullWidth>
            <TextField
                select
                name={name}
                value={value}
                onChange={handleChange}
                variant="outlined"
                size="small"
                label={placeholder}
                InputLabelProps={{ shrink: true }}
                SelectProps={{
                    native: false,
                }}
            >
                {options.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </StyledFormControl>
    );
};

export default SelectFieldComponent;
