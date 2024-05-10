import React, { Fragment } from "react";
import classes from "./AddTask.module.css";
import NewTaskForm from "./NewTaskForm";

const AddTask = (props) => {

    const onSaveHandler = (addTaskData)=>{
          props.onSaveNewTask(addTaskData);  
    }

  return (
    <Fragment>
      <div className={classes.newTaskDiv}>
        <div className={classes.heading}>Add a new task</div>
        <div className={classes.newTaskTile}>
          <NewTaskForm onSave={onSaveHandler}/>
        </div>
      </div>
    </Fragment>
  );
};

export default AddTask;
