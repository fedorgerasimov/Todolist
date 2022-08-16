import React, {ChangeEvent} from "react";
import {Button, Checkbox, ListItem} from "@material-ui/core";
import EditTableSpan from "../EditTableSpan";
import {DeleteForeverTwoTone} from "@material-ui/icons";
import {TaskType} from "../Todolist";

type TaskPropsType = {
    task: TaskType
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string, title: string) => void
}
export const Task = React.memo( ({task, removeTask, changeTaskStatus, changeTaskTitle}: TaskPropsType) => {
    console.log("Task is called")
    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked);
    const changeTitle = (newTitle: string) => changeTaskTitle(task.id, newTitle)

    return <ListItem
        style={{padding: "0", justifyContent: "space-between", maxWidth: "300px"}}
        className={task.isDone ? "is-done" : ""}>
        <Checkbox color={'primary'}
                  size={'small'}
                  onChange={onChangeHandler}
                  checked={task.isDone}/>
        <EditTableSpan title={task.title} changeTitle={changeTitle}/>
        <Button onClick={onClickHandler} size={'small'}><DeleteForeverTwoTone/></Button>
    </ListItem>
})