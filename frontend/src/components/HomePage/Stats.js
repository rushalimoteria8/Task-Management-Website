import React from "react";
import classes from './Stats.module.css';
import Calendartile from "./Calendar";
import Progress from './Progress';

const Stats = props =>{


    return(
        <div className={classes.statsContainer}>
            <Calendartile tasks={props.tasks}></Calendartile>
            <Progress totalTasks={props.totalTasks} totalBacklog={props.totalBacklog} completedtasks={props.completedtasks}></Progress>
        </div>

    );
}

export default Stats;