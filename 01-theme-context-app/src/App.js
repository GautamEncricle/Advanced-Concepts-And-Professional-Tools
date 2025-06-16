// src/App.js
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import CounterA from './CounterA';

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const styles = {
    backgroundColor: theme === "light" ? "#fff" : "#222",
    color: theme === "light" ? "#000" : "#fff",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  };

  return (
    <div style={styles}>
      <h1>{theme === "light" ? "🌞 Light Theme" : "🌙 Dark Theme"}</h1>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
      <CounterA />
    </div>
  );
}

export default App;
