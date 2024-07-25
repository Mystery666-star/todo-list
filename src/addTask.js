import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Container, Typography, Box } from '@mui/material';

const AddTask = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [id, setID] = useState();
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  let count = 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = {
      title,
      id,
      description,
      category,
      dueDate,
      completed: false,
    };
    
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        const newTask = await response.json();
        onTaskAdded(newTask);
        setTitle('');
        setDescription('');
        setCategory('');
        setDueDate('');
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add task');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error: Unable to add task');
    }
    
    count++;
    setID(count);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          borderRadius: 1,
          boxShadow: 3,
          backgroundColor: '#fff'
        }}
      >
        <Typography variant="h5">Add Task</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3, width: '100%' }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            multiline
            rows={4}
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="Work">Work</MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>
              <MenuItem value="Shopping">Shopping</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            fullWidth
            type="date"
            label="Due Date"
            InputLabelProps={{ shrink: true }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddTask;
