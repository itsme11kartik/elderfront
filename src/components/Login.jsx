import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

function Login({ setUsername, setUserType }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Prevent multiple clicks
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            const response = await fetch("https://elderback.onrender.com/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const res = await response.json();

            if (!response.ok) {
                toast.error(res.message || "Login failed!", { position: "top-right" });
                setLoading(false);
                return;
            }

            // Save user details in localStorage
            localStorage.setItem("token", res.token);
            localStorage.setItem("username", res.name);
            localStorage.setItem("userType", res.type);

            setUsername(res.name);
            setUserType(res.type);

            toast.success("Login successful! Redirecting...", { position: "top-right", autoClose: 2000 });

            // Redirect after a short delay
            setTimeout(() => {
                navigate(res.type === "Family" ? "/family-home" : "/elder-home");
            }, 2000);
        } catch (error) {
            toast.error("Something went wrong! Please try again.", { position: "top-right" });
        } finally {
            setLoading(false); // Stop loading
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Log In</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md disabled:bg-gray-400"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-600">Don't have an account? </span>
                    <Link to="/" className="text-blue-500 hover:text-blue-700 font-semibold">Sign Up</Link>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
}

export default Login;
