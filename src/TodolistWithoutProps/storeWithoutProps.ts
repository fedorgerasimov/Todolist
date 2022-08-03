
import {combineReducers, legacy_createStore as createStore} from 'redux';
import {tasksReducer} from "./tasks-reducer-withoutprops";
import {todolistsReducer} from "./todolists-reducer-withoutprops";
// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})
// Непосредственно создаём store, это объект. Пример что включает, расписал внизу
export const store = createStore(rootReducer);

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
