import React, { useEffect } from 'react';
import VideoPlayer from "../VideoPlayer";
import useAuth from "../../hooks/useAuth";
import { USER } from "../../constants/roles.constants";
import { connect } from 'react-redux'
import { fetchUpVideoCount, fetchVoteVideo } from "../../redux/thunks/video.thunks";

const VideoPage = props => {

    useEffect(() => {
        if (props.auth && !props.loading && !props.single) {
            props.upCountForVideo(props.match.params.id)
        }
    }, [props])

    const setVote = vote => {
        const userData = JSON.parse(localStorage.getItem('user'))
        // проверить, голосовал ли за это видео
const oldVotes = JSON.parse(userData.votes)
        console.log('oldVotes', oldVotes)
        // votes: props.votes

        oldVotes.map()

        const data = {
            vote,
            folder: +props.single.folder,
            user: userData.id
        }

        props.votesFromState.map(i => {
            console.log(props.votesFromState, i)
        })

        data.votes = [...props.votesFromState, {
            [`${props.single.folder}`]: vote
        }]

        // если не голосовал - просто прибавить +1 записать в юзера, обновить [] user, обновить user store
        // если голосовал и голос изменился - перезаписать по ключу голос, уменьшить дизлайк и увеличить лайк, обновить [] user, обновить user store
        // если голосовал и голосует повторно так-же - прекратить и показать сообщение

        console.log(data)
        props.setVoteVideo(data)
    }
    console.log('props', props)
    return (
        <div>
            {props.auth
                ? <div>
                    <div>
                        <button onClick={() => setVote(1)}>LIKE</button>
                        <button onClick={() => setVote(0)}>DISLIKE</button>
                    </div>
                    {!props.loading && props.single && <VideoPlayer video={props.match.params.id}/>}
                </div>
                : <p>Не авторизован</p>
            }

            <p>список похожих видео</p>
        </div>
    );
};

const mapStateToProps = state => ({
    single: state.video.single,
    loading: state.video.loading,
    votesFromState: state.user.votes,
})

const mapDispatchToProps = dispatch => ({
    upCountForVideo: folder => dispatch(fetchUpVideoCount({ folder: folder })),
    setVoteVideo: data => dispatch(fetchVoteVideo(data))
})

export default useAuth(connect(mapStateToProps, mapDispatchToProps)(VideoPage), USER);
