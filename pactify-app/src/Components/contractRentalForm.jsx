import React, { useState } from "react";
import Footer from "./footer";
import NavBar from "./navBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { set } from "mongoose";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ContractRentalForm() {
    const navigate = useNavigate();
    const [isResponseVisible, setIsResponseVisible] = useState(false);
    const [response, setResponse] = useState('');
    const [isloading, setLoading] = useState(false);
    const [date, setDate] = useState('');
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const handleStartChange = (date) => {
        setDate(date);
        if (!startDate) {
            setStartDate(date);
        }
    };

    const goBack = () => {
        navigate("/home");
    }

    function generateContract() {
        let style = document.getElementById("style").value;
        let provider = document.getElementById("provider").value;
        let recipient = document.getElementById("recipient").value;
        let agreementDate = document.getElementById("date-of-agreement").value;
        let confidentialInfo = document.getElementById("confidential-info").value;
        let startDuration = document.getElementById("start-date").value;
        let endDuration = document.getElementById("end-date").value;
        let instructions = document.getElementById("instructions").value;
        // Provider
        // Receiver
        // Date of Agreement
        // Definition of Confidentiality (What information is considered confidential, what's not)
        // Obligations of parties
        // Duration of Confidentiality/Agreement
        // Handling Breach in confidentiality
        // Other specifications
        // Signatures

        //If style or instructions are empty, display error message
        if (style === "" || provider === "" || recipient === "" || agreementDate === "" || confidentialInfo === "") {
            document.getElementById("error").innerHTML = "Please fill in all necessary entries.";
            return false;
        }
        else {
            let styleString = "";
            if (style === "Formal") {
                styleString = "This is a formal contract, meaning that it should be written in a professional manner. It should be used for business purposes.";
            } else if (style === "Informal") {
                styleString = "This is an informal contract, meaning that it should be written in a casual manner. It should be used for personal purposes.";
            }
            //removes previous error message during successful contract generation
            document.getElementById("error").innerHTML = "";
            setLoading(true);
            axios({
                method: "post",
                url: "http://localhost:5050/api/chatGPT",
                withCredentials: true,
                data:
                {
                    "context": `You are an AI contract generator. You are tasked with generating a non-disclosure agreement contract based on the user's instructions. ${styleString}. Use markdown formatting for the contract.`,
                    "message": `Provider: ${provider}, Recipient: ${recipient},  Agreement date: ${agreementDate}, Confidential Info: ${confidentialInfo}, Start date of duration of contract: ${startDuration}, End date of duration of contract: ${endDuration} (if no end date specified, then it's an indefinite contract), Other instructions for the contract made by user: ${instructions}`,
                },
            }) //
                .then((res) => {
                    const contract = res.data.message[1].content;
                    setResponse(contract);
                    console.log("Contract Generated!");
                    setLoading(false);
                    setIsResponseVisible(true);
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
                        console.log("Error", error.message);
                    }
                }
                );
        }
    }

    return (
        <div>
            <NavBar />
            <div className="min-h-screen flex flex-col justify-between place-items-center bg-orange-100 p-8">
                <div className="flex flex-col w-5/12 p-8 rounded-lg mt-10">
                    <button onClick={goBack} className="mb-4 w-1/6 mt-4 inline-block bg-red-500 text-white py-2 px-2 rounded-full font-bold hover:bg-red-700 transition duration-300 hover:scale-105">
                        ← Back
                    </button>
                    <h1 className="text-4xl font-bold mb-2">Rental Agreement</h1>
                    <h2 className="text-2xl font-bold mb-6">Enter Information</h2>
                    <div className="mb-4">
                        <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="style">
                            Style
                        </label>
                        <div className="flex items-center">
                            <select
                                id="style"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-red-500"
                            >
                                <option className=" text-gray-500" value="">Select an option</option>
                                <option value="Formal">Formal</option>
                                <option value="Informal">Informal</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Landlord:
                        </label>
                        <div className="flex items-center">
                            <input
                                id="landlord"
                                type="text"
                                placeholder="Name"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                            ></input>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Landlord Contact Information
                        </label>
                        <div className="flex flex-row place-content-start flex-wrap gap-4">
                            <div className="flex flex-col">
                                <label className="block text-base font-normal text-gray-700 mb-2">
                                    Phone Number:
                                </label>
                                <input
                                    id="landlordPhone"
                                    type="text"
                                    placeholder="Eg. 123-456-7890"
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                                ></input>
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-base font-normal text-gray-700 mb-2">
                                    Email:
                                </label>
                                <input
                                    id="landlordEmail"
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                                ></input>
                            </div>

                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Renter:
                        </label>
                        <div className="flex items-center">
                            <input
                                id="renter"
                                type="text"
                                placeholder="Name"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                            ></input>
                        </div>
                    </div>

                    <div className="mb-4" >
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Date of Agreement:
                        </label>
                        <DatePicker
                            id="date-of-agreement"
                            selected={date} onChange={handleStartChange}
                            label="Select Date">
                        </DatePicker>
                    </div>


                    <div className="mb-4" >
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Duration of Rental:
                        </label>
                        <DatePicker
                            id="start-date"
                            selected={startDate} onChange={(date) => setStartDate(date)}
                            startDate={startDate}
                            placeholderText="Start Date"
                            className="mr-4"
                        />
                        –
                        <DatePicker
                            id="end-date"
                            className="ml-4"
                            selected={endDate} onChange={(date) => setEndDate(date)}
                            endDate={endDate}
                            startDate={startDate}
                            minDate={startDate}
                            placeholderText="End Date"
                        />
                        <div className="font-small text-slate-500 mb-2">
                            Leave the 'End Date' blank if the duration is indefinite
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Location of Rental Property
                        </label>
                        <div className="flex flex-row place-content-start flex-wrap gap-4">
                            <div className="flex flex-col">
                                <label className="block text-base font-normal text-gray-700 mb-2">
                                    Address:
                                </label>
                                <input
                                    id="address"
                                    type="text"
                                    placeholder="Eg. 123 Main St"
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                                ></input>
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-base font-normal text-gray-700 mb-2">
                                    City:
                                </label>
                                <input
                                    id="city"
                                    type="text"
                                    placeholder="Eg. Toronto"
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                                ></input>
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-base font-normal text-gray-700 mb-2">
                                    Province:
                                </label>
                                <input
                                    id="province"
                                    type="text"
                                    placeholder="Eg. Ontario"
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                                ></input>
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-base font-normal text-gray-700 mb-2">
                                    Zip Code:
                                </label>
                                <input
                                    id="zipCode"
                                    type="text"
                                    placeholder="Eg. A1B 2C3"
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                                ></input>
                            </div>

                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Rent
                        </label>
                        <div className="flex flex-row flex-wrap place-content-start gap-4">
                            <div className="flex flex-col w-1/4">
                                <label className="block text-base font-normal text-gray-700 mb-2">
                                    Amount:
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                                    <input
                                        type="number"
                                        id="rentAmount"
                                        step="1"
                                        min="0"
                                        className="pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col w-56">
                                <label className="block text-base font-normal text-gray-700 mb-2">
                                    Payment Interval:
                                </label>
                                <div className="relative">
                                    <select
                                        id="paymentInterval"
                                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-red-500"
                                    >
                                        <option className="text-gray-500" value="">Select an option</option>
                                        <option value="Day">Day</option>
                                        <option value="Week">Week</option>
                                        <option value="Month">Month</option>
                                        <option value="Year">Year</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-base font-medium text-gray-700">
                            Security Desposit:
                        </label>
                        <div className="font-small text-slate-600 mb-2">
                            Leave blank if not applicable
                        </div>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                            <input
                                type="number"
                                id="securityDeposit"
                                step="1"
                                min="0"
                                className="pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-1/4"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-base font-medium text-gray-700">
                            Other Financial Information:
                        </label>
                        <div className="font-small text-slate-600 mb-2">
                            List any additional financial information, such as due dates, late fees, accepted payment methods, etc.
                        </div>
                        <div className="flex items-center">
                            <textarea
                                id="financialInfo"
                                type="text"
                                rows={4}
                                placeholder="Eg. Due on the 1st of every month, $50 late fee, etc."
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                            ></textarea>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-base font-medium text-gray-700">
                            Landlord Rights:
                        </label>
                        <div className="font-small text-slate-600 mb-2">
                            List the rights that the landlord has over the property, such as inspection rights, eviction rights, etc.
                        </div>
                        <div className="flex items-center">
                            <textarea
                                id="landlordRights"
                                type="text"
                                rows={4}
                                placeholder="Eg. Inspection rights, eviction rights, etc."
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                            ></textarea>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-base font-medium text-gray-700">
                            Utilities:
                        </label>
                        <div className="font-small text-slate-600 mb-2">
                            List the utilities that are included in the rental agreement
                        </div>
                        <div className="flex items-center">
                            <textarea
                                id="utilities"
                                type="text"
                                rows={4}
                                placeholder="Eg. Water, Electricity, Gas, etc."
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                            ></textarea>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-base font-medium text-gray-700">
                            Facilities and Amenities:
                        </label>
                        <div className="font-small text-slate-600 mb-2">
                            List the facilities and amenities that are included in the rental agreement
                        </div>
                        <div className="flex items-center">
                            <textarea
                                id="facilities"
                                type="text"
                                rows={4}
                                placeholder="Eg. Pool, Gym, Laundry, etc."
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                            ></textarea>
                        </div>
                    </div>


                    <div className="mb-4">
                        <label className="block text-base font-medium text-gray-700">
                            Any additional rules or specifications:
                        </label>
                        <div className="font-small text-slate-600 mb-2">
                            List any additional rules or specifications that the tenant must follow. For example, occupancy limts, pet policy, etc. Leave blank if not applicable.
                        </div>
                        <div className="flex items-center">
                            <textarea
                                id="additionalRules"
                                type="text"
                                rows={4}
                                placeholder="Eg. Maximum 10 people allowed, no pets, etc."
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                            ></textarea>
                        </div>
                    </div>

                    <p id="error" className="text-center my-4 text-red-600"></p>
                    <button
                        type="submit"
                        className="w-1/2 self-center px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 hover:scale-105"
                        onClick={generateContract}
                    >
                        Generate
                    </button>
                    {isloading && (<div className="border-gray-300 my-4 h-14 w-14 animate-spin rounded-full border-8 border-t-red-500 self-center" />)}
                    {isResponseVisible && (
                        <div className="mt-10 flex flex-col">
                            <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="style">
                                Edit Contract Below
                            </label>
                            <textarea
                                id="response"
                                type="text"
                                rows={20}
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                            ></textarea>
                        </div>
                    )}

                    <hr className="my-4 sm:mx-auto border-black lg:my-4" />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ContractRentalForm;