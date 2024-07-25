import React from "react";

const TaskList = ({ onUpdate, onDelete, tasks, onEdit }) => {
  // Inline styles
  const styles = {
    listContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
    },
    listItem: {
      backgroundColor: '#f9f9f9',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      margin: '10px 0',
      width: '100%',
      maxWidth: '600px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      margin: '0 0 10px',
    },
    description: {
      margin: '0 0 10px',
      color: '#555',
    },
    category: {
      margin: '0 0 10px',
      color: '#007bff',
    },
    dueDate: {
      margin: '0 0 10px',
      color: '#888',
    },
    button: {
      backgroundColor: '#007bff',
      border: 'none',
      color: '#fff',
      padding: '10px 15px',
      margin: '5px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background-color 0.3s',
    },
    buttonDelete: {
      backgroundColor: '#dc3545',
    },
    buttonEdit: {
      backgroundColor: '#28a745',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div style={styles.listContainer}>
      {tasks.map((task) => (
        <div key={task.id} style={styles.listItem}>
          <h3 style={styles.title}>{task.title}</h3>
          <p style={styles.description}>Description: {task.description}</p>
          <p style={styles.category}>Category: {task.category}</p>
          <p style={styles.dueDate}>Due Date: {task.dueDate}</p>
          <button
            style={styles.button}
            onClick={() => onUpdate(task.id)}
          >
            Toggle Complete
          </button>
          <button
            style={{ ...styles.button, ...styles.buttonDelete }}
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
          <button
            style={{ ...styles.button, ...styles.buttonEdit }}
            onClick={() => onEdit(task.id)}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
