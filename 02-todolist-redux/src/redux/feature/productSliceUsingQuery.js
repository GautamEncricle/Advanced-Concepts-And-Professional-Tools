import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const fetchProducts = createApi({
    reducerPath: 'fetchProducts',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/products' }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/'
        }),
    })
})

export const { useGetProductsQuery } = fetchProducts