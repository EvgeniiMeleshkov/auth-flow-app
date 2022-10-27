import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {AddContact} from './components/contact/AddContact';
import {useSelector} from 'react-redux';
import {AppRootStateType, useTypedDispatch} from './redux/store';
import {RequestStatusType} from './reducers/appReducer';
import {logOutTC} from './reducers/authReducer';
import {CircularProgress} from '@mui/material';
import Button from '@mui/material/Button';
import {Navigate, NavLink, Route, Routes} from 'react-router-dom';
import {paths} from './paths/paths';
import {Login} from './components/login/Login';
import Contacts from './components/contacts/Contacts';
import axios from 'axios';

function App() {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useTypedDispatch()
    const [contacts, setContacts] = useState<any[]>([])


    const getContacts = () => {
        axios.get('http://localhost:7402/contacts').then(res => {
            //@ts-ignore
            setContacts(res.data)
        })
    }
    const createNew = () => {
        axios.post('http://localhost:7402/contacts').then(res => {
                getContacts()
            }
        )
    }
    // const deleteContact = () => {
    //     axios.delete('http://localhost:7402/contacts')
    //         .then(res => {
    //             getContacts()
    //         })
    // }
    useEffect(() => {
        //dispatch(initializeAppTC())
        getContacts()
    }, [])

    const logOut = () => {
        dispatch(logOutTC())
    }
    const addContact = useCallback((name: string, phone: string) => {
        //dispatch(createContactTC(name, phone))
    }, [dispatch])

    if (isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            {!isLoggedIn
                ? <Button onClick={logOut} color="inherit">Log out</Button>
                : <NavLink style={{textDecoration: 'none', color: 'inherit'}} to={paths.login}><Button
                    color="inherit">Login</Button></NavLink>}
            {isLoggedIn && <AddContact addContact={addContact}/>}
            <h1>My contacts</h1>
            <button onClick={createNew}>add Contact</button>
            {/*<button onClick={deleteContact}>clear Contact</button>*/}
            {contacts.map((el: { id: number , name: string }, idx: number) => {
                return (
                    <ul key={idx}>
                        <li>{el.name}</li>
                    </ul>
                )
            })}
            <Routes>
                <Route path={paths.main} element={<Contacts/>}/>
                <Route path={paths.login} element={<Login/>}/>
                <Route path={paths['404']} element={'404'}/>
                <Route path={'*'} element={<Navigate to={paths['404']}/>}/>
            </Routes>
        </div>
    );
}

export default App;
