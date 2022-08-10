import React from "react";

type ButtonPropsType = {
    name: string
    callback: () => void
}

export const Button = (props: ButtonPropsType) => {
    const onClickButtonHandler = () => {    // функция, которая вызывает другую функцию
        props.callback()                    // выносим наверх чтобы не было перерисовки
    }

    return (
        <button onClick={onClickButtonHandler}>{props.name}</button>
    )
}