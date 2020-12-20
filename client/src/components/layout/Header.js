import React from 'react'

import { Link } from 'react-router-dom';

import AuthOptions from '../auth/AuthOptions';

export default function Header() {
  return (
    <header id="header">
      <Link to="/">
        <h3 className="title">Ufak Park</h3>
      </Link>
      <AuthOptions />
    </header>
  )
}
