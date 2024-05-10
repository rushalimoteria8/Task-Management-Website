import React from "react";
import { Fragment } from "react";
import classes from "./TaskTiles.module.css";
import BacklogTile from "./BacklogTile";
import { Link } from "react-router-dom";

const BacklogTaskTiles = (props) => {
  const isMore = props.moreButton;

  const popupHandler = (ischecked, task) =>{
    props.popupHandler(ischecked, task);
}

  return (
    <div className={classes.taskContainer}>
      <div className={classes.titleContainer}>
        <div className={classes.title}>Backlog</div>
        <div
          className={`${classes.buttondiv} ${!isMore &&
            classes.morebuttonHide}`}
        >
          <Link className={classes.morebutton}>more</Link>
        </div>
      </div>
      <div className={classes.tilesContainer}>
        {props.backlogTasks.length === 0 && <p>No pending tasks</p>}
        {props.backlogTasks.length !== 0 && (
          <>
            {props.backlogTasks.map((task) => (
               <BacklogTile popupHandler={popupHandler} task={task}></BacklogTile>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default BacklogTaskTiles;
