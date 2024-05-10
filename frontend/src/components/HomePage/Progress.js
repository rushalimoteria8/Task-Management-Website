import React, {} from "react";
import classes from "./Progress.module.css";
import styles from "./Stats.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Progress = (props) => {
  const value1 = Math.round(((props.completedtasks/props.totalTasks)*100));
    const value2 = Math.round(((props.totalBacklog/props.totalTasks)*100));


  return (
    <div className={classes.progressContainer}>
      <div className={styles.statsTitle}> Progress Overview</div>
      <div className={classes.progressContent}>
      <div className={classes.contentTile}>
        <div className={`${classes.bar} ${classes.bar1}`}>
          <CircularProgressbar
            value={value1}
            maxValue={100}
            text={`${value1}%`}
            styles={buildStyles({
                
                trailColor: 'none',
                pathColor: `#2EB67D`,
                textColor: '#2EB67D',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                pathTransitionDuration: 0.5,
                backgroundColor: 'white',
            })}
          />
        </div>
        <div className={classes.barTitle}>Tasks completed</div>
        </div>
        <div className={classes.contentTile}>
        <div className={`${classes.bar} ${classes.bar2}`}>
          <CircularProgressbar
            value={value2}
            maxValue={100}
            text={`${value2}%`}
            styles={buildStyles({
                
                trailColor: 'none',
                pathColor: `#CE4735`,
                textColor: '#CE4735',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                pathTransitionDuration: 0.5,
                backgroundColor: 'white',
            })}
          />
        </div>
        <div className={classes.barTitle}>Backlog</div>
        </div>
      </div>
      
    </div>
  );
};

export default Progress;
