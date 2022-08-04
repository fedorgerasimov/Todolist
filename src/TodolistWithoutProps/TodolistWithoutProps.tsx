import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete, DeleteForeverTwoTone} from '@material-ui/icons';
import {FilterValuesType, TodolistType} from "./AppWithReduxWithoutProps";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./tasks-reducer-withoutprops";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./todolists-reducer-withoutprops";
import {AppRootStateTypeWP} from "./storeWithoutProps";
import EditTableSpanWithoutProps from "./EditTableSpanWithoutProps";
import {AddItemFormWithoutProps} from "./AddItemFormWithoutProps";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoList: TodolistType
}

export function TodolistWithoutProps({todoList}: PropsType) {

    const {id, title, filter} = todoList // деструктуризация
    const tasks = useSelector<AppRootStateTypeWP, Array<TaskType>>(state => state.tasks[id]) // по id берём св-во конкретного todoList

    const dispatch = useDispatch()
    const addTaskTitle = (newTitle: string) =>
        dispatch(addTaskAC(id, newTitle))

    const changeTodolistTitle = (newTitle: string) =>
        dispatch(changeTodolistTitleAC(id, newTitle))

    const getTasksForRender = (tasks: Array<TaskType>, filter: FilterValuesType) => {
        let tasksForTodolist
        switch (filter) {
            case "active":
                return tasksForTodolist = tasks.filter(el => el.isDone === false)
            case "completed":
                return tasksForTodolist = tasks.filter(el => el.isDone === true)
            default:
                return tasksForTodolist = tasks
        }
    }
    const tasksListItems = getTasksForRender(tasks, filter)

   /* let tasksForTodolist = tasks
    if (filter === "active") {
        tasksForTodolist = tasks.filter(el => el.isDone === false)
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(el => el.isDone === true)
    }*/

    return (
        <div style={{maxWidth: "300px"}}> {/*не работает*/}
            <Typography align={'center'} variant={"h5"}>
                <EditTableSpanWithoutProps title={title} changeTitle={changeTodolistTitle}/>
                <IconButton onClick={() => dispatch(removeTodolistAC(id))}><Delete/></IconButton>
            </Typography>
            <AddItemFormWithoutProps addItem={addTaskTitle}/>
            <List>
                {tasksListItems.length
                    ? tasksListItems.map(t => {
                        const onClickHandler = () => dispatch(removeTaskAC(id, t.id))
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC( id,t.id, e.currentTarget.checked));
                        }

                        const changeTaskTitle = (newTitle: string) => {
                            dispatch(changeTaskTitleAC(id, t.id, newTitle))
                        }
                        return <ListItem
                            style={{padding: "0", justifyContent: "space-between"}}
                            key={t.id}
                            className={t.isDone ? "is-done" : ""}>
                            <Checkbox color={'primary'}
                                      size={'small'}
                                      onChange={onChangeHandler}
                                      checked={t.isDone}/>
                            <EditTableSpanWithoutProps title={t.title} changeTitle={changeTaskTitle}/>
                            <Button onClick={onClickHandler} size={'small'}><DeleteForeverTwoTone/></Button>
                        </ListItem>
                    })
                    : <span>No task in list with this filter </span>
                }
            </List>
            <div>
                <ButtonGroup size={'small'} variant={'contained'} disableElevation fullWidth>
                    <Button color={filter === 'all' ? "secondary" : "primary"}
                            onClick={() => dispatch(changeTodolistFilterAC(id, 'all'))}>All</Button>
                    <Button color={filter === 'active' ? "secondary" : "primary"}
                            onClick={() =>  dispatch(changeTodolistFilterAC(id, 'active'))}>Active</Button>
                    <Button color={filter === 'completed' ? "secondary" : "primary"}
                            onClick={() =>  dispatch(changeTodolistFilterAC(id, 'completed'))}>Completed</Button>
                </ButtonGroup>
            </div>

        </div>
    )
}
