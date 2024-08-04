import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { set } from 'mongoose';
import ContractCard from './ContractCard.jsx';
import { UserContext } from '../UserContext.js';
import React, { useContext } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const cookies = new Cookies();
export default function ContractHistory({userContracts, handleDelete}) {
  return (
    <div className="flex">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {userContracts.length > 0 ? (
          userContracts.map((contract) => (
            <ContractCard
              contract={contract}
              onDelete={handleDelete} />
          ))
        ) : (
          <p className='flex self-start'>You have no posts yet!</p>
        )}
      </div>
    </div>
  );
}