import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {IconButton, TextField} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

type AddItemFormPropsType ={
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }

    const addItem = () => {
        if (title.trim()) {
            props.addItem(title.trim())
            setTitle('');
        } else {
            setError('Title is required')   //
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {  //
        setError(null) // Теперь будет очищаться input. Каждая установка state приводит к перерисовке компонента, но если отправлять одно и то же значение, перерисовке не будет
        if (e.key === 'Enter') {
            addItem();
        }
    }

    return (
        <div style={{display: "flex", alignItems: "center"}}>   {/*инпут и кнопка добавили на одном уровне */}
            <TextField
                size={"small"}
                variant={"outlined"}
                label={"Title"}
                value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''} // error может быть, может нет. Для этого нужно создать стейт
            />
            <IconButton
                onClick={addItem}
                color={"primary"}
            >
            <AddCircleOutlineIcon
                fontSize={"large"}
            />
            </IconButton>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}