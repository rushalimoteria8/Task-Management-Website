import React, { useState } from "react";
import classes from "./LandingPageHeader.module.css";

const LoginSignHeader = (props) => {

  return (
    <div className={classes.headerdiv}>
      <div className={classes.header}>
        <h1 className={classes.brand}>TaskPlanr</h1>
      </div>
    </div>
  );
};

export default LandingPageHeader;