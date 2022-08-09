import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button,
    Container, Grid,
    IconButton,
    Paper, Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function AppWithReducer() {
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer,[  // создали стейт
        {id: todolistID_1, title: 'What to learn', filter: 'all'},
        {id: todolistID_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
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

    const removeTask = (todoListID: string,taskID: string) => {
        let action = removeTaskAC(todoListID, taskID)
        dispatchToTasks(action)
    }

    const addTask = (todolistID: string, newTitle: string) => {
       dispatchToTasks(addTaskAC(todolistID,newTitle))
    }

    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC(todolistID, taskID, isDone))
    }

    const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
        dispatchToTasks(changeTaskTitleAC(todolistID, taskID, title))
    }

    const changeTodolistFilter = (todolistID: string, value: FilterValuesType) => {
        dispatchToTodoLists(changeTodolistFilterAC(todolistID, value))
    }

    const changeTodolistTitle = (todolistID: string, newTitle: string) => {
        dispatchToTodoLists(changeTodolistTitleAC(todolistID, newTitle))
    }

    const removeTodolist = (todolistID: string) => {
        let action = removeTodolistAC(todolistID) // нужно создать один объект чтобы потом его использовать
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    const addTodolist = (newTitle: string) => {
        let action = addTodolistAC(newTitle) // нужно создать объект чтобы генерировать одинаковый id, иначе не будут добавлятся TodoList
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    const todoListsForRender = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: "20px", maxWidth: "300px"}}>   {/*display: "inline-block"*/}
                    <Todolist
                        key={tl.id}
                        todolistID={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        //tasks={tasks}
                        tasks={tasks[tl.id]}

                        removeTask={removeTask}
                        changeFilter={changeTodolistFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}

                        removeTodolist={removeTodolist}
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
                    {todoListsForRender.length
                        ? todoListsForRender
                        : <span style={{padding: "15px 40px 0 0", }}>Create your first ToDo!</span>
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducer;
