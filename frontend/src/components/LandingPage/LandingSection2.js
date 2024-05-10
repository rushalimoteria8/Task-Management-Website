import React from 'react';
import classes from "./LandingSection2.module.css";
import LandingSection2Body from "./LandingSection2Body";

const LandingSection2 = (props) => {
  return (
    <div className={classes.section2}>
      <div className={classes.mainTile}>
        <h2 className={classes.section2Title}>Get your boring task done in one go with POMODORO technique!</h2>
        <LandingSection2Body></LandingSection2Body>
      </div>
    </div>
  );
};

export default LandingSection2;
