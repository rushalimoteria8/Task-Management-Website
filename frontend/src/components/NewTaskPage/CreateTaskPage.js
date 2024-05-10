import React, { Fragment, useRef, useState } from "react";
import AddTask from "./AddTask";
import AddSubtask from "./AddSubtask";
import Header from "../Header";
import TaskSettings from "./TaskSettings";
import SaveButton from "./SaveButton";
import ScrollTop from "../ScrollTop";


import classes from "./SaveButton.module.css";
import { Link } from "react-router-dom";

const CreateTaskPage = (props) => {

  const createTask = useRef({
    newTask: "",
    subTasks: "",
    tasksettings: "",
    completed: "no"
  });

  const [startDate, setStartDate] = useState("");

  const createNewTaskHandler = (newtask) => {
    const {startDate} = newtask;
    setStartDate(startDate);
    createTask.current["newTask"] = newtask;
    console.log("from create task page");
    console.log(newtask);
  };

  const createSubtaskHandler = (subtasks) => {
    createTask.current["subTasks"] = subtasks;
    console.log("from create task page");
    console.log(subtasks);
  };

  const taskSettingsHandler = (tasksettings) => {
    createTask.current["tasksettings"] = tasksettings;
    console.log("from create task page");
    console.log(tasksettings);
  };

  const createTaskHandler = async () => {
    let obj = createTask.current;
    console.log(obj);

    const token = localStorage.getItem('token');

    const res = await fetch('/addTask',{
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(
            obj
        )
    });

        if(res.ok){
            console.log('data sent successfully');
        }else{
            console.log('error sending data')
        }

  };


  return (
    <Fragment>
      <Header />
      <AddTask onSaveNewTask={createNewTaskHandler}/>
      <AddSubtask onSaveSubtask={createSubtaskHandler} sendDate={startDate}/>
      <TaskSettings onSaveTaskSettings={taskSettingsHandler} />
      <div className={classes["save-button-div"]}>
        <button className={classes["save-button"]} onClick={createTaskHandler}>
          <Link className={classes["save-button-text"]}>Create Task</Link>
        </button>
      </div>
      <ScrollTop />
    </Fragment>
  );
};

export default CreateTaskPage;
