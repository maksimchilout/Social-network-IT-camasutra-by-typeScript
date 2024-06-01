import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileApi} from "../api/profile-api";
import {BaseThunkType} from "./redux-store";

let initialState = {
    postsData: [
        {id: 1, post: 'lorem ipsum dolor', likesCount: 12},
        {id: 2, post: 'Why anyone love me', likesCount: 9},
        {id: 3, post: 'hi, how are you', likesCount: 14},
        {id: 4, post: 'This is last message today', likesCount: 9},
    ] as Array<PostType>,
    profile: null as null | ProfileType,
    status: '',
    newPostText: ''
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'ADD-POST':
            let newPost = {
                id: 5,
                post: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                newPostText: '',
                postsData: [...state.postsData, newPost]
            }
        case 'SET_USER_PROFILE' :
            return {
                ...state,
                profile: action.profile
            }
        case 'SET_STATUS' :
            return {
                ...state,
                status: action.status
            }
        case 'DELETE_POST':
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id !== action.postId)
            }
        case 'SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state
    }
}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'ADD-POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SET_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const),

}
export const getUserProfile = (userId: number):ThunkType => async (dispatch) => {
    let data = await profileApi.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}
export const getStatus = (userId: number):ThunkType => async (dispatch) => {
    let data = await profileApi.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string):ThunkType => async (dispatch) => {
    let data = await profileApi.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}
export const savePhoto = (file: File):ThunkType => async (dispatch) => {

    let data = await profileApi.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType):ThunkType => async (dispatch, getState) => {

    const userId = getState().auth.userId
    const data = await profileApi.saveProfile(profile)

    if (data.resultCode === 0) {
        if(userId != null) {
            await dispatch(getUserProfile(userId))
        } else {
            throw new Error("User Id csn not be null")
        }

    } else {
        dispatch(stopSubmit("edit-profile", {_error: data.messages[0]}))
        // return Promise.reject(response.data.messages[0])
    }
}
export default profileReducer

export type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof actions.addPostActionCreator> | ReturnType<typeof actions.setUserProfile> | ReturnType<typeof actions.setStatus> | ReturnType<typeof actions.deletePost> | ReturnType<typeof actions.savePhotoSuccess>
type ThunkType = BaseThunkType<ActionsType | FormAction>
