import React, { Fragment, } from "react";
import classes from './TaskTiles.module.css'
import OngoingTile from "./OngoingTile";
import { Link } from "react-router-dom";

const TaskTiles = props =>{

    const isMore = props.moreButton;

    const popupHandler = (ischecked, task) =>{
        props.popupHandler(ischecked, task);
    }

    return(
        <div className={classes.taskContainer}>
            <div className={classes.titleContainer}>
                <div className={classes.title}>
                    Ongoing Tasks
                </div>
                <div  className={`${classes.buttondiv} ${(!isMore||props.ongoingTasks.length<=2) && classes.morebuttonHide}`}>
                 <Link to="/tasks" className={classes.morebutton} >more</Link>
                </div>
            </div>
            <div className={classes.tilesContainer}>
                {props.ongoingTasks.length===0 && <p>No ongoing tasks</p>}
                {isMore && props.ongoingTasks.length===1 && <>{props.ongoingTasks.slice(0,1).map((task) =>(
                            <Fragment>
                    <OngoingTile popupHandler={popupHandler} task={task}></OngoingTile>
                    </Fragment>
                ))}</>}
                {isMore && props.ongoingTasks.length>=2 && <>{props.ongoingTasks.slice(0,2).map((task) =>(
                         <Fragment>
                    <OngoingTile popupHandler={popupHandler} task={task} ></OngoingTile>
                    </Fragment>
                ))}</>}
                {!isMore && <>{props.ongoingTasks.sort((a,b)=>new Date(a.newTask.deadline)-new Date(b.newTask.deadline)).map((task) =>(
                     <Fragment>
                    <OngoingTile popupHandler={popupHandler} task={task}></OngoingTile>
                    </Fragment>
                ))}</>}
                
            </div>
        </div>

    );
}

export default TaskTiles;