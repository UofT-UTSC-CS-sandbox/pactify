import React from "react";
import { useNavigate, useLocation } from "react-router-dom";


function NotFoundPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const {state} = location;

    const navigateHome = () => {
        if (state?.signedIn) {
            navigate("/home");
        }
        else {
            navigate("/");
        }
    }

    return (
        <section className="bg-orange-100 min-h-screen">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 text-red-500">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Something's missing.</p>
                    <p className="mb-4 text-lg font-medium text-gray-500">Sorry, we can't find that page.</p>
                    <button onClick={navigateHome} className="inline-flex text-red-500 bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">Back to Homepage</button>
                </div>   
            </div>
        </section>
    );
}

export default NotFoundPage;