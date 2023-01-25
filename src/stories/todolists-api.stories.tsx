import React, {useEffect, useState} from 'react'
import {TodolistApi} from "../api/todolist-api";

export default {
    title: 'API',
    headers: {
        'API-KEY': '9bcff6d4-9258-4e23-8719-879999ad9a5c'
    }
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
        const title = 'new project 25.01'
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
        const todolistId= 'b0d7e4e5-520b-4cce-bafb-42f21d740483'
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
        const todolistId= '793ef4d5-5c8d-4bac-8965-50fccb3c3de9'
        const title = 'how are you feeling?'
        TodolistApi.updateTodolistTitle({todolistId, title})
        .then((res) => {
           setState(res.data)
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}