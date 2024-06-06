import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, styled } from '@mui/material';

type Options = { value: string | number, label: string }[];

type RadioButtonComponentProps = {
    name: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    options: Options;
    label: string;
};

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const RadioButtonComponent: React.FC<RadioButtonComponentProps> = ({ name, value, onChange, options, label }) => {
    return (
        <StyledFormControl>
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup name={name} value={value} onChange={onChange}>
                {options.map((option, index) => (
                    <FormControlLabel
                        key={index}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
            </RadioGroup>
        </StyledFormControl>
    );
};

export default RadioButtonComponent;
