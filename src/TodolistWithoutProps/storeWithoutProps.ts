
import {combineReducers, legacy_createStore as createStore} from 'redux';
import {tasksReducerWP} from "./tasks-reducer-withoutprops";
import {todolistsReducerWP} from "./todolists-reducer-withoutprops";
// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducerWP = combineReducers({
    tasks: tasksReducerWP,
    todoLists: todolistsReducerWP,
})
// Непосредственно создаём store, это объект. Пример что включает, расписал внизу
export const storeWP = createStore(rootReducerWP);

// определить автоматически тип всего объекта состояния
export type AppRootStateTypeWP = ReturnType<typeof rootReducerWP>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = storeWP;

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
