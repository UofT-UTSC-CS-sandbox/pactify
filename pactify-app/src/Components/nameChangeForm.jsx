import React from 'react';
import Footer from './footer';
import NavBar from './navBar';

function NameChangeForm(){
    return (
        <div className="min-h-screen flex flex-col justify-between bg-orange-100">
            <NavBar/>
            <div className="flex items-between justify-center flex-grow">
                <div className="bg-orange-100 rounded-3xl p-8 w-full max-w-md m-16">
                    <h2 className="text-3xl font-bold text-center mb-2">Change Your Name</h2>
                    <p className="text-center mb-6">Enter your information in the fields below</p>
                    <div className="space-y-4">
                        <input 
                            type="text" 
                            id = "fName"
                            placeholder="First Name" 
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-500"
                        />
                        <input 
                            type="text" 
                            id = "lName"
                            placeholder="Last Name" 
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-500"
                        />
                    </div>
                    <p id="error" className="text-center mt-4 text-red-600"> </p>
                    <button 
                        type="submit" 
                        className="mt-6 w-full px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 hover:scale-105"
                        onClick={verifyName}
                    >
                        Done
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default NameChangeForm

function verifyName(){
    var firstName = document.getElementById("fName").value;
    var lastName = document.getElementById("lName").value;

    if (firstName==="" || lastName===""){
        document.getElementById("error").innerHTML = "Please fill in all entries.";
        return false;
    }

    if (firstName.length > 50 || lastName.length > 50){
        document.getElementById("error").innerHTML = "Name is too long.";
        return false;
    }

    if (!/^[a-zA-Z\s]*$/.test(firstName) || !/^[a-zA-Z\s]*$/.test(lastName)){
        document.getElementById("error").innerHTML = "Name can only contain letters and spaces.";
        return false;
    }
    else {  //removes previous error message during successful name change
        document.getElementById("error").innerHTML = ""
    }

}