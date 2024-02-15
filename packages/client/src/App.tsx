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

console.log("App component is rendering");
console.log("Client is running on http://localhost:5173/");

const App: React.FC = () => {
    return (
        <Router>
            <br></br>
            <div className="App">
                <nav>
                    {/* You could also put a navigation link here if you like */}
                    <Link to="/">Home</Link> | <Link to="/propertyForm">Property Form</Link> | <Link to="/propertiesList">Properties List</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/propertyForm" element={<PropertyForm />} />
                    <Route path="/propertiesList" element={<PropertiesList />} />
                    {/* <Route path="/propertiesList" element={<PropertiesList />} /> */}
                    {/* Add other routes here */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;


