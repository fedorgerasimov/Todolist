import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {IconButton, TextField} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import s from './Todolist.module.css'

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<boolean>(false)

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (Boolean(trimmedTitle)) {  //if (title.trim())
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
         setTitle('')
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (Boolean(error)) setError(false)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {  //
        if (Boolean(error)) setError(false) // Теперь будет очищаться input. Каждая установка state приводит к перерисовке компонента, но если отправлять одно и то же значение, перерисовке не будет
        if (e.key === 'Enter') addItem();  //  (e.key === 'Enter') && addItem ()
    }

    return (
        <div style={{display: "flex", alignItems: "center"}}>   {/*инпут и кнопка добавили на одном уровне */}
            <TextField size={"small"} variant={"outlined"} label={"Title"}
                       error={error} // border: red 1px solid;
                       value={title}
                       onChange={onChangeSetTitle}
                       onKeyPress={onKeyPressAddItem}
                       className={error ? s.error : ''} // error может быть, может нет. Для этого нужно создать стейт
            />
            <IconButton
                onClick={addItem}
                color={"primary"}>
                <AddCircleOutlineIcon fontSize={"large"}/>
            </IconButton>
            {error && <div className={s.errorMessage}>Title is required!</div>}
        </div>
    )
}