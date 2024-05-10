import React from "react";
import classes from "./Popup.module.css";
import { Link } from "react-router-dom";

const Popup = (props) => {
  const path = `/${props.page}`

  return (
    props.trigger ?
    <div className={classes["pop-up-div"]}>
      <div className={classes["pop-up-div-inner"]}>
        <div className={classes["pop-up-heading"]}>
          Are you sure you want to mark the task as completed?
        </div>
        <div className={classes["pop-up-desc"]}>
          Task will not be visible once marked as completed.
        </div>
        <div className={classes.options}> 
        <Link to={`/${props.page}`}  onClick={()=>props.optionHandler(false)}> 
          <button className={classes["save-button"]}>
            <div  className={classes["save-button-text"]}>Undo</div>
          </button>
          </Link> 
          <Link to={`/${props.page}`} onClick={()=>{props.optionHandler(true)}}>
          <button className={classes["save-button"]}>
            <div style={{fontSize:"15px"}}className={classes["save-button-text"]}>Mark as completed</div>
          </button>
          </Link>
        </div>
      </div>
    </div> :""
  );
};

export default Popup;
