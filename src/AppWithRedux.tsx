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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTask = (todoListID: string, taskID: string) => {
        let action = removeTaskAC(todoListID, taskID)
        dispatch(action)
    }

    const addTask = (todolistID: string, newTitle: string) => {
        dispatch(addTaskAC(todolistID, newTitle))
    }

    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, isDone))
    }

    const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskID, title))
    }

    const changeTodolistFilter = (todolistID: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistID, value))
    }

    const changeTodolistTitle = (todolistID: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistID, newTitle))
    }

    const removeTodolist = (todolistID: string) => {
        let action = removeTodolistAC(todolistID) // нужно создать один объект чтобы потом его использовать
        dispatch(action)
    }

    const addTodolist = (newTitle: string) => {
        let action = addTodolistAC(newTitle) // нужно создать объект, чтобы генерировать одинаковый id
        dispatch(action)                    // иначе не будут добавляться TodoList
    }

    const todoListsForRender = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: "20px", maxWidth: "300px", wordBreak: "break-word"}}>   {/*display: "inline-block"*/}
                    <Todolist
                        key={tl.id}
                        todolistID={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasks}

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
                        : <span style={{padding: "15px 40px 0 0",}}>Create your first ToDo!</span>
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
