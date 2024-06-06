import React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

// Define the CustomButton component with specific styles
const CustomButton = styled(Button)({
    borderRadius: '8px',
    color: 'black',
    border: '1px solid transparent',
    padding: '0.6em 1.2em',
    fontSize: '1em',
    fontWeight: 500,
    fontFamily: 'inherit',
    backgroundColor: '#317cff', // Original Button Color
    cursor: 'pointer',
    transition: 'background-color 0.25s, border-color 0.25s',
    '&:hover': {
        backgroundColor: '#4791db', // Slightly lighter color for hover
        borderColor: '#317cff', // Original border color for hover
    },
    '&.Mui-disabled': {
        backgroundColor: '#a1cfff', // Disabled button color
        color: '#fff',
    },
    marginLeft: '5px', // Add margin left
    marginRight: '5px', // Add margin right
});

interface CustomButtonProps extends ButtonProps {
    buttonTitle?: string;
};

const CustomButtonComponent: React.FC<CustomButtonProps> = ({
    buttonTitle,
    ...props
}) => {
    return <CustomButton {...props}>{buttonTitle ? buttonTitle : 'Submit'} </CustomButton>;
};

export default CustomButtonComponent;


