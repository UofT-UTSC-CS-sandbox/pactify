import React from 'react';

function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-violet-950">
            <div className="flex flex-row justify-evenly place-content-start flex-wrap pt-40">
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
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 hover:scale-105"
                        >
                            Login
                        </button>
                    </div>
                    <p className="text-white mb-2">
                        <a href="signUp" className="underline hover:text-gray-300">Don't have an account? Sign up!</a>
                    </p>
                    <p className="text-white">
                        <a href="forgotPassword" className="underline hover:text-gray-300">Forgot your password?</a>
                    </p>
                </div>
            </div>
            <footer class=" rounded-lg shadow bg-gray-900">
                <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div class="sm:flex sm:items-center sm:justify-between">
                        <a href="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <span class="self-center text-2xl  whitespace-nowrap text-red-500 font-black">Pactify</span>
                        </a>
                        <ul class="flex flex-wrap items-center mb-6 text-sm font-medium  sm:mb-0 text-gray-400">
                            <li>
                                <a href="#" class="hover:underline me-4 md:me-6">About</a>
                            </li>
                            <li>
                                <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" class="hover:underline">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <hr class="my-6 sm:mx-auto border-gray-700 lg:my-8" />
                    <span class="block text-sm sm:text-center text-gray-400">© 2024 <a href="https://flowbite.com/" class="hover:underline">Pactify™</a>. All Rights Reserved.</span>
                </div>
            </footer>
        </div>
    );
}

export default LoginPage;