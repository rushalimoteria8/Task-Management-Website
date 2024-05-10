import React from "react";
import classes from "./AddSubTaskButton.module.css";

const AddSubTaskButton = (props) => {
  return (
    <div className={classes["subtask-button-div"]}>
      <button className={classes["add-subtask-button"]}>
        <a href="" className={classes['sub-task-button-label']}>
          + New Sub-task
        </a>
      </button>
    </div>
  );
};

export default AddSubTaskButton;
