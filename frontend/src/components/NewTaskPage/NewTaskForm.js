import React, { useState } from "react";
import classes from "./NewTaskForm.module.css";

const NewTaskForm = (props) => {
  const [formErrors,setFormErrors] = useState({});
  const [startDateSelect, setStartDateSelect] = useState(false);

  const [newtask, setNewTask] = useState({
    taskTitle: "",
    taskDesc: "",
    deadline: "",
    startDate: "",
    startTime: "",
    days: "0",
    hours: "0",
    minutes: "0",
  });

  //on each key stroke
  let name, value;

  const onChangeHandler = (e) => {
    name = e.target.name;
    value = e.target.value;

    if(name==='startDate'){
      setStartDateSelect(true);
    }

    setFormErrors(validateInput(name, value));
    console.log(formErrors)
    setNewTask({ ...newtask, [name]: value });
  
  };
  
  //basic validation of the input (setting constraints)
  //make a generic function for vaidation that takes: name, value and the validator func (refactor the code!!)
  const validateInput = (name,value) => {
  const errorObj = {...formErrors};

    if(name==='taskTitle' && value.length>30){
      errorObj.taskTitle = "Maximum 30 characters allowed";
    }
    else if(name==='taskDesc' && value.length>50){
      errorObj.taskDesc = "Maximum 50 characters allowed";
    }
    else if(name==='startTime' && checkTime(value)!==true){
      console.log('invalid time')
      errorObj.startTime = "Invalid time";
    }
    else if(name==='hours' && value>24){
      errorObj.hours= "Invalid tinput";
    }
    else if(name==='minutes' && value>60){
      errorObj.minutes= "Invalid tinput";
    }
    else{
      delete errorObj[name];
    }
    return errorObj;
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

  //if the startdate== today's date then validating the time
  function checkTime(value){
    const current = getCurrentDate();
    if(newtask.startDate==current){
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

  //Validating data on clicking submit button
  const [submitError,setSubmitError] = useState(false);

  const isObjectEmpty = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  };

  const onClickSaveHandler = (e) => {
    e.preventDefault();
    //const {startDate} = newtask;
    const {taskTitle,deadline,startDate,startTime,days,minutes,hours} = newtask;

      if(taskTitle===""||deadline===""||startDate===""||startTime===""||(days==="0"&&minutes==="0"&&hours==="0")){
        setSubmitError(true);
      }
      //also check if the required terms are not empty!!
        else if(!isObjectEmpty(formErrors)){
          setSubmitError(true);
        }
        else{
          props.onSave(newtask);
          setSubmitError(false);
        }
    
  };

  return (
    <form>
      <div className={classes["new-task-inputs"]}>
        <div className={`${classes["text-input"]} ${classes["input-div"]}`}>
          <label className={classes["sub-heading"]}>Task Title:</label>
          <p className={classes['input-error-msg']}>{formErrors.taskTitle} </p>
          <input
            className={`${classes["title-input"]}  ${(formErrors.hasOwnProperty('taskTitle')) ? classes['error']:undefined}`}
            type="text"
            name="taskTitle"
            onChange={onChangeHandler}
            value={newtask.taskTitle}
          />
        </div>
        <div className={`${classes["text-input"]} ${classes["input-div"]}`}>
          <label className={classes["sub-heading"]}>
            Task Description (optional):
          </label>
          <p className={`${classes['input-error-msg']}`}>{formErrors.taskDesc}</p>
          <textarea
            className={`${classes["task-desc-input"]}  ${(formErrors.hasOwnProperty('taskDesc')) ? classes['error']:undefined}`}
            rows="7"
            cols="50"
            name="taskDesc"
            onChange={onChangeHandler}
            value={newtask.taskDesc}
          ></textarea>
        </div>
        <div className={classes["input-div"]}>
          <label className={classes["sub-heading"]}>
            Select Task Deadline:
          </label>
          <input
            className={classes["date-input"]}
            type="date"
            name="deadline"
            onChange={onChangeHandler}
            value={newtask.deadline}
            /*min={getCurrentDate()}*/
          />
        </div>
        <div className={classes["input-div"]}>
          <label className={classes["sub-heading"]}>Select Start Date:</label>
          <input
            className={`${classes["date-input"]} ${startDateSelect && newtask.startDate>newtask.deadline && classes['error']}`}
            type="date"
            name="startDate"
            onChange={onChangeHandler}
            value={newtask.startDate}
            /*min={getCurrentDate()}*/
          />
          <p className={classes['input-error-msg']}>{startDateSelect && newtask.startDate>newtask.deadline && "Choose valid start date"}</p>
        </div>
        <div className={classes["input-div"]}>
  
          <label className={classes["sub-heading"]}>Select Start Time:</label>
          <input
            className={`${classes["date-input"]} ${(startDateSelect && formErrors.hasOwnProperty('startTime')) ? classes['error']:undefined}`}
            type="time"
            name="startTime"
            onChange={onChangeHandler}
            value={newtask.startTime}
          />
          <p className={classes['input-error-msg']}>{startDateSelect && formErrors.startTime} </p>
        </div>

        <div className={`${classes["text-input"]} ${classes["input-div"]}`}>
          <label className={classes["sub-heading"]}>
            Select time required to complete:
          </label>
          <div className={classes["time-req-div"]}>
            <div className={classes["time-req-label"]}>Days: </div>
            <input
              className={classes["time-req-input"]}
              type="number"
              name="days"
              min="1"
              onChange={onChangeHandler}
              value={newtask.days}
            />
          </div>

          <div className={classes["time-req-div"]}>
            <div className={classes["time-req-label"]}>Hours: </div>
            <input
              className={`${classes["time-req-input"]} ${(formErrors.hasOwnProperty('hours')) ? classes['error']:undefined}`}
              type="number"
              value={newtask.hours}
              name="hours"
              max="24"
              onChange={onChangeHandler}
            />
            <p className={classes['input-error-msg']}>{formErrors.hours} </p>
          </div>

          <div className={classes["time-req-div"]}>
            <div className={classes["time-req-label"]}>Minutes: </div>
            <input
              className={`${classes["time-req-input"]} ${(formErrors.hasOwnProperty('minutes')) ? classes['error']:undefined}`}
              type="number"
              value={newtask.minutes}
              name="minutes"
              max="60"
              onChange={onChangeHandler}
            />
            <p className={classes['input-error-msg']}>{formErrors.minutes} </p>
          </div>
        </div>
       <input type="submit" value="Save" className={classes['task-save-button']} onClick={onClickSaveHandler}/>
       {submitError && <p className={`${classes['input-error-msg']} ${classes['save-error']}`}>Please enter valid inputs.</p>}
      </div>
    </form>
  );
};

export default NewTaskForm;
