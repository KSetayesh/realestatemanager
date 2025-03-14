import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme, Box, Link } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Home from './pages/Home';
import PropertiesList from './pages/PropertiesList';
import PropertyForm from './pages/PropertyForm';
import Projections from './pages/Projections';
import InvestmentBreakdown from './pages/InvestmentBreakdown';
import HighYieldSavings from './pages/HighYieldSavings';
import AgentForm from './pages/AgentForm';
import AgentsList from './pages/AgentsList';
import CollectProperties from './pages/CollectProperties';
import AppDescription from './pages/AppDescription';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#f5f5f5', // Light gray background color
        },
    },
    typography: {
        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
        h1: {
            fontSize: '3.2em',
            lineHeight: 1.1,
        },
        h2: {
            fontSize: '2.2em',
        },
        body1: {
            lineHeight: 1.5,
            fontWeight: 400,
        },
        button: {
            textTransform: 'none',
        },
    },
});

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            <Link component={RouterLink} to="/" color="inherit" underline="none">
                                Real Estate Manager
                            </Link>
                        </Typography>
                        <Button component={RouterLink} to="/" color="inherit">
                            Home
                        </Button>
                        <Button component={RouterLink} to="/appDescription" color="inherit">
                            App Description
                        </Button>
                        <Button component={RouterLink} to="/agentForm" color="inherit">
                            Agent Form
                        </Button>
                        <Button component={RouterLink} to="/agentsList" color="inherit">
                            Agents List
                        </Button>
                        <Button component={RouterLink} to="/propertyForm" color="inherit">
                            Property Form
                        </Button>
                        <Button component={RouterLink} to="/collectProperties" color="inherit">
                            Collect Properties
                        </Button>
                        <Button component={RouterLink} to="/propertiesList" color="inherit">
                            Properties List
                        </Button>
                        <Button component={RouterLink} to="/highYieldSavings" color="inherit">
                            High Yield Savings
                        </Button>
                        <Button component={RouterLink} to="/projections" color="inherit">
                            Projections
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box className="pages" sx={{ maxWidth: '1900px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/appDescription" element={<AppDescription />} />
                        <Route path="/agentForm" element={<AgentForm />} />
                        <Route path="/agentsList" element={<AgentsList />} />
                        <Route path="/propertyForm" element={<PropertyForm />} />
                        <Route path="/propertiesList" element={<PropertiesList />} />
                        <Route path="/collectProperties" element={<CollectProperties />} />
                        <Route path="/highYieldSavings" element={<HighYieldSavings />} />
                        <Route path="/investmentBreakdown/:address" element={<InvestmentBreakdown />} />
                        <Route path="/projections" element={<Projections />} />
                    </Routes>
                </Box>
            </Router>
        </ThemeProvider>
    );
};

export default App;
