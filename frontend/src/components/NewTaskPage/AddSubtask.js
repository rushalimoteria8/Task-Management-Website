import React from "react";
import { Fragment } from "react";
import styles from "./AddTask.module.css";
import classes from "./AddSubtask.module.css";
import SubTask from "./SubTask";

const AddSubtask = (props) => {
  const subtaskObjectHandler = (subtaskObject) => {
    props.onSaveSubtask(subtaskObject);
    console.log(props.sendDate);
  };

  const date = props.sendDate;

  return (
    <Fragment>
      <div className={classes["sub-task-div"]}>
        <div className={styles.heading}>Create sub-tasks (optional)</div>
        <div className={classes["sub-task-tile"]}>
          <SubTask subtaskObject={subtaskObjectHandler} startDate={date} />
        </div>
      </div>
    </Fragment>
  );
};

export default AddSubtask;
