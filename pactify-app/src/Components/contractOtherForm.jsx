import React from "react";
import Footer from "./footer";
import NavBar from "./navBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ContractOtherForm() {
    const navigate = useNavigate();
    return (
        <div>
            <NavBar />
            <div className="min-h-screen flex flex-col justify-between place-items-center bg-orange-100 p-8">
                <div className="flex flex-col w-5/12 p-8 rounded-lg mt-10">
                    <h1 className="text-5xl font-bold mb-10">Custom Contract</h1>
                    <h2 className="text-3xl font-bold mb-6">Enter Information</h2>
                    <div className="mb-4">
                        <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="style">
                            Style
                        </label>
                        <div className="flex items-center">
                            <select
                                id="style"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-red-500"
                            >
                                <option className=" text-gray-500"value="">Select an option</option>
                                <option value="formal">Formal</option>
                                <option value="informal">Informal</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Please enter the specific instructions for the contract you would like to generate. <br />
                            (e.g. the names of the parties involved, the date of the contract, etc.)
                        </label>
                        <div className="flex items-center">
                            <textarea
                                id="instructions"
                                type="text"
                                rows={4}
                                placeholder="Enter instructions here"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                            ></textarea>
                        </div>
                    </div>
                    <hr class="my-4 sm:mx-auto border-black lg:my-4" />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ContractOtherForm;