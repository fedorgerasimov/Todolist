import React, {useEffect, useState} from 'react'
import {TodolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistApi.getTodolists()
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'React TS Angular'
        TodolistApi.createTodolist(title)
            .then((res)=> {
                setState(res.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId= 'f92f7618-5537-4504-ad76-b17728ea6e9a'
            TodolistApi.deleteTodolist(todolistId)
            .then((res)=>{
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId= 'f3dc5d2f-d16a-4d30-bb44-eda33293315f'
        const title = 'what are you doing 26.01.23?'
        TodolistApi.updateTodolistTitle({todolistId, title})
        .then((res) => {
           setState(res.data)
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}