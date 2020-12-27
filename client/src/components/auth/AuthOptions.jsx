import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../context/UserContext';

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const signup = () => history.push('/signup');
  const login = () => history.push('/login');
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });

    localStorage.setItem('auth-token', '');
    history.push('/');
  };

  return (
    <nav className='auth-options'>
      {userData.user ? (
        <button onClick={logout}>Çıkış Yap</button>
      ) : (
        <>
          <button onClick={signup}>Kayıt Ol</button>
          <button onClick={login}>Giriş Yap</button>
        </>
      )}
    </nav>
  );
}
