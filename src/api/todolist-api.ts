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
        return instance.post<any, AxiosResponse<BaseResponseType<{ item: TodolistType }>>, { title: string }>
        ('todo-lists', {title})
    },

    deleteTodolist: (todolistId: string) => {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle: (p: { todolistId: string, title: string }) => {
        return instance.put<BaseResponseType>(`todo-lists/${p.todolistId}`, {title: p.title})
    },
    getTasks: (todolistId: string) => {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask: (todolistId: string, taskId: string) => {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask: (todolistId: string, title: string) => {
        return instance.post<{ title: string }, AxiosResponse<BaseResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<BaseResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
}

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type BaseResponseType<T = {}> = {  // T - джинерик
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

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}