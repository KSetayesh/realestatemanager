// Home.tsx
import React from 'react';
import RandomPhoto from '../components/RandomPhoto';
import { Box, Typography, Container } from '@mui/material';

const Home: React.FC = () => {
    return (
        <Container>
            <Box mt={4} textAlign="center">
                <Typography variant="h3" component="h1" gutterBottom>
                    Real Estate Investment Tool
                </Typography>
                <RandomPhoto />
            </Box>
        </Container>
    );
};

export default Home;