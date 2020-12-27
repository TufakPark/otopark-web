import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import ProfileForm from '../layout/ProfileForm';
import ParkingForm from '../layout/ParkingForm';

import UserContext from '../../context/UserContext';
import ErrorNotice from '../misc/ErrorNotice';

export default function Profile() {
  // TODO: Think about "place" design
  return (
    <div className='page'>
      <h2>Profiliniz</h2>
      <div className='profile-page'>
        <ProfileForm />
        <span className='margin-10'></span>
        <ParkingForm />
      </div>
    </div>
  );
}
