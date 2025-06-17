import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import './App.css';

const ProductsLists = lazy(() => import('./pages/ProductsLists'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<ProductsLists />} />
            <Route
              path="/product/:id"
              element={
                <PrivateRoute>
                  <ProductDetails />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
