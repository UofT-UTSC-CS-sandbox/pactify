import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext.js';
import Footer from './footer.jsx';
import NavBar from './navBar.jsx';
import ContractHistory from './ContractHistory.jsx';
import axios from 'axios';

function HomePage() {
    const { user } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [userContracts, setUserContracts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalContracts, setTotalContracts] = useState(0);
    const contractsPerPage = 8;

    const handleDelete = (contractId) => {
        axios.delete('http://localhost:5050/api/deleteFile', {
            withCredentials: true,
            params: { contractId }
        })
            .then(response => {
                console.log('Delete response:', response.data);
                loadUserContracts(currentPage);
            })
            .catch(error => {
                console.error('Error deleting file:', error);
            });
    };

    const loadUserContracts = async (page) => {
        const startIndex = (page - 1) * contractsPerPage;
        try {
            const response = await axios.get('http://localhost:5050/api/user/getUserContracts', {
                withCredentials: true,
                params: {
                    startIndex: startIndex,
                    limit: contractsPerPage
                }
            });
            setUserContracts(response.data.contracts);
            setTotalContracts(response.data.totalContracts);
        } catch (error) {
            console.error('Error loading contracts:', error);
        }
    };

    useEffect(() => {
        loadUserContracts(currentPage);
    }, [currentPage]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const navigateEdit = () => {
        navigate('/edit');
    };

    const selectOther = () => {
        navigate('/otherContract');
    };

    const selectNDA = () => {
        navigate('/ndaContract');
    };

    const selectRental = () => {
        navigate('/rentalContract');
    };

    const selectPrenup = () => {
        navigate('/prenupContract');
    };

    function loadUserData() {
        axios.get('http://localhost:5050/api/user/getUserData', { withCredentials: true })
            .then(res => {
                document.getElementById('welcome').innerText = `Hi ${res.data.firstName}...`;
            })
            .catch(error => {
                console.error('Error loading user data:', error);
            });
    }

    useEffect(() => {
        loadUserData();
    }, []);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <NavBar />
            <div className="min-h-screen flex flex-col justify-between place-items-center bg-orange-100 p-8">
                <div className="flex flex-col bg-beige-100 p-8 rounded-lg mt-20">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold" id="welcome"> </h1>
                        <button
                            onClick={openModal}
                            className="flex items-center justify-center mt-4 px-4 py-2 w-52 self-center bg-red-500 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 hover:scale-105"
                        >
                            <svg class="w-7 h-7 text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v6.41A7.5 7.5 0 1 0 10.5 22H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z" clip-rule="evenodd" />
                                <path fill-rule="evenodd" d="M9 16a6 6 0 1 1 12 0 6 6 0 0 1-12 0Zm6-3a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z" clip-rule="evenodd" />
                            </svg>

                            Create Contract
                        </button>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold">Recent Contracts</h2>
                    </div>
                    <ContractHistory
                        userContracts={userContracts}
                        handleDelete={handleDelete}
                    />
                    <div className="mt-4">
                        {Array.from({ length: Math.ceil(totalContracts / contractsPerPage) }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`mx-1 px-3 py-1 rounded-full ${currentPage === i + 1 ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-400 transition duration-300 hover:scale-105 text-black'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-pactifyPurple rounded-lg shadow-lg w-auto ">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-3xl font-semibold text-white">
                                Select Contract Type
                            </h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-4xl font-black">
                                &times;
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-2 gap-4">
                                <button className="bg-red-500 text-white py-2 px-3 rounded-full shadow-md hover:bg-red-700 self-center text-center transition duration-300 hover:scale-105" onClick={selectNDA}>
                                    Non-Disclosure Agreement
                                </button>
                                <button className="bg-red-500 text-white py-2 px-3 rounded-full shadow-md hover:bg-red-700 self-center text-center transition duration-300 hover:scale-105" onClick={selectPrenup}>
                                    Prenuptual Agreement
                                </button>
                                <button className="bg-red-500 text-white py-2 px-3 rounded-full shadow-md hover:bg-red-700 self-center text-center transition duration-300 hover:scale-105" onClick={selectRental}>
                                    Rental Agreement
                                </button>
                                <button className="bg-red-500 text-white py-2 px-3 rounded-full shadow-md hover:bg-red-700 self-center text-center transition duration-300 hover:scale-105" onClick={selectOther}>
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
