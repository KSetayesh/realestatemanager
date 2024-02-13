import React, { useState } from 'react';
import { UserDTO } from '@realestatemanager/shared';

const User: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState<UserDTO[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
        const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
        throw new Error('Invalid credentials');
        }

        const user = await response.json();
        alert('Welcome ' + user.name + '!');
    } catch (error: any) {
        setErrorMessage(error.message);
    }
    };

    const fetchUsers = async () => {
    try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();
        setUsers(data);
    } catch (error) {
        console.error(error);
    }
    };
        return (
    <div>
        <br></br>
        <form onSubmit={handleLogin}>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        &nbsp;
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
        </form>
        <br></br>
        <button onClick={fetchUsers}>Fetch All Users</button>
        <div>
        {users.map((user) => (
            <div key={user.id}>
            {user.name} - {user.email}
            </div>
        ))}
        </div>
    </div>
    );
};

export default User;


