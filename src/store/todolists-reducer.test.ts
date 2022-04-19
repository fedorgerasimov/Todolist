import {ActionType, ChangeTodolistFilterAC, ChangeTodolistTitleAC, todolistsReducer} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, { type: 'REMOVE-TODOLIST', id: todolistId1})

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, { type: 'ADD-TODOLIST', title: newTodolistTitle})
    //const endState = todolistsReducer(startState, AddTodolistAC (newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});


test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
/*    const action: ActionType = {    // чтобы не подсвечивалось красным нужно протипизировать  action : ActionType
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    };*/

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(newTodolistTitle, todolistId2));
    //const endState = todolistsReducer(startState, action);
            // чтобы не подсвечивалось красным нужно протипизировать action
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

  /*  const action= {   //  переделал на Action Creator
        type: 'CHANGE-TODOLIST-FILTER' as const, // вместо : ActionType
        id: todolistId2,
        filter: newFilter
    };*/

    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(newFilter, todolistId2));
                                                              //AC = action creator заменяет нашу переменную   const action
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
