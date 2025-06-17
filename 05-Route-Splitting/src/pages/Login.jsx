import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = () => {
        login(() => navigate('/'));
    };

    return (
        <div>
            <h2>Login Page</h2>
            <button onClick={handleLogin}>Login</button>
            <nav>
                <Link to="/">Go to Home</Link>
            </nav>
        </div>
    );
};

export default Login;
