import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { set } from 'mongoose';
import ContractCard from './ContractCard.jsx';
import { UserContext } from '../UserContext.js';
import React, { useContext } from 'react';


export default function ContractHistory(){
    const { user } = useContext(UserContext);
    const [userContracts, setUserContracts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
      const fetchContracts = async () => {
        try {
          const res = await fetch(`http://localhost:5050/api/contracts/getcontracts?userId=${user}`, {
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
          });
            const data = await res.json();
            if (res.ok) {
              setUserContracts(data.contracts);
              if (data.contracts.length < 9) {
                setShowMore(false);
              }
            } else {
              console.log("Server error:", data);
            }
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchContracts();
    }, [user]);



      return (
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
              {userContracts.length > 0 ? (
                userContracts.map((contract) => (
                  <ContractCard
                  contract={contract}/>
                ))
              ) : (
                <p className=' text-3xl font-bold'>
                  You have no posts yet!
                </p>
              )}
              </div>
          </div>
        </div>
    );
}