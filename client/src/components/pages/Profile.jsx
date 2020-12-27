import React from 'react';

import ProfileForm from '../layout/ProfileForm';
import ParkingForm from '../layout/ParkingForm';

export default function Profile() {
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
