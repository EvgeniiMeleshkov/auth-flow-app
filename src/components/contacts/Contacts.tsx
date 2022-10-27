import React, {useCallback, useEffect} from 'react';
import {Contact} from '../contact/Contact';
import {useSelector} from 'react-redux';
import {AppRootStateType, useTypedDispatch} from '../../redux/store';
import {ContactType, deleteContactTC, setContactsTC} from '../../reducers/contactsReducer';

const Contacts = () => {
    const contacts = useSelector<AppRootStateType, ContactType[]>(state => state.contacts.contacts)

    const dispatch = useTypedDispatch()
    const onDelete = useCallback((id: number)=>{
        dispatch(deleteContactTC(id))

    }, [dispatch])
    useEffect(() => {
        dispatch(setContactsTC())
    }, [])
    return (
        <div>
            {contacts.map((c) => (
                <Contact
                    id={c.id}
                    key={c.id}
                    name={c.name}
                    phone={c.phone}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default Contacts;