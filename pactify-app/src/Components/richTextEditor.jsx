import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function RichEditor({ initialValue, onValueChange }) {
    const [value, setValue] = useState(initialValue);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean'],
        ]
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleChange = (newValue) => {
        setValue(newValue);
        onValueChange(newValue);
    };

    return (
        <div className="relative w-full">
            <div className="flex items-center h-full w-full justify-center">
                <div className="h-3/4 bg-white p-4 rounded-lg">
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        value={value}
                        onChange={handleChange}
                        style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
                    />
                </div>
            </div>
        </div>
    );
}

export default RichEditor;