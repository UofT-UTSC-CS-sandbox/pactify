import React, { useState } from "react";
import Footer from "./footer";
import NavBar from "./navBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { set } from "mongoose";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RichEditor from "./richTextEditor";
import Saveform from "./Save";
import { handleOpenSave, handleCloseSave, handleSubmit } from "../uploadUtils";

function ContractPrenupForm() {
    const navigate = useNavigate();
    const [partyA_Phone, setPartyA_Phone] = useState('');
    const [isValidPartyA_Phone, setIsValidPartyA_Phone] = useState(true);
    const [partyB_Phone, setPartyB_Phone] = useState('');
    const [isValidPartyB_Phone, setIsValidPartyB_Phone] = useState(true);
    const [partyA_MaritalSplit, setPartyA_MaritalSplit] = useState(50);
    const [partyB_MaritalSplit, setPartyB_MaritalSplit] = useState(50);
    const [partyA_children, setPartyA_children] = useState([{ name: '', birthday: '' }]);
    const [partyB_children, setPartyB_children] = useState([{ name: '', birthday: '' }]);
    const [partyAB_children, setPartyAB_children] = useState([{ name: '', birthday: '' }]);
    const [isResponseVisible, setIsResponseVisible] = useState(false);
    const [response, setResponse] = useState('');
    const [isloading, setLoading] = useState(false);
    const [date, setDate] = useState('');
    const [isSaveOpen, setIsSaveOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');



    const handleAddPartyAChild = () => {
        setPartyA_children([...partyA_children, { name: '', birthday: '' }]);
    };

    const handleAddPartyBChild = () => {
        setPartyB_children([...partyB_children, { name: '', birthday: '' }]);
    };

    const handleAddPartyABChild = () => {
        setPartyAB_children([...partyAB_children, { name: '', birthday: '' }]);
    };

    const handlePartyARemoveChild = (index) => {
        const list = [...partyA_children];
        list.splice(index, 1);
        setPartyA_children(list);
    };

    const handlePartyBRemoveChild = (index) => {
        const list = [...partyB_children];
        list.splice(index, 1);
        setPartyB_children(list);
    };

    const handlePartyABRemoveChild = (index) => {
        const list = [...partyAB_children];
        list.splice(index, 1);
        setPartyAB_children(list);
    };

    const formatChildren = (children) => {
        return children.map((child) => `${child.name}, ${child.birthday}`).join("; ");
    }


    const handlePartyAChildChange = (e, index, isDate = false) => {
        const newChildren = partyA_children.map((child, childIndex) => {
            if (index !== childIndex) return child;
            if (isDate) {
                return { ...child, birthday: e };
            } else {
                return { ...child, [e.target.name]: e.target.value };
            }
        });
        setPartyA_children(newChildren);
    };

    const handlePartyBChildChange = (e, index, isDate = false) => {
        const newChildren = partyB_children.map((child, childIndex) => {
            if (index !== childIndex) return child;
            if (isDate) {
                return { ...child, birthday: e };
            } else {
                return { ...child, [e.target.name]: e.target.value };
            }
        });
        setPartyB_children(newChildren);
    };

    const handlePartyABChildChange = (e, index, isDate = false) => {
        const newChildren = partyAB_children.map((child, childIndex) => {
            if (index !== childIndex) return child;
            if (isDate) {
                return { ...child, birthday: e };
            } else {
                return { ...child, [e.target.name]: e.target.value };
            }
        });
        setPartyAB_children(newChildren);
    };

    const handleMaritalSplitChangeA = (e) => {
        let value = parseInt(e.target.value);
        if (isNaN(value)) value = 0;
        if (value > 100) value = 100;
        if (value < 0) value = 0;
        setPartyA_MaritalSplit(value);
        setPartyB_MaritalSplit(100 - value);
    }

    const handleMaritalSplitChangeB = (e) => {
        let value = parseInt(e.target.value);
        if (isNaN(value)) value = 0;
        if (value > 100) value = 100;
        if (value < 0) value = 0;
        setPartyB_MaritalSplit(value);
        setPartyA_MaritalSplit(100 - value);
    }




    function generateContract() {
        let style = document.getElementById("style").value; //Formal or Informal
        let partyA = document.getElementById("partyA").value; //Party A's full name
        let partyA_Phone = document.getElementById("partyA_Phone").value; //Party A's phone number
        let partyA_Email = document.getElementById("partyA_Email").value; //Party A's email
        let partyB = document.getElementById("partyB").value; //Party B's full name
        let partyB_Phone = document.getElementById("partyB_Phone").value; //Party B's phone number
        let partyB_Email = document.getElementById("partyB_Email").value; //Party B's email
        let agreementDate = document.getElementById("date-of-agreement").value; //Date of agreement
        let partyA_FinancialInfo = document.getElementById("partyA_FinancialInfo").value; //Party A's financial information
        let partyB_FinancialInfo = document.getElementById("partyB_FinancialInfo").value; //Party B's financial information
        let partyA_MaritalSplit = document.getElementById("partyA_MaritalSplit").value; //Party A's marital split
        let partyB_MaritalSplit = document.getElementById("partyB_MaritalSplit").value; //Party B's marital split
        let supportAmount = document.getElementById("supportAmount").value; //Spousal support amount
        let supportFrom = document.getElementById("supportFrom").value; //Spousal support from Party A to Party B or vice versa
        let spousalPaymentInterval = document.getElementById("spousalPaymentInterval").value; //Spousal support payment interval
        let partyA_childrenInfo = formatChildren(partyA_children); //Party A's children information
        let partyB_childrenInfo = formatChildren(partyB_children); //Party B's children information
        let partyAB_childrenInfo = formatChildren(partyAB_children); //Children of both parties information
        let additionalRules = document.getElementById("additionalRules").value; //Additional rules or specifications
        let spousalSupport = ""; //Spousal support section of the contract
        //If support fields are empty
        if (supportAmount === "" || supportFrom === "" || spousalPaymentInterval === "") {
            spousalSupport = "N/A";
        }
        else {
            spousalSupport = `\$${supportAmount} from ${supportFrom} every ${spousalPaymentInterval}`;
        }


        //If style or instructions are empty, display error message
        if (style === "" || partyA === "" || partyA_Phone === "" || partyA_Email === "" || partyB === "" || partyB_Phone === "" || partyB_Email === "" || agreementDate === "" || partyA_FinancialInfo === "" || partyB_FinancialInfo === "" || partyA_MaritalSplit === "" || partyB_MaritalSplit === "") {
            document.getElementById("error").innerHTML = "Please fill in all necessary entries.";
            return false;
        }
        else {
            let styleString = "";
            if (style === "Formal") {
                styleString = "This is a formal contract. It should be written in a professional manner. It should be used for business purposes. \
                                Legal language and formatting should be used. There should be a clear section for signatures at the bottom. \
                                Include the following sections: \n An opening preamble describing the parties. A 'Definitions' section explaining \
                                the terms Asset, Separate Property, and Marital Property. A 'Financial Information' section. A 'Property' Section \
                                explaining what occurs to Separate property and how the Marital property is split. A 'Debts' section. A 'Children' section. \
                                A 'Spousal Support' section (only include if not N/A). A 'Death' section. Be sure to include other regular boilerplate clauses/sections such \
                                that are necessary for a formal prenuptual agreemnt contract.";
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
                    "context": `You are an AI contract generator. You are tasked with generating a prenuptual agreement contract based on the given information. \
                                The given information should be naturally weaved into a standard prenuptual agreement format. ${styleString}.\
                                IMPORTANT: Use <br> for line breaks between paragraphs. Before and after every header, use <br>. Use HTML formatting for the contract.\
                                Use <h1> for headings, <h2> for subheadings, <p> for paragraphs, <ul> for lists, <li> for list items, <b> for bold text, <i> for italic text, <u> for underlined text.`,
                    "message": `Party A Name: ${partyA}
                                Party A Phone: ${partyA_Phone}
                                Party A Email: ${partyA_Email}
                                Party B Name: ${partyB}
                                Party B Phone: ${partyB_Phone}
                                Party B Email: ${partyB_Email}
                                Agreement Date (MM/DD/YYYY): ${agreementDate}
                                Party A Financial Info: ${partyA_FinancialInfo}
                                Party B Financial Info: ${partyB_FinancialInfo}
                                Party A Marital Split: ${partyA_MaritalSplit}%
                                Party B Marital Split: ${partyB_MaritalSplit}%
                                Spousal Support: ${spousalSupport}
                                Party A Children Info: ${partyA_childrenInfo}
                                Party B Children Info: ${partyB_childrenInfo}
                                Children of Both Parties Info: ${partyAB_childrenInfo}
                                Additional Rules: ${additionalRules}`
                },
            })
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
                    <h1 className="text-4xl font-bold mb-2">Prenuptual Agreement</h1>
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
                            Party A Information
                        </label>
                        <label className="block text-base font-normal text-gray-700 mb-2">
                            Full Name:
                        </label>
                        <div className="flex items-center">
                            <input
                                id="partyA"
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
                                    id="partyA_Phone"
                                    type="text"
                                    placeholder="Eg. 1234567890"
                                    className="w-64 p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                                    value={partyA_Phone}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const numericValue = value.replace(/\D/g, ''); // Remove all non-numeric characters
                                        setPartyA_Phone(numericValue);
                                        if (e.target.value.length !== 10) {
                                            setIsValidPartyA_Phone(false);
                                        } else {
                                            setIsValidPartyA_Phone(true);
                                        }
                                    }
                                    }
                                ></input>
                                {!isValidPartyA_Phone && <p className="text-red-600">Please enter a valid phone number</p>}
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-base font-normal text-gray-700 mb-2">
                                    Email:
                                </label>
                                <input
                                    id="partyA_Email"
                                    type="text"
                                    className="w-64 p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                                ></input>
                            </div>

                        </div>
                    </div>

                    <div className="mb-2">
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Party B Information
                        </label>
                        <label className="block text-base font-normal text-gray-700 mb-2">
                            Full Name:
                        </label>
                        <div className="flex items-center">
                            <input
                                id="partyB"
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
                                    id="partyB_Phone"
                                    type="text"
                                    placeholder="Eg. 1234567890"
                                    className="w-64 p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                                    value={partyB_Phone}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const numericValue = value.replace(/\D/g, ''); // Remove all non-numeric characters
                                        setPartyB_Phone(numericValue);
                                        if (e.target.value.length !== 10) {
                                            setIsValidPartyB_Phone(false);
                                        } else {
                                            setIsValidPartyB_Phone(true);
                                        }
                                    }
                                    }
                                ></input>
                                {!isValidPartyB_Phone && <p className="text-red-600">Please enter a valid phone number</p>}
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-base font-normal text-gray-700 mb-2">
                                    Email:
                                </label>
                                <input
                                    id="partyB_Email"
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
                            selected={date} onChange={(date) => setDate(date)}
                            label="Select Date">
                        </DatePicker>
                    </div>

                    <div className="mb-4">
                        <label className="block text-base font-medium text-gray-700">
                            Party A Financial Information:
                        </label>
                        <div className="font-small text-slate-600 mb-2">
                            List any financial information that is relevant to Party A. This includes net worth, assests, income, holdings, liabilities, and debts.
                        </div>
                        <div className="flex items-center">
                            <textarea
                                id="partyA_FinancialInfo"
                                type="text"
                                rows={4}
                                placeholder="Enter Information Here"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                            ></textarea>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-base font-medium text-gray-700">
                            Party B Financial Information:
                        </label>
                        <div className="font-small text-slate-600 mb-2">
                            List any financial information that is relevant to Party A. This includes net worth, assests, income, holdings, liabilities, and debts.
                        </div>
                        <div className="flex items-center">
                            <textarea
                                id="partyB_FinancialInfo"
                                type="text"
                                rows={4}
                                placeholder="Enter Information Here"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                            ></textarea>
                        </div>
                    </div>
                    <div className="">
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Marital Property Split
                        </label>
                    </div>
                    <div className="mb-4">
                        <div className="flex flex-row place-content-start flex-wrap gap-4">
                            <div className="flex flex-col">
                                <label className="block text-base font-normal text-gray-700 mb-2">
                                    Party A Split (%):
                                </label>
                                <input
                                    id="partyA_MaritalSplit"
                                    type="number"
                                    placeholder="Eg. 50"
                                    className="w-64 p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                                    value={partyA_MaritalSplit}
                                    onChange={handleMaritalSplitChangeA}
                                    min={0}
                                    max={100}
                                ></input>
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-base font-normal text-gray-700 mb-2">
                                    Party B Split (%):
                                </label>
                                <input
                                    id="partyB_MaritalSplit"
                                    type="number"
                                    placeholder="Eg. 50"
                                    className="w-64 p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                                    value={partyB_MaritalSplit}
                                    onChange={handleMaritalSplitChangeB}
                                    min={0}
                                    max={100}
                                ></input>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Spousal Support
                        </label>
                        <div className="font-small text-slate-600 mb-2">
                            Include any spousal support that will be paid from one party to the other, leave blank if not applicable.
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex flex-row place-content-start flex-wrap gap-4">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                                <input
                                    type="number"
                                    id="supportAmount"
                                    step="1"
                                    min="0"
                                    className="pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
                                />
                            </div>
                            <label className="block text-base font-normal text-gray-700 mb-2 self-center">
                                from
                            </label>
                            <div className="relative">
                                <select
                                    id="supportFrom"
                                    className="w-44 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-red-500"
                                >
                                    <option className="text-gray-500" value="">Select an option</option>
                                    <option value="Party A to Party B">Party A to Party B</option>
                                    <option value="party B to Party A">Party B to Party A</option>
                                </select>
                            </div>
                            <label className="block text-base font-normal text-gray-700 mb-2 self-center">
                                every
                            </label>
                            <div className="relative">
                                <select
                                    id="spousalPaymentInterval"
                                    className="w-44 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-red-500"
                                >
                                    <option className="text-gray-500" value="">Select an option</option>
                                    <option value="Week">Week</option>
                                    <option value="Month">Month</option>
                                    <option value="Year">Year</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Party A Children Information
                        </label>
                        <div className="font-small text-slate-600 mb-2">
                            Include the names and birthdays of any children that Party A has before the marriage.
                        </div>
                        {partyA_children.map((child, index) => (
                            <div key={index} className="mb-4 flex flex-row place-content-start flex-wrap gap-4">
                                <div className="flex flex-col">
                                    <label className="block text-base font-normal text-gray-700 mb-2">
                                        Name:
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={child.name}
                                        onChange={(e) => handlePartyAChildChange(e, index)}
                                        placeholder="Child's Name"
                                        className="w-64 p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                                    ></input>
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-base font-normal text-gray-700 mb-2">
                                        Birthday (MM/DD/YYYY):
                                    </label>
                                    <DatePicker
                                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-red-500"
                                        selected={child.birthday} onChange={(e) => handlePartyAChildChange(e, index, true)}
                                        label="Select Date">
                                    </DatePicker>
                                </div>
                                <button onClick={() => handlePartyARemoveChild(index)} className=" w-min self-end bg-red-500 text-white py-2 px-2 rounded-full font-black hover:bg-red-700 transition duration-300 hover:scale-105">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                    </svg>

                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddPartyAChild}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:scale-105"
                        >
                            Add Child
                        </button>
                    </div>

                    <div className="mb-4">
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Party B Children Information
                        </label>
                        <div className="font-small text-slate-600 mb-2">
                            Include the names and birthdays of any children that Party B has before the marriage.
                        </div>
                        {partyB_children.map((child, index) => (
                            <div key={index} className="mb-4 flex flex-row place-content-start flex-wrap gap-4">
                                <div className="flex flex-col">
                                    <label className="block text-base font-normal text-gray-700 mb-2">
                                        Name:
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={child.name}
                                        onChange={(e) => handlePartyBChildChange(e, index)}
                                        placeholder="Child's Name"
                                        className="w-64 p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                                    ></input>
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-base font-normal text-gray-700 mb-2">
                                        Birthday (MM/DD/YYYY):
                                    </label>
                                    <DatePicker
                                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-red-500"
                                        selected={child.birthday} onChange={(e) => handlePartyBChildChange(e, index, true)}
                                        label="Select Date">
                                    </DatePicker>
                                </div>
                                <button onClick={() => handlePartyBRemoveChild(index)} className=" w-min self-end bg-red-500 text-white py-2 px-2 rounded-full font-black hover:bg-red-700 transition duration-300 hover:scale-105">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                    </svg>

                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddPartyBChild}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:scale-105"
                        >
                            Add Child
                        </button>
                    </div>

                    <div className="mb-4">
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Children of Both Parties Information
                        </label>
                        <div className="font-small text-slate-600 mb-2">
                            Include the names and birthdays of any children that both parties have together.
                        </div>
                        {partyAB_children.map((child, index) => (
                            <div key={index} className="mb-4 flex flex-row place-content-start flex-wrap gap-4">
                                <div className="flex flex-col">
                                    <label className="block text-base font-normal text-gray-700 mb-2">
                                        Name:
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={child.name}
                                        onChange={(e) => handlePartyABChildChange(e, index)}
                                        placeholder="Child's Name"
                                        className="w-64 p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                                    ></input>
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-base font-normal text-gray-700 mb-2">
                                        Birthday (MM/DD/YYYY):
                                    </label>
                                    <DatePicker
                                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-red-500"
                                        selected={child.birthday} onChange={(e) => handlePartyABChildChange(e, index, true)}
                                        label="Select Date">
                                    </DatePicker>
                                </div>
                                <button onClick={() => handlePartyABRemoveChild(index)} className=" w-min self-end bg-red-500 text-white py-2 px-2 rounded-full font-black hover:bg-red-700 transition duration-300 hover:scale-105">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                    </svg>

                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddPartyABChild}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:scale-105"
                        >
                            Add Child
                        </button>
                    </div>

                    <div className="mb-4">
                        <label className="block text-base font-medium text-gray-700">
                            Any additional information to include:
                        </label>
                        <div className="font-small text-slate-600 mb-2">
                            Include any other information that is relevant to the prenuptual agreement you would like to include.
                        </div>
                        <div className="flex items-center">
                            <textarea
                                id="additionalRules"
                                type="text"
                                rows={4}
                                placeholder="Enter Information Here"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                            ></textarea>
                        </div>
                    </div>

                    <p id="error" className="text-center my-4 text-red-600"></p>
                    <button
                        type="submit"
                        className="w-1/2 mb-4 self-center px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 hover:scale-105"
                        onClick={generateContract}
                    >
                        Generate
                    </button>
                    {isloading && (<div className="border-gray-300 mb-4 h-14 w-14 animate-spin rounded-full border-8 border-t-red-500 self-center" />)}
                    {isResponseVisible && (
                        <div className="mb-4 flex flex-col">
                            <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="style">
                                Edit Contract Below
                            </label>
                            <RichEditor initialValue={response} onValueChange={setResponse} />
                            <button
                                onClick={handleOpenSave}
                                className=" mt-4 px-4 py-2 w-3/6 self-center bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:scale-105"
                            >
                                Save
                            </button>
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

export default ContractPrenupForm;