import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {ReduxStoreProviderDecorator} from "../../store/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {TaskWithoutProps} from "./TaskWithoutProps";
import {AppRootStateType} from "../../store/store";
import {TaskType} from "../Todolist";


export default {
    title: 'TODOLIST/TaskWithoutProps',
    component: TaskWithoutProps,
    decorators: [ReduxStoreProviderDecorator]

} as ComponentMeta<typeof TaskWithoutProps>;

const TaskWithRedux = () => {
    const task =useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    return <TaskWithoutProps task={task} todolistID={'todolistId1'}/>
}

const Template: ComponentStory<typeof TaskWithoutProps> = (args) => {
    return <TaskWithRedux/>
}

export const TaskWithReduxExample = Template.bind({})
