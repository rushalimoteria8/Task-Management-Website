import React from "react";
import { useState } from "react";
import classes from "./Calendar.module.css";
import styles from "./Stats.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calstyle.css";

const Calendartile = (props) => {
  const [date, setDate] = useState(new Date());

  const filterDeadlines = (tasks) => {
    const current = new Date();

    const deadlineTasks = tasks.filter((task) => {
      const date = new Date(task.newTask.deadline);

      return (
        task.completed=="no" && date.getFullYear() === current.getFullYear() &&
        date.getMonth() === current.getMonth()
      );
    });

    const deadlines = deadlineTasks.map(
      (task) => new Date(task.newTask.deadline)
    );

    return deadlines;
  };

  const highlightDates = ({ date }) => {
    const deadlineDates = filterDeadlines(props.tasks);

    return deadlineDates.some(
      (deadlineDate) => date.toDateString() === deadlineDate.toDateString()
    )
      ? "highlight"
      : "";
  };

  return (
    <div className={classes.calContainer}>
      <div className={styles.statsTitle}>Deadlines this month</div>
      <div>
        <Calendar
          onChange={setDate}
          value={date}
          tileClassName={highlightDates}
        />
      </div>
    </div>
  );
};

export default Calendartile;
