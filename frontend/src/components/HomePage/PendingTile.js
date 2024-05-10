import React from "react";
import classes from "./OngoingTile.module.css";
import { RiPencilFill, RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const PendingTile = (props) => {
  const subtasksTotal = Object.keys(props.task.subTasks).length;
  const rem = props.task.tasksettings.reminder.toUpperCase();
  const startdate = new Date(props.task.newTask.startDate);
  const estTimecalc =
    props.task.newTask.hours +
    props.task.newTask.minutes / 60 +
    props.task.newTask.days * 24;
  const estimatedTime = `${estTimecalc} hours`;

  //for due date
  const date = new Date(props.task.newTask.deadline);

  const day = date.getDate();
  const month = date.toLocaleString("defualt", { month: "long" }).toUpperCase();

  /////////////////////////////////////////////
  const deleteHandler = () => {
    deleteTask(props.task);
  };

  const deleteTask = async (task) => {
    try {
      const res = await fetch(`/tasks/delete?id=${task._id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      });

      const data = await res.json();
      console.log("task deleted", data);
    } catch (error) {
      console.log(error);
    }

    window.location.reload();
  };

  ///edit task
  const navigate = useNavigate();

  const EditTaskNaviagtion = () => {
    navigate(`/tasks/${props.task._id}`);
  };

  return (
    <div className={classes.tile}>
      <div style={{ height: "220px" }} className={classes.tileBody}>
        <div className={classes.tileHeader}>
          <div className={classes.taskName}>{props.task.newTask.taskTitle}</div>
          <div className={classes.options}>
            <div className={classes.priorityBox}>Priority: 1</div>
            <RiPencilFill
              onClick={EditTaskNaviagtion}
              className={classes.optionIcon}
            />
            <RiDeleteBin5Line
              onClick={deleteHandler}
              className={classes.optionIcon}
            />
          </div>
        </div>
        <div className={classes.bodyTitle}>
          Start Date: {startdate.toLocaleDateString()}
        </div>
        <div className={classes.bodyTitle}>
          Total sub-tasks: {subtasksTotal}
        </div>
        <div className={classes.bodyTitle}>
          Estimated time required: {estimatedTime}
        </div>
        <div className={classes.bodyTitle}>Reminders: {rem}</div>
        <div className={classes.bodyTitle}>
          Rewards:{" "}
          {props.task.tasksettings.reward == "" ? (
            <>No rewards</>
          ) : (
            <>{props.task.tasksettings.reward}</>
          )}
        </div>
        <div className={classes.dueDate}>
          DUE DATE: {day} {month}
        </div>
      </div>
    </div>
  );
};

export default PendingTile;
