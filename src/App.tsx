import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    const [tasks1, setTasks1] = useState( [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])
    const removedTask = (id:number) => {
        let filtered = tasks1.filter(el=>el.id !== id)
        setTasks1(filtered)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks1}
                      removedTask = {removedTask}
            />
        </div>
    );
}

export default App;
