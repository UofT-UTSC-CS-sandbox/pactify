import React, {useState} from 'react';

const DeleteButton = ({ contractId, onDelete }) => {
    const[showConfirm, setShowConfirm] = useState(false);

    const handleDelete = () => {
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        onDelete(contractId);
        setShowConfirm(false);
    };

    const handleCancel = () => {    
        setShowConfirm(false);
    };

    return (
        <div>
          <button
            className="ml-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={handleDelete}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
    
          {showConfirm && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
              <div className="bg-white p-4 rounded shadow-lg">
                <p className="mb-4">Are you sure you want to delete this file?</p>
                <div className="flex justify-end">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                    onClick={handleConfirm}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={handleCancel}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ); 
};

export default DeleteButton;