import React, { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext.js';
import Footer from './footer.jsx';
import NavBar from './navBar.jsx'
import ContractHistory from './ContractHistory.jsx';
function HomePage() {

    const { user } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const selectOther = () => {
        navigate("/otherContract");
    }
    return (
        <div>
            <NavBar />
            <div className="min-h-screen flex flex-col justify-between place-items-center bg-orange-100 p-8">
                <div className="flex flex-col bg-beige-100 w-4/12 p-8 rounded-lg mt-20">
                    <div className=" text-left mb-8">
                        <h1 className="text-3xl font-bold">Hi there...</h1>
                        <button onClick={openModal} className="mt-4 inline-block bg-red-500 text-white py-2 px-4 rounded-full font-bold hover:bg-red-700 transition duration-300 hover:scale-105">
                            CREATE NEW +
                        </button>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold">Recent Contracts</h2>
                    </div>
                    <ContractHistory />
                </div>
            </div>
            <Footer />
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-violet-950 rounded-lg shadow-lg w-1/4 ">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-3xl font-semibold text-white">
                                Select Contract Type
                            </h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-4xl font-black">
                                &times;
                            </button>
                        </div>
                        <div className="p-4">
                            {/* Modal content */}
                            <div className="grid grid-cols-2 gap-4">
                                <button className=" bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-700 self-center text-center transition duration-300 hover:scale-105">NDA</button>
                                <button className=" bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-700 self-center text-center transition duration-300 hover:scale-105">Employment Contract</button>
                                <button className=" bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-700 self-center text-center transition duration-300 hover:scale-105">Rental Agreement</button>
                                <button className=" bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-700 self-center text-center transition duration-300 hover:scale-105" onClick={selectOther}>
                                    Other
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default HomePage;