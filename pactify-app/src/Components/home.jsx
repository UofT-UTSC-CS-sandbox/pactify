import React, { useContext } from 'react';
import { UserContext } from '../UserContext.js';
import Footer from './footer.jsx';
import NavBar from './navBar.jsx'
import ContractHistory from './ContractHistory.jsx';
function HomePage(){

    const { user } = useContext(UserContext);

    return (
        <div>
            <NavBar />
            <div className="min-h-screen flex flex-col justify-between place-items-center bg-orange-100 p-8">
                <div className="flex flex-col bg-beige-100 w-4/12 p-8 rounded-lg mt-20">
                    <div className=" text-left mb-8">
                        <h1 className="text-3xl font-bold">Hi there...</h1>
                        <a href="/create-new" className="mt-4 inline-block bg-red-500 text-white py-2 px-4 rounded-full font-bold hover:bg-red-700 transition duration-300 hover:scale-105">
                            CREATE NEW +
                        </a>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold">Recent Contracts</h2>
                    </div>
                    <ContractHistory />
                </div>
            </div>
            <Footer />
            
        </div>
    );
}

export default HomePage;