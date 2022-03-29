import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

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
    const todoListsId_1 = v1()
    const todoListsId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([  // создали стейт
        {id: todoListsId_1, title: 'What to learn', filter: 'all'},
        {id: todoListsId_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListsId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListsId_2]: [
            {id: v1(), title: "Sugar", isDone: true},
            {id: v1(), title: "Salt", isDone: true},
            {id: v1(), title: "Butter", isDone: true},
            {id: v1(), title: "Oil", isDone: false},
        ]
    })


    function removeTask(taskId: string, todoListId: string) {
        const filteredTasks = tasks[todoListId].filter(t => t.id !== taskId);
        setTasks({...tasks, [todoListId]: filteredTasks})
        /*   -2ой вариант функции
        const tasksFromTodolist = tasks[todoListId]
         const filteredTasks = tasksFromTodolist.filter(t => t.id !== taskId);
         const copyTasks = {...tasks}
         copyTasks[todoListId] = filteredTasks
         setTasks(copyTasks)*/

        //  - старая функция
        //   let filteredTasks = tasks.filter(t => t.id != id);
         //setTasks(filteredTasks);
    }

    function addTask(title: string, todoListId: string) {
        const newTask = {id: v1(), title, isDone: true}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    /*     - старая функция addTask
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);*/


    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        /*        // первый вариант посложнее
         setTasks({...tasks,
                    [todoListId]: tasks[todoListId]
                        .map(t => t.id === taskId ? {...t, isDone} : t)
            })*/
        const updatedTasksFromTodolist = tasks[todoListId]   // второй вариант
            .map(t => t.id === taskId ? {...t, isDone} : t)
        const copyTasks = {...tasks}
        copyTasks[todoListId] = updatedTasksFromTodolist
        setTasks(copyTasks)
    }
    /*   - старая функция changeStatus
    let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;}
        setTasks([...tasks]);}*/

    function changeFilter(filter: FilterValuesType, todoListsId: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListsId ? {...tl, filter} : tl))
    }

    function removeTodolist(todoListsId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListsId)) // удалили todolist
        const copyTasks = {...tasks}  // Создаём копию стейта (объекта с массивами)
        delete copyTasks[todoListsId]   // удалили таски
        setTasks(copyTasks)
    }

    const todoListsComponents = todoLists.map(tl => {   // tl берём из todoListsId_1 или _id2
        let tasksForTodolist = tasks[tl.id];
        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
        }

        return (<Todolist
                key={tl.id}
                id={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                removeTodolist={removeTodolist}

            />
        )
    })

    return (
        <div className="App">
            {todoListsComponents}  {/*возвращаем массив компонентов*/}
        </div>
    );
}

export default App;
