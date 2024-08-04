import { Link } from "react-router-dom";
import DeleteButton from "./delete";

function ContractCard({ contract, onDelete }) {
  return (

    <div className="w-48 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <a href="#">
        <div className="pb-1">
          <img className="lg mx-auto" src={contract.thumbnail} alt="Document Thumbnail" />
        </div>
      </a>
      <div className="px-2 pb-2">
        <Link to = {`/edit/${contract._id}`} target = "_blank" rel = "noopener noreferrer">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">{contract.title}</h5>
        </Link>
        <p className="mt-2 text-sm text-gray-600">{new Date(contract.updatedAt).toLocaleDateString()}</p>
        <div className="mt-3 flex justify-between items-center">
          <a href="#" className="text-blue-600 hover:text-blue-800">Open</a>
          <DeleteButton contractId = {contract._id} onDelete={onDelete} />
          <div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default ContractCard;