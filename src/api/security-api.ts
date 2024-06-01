import {instance} from "./api";

type GetCaptchaUrlResponseType = {
    url: string
}

export const securityApi = {
    async getCaptchaUrl() {
        let res = await instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`);
        return res.data;
    }
}