import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../feature/productSlice'

const store = configureStore({
    reducer: {
        products: productReducer
    }
})

export default store;