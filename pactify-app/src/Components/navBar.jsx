import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();
    const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);

    const openLogOutModal = () => {
        setIsLogOutModalOpen(true);
    }

    const closeLogOutModal = () => {
        setIsLogOutModalOpen(false);
    }

    const navigateSettings = () => {
        navigate("/settings");
    }

    const navigateAccountInfo = () => {
        navigate("/accountInfo");
    }

    function handleLogout() {
        // clear cookies
        const cookies = new Cookies();
        cookies.set('jwt', '', { path: "/", expires: new Date(0) });
        navigate("/");
    }

    return (
        <nav className="bg-pactifyPurple fixed w-full z-50 top-0 left-0">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <a href='/home' className="text-red-500 text-2xl font-black">
                    Pactify
                </a>
                <div className="flex items-center space-x-4 -translate-x-10">
                    <NavDropdown
                        id="nav-dropdown"
                        className="flex items-center -translate-x-10"
                        title={<div className="relative w-10 h-10 overflow-hidden bg-gray-300 rounded-full flex items-center translate-y-3 translate-x-12">
                            <a>
                                <svg className="absolute w-12 h-12 transform -translate-y-5 -translate-x-1 text-amber-50 -left-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                </svg>
                            </a>
                        </div>}
                        menuVariant="dark"
                    >
                        <NavDropdown.Item onClick={navigateAccountInfo}>
                            <div className='flex'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white mr-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>


                                Account Info
                            </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={navigateSettings}>
                            <div className='flex'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white mr-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>

                                Settings
                            </div>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={openLogOutModal}>
                            <div className='flex'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white mr-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                </svg>



                                Logout
                            </div>
                        </NavDropdown.Item>
                    </NavDropdown>


                </div>

                {/* Log Out Modal */}
                {isLogOutModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-pactifyPurple rounded-lg shadow-lg w-1/4 ">
                            <div className="flex justify-between items-center p-4 border-b">
                                <h2 className="text-xl font-semibold text-white">
                                    Are you sure you want to log out?
                                </h2>
                                <button onClick={closeLogOutModal} className="text-gray-500 hover:text-gray-700 text-4xl font-black">
                                    &times;
                                </button>
                            </div>
                            <div className="p-4">
                                {/* Modal content */}
                                <div className="grid grid-cols-2 gap-4">
                                    <button className=" bg-gray-400 text-white py-2 rounded-full shadow-md hover:bg-gray-700 self-center text-center transition duration-300 hover:scale-105" onClick={closeLogOutModal}>
                                        Cancel</button>
                                    <button className=" bg-red-500 text-white py-2 rounded-full shadow-md hover:bg-red-700 self-center text-center transition duration-300 hover:scale-105" onClick={handleLogout}>
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </nav>



    );
}

export default NavBar;