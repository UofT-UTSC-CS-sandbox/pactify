import React, { useState } from 'react';
import {useRef} from 'react';
import SignatureCanvas from 'react-signature-canvas';
import Footer from "./footer";
import NavBar from "./navBar";
import { useNavigate } from "react-router-dom";

function SignaturePad(){
    const signatureCanvas = useRef(null);
    const navigate = useNavigate();

    const handleClear= () => {
        signatureCanvas.current.clear()
    }

    const saveSignature = () => {
        const dataUrl = signatureCanvas.current.toDataURL('image/png');
        // Save the dataUrl to a server or use it as needed
        console.log(dataUrl);
    };

    const goNDA = () => {
        navigate(-1);
    }

    return (
        
        <div>
            <NavBar/>
            <div className="min-h-screen flex flex-col justify-center items-center bg-orange-100 p-8">
                <div className="flex flex-col w-5/12 p-8 rounded-lg mt-10">
                    <button onClick={goNDA} className="mb-4 w-1/6 mt-4 inline-block bg-red-500 text-white py-2 px-2 rounded-full font-bold hover:bg-red-700 transition duration-300 hover:scale-105">
                        ← Back
                    </button>
                    
                </div>
                <div className="text-2xl font-bold mb-6">
                        Sign here:
                </div>
                
                <div style={{border:"2px solid black"}} > 
                    <SignatureCanvas
                        penColor="black"
                        canvasProps={{width: 500, height: 200, className: 'sigCanvas'}}
                        ref={signatureCanvas}
                    />
                </div>
                <div>
                    <button className="bg-gray-500 text-white py-2 px-4 rounded mr-2 mt-2" onClick={handleClear}>
                        Clear
                    </button>
                    <button className="bg-gray-500 text-white py-2 px-4 rounded mr-2 mt-2" onClick={saveSignature}>
                        Save
                    </button>
                </div>
                

                
            </div>
            <Footer/>
        </div>
        
        
        
      );
}

export default SignaturePad;