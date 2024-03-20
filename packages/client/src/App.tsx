import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import PropertiesList from './pages/PropertiesList';
import PropertyForm from './pages/PropertyForm';
import Projections from './pages/Projections';
import InvestmentBreakdown from './pages/InvestmentBreakdown';
import HighYieldSavings from './pages/HighYieldSavings';
import Agents from './pages/Agents';

console.log("App component is rendering");
console.log("Client is running on http://localhost:5173/");

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <nav className="navbar">
                    <br></br>
                    {/* You could also put a navigation link here if you like */}
                    <Link to="/">Home</Link> &nbsp;|&nbsp;
                    <Link to="/agents">Agents</Link> &nbsp;|&nbsp;
                    <Link to="/propertyForm">Property Form</Link> &nbsp;|&nbsp;
                    <Link to="/propertiesList">Properties List</Link> &nbsp;|&nbsp;
                    <Link to="/highYieldSavings">High Yield Savings</Link> &nbsp;|&nbsp;
                    {/* <Link to="/investmentBreakdown">Investment Breakdown</Link> &nbsp;|&nbsp; */}
                    <Link to="/projections">Projections</Link>
                </nav>
                <div className='pages'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/agents" element={<Agents />} />
                        <Route path="/propertyForm" element={<PropertyForm />} />
                        <Route path="/propertiesList" element={<PropertiesList />} />
                        <Route path="/highYieldSavings" element={<HighYieldSavings />} />
                        <Route path="/investmentBreakdown/:address" element={<InvestmentBreakdown />} />
                        <Route path="/projections" element={<Projections />} />
                        {/* <Route path="/propertiesList" element={<PropertiesList />} /> */}
                        {/* Add other routes here */}
                    </Routes>
                </div>
            </Router>
        </div>
    );
};

export default App;


