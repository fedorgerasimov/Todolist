import React, {useState} from 'react';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    tasksFilter:(filterValue: string) => void
    addTask: (newTitle:string) => void
}


export function Todolist(props: PropsType) {
    let [newTitle, setNewTitle] = useState('')
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onChange={(event) => setNewTitle(event.currentTarget.value)}/>
            <button onClick={() => props.addTask(newTitle)}>+</button>
        </div>
        <ul>
            {props.tasks.map((el) => {
                return (
                    <li key={el.id}>
                        <button onClick={() => props.removeTask(el.id)}>X</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={() => props.tasksFilter("All")}>All</button>
            <button onClick={() => props.tasksFilter("Active")}>Active</button>
            <button onClick={() => props.tasksFilter('Completed')}>Completed</button>
        </div>
    </div>
}
