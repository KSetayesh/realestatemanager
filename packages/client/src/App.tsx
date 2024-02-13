import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import User from './pages/User';

console.log("App component is rendering");
console.log("Client is running on http://localhost:5173/");

const App: React.FC = () => {
    return (
    <Router>
        <br></br>
        <div className="App">
        <nav>
            {/* You could also put a navigation link here if you like */}
            <Link to="/">Home</Link> | <Link to="/users">Users</Link>
        </nav>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<User />} />
            {/* Add other routes here */}
        </Routes>
        </div>
    </Router>
    );
};

export default App;


