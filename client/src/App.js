import './App.css';
import { createBrowserRouter,  RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import TasksPage from './pages/TasksPage.js';
<<<<<<< HEAD
import DayPage from './pages/DayPage.js';

const router = createBrowserRouter([
  { path: '/', element: <HomePage />},
  { path: '/tasks', element: <TasksPage /> },
  { path: '/myday', element: <DayPage />}
=======

const router = createBrowserRouter([
  { path: '/', element: <HomePage />},
  { path: '/tasks', element: <TasksPage /> }
>>>>>>> recovery-branch
])

function App() {
  return (
    <RouterProvider  router={router} />
  );
}

export default App;
