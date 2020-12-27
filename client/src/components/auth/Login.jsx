import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../../context/UserContext';
import ErrorNotice from '../misc/ErrorNotice';

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginResponse = await axios.post('/users/login', loginUser);
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem('auth-token', loginResponse.data.token);
      history.push('/');
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className='page container'>
      <h2>Giriş Yapmak İçin Kullanıcı Bilgilerinizi Giriniz</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className='form' onSubmit={submit}>
        <label htmlFor='login-email'>E-Posta</label>
        <input
          id='login-email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor='login-password'>Şifre</label>
        <input
          id='login-password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type='submit' value='Giriş Yap' />
      </form>
    </div>
  );
}
