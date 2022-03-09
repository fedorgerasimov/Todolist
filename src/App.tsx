import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    let [tasks1, setTasks1] = useState( [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "NodeJS", isDone: false }
    ])
    const removedTask = (NewId:number) => {
        let filtered = tasks1.filter(el=>el.id !== NewId)
        setTasks1(filtered)
    }

    let [valueButton, setValueButton] = useState( "All")
    const tasksFiler = (filterValue:string) => {
        setValueButton(filterValue)
    }
    let prokladka = tasks1
    if (valueButton === "Active") {
        prokladka = tasks1.filter(el=> el.isDone === false)
    }
    if (valueButton === "Completed") {
        prokladka = tasks1.filter(el=> el.isDone === true)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={prokladka}
                      removedTask = {removedTask}
                      tasksFilter={tasksFiler}
            />
        </div>
    );
}

export default App;
