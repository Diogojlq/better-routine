const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('./passport-config');
require("dotenv").config();

app.use(passport.initialize()); 
app.use(cors());
app.use(bodyParser.json());

const registerRouter = require('./routes/register/register.router');
const loginRouter = require('./routes/login/login.router');
const tasksRouter = require('./routes/tasks/tasks.router')


app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/register', registerRouter )
app.use('/login', loginRouter)
app.use('/tasks', tasksRouter)

module.exports = app;