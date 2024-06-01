import {instance, ResponseType, ResultCodesEnum, ResultCodesWithCaptchaEnum} from "./api";


type MeResponseDataType = {
    id: number
    email: string
    login: string

}
type LoginResponseDataType = {
    userId: number

}

export const authApi = {
    async me() {
        let res = await instance.get<ResponseType<MeResponseDataType>>(`auth/me`);
        return res.data;
    },
    async login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        let res = await instance.post<ResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodesWithCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha});
        return res.data;
    },
    logout() {
        return instance.delete('auth/login')
    }
}
