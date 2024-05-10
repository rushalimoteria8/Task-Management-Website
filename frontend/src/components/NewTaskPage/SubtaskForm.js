import React, { useState } from "react";
import styles from "./NewTaskForm.module.css";
import classes from "./SubtaskForm.module.css";

const SubtaskForm = (props) => {
  
  const [subformErrors,setsubFormErrors] = useState({})
  const [subtask, setSubtask] = useState({
    id: `subtask`,
    SubTaskTitle: "",
    SubTaskStartDate: "",
    SubTaskStartTime: "",
    SubTaskDays: "0",
    SubTaskHours: "0",
    SubTaskMinutes: "0",
  });

  const onInputHandler = (e) => {
    const { name, value } = e.target;
    //console.log(props.date);
    setsubFormErrors(validateInput(name, value));
    console.log(subformErrors)
    setSubtask((prev) => ({
      ...prev,
      id: `Subtask${props.num}`,
      [name]: value,
    }));
  };

  const validateInput = (name,value) => {
    const errorObj = {...subformErrors};
  
      if(name==='SubTaskTitle' && value.length>5){
        errorObj.SubTaskTitle = "Maximum 20 characters allowed";
      }
      else if(name==='SubTaskStartTime' && checkTime(value)!==true){
        console.log("here")
        errorObj.SubTaskStartTime = "Invalid time";
      }
      else if(name==='SubTaskHours' && value>24){
        errorObj.SubTaskHours= "Invalid hours";
      }
      else if(name==='SubTaskMinutes' && value>60){
        errorObj.SubTaskMinutes= "Invalid minutes";
      }
      else{
        delete errorObj[name];
      }
      return errorObj;
    }

    function checkTime(value){
      const current = getCurrentDate();
      if(subtask.SubTaskStartDate==current){
      const [enteredHours,enteredMinutes] = value.split(":");
  
      const currentTime = new Date();
      const currentHours = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();
  
      if (enteredHours < currentHours || (enteredHours == currentHours && enteredMinutes < currentMinutes)) {
        return false;
      } else {
        return true;
      }}
      return true;
    }
    
    function getCurrentDate() {
      const today = new Date();
      let day = today.getDate();
      let month = today.getMonth() + 1;
      const year = today.getFullYear();
    
      // Add leading zeros if day or month is less than 10
      day = day < 10 ? `0${day}` : day;
      month = month < 10 ? `0${month}` : month;
    
      return `${year}-${month}-${day}`;
    }

  const onClickSaveHandler = (e) => {
    e.preventDefault();
    console.log(subtask);
    props.onSaveSubtask(subtask);
  };

  return (
    <form>
      <div className={classes["new-sub-task-inputs"]}>
        <div className={classes["sub-task-heading"]}>Subtask {props.num}:</div>
        <span className={classes['title-input-error-msg']}>{subformErrors.SubTaskTitle}</span>
        <div className={classes["sub-task-tile"]}>
          <label className={`${styles["sub-heading"]}` }>Sub-task title:</label>
          <div>
          <input
            className={`${classes["title-input"]} ${(subformErrors.hasOwnProperty('SubTaskTitle')) && classes['error']}`}
            type="text"
            name="SubTaskTitle"
            value={subtask.SubTaskTitle}
            onChange={onInputHandler}
          />
          </div>
        </div>

        <div className={styles["input-div"]}>
          <label className={styles["sub-heading"]}>Select Start Date:</label>
          <input
            className={styles["date-input"]}
            type="date"
            name="SubTaskStartDate"
            value={subtask.SubTaskStartDate}
            onChange={onInputHandler}
            min={props.date}
          />
        </div>

        <div className={styles["input-div"]}>
          <label className={styles["sub-heading"]}>Select Start Time:</label>
          <input
            className={`${styles["date-input"]} ${(subformErrors.hasOwnProperty('SubTaskStartTime')) ? classes['error']:undefined}`}
            type="time"
            name="SubTaskStartTime"
            value={subtask.SubTaskStartTime}
            onChange={onInputHandler}
          />
           <p className={`${classes['input-error-msg']} `}>{subformErrors.SubTaskStartTime}</p>
        </div>

        <div className={classes["estiamted-subtask-time"]}>
          <label className={styles["sub-heading"]}>Estimated Time:</label>
          <input
            className={classes["est-time-input"]}
            type="number"
            name="SubTaskDays"
            value={subtask.SubTaskDays}
            onChange={onInputHandler}
          />
          <div className={classes["est-time-label"]}>Days,</div>

          <input
            className={`${classes["est-time-input"]} ${(subformErrors.hasOwnProperty('SubTaskHours')) && classes['error']}`}
            type="number"
            name="SubTaskHours"
            value={subtask.SubTaskHours}
            onChange={onInputHandler}
          />
          <div className={classes["est-time-label"]}>Hours,</div>

          <input
            className={`${classes["est-time-input"]} ${(subformErrors.hasOwnProperty('SubTaskMinutes')) && classes['error']}`}
            type="number"
            name="SubTaskMinutes"
            value={subtask.SubTaskMinutes}
            onChange={onInputHandler}
          />
          <div className={classes["est-time-label"]}>Minutes</div>
        </div>
        <p className={classes['hours-error-msg']}>{subformErrors.SubTaskHours} </p>
        <p className={classes['minutes-error-msg']}>{subformErrors.SubTaskMinutes} </p>
        <button
          style={{ marginTop: "20px" }}
          className={styles["task-save-button"]}
          onClick={onClickSaveHandler}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default SubtaskForm;
