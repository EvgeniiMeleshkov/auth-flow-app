import {Dispatch} from 'redux'
import axios from 'axios';
import {authAPI, LoginParamsType} from '../api/api';
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from './appReducer';
import {handleServerAppError, handleServerNetworkError} from '../utilites/errorUtils';

const initialState = {
    isLoggedIn: false
}

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}

        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch<AuthActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if (res.status === 200) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
    } finally {
        dispatch(setAppStatusAC('idle'))
    }

}

export const logOutTC = () => async (dispatch: Dispatch<AuthActionsType>) => {
    try{
        const res = await authAPI.logOut()
        dispatch(setIsLoggedInAC(false))
        if (res.status === 200) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
    }
}

// types
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType
