import React from 'react';

import { useHistory } from 'react-router-dom';

export default function AuthOptions() {
  const history = useHistory();

  const signup = () => history.push("/signup");
  const login = () => history.push("/login");

  return (
    <nav className="auth-options">
      <button onClick={signup}>Kayıt Ol</button>
      <button onClick={login}>Giriş Yap</button>
    </nav>
  );
}