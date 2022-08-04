import React from 'react';
import './App.css';
import {
    AppBar,
    Button,
    Container, Grid,
    IconButton,
    Paper, Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {TaskType, TodolistWithoutProps} from "./TodolistWithoutProps";
import {AppRootStateTypeWP} from "./storeWithoutProps";
import {addTodolistAC} from "./todolists-reducer-withoutprops";
import {AddItemFormWithoutProps} from "./AddItemFormWithoutProps";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReduxWithoutProps() {
    debugger
    const todoLists = useSelector<AppRootStateTypeWP, Array<TodolistType>>(state => state.todoLists)
    // const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const addTodolist = (newTitle: string) => {
        debugger
         // нужно создать объект, чтобы генерировать одинаковый id
        dispatch(addTodolistAC(newTitle))                    // иначе не будут добавляться TodoList
    }

    const todoListsForRender = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{
                    padding: "20px",
                    maxWidth: "300px",
                    wordBreak: "break-word"
                }}>   {/*display: "inline-block"*/}
                    <TodolistWithoutProps
                        todoList={tl}
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
                        <AddItemFormWithoutProps addItem={addTodolist}/> {/*обернули в div чтобы выровнять input */}
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

export default AppWithReduxWithoutProps;
