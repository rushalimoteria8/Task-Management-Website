import React, { Fragment, useRef, useState } from "react";
import './SubTask.css';
import SubtaskForm from "./SubtaskForm";
import AddSubTaskButton from "./AddSubTaskButton";
import classes from "./AddSubTaskButton.module.css";

const SubTask = (props) => {
  const subTaskObject = useRef({});
  const [subtaskForms, setSubtaskForms] = useState([]);

  const num = useRef(2);
  const addSubtaskHandler = () => {
    num.current++;
    setSubtaskForms(prevForms => [...prevForms, <SubtaskForm num={num.current} onSaveSubtask={onSaveSubtaskHandler} />]);
  };

  const onSaveSubtaskHandler = (subtaskObject)=>{
    const {id} = subtaskObject;

    subTaskObject.current = {
      ...subTaskObject.current,
      [id]: subtaskObject,
    };

    //console.log(subTaskObject.current);
    let obj = subTaskObject.current;
    props.subtaskObject(obj);
      
  }

  const date = props.startDate;

  return (
    <Fragment>
      <div className='sub-task-items-div'>
        <SubtaskForm num={1} onSaveSubtask={onSaveSubtaskHandler} date={date}></SubtaskForm>
        <SubtaskForm num={2} onSaveSubtask={onSaveSubtaskHandler} date={date}></SubtaskForm>
        {subtaskForms}
      </div>
      <div className={classes["subtask-button-div"]}>
      <button onClick={addSubtaskHandler} className={classes["add-subtask-button"]}>
        <a className={classes['sub-task-button-label']}>
          + New Sub-task
        </a>
      </button>
    </div>
    </Fragment>
  );
};

export default SubTask;
