import React from "react";
import classes from "./LandingSection2Body.module.css";
import { IoStopwatch, IoWine, IoRepeatOutline } from "react-icons/io5";

const LandingSection2Body = (props) => {
  return (
    <div className={classes.bodyContainer}>
      <div className={classes.tile}>
        <div className={classes.tileicon}>
          <IoStopwatch className={classes.idvicon} />
        </div>
        <p className={classes.iconText}>Set the timer and work</p>
      </div>
      <div className={classes.tile}>
        <div className={classes.tileicon}>
          <IoWine className={classes.idvicon} />
        </div>
        <p className={classes.iconText}>Take a short break</p>
      </div>
      <div className={classes.tile}>
        <div className={classes.tileicon}>
          <IoRepeatOutline className={classes.idvicon} />
        </div>
        <p className={classes.iconText}>Repeat the cycle</p>
      </div>
    </div>
  );
};

export default LandingSection2Body;
