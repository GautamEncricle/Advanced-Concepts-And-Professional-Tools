import React from 'react'
import useCounter from './hooks/useCounter'
import { ThemeContext } from './ThemeContext';

function CounterA() {
    const { theme, toggleTheme } = React.useContext(ThemeContext);
    const { count, increment, decrement, reset } = useCounter(0, 5)

    const styles = {
        backgroundColor: theme === "light" ? "#f0f0f0" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        padding: "20px",
        borderRadius: "5px",
        textAlign: "center",
        margin: "20px",
    }

    return (
        <div style={styles}>
            <h2>Counter A</h2>
            <p>Count: {count}</p>
            <button onClick={increment} className='btn'>Increment</button>
            <button onClick={decrement} className='btn'>Decrement</button>
            <button onClick={reset} className='btn'>Reset</button>
        </div>
    )
}

export default CounterA