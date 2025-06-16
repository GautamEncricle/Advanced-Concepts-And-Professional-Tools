// App.jsx
import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AuthLayout from "./routes/AuthLayout";
import Signup from './pages/SignUp';
import BlogView from './pages/BlogView';
import BlogCreate from './pages/BlogCreate';
import BlogUpdate from './pages/BlogUpdate';
import { useFetchUserQuery } from './redux/apiSlice';

function App() {
  const { isLoading} = useFetchUserQuery();

  if (isLoading) {
    return <p>Loading user data...</p>;
  }



  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<AuthLayout />}>
        <Route path="/blogs" element={<BlogView />} />
        <Route path="/blog-create" element={<BlogCreate />} />
        <Route path="/blog/update/:id" element={<BlogUpdate />} />
      </Route>
    </Routes>
  );
}

// Note: LoginWithAuth is removed because setUser from context is no longer used.
// Instead, Login component will use RTK Query hooks or Redux dispatch for login.

export default App;
