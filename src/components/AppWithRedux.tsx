import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
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
} from "../store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

export const AppWithRedux = () => {
    console.log("App is called")
    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((todoListID: string, taskID: string) => {
        let action = removeTaskAC(todoListID, taskID)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((todolistID: string, newTitle: string) => {
        dispatch(addTaskAC(todolistID, newTitle))
    },[dispatch])

    const changeTaskStatus = useCallback((todolistID: string, taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, isDone))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistID: string, taskID: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskID, title))
    }, [dispatch])

    const changeTodolistFilter = useCallback((todolistID: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistID, value))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistID: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistID, newTitle))
    },[dispatch])

    const removeTodolist = useCallback((todolistID: string) => {
        let action = removeTodolistAC(todolistID) // нужно создать один объект чтобы потом его использовать
        dispatch(action)
    },[dispatch])

    const addTodolist = useCallback((newTitle: string) => {
        let action = addTodolistAC(newTitle) // нужно создать объект, чтобы генерировать одинаковый id
        dispatch(action)                    // иначе не будут добавляться TodoList
    }, [dispatch])

    const todoListsForRender = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: "20px", maxWidth: "300px", wordBreak: "break-word"}}>   {/*display: "inline-block"*/}
                    <Todolist
                        key={tl.id}
                        todolistID={tl.id}
                        title={tl.title}
                        filter={tl.filter}
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
                        : <span style={{padding: "15px 40px 0 0",}}>Create your first ToDo!</span>
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
