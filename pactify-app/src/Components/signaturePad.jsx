import React, { useState } from 'react';
import {useRef} from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function SignaturePad(){

    const signatureCanvas = useRef(null);
    const [url, setUrl] = useState();

    const handleClear= () => {
        signatureCanvas.current.clear()
    }

    const saveSignature = () => {
        const newUrl = signatureCanvas.current.getTrimmedCanvas().toDataURL('image/png');
        setUrl(newUrl);
        //sessionStorage.setItem('imageURL', newUrl);
    
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
    }

    return (
        <div className="mb-2 flex justify-center">
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
      );
}

export default SignaturePad;