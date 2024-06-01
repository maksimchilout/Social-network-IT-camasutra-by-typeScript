import {GetItemsType, instance} from "./api";



export const usersApi = {
    async getUsers(currentPage = 1, pageSize = 10, term: string ='', friend:null | boolean = null) {
        let response = await instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`));
        return response.data;
    },
    async follow(userId: number) {
        let res = await instance.post<ResponseType>(`follow/${userId}`);
        return res.data;
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<ResponseType>
    }
}