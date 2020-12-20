import React, { useState, useEffect } from 'react';

import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import axios from 'axios';

import Header from './components/layout/Header';

import Home from './components/pages/Home';

import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';

import UserContext from './context/UserContext';

export default function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("auth-token");
      const tokenResponse = await axios.post()
    };

    checkLogin();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
