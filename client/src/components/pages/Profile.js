import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import axios from "axios";

import UserContext from "../../context/UserContext";
import ErrorNotice from "../misc/ErrorNotice";

export default function Profile() {
  const { userData, setUserData } = useContext(UserContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [name, setName] = useState();
  const [phonenumber, setPhoneNumber] = useState();

  const [error, setError] = useState();

  // TODO: complete submit handler
  const submit = async (e) => {
    e.preventDefault();

    try {

    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  // TODO: Think about "place" design
  // TODO: Didnt control placeholders works (placeholder vs value?)
  return (
    <div className="page container">
      <h2>Profiliniz</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="update-email">E-Posta</label>
        <input
          id="update-email"
          type="email"
          placeholder={userData.user.email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="update-password">Şifre</label>
        <input
          id="update-password"
          type="password"
          placeholder={userData.user.password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Şifrenizi Tekrar Giriniz..."
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />

        <label htmlFor="update-name">İsim</label>
        <input
          id="update-name"
          type="name"
          placeholder={userData.user.name ? userData.user.name : ''}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="update-phonenumber">Telefon Numarası</label>
        <input
          id="update-phonenumber"
          type="phonenumber"
          placeholder={userData.user.phonenumber ? userData.user.phonenumber : ''}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <input type="submit" value="Güncelle" />
      </form>
    </div>
  )
}
