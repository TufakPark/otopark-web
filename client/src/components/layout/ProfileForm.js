import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import UserContext from "../../context/UserContext";
import ErrorNotice from "../misc/ErrorNotice";

export default function ProfileForm() {
  const history = useHistory();

  const { userData, setUserData } = useContext(UserContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [name, setName] = useState();
  const [phonenumber, setPhoneNumber] = useState();

  const [error, setError] = useState();

  const submit = async (e) => {
    e.preventDefault();

    try {
      let data = {
        _id: userData.user.id
      };

      if (email) data["email"] = email;
      if (password) {
        if (password !== passwordConfirmation) {
          setError("Lütfen şifre doğrulama işleminizi doğru yapın");
        } else {
          data["password"] = password;
        }
      }
      if (name) data["name"] = name;
      if (phonenumber) data["phonenumber"] = phonenumber;

      console.log(data);

      const updateResponse = await axios.post(
        "/users/update",
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem("auth-token")
          }
        });

      console.log(updateResponse);

      setUserData({
        user: updateResponse.data.user
      });

    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form profile-form" onSubmit={submit}>
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
          placeholder={userData.user.phonenumber ? userData.user.phonenumber : '(XXX) XXX XX XX'}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <input type="submit" value="Güncelle" />
      </form>
    </>
  )
}
