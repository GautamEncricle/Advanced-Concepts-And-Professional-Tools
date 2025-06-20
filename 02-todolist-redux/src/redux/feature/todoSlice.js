import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    todos: []
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        clearTodo: (state, action) => {
            state.todos = []
        }
    }
})

export const { addTodo, removeTodo, clearTodo } = todoSlice.actions;
export default todoSlice.reducer;