import { Link } from "react-router-dom";
import { useState } from "react";

function ContractCard({ contract, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    onDelete(contract._id);
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div className="w-48 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 relative">
      <a href="#">
        <div className="pb-1">
          <img className="lg mx-auto" src={contract.thumbnail} alt="Document Thumbnail"/>
        </div>
      </a>
      <div className="px-2 pb-2">
        <Link to={`/edit/${contract._id}`}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">{contract.title}</h5>
        </Link>
        <p className="mt-2 text-sm text-gray-600">{new Date(contract.updatedAt).toLocaleDateString()}</p>
      </div>
      <div className="absolute bottom-2 right-2">
        <button className="transition duration-300 hover:scale-125" onClick={handleDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-pactifyPurple rounded-lg shadow-lg w-[28rem] ">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-normal text-white">
                Are you sure you want to delete this file?
              </h2>
              <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700 text-4xl font-black">
                &times;
              </button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <button className=" bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-700 self-center text-center transition duration-300 hover:scale-105" onClick={handleConfirm}>
                  Yes, delete
                </button>
                <button className=" bg-gray-500 text-white py-2 rounded-lg shadow-md hover:bg-gray-700 self-center text-center transition duration-300 hover:scale-105" onClick={handleCancel}>
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContractCard;
