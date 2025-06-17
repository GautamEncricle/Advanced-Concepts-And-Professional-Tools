import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/login">Go to Login</Link> |{' '}
        <Link to="/product/1">Go to Product Details (ID: 1)</Link>
      </nav>
    </div>
  );
}

export default Home;
