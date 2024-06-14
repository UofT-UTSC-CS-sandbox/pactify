import React from 'react';
import Footer from './footer';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function SignupPage() {
    const navigate = useNavigate(); // to navigate back to home page

    function handleSubmit(){
        var pw1 = document.getElementById("password1").value;
        var pw2 = document.getElementById("password2").value;
        var email = document.getElementById("email").value;
        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
    
        if (pw1==="" || pw2==="" || email==="" || firstName==="" || lastName===""){
            document.getElementById("error").innerHTML = "Please fill in all fields.";
            return false;
        }
    
        if (pw1 !== pw2){
            document.getElementById("error").innerHTML = "Passwords do not match."
            return false;
        }
    
        else {  //removes previous error message during successful sign-up
            document.getElementById("error").innerHTML = ""
            // add user to database, TODO: check if username already exists before adding, put into seperate function
            axios({
                method: 'post',
                url: 'http://localhost:5050/users/',
                data: {
                    username: email,
                    password: pw1,
                    firstName: firstName,
                    lastName: lastName
                }
            });
            navigate(".."); // back to login page
            return true;
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-between bg-violet-950">
            <div className="flex items-center justify-center flex-grow">
                <div className="bg-amber-50 rounded-3xl shadow-lg p-8 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center mb-2">Create An Account</h2>
                    <p className="text-center mb-6">Enter your information in the fields below</p>
                    <div className="space-y-4">
                        <input 
                            type="text" 
                            id = "firstName"
                            placeholder="First Name" 
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-500"
                        />
                        <input 
                            type="text" 
                            id = "lastName"
                            placeholder="Last Name" 
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-500"
                        />
                        <input 
                            type="text" 
                            id = "email"
                            placeholder="Email" 
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-500"
                        />
                        <input 
                            type="password" 
                            id = "password1"
                            placeholder="Password" 
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-500"
                        />
                        <input 
                            type="password" 
                            id = "password2"
                            placeholder="Re-enter Password" 
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-500"
                        />
                    </div>
                    <p id="error" className="text-center mt-4 text-red-600"> </p>
                    <button 
                        type="submit" 
                        className="mt-6 w-full px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 hover:scale-105"
                        onClick={handleSubmit}
                    >
                        Create Account
                    </button>
                    <p className="text-center mt-4">
                        <a href="/" className="text-black underline hover:text-gray-400">Already Have An Account? Sign In!</a>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SignupPage;
