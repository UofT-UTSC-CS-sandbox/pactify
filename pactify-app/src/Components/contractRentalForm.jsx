import React, { useState } from "react";
import Footer from "./footer";
import NavBar from "./navBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RichEditor from "./richTextEditor";
import Saveform from "./Save";
import { handleOpenSave, handleCloseSave, handleSubmit } from "../uploadUtils";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from "react";

function ContractRentalForm() {
    const navigate = useNavigate();
    const [landlordPhone, setLandlordPhone] = useState('');
    const [isValidLandlordPhone, setIsValidLandlordPhone] = useState(true);
    const [renterPhone, setRenterPhone] = useState('');
    const [isValidRenterPhone, setIsValidRenterPhone] = useState(true);
    const [isResponseVisible, setIsResponseVisible] = useState(false);
    const [response, setResponse] = useState('');
    const [isloading, setLoading] = useState(false);
    const [date, setDate] = useState('');
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [isSaveOpen, setIsSaveOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const contentRef = useRef(null);


    const handleStartChange = (date) => {
        setDate(date);
        if (!startDate) {
            setStartDate(date);
        }
    };

    function generateContract() {
        let style = document.getElementById("style").value; //Formal or Informal
        let landlord = document.getElementById("landlord").value; //Landlord's name
        let landlordPhone = document.getElementById("landlordPhone").value; //Landlord's phone number
        let landlordEmail = document.getElementById("landlordEmail").value; //Landlord's email
        let renter = document.getElementById("renter").value; //Renter's name
        let renterPhone = document.getElementById("renterPhone").value; //Renter's phone number
        let renterEmail = document.getElementById("renterEmail").value; //Renter's email
        let agreementDate = document.getElementById("date-of-agreement").value; //Date of agreement
        let startDuration = document.getElementById("start-date").value; //Start date of duration of contract
        let endDuration = document.getElementById("end-date").value; //End date of duration of contract
        let address = document.getElementById("address").value; //Address of rental property
        let city = document.getElementById("city").value; //City of rental property
        let province = document.getElementById("province").value;  //Province of rental property
        let zipCode = document.getElementById("zipCode").value; //Zip code of rental property
        let rentAmount = document.getElementById("rentAmount").value; //Amount of rent
        let paymentInterval = document.getElementById("paymentInterval").value; //Payment interval
        let securityDeposit = document.getElementById("securityDeposit").value; //Security deposit
        let financialInfo = document.getElementById("financialInfo").value; //Other financial information
        let landlordRights = document.getElementById("landlordRights").value; //Landlord rights
        let utilities = document.getElementById("utilities").value; //Utilities
        let additionalRules = document.getElementById("additionalRules").value; //Additional rules or specifications


        //If style or instructions are empty, display error message
        if (style === "" || landlord === "" || landlordPhone === "" || landlordEmail === "" || renter === "" || renterPhone === "" || renterEmail === "" || agreementDate === "" || startDuration === "" || address === "" || city === "" || province === "" || zipCode === "" || rentAmount === "" || paymentInterval === "" || financialInfo === "" || landlordRights === "" || utilities === "") {
            document.getElementById("error").innerHTML = "Please fill in all necessary entries.";
            return false;
        }
        else {
            let styleString = "";
            if (style === "Formal") {
                styleString = "This is a formal contract. It should be written in a professional manner. It should be used for business purposes. \
                                Legal language and formatting should be used. There should be a clear section for signatures at the bottom. \
                                Include sections 'Parties', 'Consideration', 'Term', 'Premises', 'Use and Occupancy', 'Costs and Payment', 'Termination', \
                                'Right to enter', 'Dispute Resolution', 'Governing Law', 'Severability', 'Amendments'. Be sure to include other regular boilerplate clauses/sections such that are necessary for a formal rental agreemnt contract.";
            } else if (style === "Informal") {
                styleString = "This is an informal contract. It should be used for personal purposes.";
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
                    "context": `You are an AI contract generator. You are tasked with generating a rental agreement contract based on the given information.\
                                The given information should be naturally weaved into a standard rental agreement format. ${styleString}. \
                                IMPORTANT: Use <br> for line breaks between paragraphs. Before and after every header, use <br>. Use HTML formatting for the contract.\
                                Use <h1> for headings, <h2> for subheadings, <p> for paragraphs, <ul> for lists, <li> for list items, <b> for bold text, <i> for italic text, <u> for underlined text.`,
                    "message": `Landlord Name: ${landlord}, 
                                Landlord Phone Number: ${landlordPhone},  
                                Landlord Email: ${landlordEmail}, 
                                Renter Name: ${renter}, 
                                Renter Phone Number: ${renterPhone},
                                Renter Email: ${renterEmail},
                                Date of Agreement (MM/DD/YYYY): ${agreementDate}, 
                                Start date of duration of contract (MM/DD/YYYY): ${startDuration}, 
                                End date of duration of contract (MM/DD/YYYY): ${endDuration} (if no end date specified, it's an indefinite contract), 
                                Property Location: "${address}, ${city}, ${province} ${zipCode}", 
                                Rent Amount: $${rentAmount} per ${paymentInterval}, 
                                Security Deposit: $${securityDeposit} (if no value specified, there is no secrity deposit), 
                                Other Financial Information: ${financialInfo}, 
                                Landlord Rights: ${landlordRights}, 
                                Utilities: ${utilities}, 
                                Additional Rules or Specifications: ${additionalRules}`,
                },
            }) //
                .then((res) => {
                    let contract = res.data.message[1].content;
                    contract = contract.replace("```html", ""); //Strip ```html from the beginning of the contract
                    contract = contract.replace("```", ""); //Strip ``` from the end of the contract
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

    const exportToPDF = () => {
        if (contentRef.current) {
            html2canvas(contentRef.current, { scale: 2 }).then((canvas) => {
                const ctx = canvas.getContext('2d');
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;

                // Define the cropping area (x, y, width, height)
                const cropX = 20; // Adjust as needed
                const cropY = 130; // Adjust to crop the top toolbar
                const cropWidth = imgWidth - 50; // Adjust to crop from left and right
                const cropHeight = imgHeight - 130; // Adjust to crop from bottom

                // Create a new canvas to draw the cropped image
                const croppedCanvas = document.createElement('canvas');
                croppedCanvas.width = cropWidth;
                croppedCanvas.height = cropHeight;

                const croppedCtx = croppedCanvas.getContext('2d');

                // Draw the cropped image onto the new canvas
                croppedCtx.drawImage(
                    canvas,
                    cropX, cropY, cropWidth, cropHeight, // Source rectangle
                    0, 0, cropWidth, cropHeight // Destination rectangle
                );

                const imgData = croppedCanvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');

                // Define margins and padding
                const marginLeft = 10;
                const marginTop = 10;
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();

                // Calculate image dimensions for the PDF
                const pdfImgWidth = pdfWidth - marginLeft * 2;
                const pdfImgHeight = (croppedCanvas.height * pdfImgWidth) / croppedCanvas.width;

                if (pdfImgHeight > pdfHeight - marginTop * 2) {
                    const adjustedHeight = pdfHeight - marginTop * 2;
                    const adjustedWidth = (croppedCanvas.width * adjustedHeight) / croppedCanvas.height;
                    pdf.addImage(imgData, 'PNG', marginLeft, marginTop, adjustedWidth, adjustedHeight);
                } else {
                    pdf.addImage(imgData, 'PNG', marginLeft, marginTop, pdfImgWidth, pdfImgHeight);
                }

                pdf.save('rental-contract.pdf');
            }).catch((error) => {
                console.error('Error capturing or cropping the content:', error);
            });
        } else {
            console.error('Content container is not available.');
        }
    };

    return (
        <div>
            <NavBar />
            <div className="min-h-screen flex flex-col justify-between place-items-center bg-slate-100 p-8">
                <div className="flex flex-col w-7/12 p-8 rounded-lg mt-10">
                    <button onClick={() => navigate(-1)} className="mb-4 w-min mt-4 inline-block bg-red-500 text-white py-2 px-2 rounded-full font-black hover:bg-red-700 transition duration-300 hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
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

                    <div className="mb-2">
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Landlord Information
                        </label>
                        <label className="block text-base font-normal text-gray-700 mb-2">
                            Full Name:
                        </label>
                        <div className="flex items-center">
                            <input
                                id="landlord"
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                            ></input>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex flex-row place-content-start flex-wrap gap-4">
                            <div className="flex flex-col">
                                <label className="block text-base font-normal text-gray-700 mb-2">
                                    Phone Number:
                                </label>
                                <input
                                    id="landlordPhone"
                                    type="text"
                                    placeholder="Eg. 1234567890"
                                    className="w-64 p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                                    value={landlordPhone}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const numericValue = value.replace(/\D/g, ''); // Remove all non-numeric characters
                                        setLandlordPhone(numericValue);
                                        if (e.target.value.length !== 10) {
                                            setIsValidLandlordPhone(false);
                                        } else {
                                            setIsValidLandlordPhone(true);
                                        }
                                    }
                                    }
                                ></input>
                                {!isValidLandlordPhone && <p className="text-red-600">Please enter a valid phone number</p>}
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-base font-normal text-gray-700 mb-2">
                                    Email:
                                </label>
                                <input
                                    id="landlordEmail"
                                    type="text"
                                    className="w-64 p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                                ></input>
                            </div>

                        </div>
                    </div>

                    <div className="mb-2">
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Renter Information
                        </label>
                        <label className="block text-base font-normal text-gray-700 mb-2">
                            Full Name:
                        </label>
                        <div className="flex items-center">
                            <input
                                id="renter"
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                            ></input>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex flex-row place-content-start flex-wrap gap-4">
                            <div className="flex flex-col">
                                <label className="block text-base font-normal text-gray-700 mb-2">
                                    Phone Number:
                                </label>
                                <input
                                    id="renterPhone"
                                    type="text"
                                    placeholder="Eg. 1234567890"
                                    className="w-64 p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                                    value={renterPhone}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const numericValue = value.replace(/\D/g, ''); // Remove all non-numeric characters
                                        setRenterPhone(numericValue);
                                        if (e.target.value.length !== 10) {
                                            setIsValidRenterPhone(false);
                                        } else {
                                            setIsValidRenterPhone(true);
                                        }
                                    }
                                    }
                                ></input>
                                {!isValidRenterPhone && <p className="text-red-600">Please enter a valid phone number</p>}
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-base font-normal text-gray-700 mb-2">
                                    Email:
                                </label>
                                <input
                                    id="renterEmail"
                                    type="text"
                                    className="w-64 p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                                ></input>
                            </div>

                        </div>
                    </div>

                    <div className="mb-4" >
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Date of Agreement (MM/DD/YYYY):
                        </label>
                        <DatePicker
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-red-500"
                            id="date-of-agreement"
                            selected={date} onChange={handleStartChange}
                            label="Select Date">
                        </DatePicker>
                    </div>


                    <div className="mb-4" >
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Duration of Rental (MM/DD/YYYY):
                        </label>
                        <div className="flex flex-row gap-4 items-center mb-2">
                            <DatePicker
                                id="start-date"
                                selected={startDate} onChange={(date) => setStartDate(date)}
                                startDate={startDate}
                                placeholderText="Start Date"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-red-500"
                            />
                            <label className="block text-base font-normal text-gray-700 mb-2">
                                to
                            </label>
                            <DatePicker
                                id="end-date"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-red-500"
                                selected={endDate} onChange={(date) => setEndDate(date)}
                                endDate={endDate}
                                startDate={startDate}
                                minDate={startDate}
                                placeholderText="End Date"
                            />
                        </div>
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
                                <div className="relative">
                                    <select
                                        id="province"
                                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-red-500"
                                    >
                                        <option className="text-gray-500" value="">Select an option</option>
                                        <option value="AB">Alberta</option>
                                        <option value="BC">British Columbia</option>
                                        <option value="MB">Manitoba</option>
                                        <option value="NB">New Brunswick</option>
                                        <option value="NL">Newfoundland and Labrador</option>
                                        <option value="NS">Nova Scotia</option>
                                        <option value="ON">Ontario</option>
                                        <option value="PE">Prince Edward Island</option>
                                        <option value="QC">Quebec</option>
                                        <option value="SK">Saskatchewan</option>
                                        <option value="NT">Northwest Territories</option>
                                        <option value="NU">Nunavut</option>
                                        <option value="YT">Yukon</option>
                                    </select>
                                </div>
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
                        className=" flex items-center justify-center self-center mb-4 w-52 px-2 py-2 bg-red-500 text-white text-xl font-medium rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 hover:scale-105"
                        onClick={generateContract}
                    >
                        <svg class="w-7 h-7 text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 5V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5M9 3v4a1 1 0 0 1-1 1H4m11.383.772 2.745 2.746m1.215-3.906a2.089 2.089 0 0 1 0 2.953l-6.65 6.646L9 17.95l.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z" />
                        </svg>

                        Generate
                    </button>
                    {isloading && (<div className="border-gray-300 mb-4 h-14 w-14 animate-spin rounded-full border-8 border-t-red-500 self-center" />)}
                    {isResponseVisible && (
                        <div className="mb-4 flex flex-col">
                            <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="style">
                                Edit Contract Below
                            </label>
                            <div ref={contentRef}>
                                <RichEditor initialValue={response} onValueChange={setResponse} />
                            </div>
                            <div className="flex flex-row self-center space-x-4">
                                <button
                                    onClick={() => handleOpenSave(setIsSaveOpen)}
                                    className="flex items-center justify-center mt-4 px-4 py-2 w-40 self-center bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:scale-105"
                                >
                                    <svg class="w-6 h-6 text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M11 16h2m6.707-9.293-2.414-2.414A1 1 0 0 0 16.586 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7.414a1 1 0 0 0-.293-.707ZM16 20v-6a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v6h8ZM9 4h6v3a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V4Z" />
                                    </svg>
                                    Save
                                </button>

                                <button
                                    onClick={exportToPDF}
                                    className="flex items-center justify-center mt-4 px-4 py-2 w-40 self-center bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:scale-105"
                                >
                                    <svg class="w-6 h-6 text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4" />
                                    </svg>

                                    Download
                                </button>
                            </div>
                            {isSaveOpen && (
                                <Saveform
                                    handleClose={() => handleCloseSave(setIsSaveOpen, setErrorMessage)}
                                    handleSubmit={(name) => handleSubmit(name, response, setIsSaveOpen, navigate, setErrorMessage)}
                                    errorMessage={errorMessage}
                                    setErrorMessage={setErrorMessage}
                                />
                            )}
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