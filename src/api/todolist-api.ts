import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '9bcff6d4-9258-4e23-8719-879999ad9a5c'
    }
})

export const TodolistApi = {
    getTodolists: () => {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist: (title: string) => {
        return instance.post<BaseResponseType<{ item: TodolistType }>>('todo-lists', title)
    },

    deleteTodolist: (todolistId: string) => {
        return instance.delete<BaseResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle: (p: { todolistId: string, title: string }) => {
        return instance.put<BaseResponseType>(`todo-lists/${p.todolistId}`, {title: p.title})
    }
}

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type BaseResponseType<T = {} > =  {  // T - джинерик
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
    data: T
}

// type CreateTodolistType = {
//     data: { item: TodolistType }
//     fieldsErrors: string[]
//     messages: string[]
//     resultCode: number
// }

// type DeleteAndUpdateTodoType = {
//     data: {}
//     fieldsErrors: string[]
//     messages: string[]
//     resultCode: number
// }