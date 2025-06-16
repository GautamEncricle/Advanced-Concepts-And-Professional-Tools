import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(API);
            return await response.json();
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    })

const initialState = {
    products: [],
    error: null,
    loading: true,
}
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default productSlice.reducer;