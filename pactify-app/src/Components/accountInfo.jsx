import NavBar from "./navBar.jsx";
import Footer from "./footer.jsx";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "universal-cookie";
import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function AccountInfoPage() {
    const navigate = useNavigate();
    const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const [imageURL, setImageURL] = useState("");
    const signatureCanvas = useRef(null);

    const handleClear = () => {
        signatureCanvas.current.clear()
    }

    const openLogOutModal = () => {
        setIsLogOutModalOpen(true);
    }

    const closeLogOutModal = () => {
        setIsLogOutModalOpen(false);
    }

    const openDeleteModal = () => {
        setDeleteModalOpen(true);
    }

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
    }

    function loadUserData() {
        axios({
            method: "get",
            url: "http://localhost:5050/api/user/getUserData",
            withCredentials: true,
        })
            .then(function (res) {
                document.getElementById("name").value = `${res.data.firstName} ${res.data.lastName}`
                document.getElementById("email").value = res.data.email;
                document.getElementById("password").value = "placehold";
                console.log(res.data);
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // TODO: Add visual indicator
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                    console.log(document.cookie);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
            });
    }

    function loadSignature() {
        axios({
            method: "get",
            url: "http://localhost:5050/api/user/getUserSignature",
            withCredentials: true,
        })
            .then(function (res) {
                setImageURL(`${res.data.signature}`);
                console.log(res.data);
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // TODO: Add visual indicator
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                    console.log(document.cookie);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
            });
    }

    function handleLogout() {
        // clear cookies
        const cookies = new Cookies();
        cookies.set('jwt', '', { path: "/", expires: new Date(0) });
        navigate("/");
    }

    function handleDelete() {
        axios({
            method: "delete",
            url: "http://localhost:5050/api/user/deleteUser",
            withCredentials: true,
        })
            .then(function (res) {
                handleLogout();
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // TODO: Add visual indicator
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                    console.log(document.cookie);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
            });
    }

    function saveSignature() {
        const newUrl = signatureCanvas.current.getTrimmedCanvas().toDataURL('image/png');
        console.log(newUrl);

        axios({
            method: "patch",
            url: "http://localhost:5050/api/user/updateUserSignature",
            withCredentials: true,
            data: {
                signature: `${newUrl}`,
            },
        })
            .then((res) => {
                Store.addNotification({
                    title: "Signature Saved!",
                    message: "Check it out in your account info",
                    type: "info",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 3000,
                        onScreen: true
                    }
                })
                loadSignature();
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    document.getElementById("error").innerHTML = "Something went wrong. Please try again later.";
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                    console.log(document.cookie);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error");
                    loadSignature();
                }
            });


    }

    useEffect(() => {
        loadUserData();
        loadSignature();
    });

    return (
        <div>
            <NavBar />
            <div className="min-h-screen flex flex-col justify-between place-items-center bg-orange-100 p-8">
                <div className="flex flex-col bg-beige-100 w-4/12 p-8 rounded-lg mt-20">
                    <button onClick={() => navigate(-1)} className="mb-4 w-min mt-4 inline-block bg-red-500 text-white py-2 px-2 rounded-full font-black hover:bg-red-700 transition duration-300 hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <h2 className="text-3xl font-bold mb-6">My Account</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <div className="flex items-center">
                            <input
                                id="name"
                                type="text"
                                readOnly
                                className="w-11/12 p-2 border border-gray-300 rounded-md shadow-sm"
                            />
                            <button className="ml-2 ">
                                <a href="nameChange">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6 text-red-500 hover:text-blue-red transition duration-300 hover:scale-125"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                        />
                                    </svg>
                                </a>
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="flex items-center">
                            <input
                                id="email"
                                type="email"
                                readOnly
                                className="w-11/12 p-2 border border-gray-300 rounded-md shadow-sm"
                            />
                            <button className="ml-2">
                                <a href="emailChange">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6 text-red-500 hover:text-red-700 transition duration-300 hover:scale-125"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                        />
                                    </svg>
                                </a>
                            </button>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="flex items-center">
                            <input
                                id="password"
                                type="password"
                                readOnly
                                className="w-11/12 p-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                    </div>
                    <div className="mb-6">

                        <div className="mb-2 flex justify-center">
                            <div>
                                {['down-centered'].map(
                                    (direction) => (
                                        <DropdownButton
                                            key={direction}
                                            drop={direction}
                                            variant="secondary"
                                            title={`   Create new signature   `}
                                            backgroundColor="black"
                                        >
                                            <div>
                                                <SignatureCanvas
                                                    penColor="black"
                                                    canvasProps={{ width: 500, height: 180, className: 'sigCanvas' }}
                                                    ref={signatureCanvas}
                                                />
                                            </div>
                                            <div className="flex justify-center bg-gray-900">
                                                <button className="bg-gray-500 text-white py-2 px-4 rounded-full mr-5 mt-2 mb-2 transition duration-300 hover:scale-105 hover:bg-gray-700" onClick={handleClear}>
                                                    Clear
                                                </button>
                                                <button className="bg-red-500 text-white py-2 px-4 rounded-full mt-2 mb-2 transition duration-300 hover:scale-105 hover:bg-red-700" onClick={saveSignature}>
                                                    Save
                                                </button>
                                            </div>
                                        </DropdownButton>
                                    ),
                                )}
                            </div>
                        </div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Saved Signature
                        </label>
                        <div className="flex items-center">
                            <img src={imageURL} alt="No signature saved" className="w-11/12 p-2 border border-gray-300 bg-white rounded-md object-contain" />
                        </div>
                    </div>
                    <hr className="my-4 sm:mx-auto border-black lg:my-4" />
                    <button className="flex items-center justify-center mt-4 px-4 py-2 w-64 self-center bg-red-500 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 hover:scale-105" onClick={openLogOutModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white mr-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                </svg>
                        Log Out
                    </button>
                    <button className="flex items-center justify-center mt-4 px-4 py-2 w-64 self-center bg-red-500 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 hover:scale-105"
                        onClick={openDeleteModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        Delete Account
                    </button>
                </div>
            </div>
            <Footer />
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
            {/* Delete Account Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-pactifyPurple rounded-lg shadow-lg w-1/4 ">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-semibold text-white">
                                Are you sure you want to delete your account?
                            </h2>
                            <button onClick={closeDeleteModal} className="text-gray-500 hover:text-gray-700 text-4xl font-black">
                                &times;
                            </button>
                        </div>
                        <div className="p-4">
                            {/* Modal content */}
                            <div className="grid grid-cols-2 gap-4">
                                <button className=" bg-gray-400 text-white py-2 rounded-full shadow-md hover:bg-gray-700 self-center text-center transition duration-300 hover:scale-105" onClick={closeDeleteModal}>
                                    Cancel</button>
                                <button className=" bg-red-500 text-white py-2 rounded-full shadow-md hover:bg-red-700 self-center text-center transition duration-300 hover:scale-105" onClick={handleDelete}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AccountInfoPage;