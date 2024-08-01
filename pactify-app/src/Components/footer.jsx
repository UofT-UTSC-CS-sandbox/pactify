import React from "react";
import { useNavigate } from "react-router-dom";

function Footer({ signedIn = true }) {
    const navigate = useNavigate();
    const navigateHome = () => {
        if (signedIn === true) {
            navigate("/home");
        }
        else {
            navigate("/");
        }
    }

    const navigatePriacyPolicy = () => {
        navigate("/privacyPolicy",{ state: { signedIn: signedIn } });
    }
    const navigateContact = () => {
        navigate("/contact",{ state: { signedIn: signedIn } });
    }

    return (
        <footer className=" shadow bg-gray-900">
            <div className="w-full max-w-screen-xl mx-auto p-2">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <button onClick={navigateHome} className="flex items-center mb-2 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl hover:underline whitespace-nowrap text-red-500 font-black">Pactify</span>
                    </button>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium  sm:mb-0 text-gray-400">
                        <li>
                            <button onClick={navigatePriacyPolicy} className="hover:underline text-sky-500 me-4 md:me-6">Privacy Policy</button>
                        </li>
                        <li>
                            <button onClick={navigateContact} className="hover:underline text-sky-500">Contact</button>
                        </li>
                    </ul>
                </div>
                <hr className="my-4 sm:mx-auto border-gray-700 lg:my-4" />
                <span className="block text-sm sm:text-center text-gray-400">© 2024 <button onClick={navigateHome} className="hover:underline text-sky-500">Pactify™</button>. All Rights Reserved.</span>
            </div>
        </footer>
    );
}

export default Footer;