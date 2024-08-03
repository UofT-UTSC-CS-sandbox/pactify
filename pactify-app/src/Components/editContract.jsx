import React, { useState } from "react";
import Footer from "./footer";
import NavBar from "./navBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Buffer } from "buffer";
import Saveform from "./Save";
import 'react-notifications-component/dist/theme.css'
import RichEditor from "./richTextEditor";

function EditContract() {
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const [isSaveOpen, setIsSaveOpen] = useState(false);
    const [isloading, setLoading] = useState(false);
    const [isResponseVisible, setIsResponseVisible] = useState(false);
    const [suggestions, setSuggestions] = useState("");



    const handleOpenSave = () => {
        setIsSaveOpen(true);
    };

    const handleCloseSave = () => {
        setIsSaveOpen(false);
    };

    const handleSubmit = async (name) => {
        try {
            const upload = await axios({
                method: "post",
                url: "http://localhost:5050/api/uploadFile",
                withCredentials: true,
                data:
                {
                    "fileName": name,
                    "content": content
                },
            })
            setIsSaveOpen(false);
            navigate('/home');
        } catch (error) {
            console.error('Error saving file:', error);
        }
    };

    const suggestImprovements = async () => {
        if (content === "") {
            document.getElementById("error").innerText = "Please enter some content to generate suggestions!";
            return false;
        }
        document.getElementById("error").innerText = "";
        setLoading(true);
        axios({
            method: "post",
            url: "http://localhost:5050/api/chatGPT",
            withCredentials: true,
            data:
            {
                "context": "You are an AI that suggests improvements for contracts. You will be provided with a contract written with HTML styling.\
                please suggest improvements to the contract. You can suggest changes to the wording, layout, or anything else you think would make the contract better.\
                Changes should be clear and concise. Do not suggest changes that relate to the HTML styling. Do not rewrite parts of the contract, only suggest possible improvements.\
                Suggestions should have a title followed by a short paragraph describing the suggestion. Limit to 5 suggestions.\n\n\
                Your response should be strictly in the following format:\
                *Suggestion Title 1*: \n *Suggestion Content 1* \n\n *Suggestion Title 2*: \n *Suggestion Content 2* \n\n ...",
                "message": content
            },
        })
        .then((res)=> {
            let suggestions = res.data.message[1].content;
            //remove ** from suggestions
            suggestions = suggestions.replace(/\*/g, "");
            setSuggestions(suggestions);
            console.log("Suggestions Generated!");
            setLoading(false);
            setIsResponseVisible(true);
        })

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
                    <h1 className="text-4xl font-bold mb-2">Edit Contract</h1>
                    <h2 className="text-2xl font-bold mb-6">Make any changes you want below</h2>
                    <div className="mb-4 flex flex-col">
                        <RichEditor initialValue='' onValueChange={setContent} />
                        <p id="error" className="text-center mb-4 text-red-600"></p>
                        <button
                            onClick={handleOpenSave}
                            className=" mt-4 px-4 py-2 w-32 self-center bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:scale-105"
                        >
                            Save
                        </button>
                        <button
                            onClick={suggestImprovements}
                            className="my-4 px-4 w-64 self-center font-semibold bg-red-500 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 hover:scale-105"
                        >
                            <div className="flex justify-center items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                </svg>
                                <p className="self-center align-middle pt-2">Suggest Improvements</p>
                            </div>
                        </button>
                        {isloading && (<div className="border-gray-300 mb-4 h-14 w-14 animate-spin rounded-full border-8 border-t-red-500 self-center" />)}
                        {isResponseVisible && (
                            <div className="mb-4">
                            <label className="block text-base font-medium text-gray-700 mb-2">
                                Suggested Improvements
                            </label>
                            <div className="flex items-center">
                                <textarea
                                    id="improvements"
                                    value={suggestions}
                                    type="text"
                                    rows={15}
                                    readOnly
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto resize-y focus:outline-none focus:ring-4 focus:ring-red-500"
                                ></textarea>
                            </div>
                        </div>)
                        }

                        {isSaveOpen && <Saveform handleClose={handleCloseSave}
                            handleSubmit={handleSubmit} />}

                    </div>
                </div>

            </div>
            <Footer />

        </div>

    )


}
export default EditContract;