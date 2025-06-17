import '../App.css';
import React,{ useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, clearTodo } from '../redux/feature/todoSlice'

function TodoApp() {
    const [input, setInput] = useState('');
    const tasks = useSelector((state) => state.todos.todos);
    console.log(tasks);
    const dispatch = useDispatch();

    const handleAdd = (e) => {
        e.preventDefault();
        dispatch(addTodo(input));
        setInput('');
    }

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">📝 Redux To-Do App</h1>
            <div className="flex gap-2 mb-4">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add task..."
                    className="flex-1 p-2 border rounded"
                />
                <button onClick={handleAdd} className="bg-blue-500 text-white px-4 rounded">Add</button>
            </div>

            <ul className="space-y-2">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="p-2 border rounded flex justify-between items-center"
                    >
                        {task}
                        <button
                            onClick={() => dispatch(removeTodo(task.id))}
                            className="text-red-500"
                        >
                            ❌
                        </button>
                    </li>
                ))}
            </ul>

            {tasks.length > 0 && (
                <button
                    onClick={() => dispatch(clearTodo())}
                    className="mt-4 text-sm text-red-600 underline"
                >
                    Clear All
                </button>
            )}
        </div>
    );
}

export default React.memo(TodoApp);
