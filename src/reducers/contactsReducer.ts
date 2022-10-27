import {api} from '../api/api';
import {setAppStatusAC} from './appReducer';
import {handleServerAppError, handleServerNetworkError} from '../utilites/errorUtils';
import {AppDispatch} from '../redux/store';
import axios from 'axios';

export type ContactType = {
    "id": number
    "name": string
    "username": string
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
    "phone": string
    "website"?: string
    "company"?: {
        "name": string
        "catchPhrase": string
        "bs": string
    }
}
export type ContactsInitStateType = {
    contacts: ContactType[]
}
const contactsInitState: ContactsInitStateType = {
    contacts: [] as ContactType[]
}

export const contactsReducer = (state: ContactsInitStateType= contactsInitState, action: ContactsActionsType) => {
    switch (action.type) {
        case 'SET-CONTACTS':
            return {...state, contacts: action.contacts}
        case 'REMOVE-CONTACT':
            return {...state, contacts: [...state.contacts.filter(el => el.id !== action.id)]}
        default:
            return state
    }
}

//
export const removeContactAC = (id: number) => {
    return {type: 'REMOVE-CONTACT', id} as const
}
// export const addTaskAC = (task: TaskType, todolistId: string): AddTaskActionType => {
//     return {type: 'ADD-TASK', task, todolistId}
// }
// export const setEntityStatusAC = (todoID: string, taskID: string, status: RequestStatusType) => {
//     return {type: 'SET_ENTITY_TASK_STATUS', todoID, taskID, status} as const
// }
// export const updateTaskAC = (taskId: string, task: TaskType, todolistId: string): updateTaskActionType => {
//     return {type: 'UPDATE_TASK', task, todolistId, taskId}
// }
//
// export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
//     return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
// }
export const setContactsAC = ( contacts: ContactType[] ) => ({type: 'SET-CONTACTS', contacts} as const)

//======================= THUNKS ================================//


export const setContactsTC = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    api.getContacts()
        .then(res => {
            dispatch(setContactsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        }).catch(error => handleServerNetworkError(error, dispatch))
}

export const deleteContactTC = (id: number) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const response = await api.deleteContact(id)
        if (response.status === 200) {
            dispatch(removeContactAC(id))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(response.data, dispatch)
        }
    } catch (err) {
        if(axios.isAxiosError(err)){
            handleServerNetworkError(err, dispatch)
        }
    }
}

//
// export const addTaskTC = (todoID: string, title: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC('loading'))
//     dispatch(setTodoStatusAC(todoID, 'loading'))
//     todolistsAPI.createTask(todoID, title)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(addTaskAC(res.data.data.item, todoID))
//                 dispatch(setAppStatusAC('succeeded'))
//                 dispatch(setTodoStatusAC(todoID, 'succeeded'))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch(error => handleServerNetworkError(error, dispatch))
// }

// export const updateTaskTC = (todoID: string, taskID: string, model: UpdateTaskModelType) =>
//     (dispatch: Dispatch, getState: () => AppRootStateType) => {
//         dispatch(setAppStatusAC('loading'))
//         const task = getState().tasks[todoID].find(t => t.id === taskID)
//         dispatch(setEntityStatusAC(task!.todoListId, taskID, 'loading'))
//         //const mod = {...task, ...model}
//         task &&
//         todolistsAPI.updateTask(todoID, taskID, {
//             title: task.title,
//             status: task.status,
//             deadline: task.deadline,
//             startDate: task.startDate,
//             description: task.description,
//             priority: task.priority,
//             ...model
//         })
//             .then(res => {
//                 if(res.data.resultCode === 0){
//                     dispatch(updateTaskAC(taskID, res.data.data.item, todoID))
//                     dispatch(setAppStatusAC('succeeded'))
//                     dispatch(setEntityStatusAC(task!.todoListId, taskID, 'succeeded'))
//                 } else {
//                     handleServerAppError(res.data, dispatch)
//                     dispatch(setEntityStatusAC(task!.todoListId, taskID, 'failed'))
//                 }
//
//             })
//             .catch(error => handleServerNetworkError(error, dispatch))
//     }
export type SetContactsACType = ReturnType<typeof setContactsAC>
export type RemoveContactACType = ReturnType<typeof removeContactAC>
export type ContactsActionsType = SetContactsACType | RemoveContactACType