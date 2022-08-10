import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type FullInputType = {
    callback: (title:string)=> void
}

export const FullInput = (props:FullInputType) => {

    let [title, setTitle] = useState("")

    const addTaskHandler = () => {
        props.callback(title);
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    }
    return(
        <div>
            <input value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />
            <button onClick={addTaskHandler}>+</button>
        </div>
    )
}