import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL + '/api/v1',
    credentials: 'include', // Include cookies in the request
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Blog'],
  endpoints: (builder) => ({ //builder is a function that returns an object containing the endpoints

    fetchUser: builder.query({
      query: () => 'auth/protect/testing',
      providesTags: ['User'],
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        //onQueryStarted is a lifecycle hook provided by RTK Query.
        //It is triggered as soon as the mutation is initiated.
        // It receives:
        //arg: the same argument that was passed to the mutation(in this case, credentials).
        // { dispatch, queryFulfilled }: useful helpers to interact with the store and handle async logic.

        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('token', data.token);
          dispatch(apiSlice.util.invalidateTags(['User']));
        } catch (error) {
          console.error('Login error:', error);
        }
      },
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: 'auth/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
    fetchBlogs: builder.query({
      query: () => 'blog/',
      transformResponse: (response) => response.blogs,
      providesTags: ['Blog'],
    }),
    fetchBlogById: builder.query({
      query: (id) => `blog/getAll/${id}`,
      providesTags: ['Blog'],
    }),
    createBlog: builder.mutation({
      query: (newBlog) => ({
        url: 'blog/create',
        method: 'POST',
        body: newBlog,
      }),
      invalidatesTags: ['Blog'],
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `blog/update/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Blog'],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `blog/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
});

const initialAuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(apiSlice.endpoints.fetchUser.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addMatcher(apiSlice.endpoints.login.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(apiSlice.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
      })
      .addMatcher(apiSlice.endpoints.login.matchRejected, (state) => {
        state.loading = false;
      })
      .addMatcher(apiSlice.endpoints.signup.matchFulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export const {
  useFetchUserQuery,
  useLoginMutation,
  useSignupMutation,
  useFetchBlogsQuery,
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
  useFetchBlogByIdQuery,
} = apiSlice;

export const authReducer = authSlice.reducer;
export default apiSlice.reducer;