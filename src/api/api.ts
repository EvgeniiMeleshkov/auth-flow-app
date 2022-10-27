import axios, { AxiosResponse } from 'axios'
import {ContactType} from '../reducers/contactsReducer';
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    // withCredentials: true,
    // headers: {
    //     //'API-KEY': '61673f24-31ed-4acb-baab-8f77d72b4514'
    // }
})

// api

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{userId: string}>>>(`/login`, data)
    },
    logOut() {
        return instance.delete<LoginParamsType, AxiosResponse<ResponseType<LoginParamsType>>>(`/login`)
    },
    me() {
        return instance.get<LoginParamsType, AxiosResponse<ResponseType<LoginParamsType>>>(`/auth`)
    }
}

export const api = {
    getContacts() {
        return instance.get<ContactType[]>('users');
    },
    createContact(title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{item: any }>>>('todo-lists', {title});
    },
    deleteContact(id: number) {
        return instance.delete<ResponseType>(`users/${id}`);
    },
    updateContact(todolistId: string, taskId: string, model: UpdateContactModelType) {
        return instance.put<UpdateContactModelType, AxiosResponse<ResponseType<{ item: ContactType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
}

// types

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type UpdateContactModelType = {
    "id"?: number
    "name"?: string
    "username"?: string
    "email"?: string
    "address"?: {
        "street": string
        "suite": string
        "city": string
        "zipcode": string
        "geo": {
            "lat": string
            "lng": string
        }
    }
    "phone"?: string
    "website"?: string
    "company"?: {
        "name": string
        "catchPhrase": string
        "bs": string
    }
}
type GetContactsResponse = {
    error: string | null
    totalCount: number
    items: ContactType[]
}
