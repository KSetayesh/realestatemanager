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

console.log("App component is rendering");
console.log("Client is running on http://localhost:5173/");

const App: React.FC = () => {
    return (
        <Router>
            <br></br>
            <div className="App">
                <nav>
                    {/* You could also put a navigation link here if you like */}
                    <Link to="/">Home</Link> &nbsp;|&nbsp;
                    <Link to="/propertyForm">Property Form</Link> &nbsp;|&nbsp;
                    <Link to="/propertiesList">Properties List</Link> &nbsp;|&nbsp;
                    <Link to="/investmentBreakdown">Investment Breakdown</Link> &nbsp;|&nbsp;
                    <Link to="/projections">Projections</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/propertyForm" element={<PropertyForm />} />
                    <Route path="/propertiesList" element={<PropertiesList />} />
                    <Route path="/investmentBreakdown" element={<InvestmentBreakdown />} />
                    <Route path="/projections" element={<Projections />} />
                    {/* <Route path="/propertiesList" element={<PropertiesList />} /> */}
                    {/* Add other routes here */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;


