import React from "react";
import { Fragment, useState, useRef, useEffect } from "react";
import styles from "../NewTaskPage/AddTask.module.css";
import classes from "../NewTaskPage/AddSubtask.module.css";
import SubTask from "../NewTaskPage/SubTask";
import style from "../NewTaskPage/AddSubTaskButton.module.css";
import '../NewTaskPage/SubTask.css';
import EditSubTaskForm from "./EditSubTaskForm";
import AddSubtaskForm from "./AddSubtaskForm"

const EditSubtask = (props) => {

  const subTaskObject = useRef({});
  const [subtaskForms, setSubtaskForms] = useState([]);

//in the new subtask form the values have to be null...so using subtaskForm
  const num = useRef(1);
  useEffect(()=>{ 
    num.current = props.task.subTasks ? Object.keys(props.task.subTasks).length : 1;
  },[props.task]);

  //adding new subtask forms dynamically
  const addSubtaskHandler = () => {
    num.current++;
    setSubtaskForms(prevForms => [...prevForms, <AddSubtaskForm num={num.current} onSaveSubtask={onSaveSubtaskHandler} />]);
    
  };

  const onSaveSubtaskHandler = (subtaskObject)=>{
    const {id} = subtaskObject;

    subTaskObject.current = {
      ...subTaskObject.current,
     
        [`subTasks.${id}`]: subtaskObject,
      
    };

    //console.log(subTaskObject.current);
    let obj = subTaskObject.current;
    props.onSaveSubtask(obj);
      
  }

  const date = props.startDate;
  
  return (
    <Fragment>
      <div className={classes["sub-task-div"]}>
        <div className={styles.heading}>Edit sub-tasks</div>
        <div className={classes["sub-task-tile"]}>
          {/*<SubTask subtaskObject={subtaskObjectHandler} startDate={date} />*/}
          <div className="sub-task-items-div">
          {props.task.subTasks && Object.keys(props.task.subTasks).length!=0 ? Object.keys(props.task.subTasks).map((subtaskId)=>
          {
            const subtask = props.task.subTasks[subtaskId];
          return <EditSubTaskForm
              onSaveSubtask={onSaveSubtaskHandler}
              date={date}
              subtask={subtask}
              name={subtaskId}
            ></EditSubTaskForm>
        }): "No subtasks"}
            {subtaskForms}
          </div>
          <div className={style["subtask-button-div"]}>
            <button
              onClick={addSubtaskHandler}
              className={style["add-subtask-button"]}
            >
              <a className={style["sub-task-button-label"]}>+ New Sub-task</a>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditSubtask;
