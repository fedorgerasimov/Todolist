import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";
//AC = ActonType
type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
}

type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    id: string
}

type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    id:string
}

export type ActionType = AddTodolistAT  | RemoveTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export const todolistsReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "ADD-TODOLIST":
            const newTodolist: TodolistType = {
                id: v1(),
                title: action.title,
                filter: 'all'}
            return [...todolists, newTodolist]
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
    }
}