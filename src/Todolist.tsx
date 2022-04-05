import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import EditTableSpan from "./EditTableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID : string, taskId: string) => void
    changeFilter: (todolistID : string, value: FilterValuesType) => void
    addTask: (todolistID : string, title: string) => void
    changeTaskStatus: (todolistID : string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todoListsId:string) => void
    changeTaskTitle: (todolistID : string, taskId: string, title: string) =>void
}

export function Todolist(props: PropsType) {

    const addTask = (title:string) => {
     props.addTask(title, props.todolistID)
    }

    const onAllClickHandler = () => props.changeFilter(props.todolistID,"all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID,"active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID,"completed");


    return <div>
        <h3>{props.title}
        <button onClick={()=> props.removeTodolist(props.todolistID)}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.todolistID)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }

                    const changeTaskTitle = (newTitle: string) => {
                        props. changeTaskTitle(props.todolistID, t.id, newTitle)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditTableSpan title={t.title} changeTitle={changeTaskTitle}/>
                        {/*<span>{t.title}</span>*/}
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
