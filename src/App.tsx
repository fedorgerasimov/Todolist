import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string
    title : string
    filter: FilterValuesType
}

type TaskStateType = {
    [todoListId: string]: Array<TaskType>
}

function App() {
    // many todoLists:
    const  todoListsId_1 = v1()
    const  todoListsId_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodolistType>> ([  // создали стейт
        {id: todoListsId_1, title: 'What to learn', filter: 'all'},
        {id: todoListsId_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType> ( {
        [todoListsId_1] :[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListsId_2] :[
            {id: v1(), title: "Sugar", isDone: true},
            {id: v1(), title: "Salt", isDone: true},
            {id: v1(), title: "Butter", isDone: true},
            {id: v1(), title: "Oil", isDone: false},
           ]
    })

    //the only one todolist:
/*    const todolistTitle = 'What to learn'
    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>("all");*/

    //then should function refactor
    function removeTask(taskId: string, todoListId: string) {
        const tasksFromTodolist = tasks[todoListId]
        const filteredTasks = tasksFromTodolist.filter(t => t.id !== taskId);
        const copyTasks = {...tasks}
        copyTasks[todoListId] = filteredTasks
        setTasks(copyTasks)

        //let filteredTasks = tasks.filter(t => t.id != id);
        //setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks([...tasks]);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }



// UI - user interface
    return (
        <div className="App">
            <Todolist title={todolistTitle}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
