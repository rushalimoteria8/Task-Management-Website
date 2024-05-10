import React from "react";
import classes from "./AddTaskButton.module.css";
import { Link, useNavigate } from "react-router-dom";

const AddTaskButton = (props) => {
  const navigate = useNavigate();

  const naviagteHandler = () =>{
      navigate('/new-task');
  };


  return (
    <div className={classes.buttonDiv}>
      <button className={classes.addTask} onClick={naviagteHandler}>
        <Link className={classes.buttonLable}>+ Add Task</Link>
      </button>
    </div>
  );
};

export default AddTaskButton;
