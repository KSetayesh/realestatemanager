import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
return (
    <div>
    <br></br>
    <h1>Welcome to the Home Page</h1>
    <p>This is a simple home component.</p>
    <Link to="/users">Go to Users Page</Link>
    </div>
);
};

export default Home;


