import React, { Fragment} from "react";
import classes from "../NewTaskPage/AddTask.module.css";
import EditTaskForm from "./EditTaskForm";

const EditTask = (props) => {

    const onSaveHandler = (editTaskData)=>{
          props.onSaveEditTask(editTaskData);  
    }

  return (
    <Fragment>
      <div className={classes.newTaskDiv}>
        <div className={classes.heading}>Edit Task</div>
        <div className={classes.newTaskTile}>
          <EditTaskForm onSave={onSaveHandler} task={props.task}/>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTask;