import React from 'react';

function SignupPage() {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-violet-950">
            <div className="flex items-center justify-center flex-grow">
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
            <footer class=" rounded-lg shadow bg-gray-900">
                <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div class="sm:flex sm:items-center sm:justify-between">
                        <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
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

export default SignupPage;
