import React, { useEffect, useRef, useState } from "react";
import Header from '../Header';
import Stats from "./Stats";
import {Fragment } from 'react';
import OngoingTasksHome from "./OngoingTasksHome";
import PendingTasksHome from "./PendingTasksHome";
import AddTaskButton from "../AddTaskButton";
import ScrollTop from "../ScrollTop";
import Popup from "./Popup";

const HomePage = props =>{

    const [fetching, setFetching] = useState(false);
    const [trigger,setTrigger] = useState(false);
    const [completedTask, setCompletedTask] = useState({});


    const [backlogTasks, setBacklogTasks] = useState([]);
    const [upcomingTasks, setUpcomingTasks] = useState([]);
    const [ongoingTasks, setOngoingTasks] = useState([]);
    const [Tasks, setTasks] = useState([]);
    const [completedtasks, setCompletedTasks] = useState(0);
    const totalTasks = useRef(0);
    const totalBacklog = useRef(0);

    /////////////////////////////////////
    useEffect(()=>{
        fetchtasks();
    },[trigger]);


    const fetchtasks = async ()=>{
        setFetching(false);
        try{
            const token = localStorage.getItem('token');

            const res = await fetch('/tasks',{
            method:'GET',
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        const tasks = await res.json();

        setTasks(tasks);
        
        totalTasks.current = tasks.length;
        const backlog = [];
        const upcoming = [];
        const ongoing = [];
        const currentDate = new Date();


        tasks.forEach((task)=>{
            if(task.completed==="no"){
            if(new Date(task.newTask.deadline)<currentDate){
                backlog.push(task);
            }
            else if(new Date(task.newTask.startDate)>currentDate){
                upcoming.push(task);
            }
            else if(new Date(task.newTask.startDate)<=currentDate){
                ongoing.push(task);
            }}
            else{
                setCompletedTasks((prev)=>prev+1);
            }
        });

        setBacklogTasks(backlog);
        setOngoingTasks(ongoing);
        setUpcomingTasks(upcoming);
        totalBacklog.current=backlog.length;

        setFetching(true);

        }
        catch(e){
            console.log(e);
        }
    };
    ///////////////////////////////////

    const popupHandler = (ischecked, task)=>{
        if(ischecked===true){
            setTrigger(true);
            setCompletedTask(task);
        }
        
    };

    const optionandler = (option) =>{
        if(option === true){
            updateCompleted(completedTask);
        }
        window.location.reload();
        
    };

  const updateCompleted = async (task) =>{

    try{
    const res = await fetch(`/completed?id=${task._id}`,{
      method: 'PUT',
      headers: {"content-type": "application/json"},
    });

    const data = await res.json();
    console.log('task updated',data);
  }catch(error){
    console.log(error);
  }

  window.location.reload();
 
};

    

    return(
        (fetching==true) ? <Fragment>
        <Header></Header>
        <Popup trigger={trigger} optionHandler={optionandler} page='homepage'></Popup>
        <Stats totalTasks={totalTasks.current} totalBacklog={totalBacklog.current} tasks={Tasks} completedtasks={completedtasks}></Stats>

        <OngoingTasksHome button={true} ongoingTasks={ongoingTasks} popupHandler={popupHandler}/>
        <PendingTasksHome button={true} upcomingTasks={upcomingTasks}/>
        <AddTaskButton/>
        <ScrollTop/>
        </Fragment>: <>Fetching data</>
    );
}

export default HomePage;
