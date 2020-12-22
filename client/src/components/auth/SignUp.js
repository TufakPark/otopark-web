import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import UserContext from "../../context/UserContext";
import ErrorNotice from "../misc/ErrorNotice";

export default function SignUp() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordConfirmation };
      const registerResponse = await axios.post("/users/signup", newUser);

      setUserData({
        token: registerResponse.data.token,
        user: registerResponse.data.user,
      });

      localStorage.setItem("auth-token", registerResponse.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="page container">
      <h2>Kaydolmak İçin Lütfen Kullanıcı Bilgilerinizi Giriniz</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="register-email">E-Posta</label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Şifre</label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Şifrenizi Tekrar Giriniz..."
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />

        <input type="submit" value="Kayıt Ol" />
      </form>
    </div>
  )
}
