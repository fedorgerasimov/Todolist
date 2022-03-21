import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import {FullInput} from "./components/Fullinput";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilterHandler: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("") // для хранения данных с inputa

    const addTaskHandler = () => {       // функция связывается с addTask в App
        props.addTask(title);     // и уже в App в функции addTask происходит добавление новой таски
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { // функция получает значение которое ввели в input
        setTitle(e.currentTarget.value)                          // с помощью event.currentTarget.value
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => { // функция при нажатии на enter
        if (e.key === 'Enter') {                             // вызывает функцию addTask, которая вызывается выше (добавляет таску)
            addTaskHandler();
        }
    }
    { /* const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");*/} {/*-функции для кнопок варианта № 1*/}
    const changeFilterHandler = (FilterValues: FilterValuesType) =>   // универсальная функция для вместо ClickHandler
        props.changeFilterHandler(FilterValues)


    const onClickButtonHandler = (tID: string) => {props.removeTask(tID)}  // вынесли функцию на верх из метода MAP


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            {/*
            <Input title={title} setTitle={setTitle} callback={addTaskHandler}/>*/} {/*сделал универсальный input*/}
            <button onClick={addTaskHandler}>+</button>
           {/*
           <Button callback={() => addTaskHandler()} name={'x'}/> */}{/*сделал универсальную кнопку*/}

           {/*
             <FullInput callback={props.addTask}/>*/}   {/*FullInput*/}

        </div>
        <ul>
            {props.tasks.map(t => {
                const onClickButtonHandler = () => props.removeTask(t.id)
                return <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={onClickButtonHandler}>x</button>  {/*без универсальной кнопки*/}
                    {/*
                    <Button callback={onClickButtonHandler} name={'x'} />*/}   {/*применили универсальную кнопку*/}
                     {/*
                     <Button callback={() => onClickButtonHandler(t.id)} name={'x'}/>*/} {/* можно вынести над return и закомментировать props.removeTask(t.id)*/}
                </li>
            })
            }
        </ul>
        <div>
            <Button callback={() => changeFilterHandler('all')} name={'All'}/> {/*- 3 вариант: универсальная кнопка + 2 вариант*/}
            <Button callback={() => changeFilterHandler('active')} name={'Active'}/>
            <Button callback={() => changeFilterHandler('completed')}name={'Completed'}/>

            {/* <button onClick={() =>changeFilterHandler ('all')}>All</button>
              <button onClick={() =>changeFilterHandler ('active')}>Active</button>
              <button onClick={() =>changeFilterHandler ('completed')}>Completed</button>*/} {/*-второй вариант сделали универсальную функцию для кнопок*/}

            {/*<button onClick={ onAllClickHandler}>All</button>
             <button onClick={ onActiveClickHandler }>Active</button>
            <button onClick={ onCompletedClickHandler }>Completed</button>*/} {/*-самый первый и простой вариант кнопок*/}
        </div>
    </div>
}
