import React, { useEffect, useState } from "react";
import Admin from "./../Layouts/Admin";
import useAuth from "../../hooks/useAuth";
import {ADMIN} from "../../constants/roles.constants";
import UploadService from "../../services/upload-files";

const AddVideoFromAdmin = props => {
    const [list, setList] =useState(null)

    useEffect(() => {
        UploadService.getFiles().then((data) => setList(data.data))
    }, []);

    return (
        <Admin history={props.history}>
            <h1>List videos</h1>
            <div className="card">
                <div className="card-header">Папки с видео</div>
                <ul className="list-group list-group-flush">
                    {list &&
                    list.map((file, index) => (
                        <li className="list-group-item" key={index}>
                            <a href={file.url}>{file.name} + добавить превью, скрытие, редактирование</a>
                        </li>
                    ))}
                </ul>
            </div>
        </Admin>
    );
}

export default useAuth(AddVideoFromAdmin, ADMIN);