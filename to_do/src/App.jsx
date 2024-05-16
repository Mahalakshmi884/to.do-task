import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const addTodo = (name, description) => {
    const newTodo = {
      id: Date.now(),
      name,
      description,
      status: 'not completed',
    };
    setTodos([...todos, newTodo]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName && taskDescription) {
      addTodo(taskName, taskDescription);
      setTaskName('');
      setTaskDescription('');
    }
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.status === 'completed';
    if (filter === 'notCompleted') return todo.status === 'not completed';
    return true;
  });

  return (
    <div className="app">
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          required
        />
        <button type="submit">Add Todo</button>
      </form>
      <div>
        <label htmlFor="filter">Filter:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not Completed</option>
        </select>
      </div>
      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <div key={todo.id} className="todo-card">
            <div className="details">
              <h3>{todo.name}</h3>
              <p>{todo.description}</p>
            </div>
            <div className="actions">
              <select
                className="status"
                value={todo.status}
                onChange={(e) => {
                  const updatedTodo = { ...todo, status: e.target.value };
                  updateTodo(todo.id, updatedTodo);
                }}
              >
                <option value="not completed">Not Completed</option>
                <option value="completed">Completed</option>
              </select>
              <button onClick={() => {
                const newName = prompt('Enter new task name', todo.name);
                const newDescription = prompt('Enter new task description', todo.description);
                if (newName && newDescription) {
                  const updatedTodo = { ...todo, name: newName, description: newDescription };
                  updateTodo(todo.id, updatedTodo);
                }
              }}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
