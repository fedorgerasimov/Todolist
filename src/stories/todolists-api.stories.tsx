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
        TodolistApi.createTodolist('new Todolist 24.01.2023')
            .then((res)=> {
                setState(res.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId= 'fe21190d-a60c-46fa-a7b2-2cad01d2d65f'
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
        const todolistId= '1131ae15-a0d8-43dd-9b85-34a61f515d1d'
        const title = 'how are you feeling?'
        TodolistApi.updateTodolistTitle({todolistId, title})
        .then((res) => {
           setState(res.data)
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}