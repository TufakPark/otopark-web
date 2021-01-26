import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import UserContext from "../../context/UserContext";

import AuthOptions from "../auth/AuthOptions";

export default function Header() {
    const { userData } = useContext(UserContext);
    const history = useHistory();

    const profile = () => history.push("/profile");

    return (
        <header id="header">
            <Link to="/">
                <h3 className="title">Ufak Park</h3>
            </Link>
            {userData.user ? (
                <div className="profile">
                    <button onClick={profile}>Profiliniz</button>
                </div>
            ) : (
                <></>
            )}

            <AuthOptions />
        </header>
    );
}
