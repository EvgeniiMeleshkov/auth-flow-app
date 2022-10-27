import React, { useState } from "react";

type ContactPropsType = {
    id: number
    name: string
    phone: string
    onDelete: (id: number) => void
}

export const Contact = ({ name, phone, id, onDelete }: ContactPropsType) => {
    const [isEdit, setIsEdit] = useState(false);


    const handleEdit = () => {
        setIsEdit(!isEdit);
    };

    const handleDelete = () => {
        onDelete(id)
    };

    const handleOnEditSubmit = (evt: any) => {
        evt.preventDefault();
        //onEdit(id, evt.target.name.value, evt.target.email.value);
        setIsEdit(!isEdit);
    };

    return (
        <div>
            {isEdit ? (
                <form onSubmit={handleOnEditSubmit}>
                    <input placeholder="Name" name="name" defaultValue={name} />
                    <input placeholder="Phone" name="phone" defaultValue={phone} />
                    <button onSubmit={handleOnEditSubmit}>Save</button>
                </form>
            ) : (
                <div className="user">
                    <span className="user-name">{name}</span>
                    <span className="user-phone">{phone}</span>
                    <div>
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};
