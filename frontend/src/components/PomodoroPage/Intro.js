import React from "react";
import classes from './Intro.module.css';


const Intro = (props) => {
  return (
    <div className={classes.introDiv}>
      <div className={classes.introHeading}>Pomodoro Technique</div>
      <div className={classes.introBody}>
        The Pomodoro Technique is a time management method that aims to improve
        productivity and focus. It involves breaking your work or study time
        into intervals, traditionally 25 minutes in length, called "Pomodoros."
        After each Pomodoro, you take a short break of around 5 minutes. After
        completing a set of four Pomodoros, you take a longer break of about
        15-30 minutes.
      </div>
    </div>
  );
};

export default Intro;
