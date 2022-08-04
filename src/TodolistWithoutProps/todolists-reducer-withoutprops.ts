import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "./AppWithReduxWithoutProps";

export type ActionType =
    ReturnType<typeof addTodolistAC>
    |  ReturnType<typeof removeTodolistAC>  // лучше сразу здесь писать, чем создавать отдельную переменную
    |  ReturnType<typeof changeTodolistTitleAC> // без ChangeTodolistFilterActionType
    |  ReturnType<typeof changeTodolistFilterAC>

const initialState: Array<TodolistType> = []

export const todolistsReducerWP = (state = initialState, action: ActionType): Array<TodolistType> => {
    debugger
    switch (action.type) {
        case "ADD-TODOLIST":
            debugger
            const newTodolist: TodolistType = {id: action.todolistID, title: action.newTitle, filter: 'all'}
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
export const addTodolistAC = (newTitle:string) => {
    debugger
    return {type: "ADD-TODOLIST", newTitle: newTitle, todolistID: v1()} as const
}

export const removeTodolistAC = (todolistID:string)  => // нужны (скобки) вокруг {}, так как возвращаем объект
    ({type: "REMOVE-TODOLIST", todolistID} as const)  // просто id (так как ключ и значение совпадают) или id:id

export const changeTodolistTitleAC = (todolistID: string, newTitle:string) =>
    ({type: "CHANGE-TODOLIST-TITLE", todolistID, newTitle} as const)  //as const) нужен для того, чтобы воспринимал не как тип string, a как константу

export const changeTodolistFilterAC = (todolistID: string, filter: FilterValuesType)  =>
    ({type: "CHANGE-TODOLIST-FILTER",todolistID, filter} as const)  // просто id или id:id

