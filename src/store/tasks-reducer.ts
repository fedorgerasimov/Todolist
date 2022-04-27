import {TasksStateType} from "../App";
import {v1} from "uuid";

type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
}
type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}
type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todolistId: string
}

export type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .filter(task => task.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false},
                    ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task =>
                    task.id === action.taskId ? {...task, isDone: action.isDone} : task)
            }
        default:
            throw  new Error('Error')
    }
}

//AC - action creator
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId: taskId, isDone: isDone, todolistId: todolistId}
}


//export const removeTaskAC = (taskId: string,todolistId:string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)
//export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>