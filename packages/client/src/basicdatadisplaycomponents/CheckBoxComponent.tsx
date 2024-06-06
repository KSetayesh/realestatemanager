import React from 'react';
import { FormControlLabel, Checkbox, styled } from '@mui/material';

type CheckBoxComponentProps = {
    name: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
};

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const CheckBoxComponent: React.FC<CheckBoxComponentProps> = ({ name, checked, onChange, label }) => {
    return (
        <StyledFormControlLabel
            control={<Checkbox checked={checked} onChange={onChange} name={name} />}
            label={label}
        />
    );
};

export default CheckBoxComponent;
