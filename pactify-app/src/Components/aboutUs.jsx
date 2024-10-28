import React from "react";
import img from "../business_people.png";

function AboutUs() {
    return (
        <div className="bg-slate-100 p-4 flex justify-center items-center flex-grow">
            <div className="flex flex-row items-center w-2/3">
                <div className="flex justify-center w-1/2">
                    <img
                        src={img}
                        alt="About Us"
                        className="w-full"
                    />
                </div>
                <div className="text-center rounded-lg w-1/2">
                    <h2 className="text-7xl font-bold mb-4">About Us</h2>
                    <p className="text-gray-700 mb-6 text-3xl">
                        We are an independent group helping individuals and small businesses
                        simplify the contract creating process. As small business owners
                        ourselves, we understand the struggles that come with running a small
                        business, and so we developed this solution to help others draft
                        contracts affordably and conveniently.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;