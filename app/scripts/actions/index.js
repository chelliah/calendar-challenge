/*
* actions are payloads of info that send data
* from your application to your store.
* they are the ONLY sorce of information for the store
* you send them to the store using store.dispatch()
 * */
let nextTodoId = 0;

/*
 * actions are plain javascript objects
 * must have a type property indicating the action
 *
 * */
export const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
    }
}

export const setVisibilityFilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
}

export const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    }
}
