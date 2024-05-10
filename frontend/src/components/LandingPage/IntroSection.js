import React from 'react';
import classes from "./IntroSection.module.css";
import img from "./img1.png";

const IntroSection = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.writeup}>
        <h2 className={classes.headline}>
          Manage your daily tasks with TaskPlanr
        </h2>
        <p className={classes.introPara}>
          Effortlessly manage your tasks and boost productivity with our
          intuitive task management website.
          <br></br>
          <br></br>
          Stay organized, collaborate seamlessly, and accomplish more with ease.
        </p>
      </div>
      <img src={img} alt="here" />
    </div>
  );
};

export default IntroSection;
