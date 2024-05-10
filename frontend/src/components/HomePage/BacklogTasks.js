import React from "react";
import BacklogTaskTiles from "./BacklogTaskTiles.js";

const BacklogTasks = (props) => {
  const moreButton = props.button;

  const popupHandler = (ischecked, task) => {
    props.popupHandler(ischecked, task);
  };

  return (
    <BacklogTaskTiles
      moreButton={moreButton}
      backlogTasks={props.backlogTasks}
      popupHandler={popupHandler}
    ></BacklogTaskTiles>
  );
};

export default BacklogTasks;
