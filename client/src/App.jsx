import React, { useState, useEffect } from 'react';

import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import axios from 'axios';

import Header from './components/layout/Header';

import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';

import UserContext from './context/UserContext';

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLogin = async () => {
      let token = localStorage.getItem('auth-token');

      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }

      await axios
        .get('/users/tokenvalid', {
          headers: { 'x-auth-token': token },
        })
        .then((response) => {
          if (response.data) {
            axios
              .get('/users/getuser', {
                headers: { 'x-auth-token': token },
              })
              .then((response) => {
                setUserData({
                  token,
                  user: response.data,
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    checkLogin();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/profile' component={Profile} />
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={Login} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
