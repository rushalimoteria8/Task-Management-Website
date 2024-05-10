import React, { useState } from "react";
import classes from "./PrioritySettings.module.css";


const PrioritySettings = (props) => {
  const nums = ['1', '2', '3', '4', '5'];

  const [click, setclick]= useState(null);

  const prioritySettingHandler = (e, item) => {
      
      props.onPriorityInput(e.target.value)
      setclick(item)
      setclick(e.target.id);
  };

  return (
    <div className={classes["priority-settings-div"]}>
      <div className={classes["priority-settings-heading"]}>
        Set priority for the task:
      </div>
      <div className={classes["priority-settings-options"]}>
        {nums.map((item) => (
          <input
          type="number"
          name="option"
          id={item}
          className={`${classes["prioity-option"] } ${click === item && classes["prioity-option-highlight"]}`}
          value={item}
          onClick={(e) => prioritySettingHandler(e,item)}
          readOnly
        />
        ))}
      </div>
      <div className={classes["priority-settings-desc"]}>
        <div className={classes["desc"]}>1: Highly important</div>
        <div className={classes["desc"]}>5: Least important</div>
      </div>

      
    </div>
  );
};

export default PrioritySettings;
