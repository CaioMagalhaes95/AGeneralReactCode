import { GetManyProxy } from "../models/proxies/get-many.proxies";
import { UserProxy } from "../models/proxies/user.proxies";
import { api } from "./api";

export async function getUsers(search?: string, page?: number): Promise<GetManyProxy<UserProxy>>{
    const query: string [] = [];
    if(search)
    query.push("search=" + encodeURIComponent(search));

    if(page != null)
    query.push("page=" + encodeURIComponent(page));

    const { data } = await api.get<GetManyProxy<UserProxy>>('api/users?' + query.join);

    return data;

}

export async function getUser(id: number): Promise<UserProxy>{
    const { data } = await api.get<UserProxy>(`api/users/${id}`);
    return data;
}

export async function deleteUser(id: number): Promise<void>{
    await api.delete<UserProxy>(`api/users/${id}`);
}