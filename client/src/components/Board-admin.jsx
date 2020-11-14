import React from "react";
import Admin from "./Layouts/Admin";
import useAuth from "../hooks/useAuth";
import {ADMIN} from "../constants/roles.constants";

const AdminPanel = props => {

    return (
        <Admin history={props.history}>
            ADMIN BOARD, YEEES!
        </Admin>
    );
}

export default useAuth(AdminPanel, ADMIN);