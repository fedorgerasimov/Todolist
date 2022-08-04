import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';
import {combineReducers, compose, legacy_createStore as createStore} from 'redux';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Непосредственно создаём store, это объект. Пример что включает, расписал внизу
export const store = createStore(rootReducer, composeEnhancers());

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

/*
const store = {
    state: {
        tasks: {},
        todoLists: [],
    },
    getState()
    dispatch()
    subscribe
}*/
