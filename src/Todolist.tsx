import React, {useState} from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removedTask: (id:number)=> void
    //tasksFilter: (filterValue:string) => void
}

export function Todolist(props: PropsType) {
    let [valueButton, setValueButton] = useState( "All")

    const tasksFilter = (filterValue:string) => {
        setValueButton(filterValue)
    }

    let prokladka = props.tasks
    if (valueButton === "Active") {
        prokladka = props.tasks.filter(el=> el.isDone === false)
    }
    if (valueButton === "Completed") {
        prokladka = props.tasks.filter(el=> el.isDone === true)
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {prokladka.map((el, index) => {   // нужно сюда отправить отфильтрованные
                return (       // кнопки вместо props.tasks.map, убираем props. так как props это то что пришло снаружи
                    <li key={el.id}>
                        <button onClick={ ()=> props.removedTask(el.id)}>x</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={ () => tasksFilter("All")}>All</button>
            <button onClick={ () => tasksFilter("Active")}> Active</button>
            <button onClick={ ()=> tasksFilter("Completed")}>Completed</button>
        </div>
    </div>
}
