import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilterHandler: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")

    const addTask = () => {
        props.addTask(title);
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    /*  const onAllClickHandler = () => props.changeFilter("all");
        const onActiveClickHandler = () => props.changeFilter("active");
        const onCompletedClickHandler = () => props.changeFilter("completed");*/
    const changeFilterHandler = (FilterValues: FilterValuesType) => {
        props.changeFilterHandler(FilterValues)
    }

   /* const onClickButtonHandler = (tID: string) => {   // вынесли функцию на верх из метода MAP
        props.removeTask(tID)
    }*/

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            {/* <button onClick={addTask}>+</button> */}
            <Button callback={() => addTask()} name={'x'}/> {/*применили универсальную кнопку*/}
        </div>
        <ul>
            {props.tasks.map(t => {
                const onClickButtonHandler = () => props.removeTask(t.id)
                return <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={onClickButtonHandler}>x</button>
                {/*    <Button name={'x'} callback={() => onClickButtonHandler(tID}/>*/}
                </li>
            })
            }
        </ul>
        <div>
            <Button name={'all'} callback={() => changeFilterHandler('all')}/>

            {/*  <button onClick={() =>changeFilterHandler ('all')}>All</button>
            <button onClick={() =>changeFilterHandler('active')}>Active</button>
            <button onClick={() => changeFilterHandler('completed')}>Completed</button>*/}
        </div>
    </div>
}
