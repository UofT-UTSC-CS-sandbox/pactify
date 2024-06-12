import React from 'react';

function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-violet-950">
            <div className="bg-amber-50 rounded-3xl shadow-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-2">Create An Account</h2>
                <p className="text-center mb-6">Enter your information in the fields below</p>
                <div className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Email" 
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-500"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-500"
                    />
                    <input 
                        type="password" 
                        placeholder="Re-enter Password" 
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-500"
                    />
                </div>
                <button 
                    type="submit" 
                    className="mt-6 w-full px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 hover:scale-105"
                >
                    Create Account
                </button>
                <p className="text-center mt-4">
                    <a href="login" className="text-black underline hover:text-gray-400">Already Have An Account? Sign In!</a>
                </p>
            </div>
        </div>
    );
}

export default SignupPage;
