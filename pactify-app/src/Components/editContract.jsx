import React, { useState, useEffect } from "react";
import Footer from "./footer";
import NavBar from "./navBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Saveform from "./Save";
import 'react-notifications-component/dist/theme.css'
import RichEditor from "./richTextEditor";
import { useParams } from "react-router-dom";
import { handleOpenSave, handleCloseSave, handleSubmit, overwriteSave } from "../uploadUtils";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from "react";


function EditContract() {

    const { contractId } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const [isSaveOpen, setIsSaveOpen] = useState(false);
    const [isloading, setLoading] = useState(false);
    const [isResponseVisible, setIsResponseVisible] = useState(false);
    const [suggestions, setSuggestions] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const contentRef = useRef(null);


    const fetchFile = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: 'http://localhost:5050/api/getFile',
                withCredentials: true,
                params: {
                    'contractId': contractId
                }
            })
                .then((res) => {
                    setContent(res.data.message.content);
                    console.log(content);
                })
                .catch((err) => {
                    console.error('Error getting file:', err);
                });
        } catch (error) {
            console.error('Error saving file:', error);
        }
    };

    useEffect(() => {
        if (contractId) {
            fetchFile();
        }
    }, []);


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
            .then((res) => {
                let suggestions = res.data.message[1].content;
                //remove ** from suggestions
                suggestions = suggestions.replace(/\*/g, "");
                setSuggestions(suggestions);
                console.log("Suggestions Generated!");
                setLoading(false);
                setIsResponseVisible(true);
            })

    };

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

                pdf.save('contract.pdf');
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
                    <h1 className="text-4xl font-bold mb-2">Edit Contract</h1>
                    <h2 className="text-2xl font-bold mb-6">Make any changes you want below</h2>
                    <div className="mb-4 flex flex-col">
                        <div ref={contentRef}>
                            <RichEditor initialValue={content} onValueChange={setContent} />
                        </div>

                        <p id="error" className="text-center mb-4 text-red-600"></p>
                        <div className="flex flex-row self-center space-x-4">
                            <button
                                onClick={() => overwriteSave(content, navigate, contractId)}
                                className="flex items-center justify-center mt-4 px-4 py-2 w-40 self-center bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:scale-105"
                            >
                                <svg class="w-6 h-6 text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M11 16h2m6.707-9.293-2.414-2.414A1 1 0 0 0 16.586 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7.414a1 1 0 0 0-.293-.707ZM16 20v-6a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v6h8ZM9 4h6v3a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V4Z" />
                                </svg>
                                Save
                            </button>
                            <button
                                onClick={() => handleOpenSave(setIsSaveOpen)}
                                className="flex items-center justify-center mt-4 px-4 py-2 w-44 self-center bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:scale-105"
                            >
                                <svg class="w-6 h-6 text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M14 4v3a1 1 0 0 1-1 1h-3m4 10v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2m11-3v10a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7.87a1 1 0 0 1 .24-.65l2.46-2.87a1 1 0 0 1 .76-.35H18a1 1 0 0 1 1 1Z" />
                                </svg>
                                Save as New
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
                        <button
                            onClick={suggestImprovements}
                            className="flex items-center justify-center m-4 px-4 py-2 w-64 self-center bg-red-500 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 hover:scale-105"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                            </svg>
                            Suggest Improvements
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

                        {isSaveOpen && (
                            <Saveform
                                handleClose={() => handleCloseSave(setIsSaveOpen, setErrorMessage)}
                                handleSubmit={(name) => handleSubmit(name, content, setIsSaveOpen, navigate, setErrorMessage)}
                                errorMessage={errorMessage}
                                setErrorMessage={setErrorMessage}
                            />
                        )}

                    </div>
                </div>

            </div>
            <Footer />

        </div>

    )


}
export default EditContract;