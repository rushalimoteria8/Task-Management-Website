import React from "react";
import classes from './TimerSection.module.css'
import styles from './Intro.module.css';
import TimerSettings from "./TimerSettings";
import Timer from "./Timer";


const TimerSection = (props) => {
  return (
    <div className={classes.timerSectionDiv}>
        <div className={styles.introHeading}>Timer Settings</div>
        <div className={classes.timerContainer}> 
        <TimerSettings/>
        <Timer/>
      
      </div>
    </div>
  );
};

export default TimerSection;
