import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '8de0ed6b-0a62-4b48-be08-852818ff8f02'
    }
})

export const TodolistApi = {
    getTodolists: () => {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist: (title: string) => {
        return instance.post<any, AxiosResponse<BaseResponseType<{item: TodolistType}>>, {title:string}>
        ('todo-lists', {title})
    },

    deleteTodolist: (todolistId: string) => {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
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

type _CreateTodolistType = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: { item: TodolistType }
}

type _DeleteAndUpdateTodoType = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: {}
}