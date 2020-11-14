import React from "react";
import {USER} from "../constants/roles.constants";
import useAuth from "../hooks/useAuth";
import Header from "./Header/Header";
import Default from "./Layouts/Default";

const Profile = () => {

    const currentUser = JSON.parse(localStorage.getItem('user'))

    return (
        <div>
            <Header>
                <h2>Настройки</h2>
            </Header>
            <Default>
                <p><strong>Email</strong>: {currentUser.email}</p>
                <p> Сменить email</p>
                <p> Сменить пароль</p>
            </Default>
        </div>
    );
}

export default useAuth(Profile, USER);