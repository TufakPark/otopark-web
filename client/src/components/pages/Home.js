import React, { useContext } from "react";

import UserContext from "../../context/UserContext";

import LeafletMap from '../layout/LeafletMap';
import LandingPageCards from '../layout/LandingPageCards';

export default function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div>
      {userData.user ? (
        <LeafletMap />
      ) : (
          <LandingPageCards />
        )}
    </div>
  )
}
