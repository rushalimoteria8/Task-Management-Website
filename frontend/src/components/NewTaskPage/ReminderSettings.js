import React from "react";
import classes from "./ReminderSettings.module.css";

const ReminderSettings = (props) => {
  const radioButtonHandler = (e) =>{
      props.onReminderInput(e.target.value)
  }

  return (
    <div className={classes["reminder-div"]}>
      <div className={classes["content-div"]}>
        <div className={classes["rem-heading"]}>Set reminder for the task:</div>
        <div className={classes["rem-desc"]}>
          (Sets reminders for all sub-tasks as well)
        </div>
      </div>
      <div className={classes["radio-button-div"]}>
        <input
          type="radio"
          name="option"
          id="yes"
          className={classes["radiobutton"]}
          onChange={radioButtonHandler}
          value="yes"
        />
        <label className={classes["radiobutton-label"]}>Yes</label>
      </div>
      <div className={classes["radio-button-div"]}>
        <input
          type="radio"
          name="option"
          id="no"
          className={classes["radiobutton"]}
          onChange={radioButtonHandler}
          value="no"
        />
        <label className={classes["radiobutton-label"]}>No</label>
      </div>
    </div>
  );
};

export default ReminderSettings;
