import React from "react";
import TaskTiles from "./TaskTiles.js";


const OngoingTasksHome = (props) => {
  const moreButton = props.button;

  const popupHandler = (ischecked, task) =>{
    props.popupHandler(ischecked, task);

  }

  return (
        <TaskTiles moreButton={moreButton} ongoingTasks={props.ongoingTasks} popupHandler={popupHandler}></TaskTiles>
       
  );
};

export default OngoingTasksHome;
