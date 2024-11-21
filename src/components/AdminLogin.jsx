import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import adminIcon from '../assets/admin.svg';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard/all-posts');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, credentials);
            
            if (data.message === "Success") {
                localStorage.setItem('token', data.token);
                navigate('/dashboard/all-posts');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <img
                        alt="Admin Icon"
                        src={adminIcon}
                        className="mx-auto h-20 w-20"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Admin Login
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 shadow-md rounded-lg">
                    <div className="rounded-md shadow-sm -space-y-px">
                        {['email', 'password'].map((field) => (
                            <div key={field} className={field === 'password' ? 'pt-3' : ''}>
                                <label htmlFor={field} className="sr-only">{field === 'email' ? 'Email address' : 'Password'}</label>
                                <input
                                    id={field}
                                    name={field}
                                    type={field}
                                    required
                                    autoComplete={field === 'email' ? 'email' : 'current-password'}
                                    value={credentials[field]}
                                    onChange={handleChange}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder={field === 'email' ? 'Email address' : 'Password'}
                                />
                            </div>
                        ))}
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;