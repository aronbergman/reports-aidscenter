import React from "react";
import Admin from "./../Layouts/Admin";
import useAuth from "../../hooks/useAuth";
import {ADMIN} from "../../constants/roles.constants";
import VideoMetadataForm from "./../../components/Forms/VideoMetadataForm";

const AddVideoFromAdmin = props => {

    return (
        <Admin history={props.history}>
            <h1>Добавление нового видео</h1>
            <VideoMetadataForm />
        </Admin>
    );
}

export default useAuth(AddVideoFromAdmin, ADMIN);