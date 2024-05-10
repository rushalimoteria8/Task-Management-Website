import React from "react";
import classes from "./LandingPageHeader.module.css";
import { Link, NavLink } from "react-router-dom";

const LandingPageHeader = (props) => {
    const isJoin = props.joinButton;

  return (
    <div className={classes.headerdiv}>
      <div className={classes.header}>
        <h1 ><NavLink to='/' className={classes.brand}>TaskPlanr</NavLink></h1>
      
        <Link to="/login" className={`${classes.button} ${!isJoin && classes.buttonHidden}`}>Join Now</Link>
       
      </div>
    </div>
  );
};

export default LandingPageHeader;
