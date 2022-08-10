import React, {ChangeEvent, useCallback} from "react";
import {Button, Checkbox, ListItem} from "@material-ui/core";
import EditTableSpan from "./EditTableSpan";
import {DeleteForeverTwoTone} from "@material-ui/icons";
import {TaskType} from "./Todolist";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../store/tasks-reducer";

type TaskPropsType = {
    task: TaskType
    todolistID: string
}
export const TaskWithoutProps = React.memo( ({task, todolistID}: TaskPropsType) => {
    console.log("Task is called")
    const dispatch = useDispatch()
    const onClickHandler = () => dispatch(removeTaskAC(todolistID, task.id))

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
        dispatch(changeTaskStatusAC(todolistID, task.id, e.currentTarget.checked));

    const changeTitle = (newTitle: string) =>
        dispatch(changeTaskTitleAC(todolistID,task.id, newTitle))

    return <ListItem
        style={{padding: "0", justifyContent: "space-between"}}
        className={task.isDone ? "is-done" : ""}>
        <Checkbox color={'primary'}
                  size={'small'}
                  onChange={onChangeHandler}
                  checked={task.isDone}/>
        <EditTableSpan title={task.title} changeTitle={changeTitle}/>
        <Button onClick={onClickHandler} size={'small'}><DeleteForeverTwoTone/></Button>
    </ListItem>
})