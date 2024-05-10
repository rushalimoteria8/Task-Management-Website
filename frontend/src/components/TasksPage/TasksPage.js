import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import Header from "../Header";
import OngoingTasksHome from "../HomePage/OngoingTasksHome";
import PendingTasksHome from "../HomePage/PendingTasksHome";
import BacklogTasks from "../HomePage/BacklogTasks";
import AddTaskButton from "../AddTaskButton";
import ScrollTop from "../ScrollTop";
import Popup from "../HomePage/Popup";

const TasksPage = (props) => {
  const [trigger, setTrigger] = useState(false);
  const [completedTask, setCompletedTask] = useState({});

  const [backlogTasks, setBacklogTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  ///////////////////////////////////////
  useEffect(() => {
    fetchtasks();
  }, []);

  const fetchtasks = async () => {
    try {
      setIsLoading(true); 
      const token = localStorage.getItem('token');
      const res = await fetch("/tasks",{
        method:'GET',
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
      const tasks = await res.json();

      const backlog = [];
      const upcoming = [];
      const ongoing = [];
      const currentDate = new Date();

      tasks.forEach((task) => {
        if(task.completed=="no"){
        if (new Date(task.newTask.deadline) < currentDate) {
          backlog.push(task);
        } else if (new Date(task.newTask.startDate) > currentDate) {
          upcoming.push(task);
        } else if (new Date(task.newTask.startDate) <= currentDate) {
          ongoing.push(task);
        }}
      });

      setBacklogTasks(backlog);
      setOngoingTasks(ongoing);
      setUpcomingTasks(upcoming);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  ////////////////////////////////////////////////

  const popupHandler = (ischecked, task) => {
    if (ischecked == true) {
      setTrigger(true);
      setCompletedTask(task);
    }
  };

  const optionandler = (option) => {
    if (option == true) {
      updateCompleted(completedTask);
    }
        setTrigger(false);
        window.location.reload();
  };

  const updateCompleted = async (task) => {
    try {
      const res = await fetch(`/completed?id=${task._id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
      });

      const data = await res.json();
      console.log("task updated", data);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  return (
    <Fragment>
      {isloading ? (
        <>Loading..</>
      ) : (
        <div style={{ paddingTop: "3%", backgroundColor: "#e0dff6" }}>
          <Header />
          <Popup trigger={trigger} optionHandler={optionandler} page='tasks'></Popup>
          <OngoingTasksHome button={false} ongoingTasks={ongoingTasks}  popupHandler={popupHandler}/>
          <PendingTasksHome button={false} upcomingTasks={upcomingTasks} />
          <BacklogTasks button={false} backlogTasks={backlogTasks} popupHandler={popupHandler}/>
          <AddTaskButton />
          <ScrollTop />
        </div>
      )}
    </Fragment>
  );
};

export default TasksPage;
