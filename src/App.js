import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddTask from "./addTask";
import TaskManager from "./taskManager";
import TaskList from "./taskList";
import Signup from "./signup";
import Login from "./login";
import WebSocketTest from './WebSocketTest';

function AppBar() {
  const appBarStyles = {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      marginRight: '15px',
      fontSize: '16px',
    },
    linkActive: {
      fontWeight: 'bold',
    }
  };

  return (
    <div style={appBarStyles.container}>
      <div>
        <Link to="/" style={appBarStyles.link}>Home</Link>
        <Link to="/signup" style={appBarStyles.link}>Signup</Link>
        <Link to="/login" style={appBarStyles.link}>Login</Link>
      </div>
      <div style={{display:'flex', justifyContent:'center'}}>
        <h1>Task Management App</h1>
      </div>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [existingUser, setExistingUser] = useState(null);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (updatedTask) => {
    setTasks(tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const handleSignup = (newUser) => {
    setUser(newUser);
  };

  const handleLogin = (existingUser) => {
    setExistingUser(existingUser);
  };

  const handleUpdateTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleEditClick = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit) {
      // Logic for editing the task
      console.log("Edit task:", taskToEdit);
    }
  };

  return (
    <Router>
      <AppBar />
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Routes>
          <Route path="/" element={
            user || existingUser ? (
              <div>
                <AddTask onTaskAdded={handleTaskAdded} />
                <TaskList
                  tasks={tasks}
                  onUpdate={handleUpdateTask}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditClick}
                />
                <TaskManager tasks={tasks} onEditTask={handleEditTask} />
              </div>
            ) : (
              <div>
                <p>Please log in or sign up to access the app.</p>
              </div>
            )
          } />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </div>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <WebSocketTest />
      </div>
    </Router>
  );
}

export default App;
