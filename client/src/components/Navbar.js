import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
        <AppBar position="static" style={{ backgroundColor: '#C6EBC5', height: '60px' }}>
        <Toolbar style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" style={{ color: '#FA7070', fontWeight: 'bold', fontFamily: 'cursive' }}>
            <Link to="/tasks" style={{ textDecoration: 'none', color: 'inherit' }}>
            better-routine
            </Link>
            </Typography>
        </Toolbar>
        </AppBar>
  );
};

export default Navbar;