
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';
import {AppActionsType, appReducer} from '../reducers/appReducer';
import {AuthActionsType, authReducer} from '../reducers/authReducer';
import {ContactsActionsType, contactsReducer} from '../reducers/contactsReducer';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    contacts: contactsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionType = ContactsActionsType | AppActionsType | AuthActionsType
//general dispatch type
export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
// @ts-ignore
window.store = store;
