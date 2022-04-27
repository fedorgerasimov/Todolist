import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button,
    Container, Grid,
    IconButton,
    Paper,
    TableContainer,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
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

    const [tasks, setTasks] = useState<TasksStateType>({
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

    function changeTaskTitle(todoListId: string, taskId: string, title: string) {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId]
                .map(t => t.id === taskId ? {...t, title} : t)
        })
    }

    //TodoLists:
    function changeTodolistFilter(todolistID: string, value: FilterValuesType) {
        // setFilter(value)
        setTodoLists(todoLists.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl))
    }

    function changeTodolistTitle(todolistID: string, newTitle: string) {
        // setFilter(value)
        setTodoLists(todoLists.map(tl => tl.id === todolistID ? {...tl, title: newTitle} : tl))
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

        return (
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: "20px", maxWidth: "300px"}}>   {/*display: "inline-block"*/}
                    <Todolist
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
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}

                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container justifyContent={"center"}>
                    <div>
                        <AddItemForm addItem={addTodolist}/> {/*обернули в div чтобы выровнять input */}
                    </div>
                </Grid>
                <Grid
                    justifyContent={"center"}
                    container spacing={6}>
                    {todoListsComponents} {/*возвращаем массив компонентов*/}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
