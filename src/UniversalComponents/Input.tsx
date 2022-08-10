import React, {ChangeEvent, KeyboardEvent} from "react";

type InputPropsType = {
    title: string                     // передаём функцию useState
    setTitle: (title: string) => void
    callback: () => void
}

export const Input = (props: InputPropsType) => {
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.callback();
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
    }

    return (
        <input value={props.title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
        />
    )
}