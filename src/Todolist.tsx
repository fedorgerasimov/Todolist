import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import EditTableSpan from "./EditTableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete, DeleteForeverTwoTone} from '@material-ui/icons';
import {Task} from './Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (todolistID: string, title: string) => void
    removeTask: (todolistID: string, taskID: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    changeTaskTitle: (todolistID: string, taskID: string, title: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    removeTodolist: (todoListsID: string) => void
    changeTodolistTitle: (todolistID: string, title: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log("Todolist is called")
    const addTaskTitle = useCallback((title: string) => {
        return (props.addTask(props.todolistID, title))
    }, [props.addTask, props.todolistID])

    const changeTodolistTitle = (newTitle: string) => props.changeTodolistTitle(props.todolistID, newTitle)

    const getTasksForRender = (tasks: Array<TaskType>, filter: FilterValuesType) => {
        let tasksForTodolist
        switch (filter) {
            case "completed":
                return tasksForTodolist = tasks.filter(el => el.isDone === false)
            case "active":
                return tasksForTodolist = tasks.filter(el => el.isDone === true)
            default:
                return tasksForTodolist = tasks
        }
    }
    const tasksForRender = getTasksForRender(props.tasks, props.filter)
    const tasksListItems = tasksForRender
    /*   let tasksListItems = [...props.tasks]  // сделали копию приходящих тасок из стора
       if(props.filter === 'active') {
           tasksListItems = tasksListItems.filter(el => el.isDone === false)
       }
         if(props.filter === 'completed') {
           tasksListItems = tasksListItems.filter(el => el.isDone === true)
       }*/

    const removeTaskCallBack = useCallback((taskID: string) =>
        props.removeTask(props.todolistID, taskID), [props.removeTask, props.todolistID])

    const changeTaskStatusCallBack = useCallback((taskID: string, newIsDoneValue: boolean) =>
        props.changeTaskStatus(props.todolistID, taskID, newIsDoneValue), [props.changeTaskStatus, props.todolistID])

    const changeTitleCallBack = useCallback((taskID: string, newTitle: string) =>
        props.changeTaskTitle(props.todolistID, taskID, newTitle), [props.changeTaskTitle, props.todolistID])

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
                        return <Task
                            key={t.id}
                            task={t}
                            changeTaskTitle={changeTitleCallBack}
                            removeTask={removeTaskCallBack}
                            changeTaskStatus={changeTaskStatusCallBack}
                        />
                    })
                    : <span>No task in list with this filter </span>
                }
            </List>
            <div>
                <ButtonGroup size={'small'} variant={'contained'} disableElevation fullWidth>
                    <Button color={props.filter === 'all' ? "secondary" : "primary"}
                            onClick={() => props.changeFilter(props.todolistID, "all")}>All</Button>
                    <Button color={props.filter === 'active' ? "secondary" : "primary"}
                            onClick={() => props.changeFilter(props.todolistID, "active")}>Active</Button>
                    <Button color={props.filter === 'completed' ? "secondary" : "primary"}
                            onClick={() => props.changeFilter(props.todolistID, "completed")}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )
})

