import React, { useState } from 'react';

function Saveform({ handleClose, handleSubmit }) {
    const [name, setName] = useState('');

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(name);
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-violet-950 rounded-lg shadow-lg p-4">
            <h2 className="text-xl mb-4 text-white">Enter file name</h2>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                value={name}
                onChange={handleChange}
                placeholder="Enter file name"
                className="border p-2 rounded w-full mb-4"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className=" w-36 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:scale-105"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className=" w-36 px-4 py-2 bg-gray-300 rounded hover:bg-slate-400 focus:outline-none transition duration-300 hover:scale-105"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      );

}

export default Saveform;