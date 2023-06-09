import React, {Component} from "react";
import {connect} from "react-redux";
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {
    setCurrentPage,
    toggleIsFollowing, getUsersThunkCreator, unfollowThunkCreator, followThunkCreator
} from "../Redux/users-reducer";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../Redux/users-selectors";

class UsersContainer extends Component {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChange = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.pageSize )
        console.log(this.props.totalUsersCount)
    }

    render() {

        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users onPageChange={this.onPageChange}
                       totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       users={this.props.users}
                       unfollow={this.props.unfollow}
                       follow={this.props.follow}
                       isFetching={this.props.isFetching}
                       followingInProgress={this.props.followingInProgress}
					   toggleIsFollowing={this.props.toggleIsFollowing}

                />
            </>
        )
    }
}

// принимает весь state и меняет
let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
};

export default compose(connect(mapStateToProps, {
    setCurrentPage,
    toggleIsFollowing,
    requestUsers: getUsersThunkCreator,
    unfollow: unfollowThunkCreator,
    follow : followThunkCreator,
}),
    withAuthRedirect
)(UsersContainer)
