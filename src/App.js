import React, { useState, useEffect } from "react";
import "./styles.css";

const App = () => {
  const [todo, setTodo] = useState([]);
  const [completedTodo, setCompletedTodo] = useState([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  // Fetch initial data
  const FetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/todos?limit=10");
      const data = await response.json();
      const todos = data.todos;
      setTodo(todos.filter((task) => !task.completed));
      setCompletedTodo(todos.filter((task) => task.completed));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  // Toggle task completion
  const handleToggle = (task) => {
    if (task.completed) {
      setCompletedTodo(completedTodo.filter((t) => t.id !== task.id));
      setTodo([...todo, { ...task, completed: false }]);
    } else {
      setTodo(todo.filter((t) => t.id !== task.id));
      setCompletedTodo([...completedTodo, { ...task, completed: true }]);
    }
  };

  // Delete task
  const handleDelete = (task) => {
    setTodo(todo.filter((t) => t.id !== task.id));
    setCompletedTodo(completedTodo.filter((t) => t.id !== task.id));
  };

  // Handle search input
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Filtered lists based on search input
  const filteredTodo = todo.filter((task) =>
    task.todo.toLowerCase().includes(search.toLowerCase())
  );
  const filteredCompletedTodo = completedTodo.filter((task) =>
    task.todo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="add-task">
        <input
          type="text"
          id="search-task"
          placeholder="Search a task"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div className="container">
        {/* To-Do Section */}
        <div className="todo-column">
          <h2>To-Do</h2>
          <ul id="todo-list">
            {filteredTodo.map((task) => (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task)}
                />
                {task.todo}
                <button onClick={() => handleDelete(task)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Completed Section */}
        <div className="completed-column">
          <h2>Completed</h2>
          <ul id="completed-list">
            {filteredCompletedTodo.map((task) => (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task)}
                />
                {task.todo}
                <button onClick={() => handleDelete(task)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
