import React from 'react';
import Footer from './footer';
import AboutUs from './aboutUs';

function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-violet-950">
            <div className="flex flex-row justify-evenly place-content-center flex-wrap p-20">
                <div>
                    <h1 className="text-4xl text-red-500 font-bold mb-2">Welcome to</h1>
                    <h1 className="text-9xl text-red-500 font-black mb-6">Pactify</h1>
                </div>
                <div>
                    <div className="mb-4">
                        <input 
                            type="text" 
                            id="email-id" 
                            autoFocus 
                            placeholder="Email" 
                            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-red-500 w-auto min-w-full flex-grow"
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="password" 
                            id="password-id" 
                            autoFocus 
                            placeholder="Password" 
                            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-red-500 w-auto min-w-full flex-grow"
                        />
                    </div>
                    <div className="mb-4">
                        <a
                            type="submit" 
                            className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 hover:scale-105"
                            href="home"
                        >
                            Login
                        </a>
                    </div>
                    <p className="text-white mb-2">
                        <a href="signUp" className="underline hover:text-gray-300">Don't have an account? Sign up!</a>
                    </p>
                    <p className="text-white">
                        <a href="forgotPassword" className="underline hover:text-gray-300">Forgot your password?</a>
                    </p>
                </div>
            </div>
            <AboutUs />
            <Footer />
        </div>
    );
}

export default LoginPage;