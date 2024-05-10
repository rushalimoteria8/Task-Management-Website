import React from "react";
import classes from "./OngoingTile.module.css";
import { useState } from "react";
import { RiPencilFill, RiDeleteBin5Line } from "react-icons/ri";
import ProgressBar from "./ProgressBar";
import { useNavigate } from "react-router-dom";

const BacklogTile = (props) => {
  const subtasksTotal = Object.keys(props.task.subTasks).length;
  const subtasksDone = 1;
  const progress = subtasksTotal===0?0:`${(subtasksDone / subtasksTotal) * 100}`;

  //for due date
  const date = new Date(props.task.newTask.deadline);
  const day = date.getDate();
  const month = date.toLocaleString("defualt",{month: "long"}).toUpperCase();

  const [ischecked, setIsChecked] = useState(false);

  const onCheckHandler = (e) =>{
      setIsChecked(e.target.checked);
      props.popupHandler(!ischecked, props.task);
  }

    /////////////////////////////////////////////
    const deleteHandler = () => {
      deleteTask(props.task);
  
    }
  
    const deleteTask = async (task) => {
      try{
          const res = await fetch(`/tasks/delete?id=${task._id}`,{
            method: 'DELETE',
            headers: {"content-type": "application/json"},
          });
  
          const data = await res.json();
          console.log('task deleted', data);
  
        }catch(error){
          console.log(error);
        }
  
        window.location.reload();
  
  };

  ///edit task
  const navigate = useNavigate();

  const EditTaskNaviagtion = () => {
    navigate(`/tasks/${props.task._id}`);
  };

  return (
    <div className={classes.tile}>
      <div style={{height:'230px'}}className={classes.tileBody}>
        <div className={classes.tileHeader}>
          <div className={classes.taskName}>{props.task.newTask.taskTitle}</div>
          <div className={classes.options}>
            <div className={classes.priorityBox}>Priority: {props.task.tasksettings.priority}</div>
            <RiPencilFill onClick={EditTaskNaviagtion} className={classes.optionIcon} />
            <RiDeleteBin5Line onClick={deleteHandler} className={classes.optionIcon} />
          </div>
        </div>
        <div className={classes.bodyTitle}>Progress:</div>
        <div className={classes.bodyTitle}>
          <ProgressBar progress={progress}></ProgressBar>
        </div>
        <div className={classes.bodyTitle}>
          Sub-tasks done: {subtasksDone}/{subtasksTotal}
        </div>
        <div className={classes.bodyTitle}>Rewards: {props.task.tasksettings.reward==""?<>No rewards</>:<>{props.task.tasksettings.reward}</>}</div>
        <div className={classes.dueDate}>DUE DATE: {day} {month}</div>
        
        <div className={classes.completedCheckBox}>
          <input
            type="checkbox"
            name="completed"
            id="completed"
            value="isCompleted"
            className={classes.checkBox}
            onChange={onCheckHandler}
          />
          <label for="completed" className={classes.checkBoxLabel}>Mark as completed</label>
        </div>
      </div>
    </div>
  );
};

export default BacklogTile;
