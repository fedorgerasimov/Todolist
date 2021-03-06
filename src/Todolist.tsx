import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TasksStateType} from './App';
import {AddItemForm} from "./AddItemForm";
import EditTableSpan from "./EditTableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete, DeleteForeverTwoTone} from '@material-ui/icons';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    filter: FilterValuesType
    tasks: TasksStateType
    addTask: (todolistID: string, title: string) => void
    removeTask: (todolistID: string, taskID: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    changeTaskTitle: (todolistID: string, taskID: string, title: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    removeTodolist: (todoListsID: string) => void
    changeTodolistTitle: (todolistID: string, title: string) => void
}

export function Todolist(props: PropsType) {

    const addTaskTitle = (title: string) => props.addTask(props.todolistID, title)

    const changeTodolistTitle = (newTitle: string) => props.changeTodolistTitle(props.todolistID, newTitle)

    const getTasksForRender = (tasks: TasksStateType, filter: FilterValuesType) => {
        let tasksForTodolist
        switch (filter) {
            case "completed":
                return tasksForTodolist = tasks[props.todolistID].filter(el => el.isDone === false)
            case "active":
                return tasksForTodolist = tasks[props.todolistID].filter(el => el.isDone === true)
            default:
                return tasksForTodolist = tasks[props.todolistID]
        }
    }
    const tasksForRender = getTasksForRender(props.tasks, props.filter)
    const tasksListItems = tasksForRender

    return (
        <div style={{}}> {/*не работает*/}
            <Typography align={'center'} variant={"h5"}>
                <EditTableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton onClick={() => props.removeTodolist(props.todolistID)}><Delete/></IconButton>
            </Typography>
            <AddItemForm addItem={addTaskTitle}/>
            <List>
                {tasksListItems.length
                    ? tasksListItems.map(t => {
                        const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                        }

                        const changeTaskTitle = (newTitle: string) => {
                            props.changeTaskTitle(props.todolistID, t.id, newTitle)
                        }
                        return <ListItem
                            style={{padding: "0", justifyContent: "space-between"}}
                            key={t.id}
                            className={t.isDone ? "is-done" : ""}>
                            <Checkbox color={'primary'}
                                      size={'small'}
                                      onChange={onChangeHandler}
                                      checked={t.isDone}/>
                            <EditTableSpan title={t.title} changeTitle={changeTaskTitle}/>
                            <Button onClick={onClickHandler} size={'small'}><DeleteForeverTwoTone/></Button>
                        </ListItem>
                    })
                    : <span>No task in list with this filter </span>
                }
            </List>
            <div>
                <ButtonGroup size={'small'} variant={'contained'} disableElevation fullWidth>
                    <Button color={props.filter === 'all' ? "secondary" : "primary"} onClick={()=>props.changeFilter(props.todolistID,"all")}>All</Button>
                    <Button color={props.filter === 'active' ? "secondary" : "primary"} onClick={()=>props.changeFilter(props.todolistID,"active")}>Active</Button>
                    <Button color={props.filter === 'completed' ? "secondary" : "primary"} onClick={()=>props.changeFilter(props.todolistID,"completed")}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}
