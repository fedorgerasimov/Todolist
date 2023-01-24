import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials : true,
    headers: {
        'API-KEY': '9bcff6d4-9258-4e23-8719-879999ad9a5c'
    }
})

export const TodolistApi = {
    getTodolists : () => {
        return instance.get('todo-lists')
    },

    createTodolist: (title: string) => {
       return instance.post ('todo-lists', title)
    },
    deleteTodolist: (todolistId: string) => {
        return instance.delete(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle: (p: {todolistId: string,title: string}) => {
        return instance.put(`todo-lists/${p.todolistId}`, {title:p.title})
    }
}