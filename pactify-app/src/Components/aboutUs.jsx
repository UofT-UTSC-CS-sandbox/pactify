import React from "react";
import img from "../business_people.png";

function AboutUs () {
    return (
        <div className="flex flex-row justify-center bg-orange-100 p-8 mt-8">
            <div className="flex justify-center w-1/4 h-1/4 me-20">
                    <img
                    src={img}
                    alt="About Us"
                    className="m-auto"
                    />
            </div>
            <div className="text-center rounded-lg w-1/3 ms-20">
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4">About Us</h2>
                <p className="text-gray-700 mb-6 text-xl sm:text-2xl md:text-3xl">
                    We are an independent group helping individuals and small businesses
                    simplify the contract creating process. As small business owners
                    ourselves, we understand the struggles that come with running a small
                    business, and so we developed this solution to help others draft
                    contracts affordably and conveniently.
                </p>                
            </div>
        </div>
  );
};

export default AboutUs;