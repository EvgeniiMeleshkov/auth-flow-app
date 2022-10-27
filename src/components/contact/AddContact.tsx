import React from "react";

type AddContactPropsType = {
    addContact: (name: string, phone: string) => void
}

export const AddContact = ({ addContact }: AddContactPropsType) => {

    const handleOnSubmit = (evt: any) => {
        evt.preventDefault();
        addContact(evt.target.name.value, evt.target.email.value);
        evt.target.name.value = "";
        evt.target.phone.value = "";
    };

    return (
        <form onSubmit={handleOnSubmit}>
            <h3>Add contact</h3>
            <input placeholder="Name" name="name" />
            <input placeholder="Phone" name="phone" />
            <button onSubmit={handleOnSubmit}>Add</button>
            <hr />
        </form>
    );
};
