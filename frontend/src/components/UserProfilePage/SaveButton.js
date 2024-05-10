import React from "react";
import classes from "./SaveButton.module.css";

const SaveButton = (props) => {
  return (
    <div className={classes["save-button-div"]}>
      <button className={classes['save-button']} onClick={(e)=>{props.onSave(e)}}>
        <a href="" className={classes['save-button-text']}>
          Save
        </a>
      </button>
    </div>
  );
};

export default SaveButton;