import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { STATES } from 'mongoose';

export const overwriteSave = async (content, navigate, contractId) => {
    try {
        const response = await axios.get('http://localhost:5050/api/getFile', {
            withCredentials: true,
            params: { contractId: contractId }
        });

        const existingContent = response.data.message.content;

        if (existingContent === content) {
            console.log('Content is identical. No need to overwrite.');
            return;
        }
        console.log(existingContent);
        await axios.post('http://localhost:5050/api/uploadFile/aws', {
            fileName: contractId,
            content: content
        }, {
            withCredentials: true
        });

        console.log('File overwritten successfully');
        navigate('/home');
    } catch (error) {
        console.error('Error saving file:', error);
    }
};

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
            console.error('(2) Error saving file:', upload.data.message);
            setErrorMessage(upload.data.message);
        } else if (upload.status === 200) {
            setIsSaveOpen(false);
            navigate('/home');
        }
    } catch (error) {
        console.error('Error saving file:', error);
    }
};