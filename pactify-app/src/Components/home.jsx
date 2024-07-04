import React, { useContext } from 'react';
import { UserContext } from '../UserContext.js';
import Footer from './footer.jsx';
import NavBar from './navBar.jsx'
import ContractHistory from './ContractHistory.jsx';
import Cookies from 'universal-cookie';

function HomePage(){


    // const { user } = useContext(UserContext);

    return (
        <div>
            <NavBar/>

            <div className="min-h-screen flex flex-col justify-between bg-orange-100">
                <div className="flex flex-col items-center pt-40">
                            <ContractHistory/>
                </div>  
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;