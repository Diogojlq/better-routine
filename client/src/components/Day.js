// Day.js
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Button from '@mui/material/Button';
import TaskList from './TaskList';
import Card from '@mui/material/Card';

const Day = ({ dayOfWeek }) => {
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
    <Card sx={{ maxWidth: 500 }}>
      <div className="day">
        <h3>{dayOfWeek}</h3>
        <Form onSubmit={(e) => {
          e.preventDefault();
          handleAddTask(taskName, dayOfWeek);
          setTaskName('');
        }}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter new task"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="contained" type="submit" style={{ margin: 10, backgroundColor: '#FA7070'}}>
            Add Task
          </Button>
        </Form>
        <TaskList tasks={tasks} onRemoveTask={handleRemoveTask} />
      </div>
    </Card>
  );
};

export default Day;
