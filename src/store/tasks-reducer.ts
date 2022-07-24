import {TasksStateType} from "../App";
import {v1} from "uuid";



export const tasksReducer = (state: TasksStateType, action: any): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":

        case "ADD-TASK":

        case 'CHANGE-TASK-STATUS':

        case 'ADD-TODOLIST':

        default:
            throw  new Error('Error')
    }
}

//AC - action creator
export const removeTaskAC = (taskId: string, todolistId: string)=> {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskId: taskId, isDone: isDone, todolistId: todolistId}
}
export const addTodolistAC = (title: string)  => {
    return {type: "ADD-TODOLIST", title: title}
}