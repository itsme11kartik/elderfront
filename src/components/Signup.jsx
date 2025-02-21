import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

function Signup({ FetchTask }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setUserType] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault(); 
        try {
            const response = await fetch("https://elderback.onrender.com/user/signup", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, type }),
            });

            const res = await response.json();
            console.log(res);

            if (response.ok) {
                toast.success("User  signed up successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "colored",
                });

                
                navigate("/login");

                
                setName("");
                setEmail("");
                setPassword("");
                setUserType("");

                if (FetchTask) FetchTask();
            } else {
                toast.error(res.message || "Signup failed!", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "colored",
                });
            }
        } catch (error) {
            toast.error("Something went wrong!", {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
            });
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-600">User  Type</label>
                        <select
                            id="type"
                            value={type}
                            onChange={(e) => setUserType(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Choose...</option>
                            <option value="Family">Family</option>
                            <option value="Elder">Elder</option>
                        </select>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Sign Up
                        </button>
                    </div>
                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-600">Already have an account? </span>
                        <Link to="/login" className="text-blue-500 hover:text-blue-700 font-semibold">Log In</Link>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Signup;