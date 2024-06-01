import {PhotosType, ProfileType} from "../types/types";
import {instance, ResponseType} from "./api";

type SavePhotoResponseDataType = {
    photos:PhotosType
}
export const profileApi = {
    async getProfile(userId: number) {
        let res = await instance.get<ProfileType>(`profile/${userId}`);
        return res.data;
    },
    async getStatus(userId: number) {
        let res = await instance.get<string>(`profile/status/${userId}`);
        return res.data;
    },
    async updateStatus(status: string) {
        let res = await instance.put<ResponseType>(`profile/status/`, {status: status});
        return res.data;
    },
    async savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append("image", photoFile)
        let res = await instance.put<ResponseType<SavePhotoResponseDataType>>('profile/photo', formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        });
        return res.data;
    },
    async saveProfile(profile: ProfileType) {
        let res = await instance.put<ResponseType>('profile', profile);
        return res.data;
    }

}