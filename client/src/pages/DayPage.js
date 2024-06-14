import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Grid, Box, Typography, Container } from '@mui/material';

const DayPage = ({ dayOfWeek }) => {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/tasks/${dayOfWeek}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          console.error('Error loading tasks:', response.statusText);
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };

    fetchTasks();
  }, [dayOfWeek]);

  const handleAddTask = async (name, dayOfWeek) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, dayOfWeek }),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
      } else {
        console.error('Error adding task:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleRemoveTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setTasks(tasks.filter(task => task.id !== taskId));
      } else {
        console.error('Error removing task:', response.statusText);
      }
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Good Night, Diogo.
        </Typography>
        <Typography variant="h6" gutterBottom>
          This is your private space
        </Typography>
        <Typography variant="h2" gutterBottom>
          18
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Join video meetings with one tap
        </Typography>
        <Typography variant="body2" gutterBottom color="primary">
          Connect Google Calendar • Connect Outlook Calendar
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        {tasks.map((task) => (
          <Grid item xs={12} key={task.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{task.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  My lists &gt; Personal
                </Typography>
                <Button variant="contained" color="secondary" onClick={() => handleRemoveTask(task.id)}>
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleAddTask(taskName, dayOfWeek);
          setTaskName('');
        }}>
          <TextField
            label="Enter new task"
            variant="outlined"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
            sx={{ mr: 2 }}
          />
          <Button variant="contained" type="submit" style={{ backgroundColor: '#FA7070' }}>
            Add Task
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default DayPage;
