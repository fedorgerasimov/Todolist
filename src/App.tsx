import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [todoListId: string]: Array<TaskType>
}

function App() {
    // many todoLists:
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([  // создали стейт
        {id: todolistID_1, title: 'What to learn', filter: 'all'},
        {id: todolistID_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: "Sugar", isDone: true},
            {id: v1(), title: "Salt", isDone: true},
            {id: v1(), title: "Butter", isDone: true},
            {id: v1(), title: "Oil", isDone: false},
        ]
    })
    //functions:
    //tasks:
    function removeTask(taskId: string, todoListId: string) {
        //   let filteredTasks = tasks.filter(t => t.id != id);
        //setTasks(filteredTasks);
        const filteredTasks = tasks[todoListId].filter(t => t.id !== taskId);
        setTasks({...tasks, [todoListId]: filteredTasks})
    }

    function addTask(title: string, todoListId: string) {
        //let task = {id: v1(), title: title, isDone: false};
        //let newTasks = [task, ...tasks];
        //setTasks(newTasks);
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    function changeTaskStatus(todoListId: string, taskId: string, isDone: boolean) {
        //let task = tasks.find(t => t.id === taskId);
        //if (task) {task.isDone = isDone;}
        //setTasks([...tasks]);}
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone} : t)})

    }

    function changeTaskTitle (todoListId: string, taskId: string, isDone: boolean) {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId]
                .map(t => t.id === taskId ? {...t, taskId} : t)
        })
    }

    //TodoLists:

    function changeTodolistFilter(todolistID: string, filter: FilterValuesType) {
        // setFilter(value)
        setTodoLists(todoLists.map(tl => tl.id === todolistID ? {...tl, filter} : tl))
    }

    function changeTodolistTitle(todolistID: string, filter: FilterValuesType) {
        // setFilter(value)
        setTodoLists(todoLists.map(tl => tl.id === todolistID ? {
            ...tl,
            filter}
            : tl))
    }



    function removeTodolist(todolistID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todolistID)) // удалили todolist
        delete tasks[todolistID]
        console.log(tasks) // можно проверить что делает функция delete
        console.log('remove')
    }

    function addTodolist(title: string) {
        const newTodolist: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodolist])
        setTasks({...tasks, [newTodolist.id]: []})
    }

    const todoListsComponents = todoLists.map(tl => {   // tl берём из todolistID_1 или _id2
        let tasksForTodolist = tasks[tl.id];
        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
        }

        return (<Todolist
                key={tl.id}
                todolistID={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeTodolistFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodolist}

            />
        )
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todoListsComponents} {/*возвращаем массив компонентов*/}
        </div>
    );
}

export default App;
