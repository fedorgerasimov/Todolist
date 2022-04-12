import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import EditTableSpan from "./EditTableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from '@material-ui/icons';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todoListsId: string) => void
    changeTaskTitle: (todolistID: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistID: string, title: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.todolistID)
    }

    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");

    const changeTodolistTitle = (newTitle: string) => props.changeTodolistTitle(props.todolistID, newTitle)


    return <div style={{display: "flex", flexDirection: "column", alignContent: "space-between", height: "inherit"}}> {/*не работает*/}
        <div>
            <Typography align={'center'} variant={"h5"}>
                <EditTableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton onClick={() => props.removeTodolist(props.todolistID)}>
                    <Delete/>
                </IconButton>

            </Typography>
            <AddItemForm addItem={addTask}/>
            <List>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => props.removeTask(t.id, props.todolistID)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                        }

                        const changeTaskTitle = (newTitle: string) => {
                            props.changeTaskTitle(props.todolistID, t.id, newTitle)
                        }
                        return <ListItem
                            style={{padding: "0", justifyContent: "space-between"}}
                            key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox color={'primary'}
                                      size={'small'}
                                      onChange={onChangeHandler}
                                      checked={t.isDone}/>
                            <EditTableSpan title={t.title} changeTitle={changeTaskTitle}/>
                            {/*<span>{t.title}</span>*/}
                            <Button onClick={onClickHandler} size={'small'}>
                                <Delete/>
                            </Button>
                        </ListItem>
                    })
                }
            </List>
            <div>
                <ButtonGroup
                    size={'small'}
                    variant={'contained'}
                    disableElevation
                    fullWidth
                >
                    <Button
                        color={props.filter === 'all' ? "secondary" : "primary"}
                        onClick={onAllClickHandler}>All
                    </Button>
                    <Button
                        color={props.filter === 'active' ? "secondary" : "primary"}
                        onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button
                        color={props.filter === 'completed' ? "secondary" : "primary"}
                        onClick={onCompletedClickHandler}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    </div>
}
