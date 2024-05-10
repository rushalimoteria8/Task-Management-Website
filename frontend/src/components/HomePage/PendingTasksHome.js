import React from "react";
import PendingTaskTiles from "./PendingTaskTiles.js";


const PendingTasksHome = (props) => {

  const moreButton = props.button;

  return (
        <PendingTaskTiles moreButton={moreButton} upcomingTasks={props.upcomingTasks}></PendingTaskTiles>
       
  );
};

export default PendingTasksHome;