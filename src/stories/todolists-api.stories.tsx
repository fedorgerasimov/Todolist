import React, {useEffect, useState} from 'react'
import axios from "axios";
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
        TodolistApi.createTodolists('new Todolist 24.01.2023')
            .then((res)=> {
                setState(res.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId= '3ee5daec-0c3d-43e0-a194-dd514161bd50'
            TodolistApi.deleteTodolists(todolistId)
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
        TodolistApi.updateTodolists(todolistId,'how are you feeling?')
        .then((res) => {
           setState(res.data)
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}