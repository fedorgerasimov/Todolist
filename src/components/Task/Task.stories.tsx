import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";


export default {
    title: 'TODOLIST/Task',
    component: Task,
    /*args: { //args = props
        removeTask: action("removeTask"),
        changeTaskStatus: action("changeTaskStatus"),
        changeTaskTitle: action("changeTaskTitle"),
    }*/

} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState({id: "1", title: "JS", isDone: true}) // создали локальный стейт для возможности контролировать чекбокс
   return <Task                                                                     // в StoryBook
            task={task}
            changeTaskStatus = {()=> setTask({...task, isDone: !task.isDone})}
            changeTaskTitle={(taskID: string, title: string) => setTask({...task, title: title})}
            removeTask={action("removeTask")}
   />;
}

export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
    task: {id: "1", title: "JS", isDone: true},
};
export const TaskIsNotDone = Template.bind({});
TaskIsNotDone.args = {
    task: {id: "2", title: "React", isDone: false},
};
