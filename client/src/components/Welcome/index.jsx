import React, { useEffect } from "react";
import { connect } from 'react-redux'
import { WelcomeGrid } from './WelcomeGrid'
import { Pagination } from "antd";
import { fetchFirstToStore, fetchOffsetToStore } from "../../redux/thunks/video.thunks";

const Welcome = props => {

    useEffect(() => {
        if (!props.loading && !props.videos) {
            props.fetchFirst()
        }
    }, [props])

    const onChangePagination = (page, pageSize) => {
        props.fetchOffset({
            offset: page - 1,
            limit: pageSize
        })
    }

    return (
        props.videos ? <>
            <WelcomeGrid videos={props.videos}/>
            <Pagination
                onChange={onChangePagination}
                total={props.count}
                showTotal={(total, range) => `${range[0]}-${range[1]} из ${total} видео`}
                defaultPageSize={10}
                defaultCurrent={1}
            />
        </> : null
    );
}

const mapStateToProps = state => ({
    videos: state.video.videos,
    count: state.video.count,
    loading: state.video.loading
})

const mapDispatchToProps = dispatch => ({
    fetchFirst: () => dispatch(fetchFirstToStore()),
    fetchOffset: (data) => dispatch(fetchOffsetToStore(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)