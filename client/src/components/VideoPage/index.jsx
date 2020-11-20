import React, { useEffect } from 'react';
import VideoPlayer from "../VideoPlayer";
import useAuth from "../../hooks/useAuth";
import { USER } from "../../constants/roles.constants";

const VideoPage = props => {
    console.log(props.match.params.id)
    return (
        <div>
            {props.auth
                ? <VideoPlayer video={props.match.params.id}/>
                : <p>Не авторизован</p>
            }

            <p>список похожих видео</p>
        </div>
    );
};

export default useAuth(VideoPage, USER);
