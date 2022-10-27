import {Dispatch} from 'redux';
import {authAPI} from '../api/api';
import axios from 'axios';
import {setIsLoggedInAC} from './authReducer';
import {handleServerAppError, handleServerNetworkError} from '../utilites/errorUtils';

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INIT':
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitAC = (value: boolean) => ({type: 'APP/SET-INIT', value} as const)


export const initializeAppTC = () => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.me()
        if (res.status === 200) {
            dispatch(setAppInitAC(true))
            dispatch(setIsLoggedInAC(true));
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
    } finally {
        dispatch(setAppStatusAC('idle'))
        dispatch(setAppInitAC(true))
    }
}


export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppInitActionType = ReturnType<typeof setAppInitAC>

export type AppActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetAppInitActionType
