import React, { useState } from 'react';
import {useRef} from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from "axios";

function SignaturePad(){

    const signatureCanvas = useRef(null);
    
    const handleClear= () => {
        signatureCanvas.current.clear()
    }

    function saveSignature () {
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
            });
    }

    return (
        <div className="mb-2 flex justify-center">
            <div>
            {['down-centered'].map(
              (direction) => (
                <DropdownButton
                    key={direction}
                    drop={direction}
                    variant="secondary"
                    title={`   Signature   `}
                    backgroundColor="black"
                >
                    <div>
                        <SignatureCanvas
                            penColor="black"
                            canvasProps={{width: 500, height: 180, className: 'sigCanvas'}}
                            ref={signatureCanvas}
                        />
                        </div>
                    <div className="flex justify-center bg-gray-900">
                        <button className="bg-gray-500 text-white py-2 px-4 rounded mr-5 mt-2 mb-2" onClick={handleClear}>
                            Clear
                        </button>
                        <button className="bg-red-500 text-white py-2 px-4 rounded mt-2 mb-2" onClick={saveSignature}>
                            Save
                        </button>
                    </div>
                </DropdownButton>
                ),
            )}
            </div>
        </div>
      );
}

export default SignaturePad;