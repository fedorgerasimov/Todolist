import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

export type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state, [action.todolistID]: state[action.todolistID].filter(
                    el => el.id !== action.taskID)
            }
        case "ADD-TASK":
            const newTask = {id: v1(), title: action.newTitle, isDone: false}
            return {...state, [action.todolistID]: [newTask, ...state[action.todolistID]]}
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.todolistID]: state[action.todolistID].map(
                    el => el.id === action.taskID ? {...el, isDone: action.isDone} : el)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state, [action.todolistID]: state[action.todolistID].map(
                    el => el.id === action.taskID ? {...el, title: action.newTitle} : el)
            }
        case 'ADD-TODOLIST':
            return {
                ...state, [action.todolistID]: []
            }
        case 'REMOVE-TODOLIST':
            const {[action.todolistID]: [], ...rest} = {...state} // через деструктуризацию
            return rest
            //const copyState = {...state}
            //delete copyState[action.todolistId]
            //return copyState

        default:
             return state
    }
}
//AC - action creator
export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {type: 'REMOVE-TASK', todolistID, taskID} as const
}
export const addTaskAC = (todolistID: string, newTitle: string) => {
    return {type: 'ADD-TASK', todolistID, newTitle: newTitle} as const
}
export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', todolistID, taskID, isDone} as const
}
export const changeTaskTitleAC = (todolistID: string, taskID: string, newTitle: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistID, taskID, newTitle} as const
}
