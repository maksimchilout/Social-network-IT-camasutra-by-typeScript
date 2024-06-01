import {ResultCodesEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {authApi} from "../api/auth-api";
import {securityApi} from "../api/security-api";
import { BaseThunkType} from "./redux-store";


let initialState  = {
    userId: null as null | number,
    email: null as  null | string,
    login: null as  null | string,
    isAuth: false as false | boolean,
    captchaUrl: null as null | string
}
const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'samurai-network/auth/SET_USER_DATA':
        case 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'samurai-network/auth/SET_USER_DATA',
        payload: {userId, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS',
        payload: {captchaUrl}
    })
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authApi.me()
    if (meData.resultCode === 0) {
        let {id, login, email} = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let loginData = await authApi.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())

    }else {
        if(loginData.resultCode === ResultCodesEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let messages = loginData.messages.length > 0 ? loginData.messages[0] : "Some error"
        let action = stopSubmit("login", {_error: messages})
        dispatch(action)
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityApi.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}
export const logout = ():ThunkType => async (dispatch) => {
    let response = await authApi.logout()
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer


export type InitialStateType = typeof initialState

type ThunkType = BaseThunkType<ActionsType | FormAction>

type ActionsType = ReturnType<typeof actions.setAuthUserData> | ReturnType<typeof actions.getCaptchaUrlSuccess>