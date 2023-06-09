import {userAPI} from "../../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING = 'TOGGLE-IS-FOLLOWING';


let initialState = {
    users: [],
    pageSize: 6,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                // копируем state и пробегаемся по всем users
                ...state,
                users: state.users.map(user => {
                    // если id user совпадает с userID из action то возвращаем копию объекта user и добавляем followed: true
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user
                })
            }

        case UNFOLLOW:
            return {
                ...state,// копируем state и пробегаемся по всем users
                users: state.users.map(user => {
                    // если id user совпадает с userID из action то возвращаем копию объекта user и добавляем followed: false
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user
                })
            }
        case SET_USERS: {
            // для добавления users мы будем брать копию state и в users будем к копии users добавлять users из action
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;

    }


}

export const followSuccess = userId => ({type: FOLLOW, userId});
export const unfollowSuccess = userId => ({type: UNFOLLOW, userId});
export const setUsers = users => ({type: SET_USERS, users});
export const setCurrentPage = currentPage => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = totalUsersCount => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount});
export const toggleIsFetching = isFetching => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleIsFollowing = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING, isFetching, userId});

export const getUsersThunkCreator = (currentPage, pageSize) => {
    return dispatch => {
        dispatch(setCurrentPage(currentPage))
        dispatch(toggleIsFetching(true))
        userAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(toggleIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setTotalUsersCount(data.totalCount));
            });
    }
}
export const unfollowThunkCreator = (userId) => {
    return dispatch => {
        dispatch(toggleIsFollowing(true, userId))
        dispatch(toggleIsFetching(true))
        userAPI.deleteFollow(userId)
            .then(data => {

                if (data.resultCode === 0) {
                    dispatch(unfollowSuccess(userId))
                }
                dispatch(toggleIsFollowing(false, userId));
                dispatch(toggleIsFetching(false))
            });
    }
}
export const followThunkCreator = (userId) => {
    return dispatch => {
        dispatch(toggleIsFollowing(true, userId))
        dispatch(toggleIsFetching(true))
        userAPI.postFollow(userId)
            .then(data => {

                if (data.resultCode === 0) {
                    dispatch(followSuccess(userId))
                }
                dispatch(toggleIsFollowing(false, userId));
                dispatch(toggleIsFetching(false))
            });
    }
}

export default usersReducer;
