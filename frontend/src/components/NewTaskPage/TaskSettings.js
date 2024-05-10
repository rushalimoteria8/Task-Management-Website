import React, { useState } from "react";
import { Fragment } from "react";
import styles from "./AddTask.module.css";
import style from "./NewTaskForm.module.css";
import classes from "./TaskSettings.module.css";
import ReminderSettings from "./ReminderSettings";
import PrioritySettings from "./PrioritySettings";
import RewardSettings from './RewardSettings';


const TaskSettings = (props) => {

  let taskobj = {reminder:"", priority:"", reward:""};
  const [priority,setPriority] = useState(false);

  const reminderInputHandler = (reminderData) =>{
    taskobj['reminder'] = reminderData;
  }

  const priorityInputHandler = (prioityData) =>{
    taskobj['priority'] = prioityData;
  }

  const rewardInputHandler = (rewardData) =>{
    taskobj['reward'] = rewardData;
  }

  const onClickSaveHandler = () =>{
    const {priority} = taskobj;
    if(priority===""){
        setPriority(true);
    }
    else{
      setPriority(false);
    }
    props.onSaveTaskSettings(taskobj);

  }
  return (
    <Fragment>
      <div className={classes["task-settings-div"]}>
        <div className={styles.heading}>Task Settings</div>
        <div className={classes["task-settings-tile"]}>
          <ReminderSettings onReminderInput={reminderInputHandler}/>
          <PrioritySettings onPriorityInput={priorityInputHandler}/>
          <RewardSettings onRewardInput={rewardInputHandler}/>

          <button
          style={{ marginTop: "20px" }}
          className={style["task-save-button"]}
          onClick={onClickSaveHandler}>
          Save
        </button>
        {priority && <p className={classes['input-error-msg']}>Please select priority.</p>}
        </div>
      </div>
      
    </Fragment>
  );
};

export default TaskSettings;
