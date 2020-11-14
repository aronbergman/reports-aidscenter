import React from "react";
import useAuth from "../hooks/useAuth";
import {USER} from "../constants/roles.constants";
import Default from "./Layouts/Default";
import Header from "./Header/Header";

const AdminPanel = () => {
    return (<div>
            <Header>
                <h2>User page (uploaded video and upload)</h2>
            </Header>
            <Default>
                Content
            </Default>
        </div>
    );
}

export default useAuth(AdminPanel, USER)