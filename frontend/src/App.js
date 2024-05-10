import React from 'react';
import LandingPage from './components/LandingPage/LandingPage'
import HomePage from './components/HomePage/HomePage';

import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import TasksPage from './components/TasksPage/TasksPage'
import PomodoroPage from './components/PomodoroPage/PomodoroPage';
import CreateTaskPage from './components/NewTaskPage/CreateTaskPage';
import SignupPage from './components/SignUpPage/SignupPage';
import LoginPage from './components/LoginPage/LoginPage';
import UserProfilePage from './components/UserProfilePage/UserProfilePage';
import TaskDetailsPage from './components/TasksPage/TaskDetailsPage';
import { AuthProvider } from './components/AuthContext';


const route = createBrowserRouter([
  {path: '/', element: <LandingPage />},
  {path: '/homepage', element: <HomePage/>},
  {path:'/tasks', element: <TasksPage/>},
  {path: '/pomodoro', element: <PomodoroPage/>},
  {path: '/new-task', element: <CreateTaskPage/>},
  {path: '/sign-up', element: <SignupPage/>},
  {path: '/login', element: <LoginPage/>},
  {path: '/user-profile', element: <UserProfilePage/>},
  {path: '/tasks/:id', element:<TaskDetailsPage/>},
]);

function App(){

  return (

    <RouterProvider router={route}>
      <AuthProvider></AuthProvider>
    </RouterProvider>


  );
  

}

export default App;