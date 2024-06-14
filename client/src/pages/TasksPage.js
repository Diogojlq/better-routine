import React from 'react';
import { Typography, Grid, Button, Container } from '@mui/material';
import Day from './../components/Day';
import Navbar from './../components/Navbar';
import Drawer from './../components/Drawer';

const TaskPage = () => {
  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];
  
  const handleDeleteAllTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      console.log("userid")
      const response = await fetch(`http://localhost:3001/tasks/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Error deleting tasks:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting tasks:', error);
    }
  };

  return (
    <>
    <Drawer />
    <Navbar />
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#FEFDED' }}>
      <div style={{ maxWidth: 1000, width: '100%' }}>
        <Typography variant="h4" gutterBottom style={{ marginBottom: 20, color:'#FA7070', fontWeight: 'bold', fontFamily: 'cursive' }}>
          Tasks Page
        </Typography>
        <Grid container spacing={2} style={{ marginTop: 20 }}>
          {daysOfWeek.map((day, index) => (
            <Grid item xs={4} key={index}>
              <Container>
              <div style={{ border: '5px solid #FA7070', padding: 10, textAlign: 'center', borderRadius: 8 }}>
                <Day dayOfWeek={day} />
              </div>
              </Container>
            </Grid>
          ))}
        </Grid>
        <Button variant="contained" onClick={handleDeleteAllTasks} style={{ border: '5px solid #A1C398', padding: 20, margin: 15, backgroundColor: '#A1C398' }}>
          Delete All Tasks
        </Button>
      </div>
    </div>
    </>
  );
};

export default TaskPage;
