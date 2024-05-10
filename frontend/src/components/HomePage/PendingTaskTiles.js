import React from "react";
import classes from './TaskTiles.module.css'
import PendingTile from "./PendingTile";
import { Link } from "react-router-dom";

const PendingTaskTiles = props =>{
    const isMore = props.moreButton;

    return(
        <div className={classes.taskContainer}>
            <div className={classes.titleContainer}>
                <div className={classes.title}>
                    Upcoming Tasks
                </div>
                <div  className={`${classes.buttondiv} ${(!isMore|| props.upcomingTasks.length<=2) && classes.morebuttonHide}`}>
                <Link to="/tasks" className={classes.morebutton}>more</Link>
                </div>
            </div>
            <div className={classes.tilesContainer}>
                {props.upcomingTasks.length===0 && <p>No pending tasks</p>}
                {isMore && props.upcomingTasks.length===1 && <>{props.upcomingTasks.slice(0,1).map((task) =>(
                    <PendingTile task={task}></PendingTile>
                ))}</>}
                {isMore && props.upcomingTasks.length>=2 && <>{props.upcomingTasks.slice(0,2).map((task) =>(
                    <PendingTile task={task}></PendingTile>
                ))}</>}
                {!isMore && <>{props.upcomingTasks.sort((a,b)=>new Date(a.newTask.startDate)-new Date(b.newTask.startDate)).map((task) =>(
                    <PendingTile task={task}></PendingTile>
                ))}</>}
            </div>
        </div>

    );
}

export default PendingTaskTiles;