import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../feature/todoSlice'
import productReducer from '../feature/productSlice'

const store = configureStore({
    reducer: {
        todos: todoReducer,
        products: productReducer
    }
})

export default store;