import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../redux/apiSlice'


function Login() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(form).unwrap(); // Promise-based result handling
            navigate('/blogs');
        } catch (err) {
            console.error('Login failed:', err);
            setError(err.data?.message || 'Login failed. Please try again.');
        }
    }
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Log In</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                <button type="submit" disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition duration-300">Log In</button>
            </form>
            {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
            <button onClick={() => navigate('/signup')} className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded transition duration-300">
                Don't have an account? Sign Up
            </button>
        </div>
    )
}

export default Login