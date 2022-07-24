import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type ActionType =
    ReturnType<typeof addTodolistAC>
    |  ReturnType<typeof removeTodolistAC>  // лучше сразу здесь писать, чем создавать отдельную переменную
    |  ReturnType<typeof changeTodolistTitleAC> // без ChangeTodolistFilterActionType
    |  ReturnType<typeof changeTodolistFilterAC>

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "ADD-TODOLIST":
            const newTodolist: TodolistType = {id: v1(), title: action.newTitle, filter: 'all'}
            return [newTodolist,...state]
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.todolistID)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.todolistID
                ? {...el, title: action.newTitle}: el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id ===action.todolistID
            ? {...el, filter: action.filter} : el)
        default:
            return state
    }
}

//AC - action creator- функция action creator возвращает объект
export const addTodolistAC = (newTitle:string) =>
    ({type: "ADD-TODOLIST", newTitle} as const) // нужны (скобки) вокруг {}, так как возвращаем объект

export const removeTodolistAC = (todolistID:string)  =>
    ({type: "REMOVE-TODOLIST", todolistID} as const)  // просто id (так как ключ и значение совпадают) или id:id

export const changeTodolistTitleAC = (todolistID: string, newTitle:string) =>
    ({type: "CHANGE-TODOLIST-TITLE", todolistID, newTitle} as const)  //as const) нужен для того, чтобы воспринимал не как тип string, a как константу

export const changeTodolistFilterAC = (todolistID: string, filter: FilterValuesType)  =>
    ({type: "CHANGE-TODOLIST-FILTER",todolistID, filter} as const)  // просто id или id:id

