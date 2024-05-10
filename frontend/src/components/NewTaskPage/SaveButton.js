import React from "react";
import classes from "./SaveButton.module.css";
import { Link } from "react-router-dom";

const SaveButton = (props) => {
  return (
    <div className={classes["save-button-div"]}>
      <button className={classes['save-button']}>
        <Link className={classes['save-button-text']}>
          Create Task
        </Link>
      </button>
    </div>
  );
};

export default SaveButton;
