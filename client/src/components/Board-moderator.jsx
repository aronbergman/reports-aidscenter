import React from "react";
import useAuth from "../hooks/useAuth";
import {MODERATOR} from "../constants/roles.constants";

const AdminPanel = () => {

    return (
        <header className="jumbotron">
            <h3>
                MODERATOR BOARD, YEEES!
            </h3>
        </header>
    );
}

export default useAuth(AdminPanel, MODERATOR);