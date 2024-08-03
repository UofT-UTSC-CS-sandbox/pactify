import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { STATES } from 'mongoose';



export const handleOpenSave = (setIsSaveOpen) => {
    setIsSaveOpen(true);
};

// Function to handle closing the save modal
export const handleCloseSave = (setIsSaveOpen, setErrorMessage) => {
    setIsSaveOpen(false);
    setErrorMessage('');
};

// Function to handle submitting the file
export const handleSubmit = async (name, response, setIsSaveOpen, navigate, setErrorMessage) => {
    try {
        const upload = await axios({
            method: "post",
            url: "http://localhost:5050/api/uploadFile",
            withCredentials: true,
            data: {
                "fileName": name,
                "content": response
            },
        }).catch((err) => {
            console.error('(1) Error saving file:', err);
            setErrorMessage(err.response.data.message);
        });

        if (upload.status === 400) {
            // console.log('Error saving file:', upload.toJSON());
            // setErrorMessage(upload.data.message);
        } else if (upload.status === 200) {
            setIsSaveOpen(false);
            navigate('/home');
        }
    } catch (error) {
        console.error('Error saving file:', error);
    }
};