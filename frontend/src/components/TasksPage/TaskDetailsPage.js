import React, { useEffect } from "react";
import { Fragment, useRef, useState} from "react";
import { useParams } from "react-router-dom";
import EditTask from "./EditTask";
import EditSubtask from "./EditSubtask";
import Header from "../Header";
import EditTaskSettings from "./EditTaskSettings";
import ScrollTop from "../ScrollTop";
import classes from "../NewTaskPage/SaveButton.module.css";
import { Link } from "react-router-dom";



const TaskDetailsPage = (props) => {

    const params = useParams();
    const [updateData, setUpdateData] = useState({});
    const [Task, setTask] = useState({})

    ///fetching the details of that particular task
    useEffect(()=>{
        getTask();
    }, []);

  const getTask = async () => {

    const response = await fetch(`/tasks/task?taskid=${params.id}`);

    const task = await response.json();

    setTask(task);
    console.log(task);
    //console.log(res);
  };

  const createTask = useRef({
    newTask: "",
    subTasks: "",
    tasksettings: "",
    completed: "no",
  });



  const [startDate, setStartDate] = useState("");

  const EditTaskHandler = (newtask) => {
    const { startDate } = newtask;
    setStartDate(startDate);
    createTask.current["newTask"] = newtask;
    console.log("from edit task page");
    console.log(newtask);
  };

  const createSubtaskHandler = (subtasks) => {
    createTask.current = {
      ...createTask.current,
      ...subtasks
    }
    console.log("from edit task page");
    console.log(createTask.current);
  };

  const taskSettingsHandler = (tasksettings) => {
    createTask.current = {
      ...createTask.current,
      ...tasksettings
    }
    console.log("from edit task page");
    console.log(tasksettings);
  };

  

  const createTaskHandler = async () => {
    let obj = createTask.current;
    console.log(obj);
    Object.keys(obj).forEach((key)=>{
      if(obj[key]== ''){
        delete obj[key];
      }
    });

    console.log(obj);
    
    const res = await fetch(`/tasks/task/edit?id=${params.id}`,{
      method: 'PUT',
      headers: {
        "Content-type": "application/json"
      },
      body:JSON.stringify(obj)
    });

    if(res.ok){
      console.log('data updated successfully');
  }else{
      console.log('error updating data')
  }

   /* const res = await fetch('/addTask',{
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(
            obj
        )
    });

        if(res.ok){
            console.log('data sent successfully');
        }else{
            console.log('error sending data')
        }*/

  };

  

  return (
    <Fragment>
      <Header />
      <EditTask onSaveEditTask={EditTaskHandler} task={Task}/>
      <EditSubtask onSaveSubtask={createSubtaskHandler} sendDate={startDate} task={Task}/>
      <EditTaskSettings onEditTaskSettings={taskSettingsHandler} task={Task}/>
      <div className={classes["save-button-div"]}>
      <button className={classes["save-button"]} onClick={createTaskHandler}>
        <Link to='/tasks' className={classes["save-button-text"]}>Edit Task</Link>
        </button>
      </div>
      <ScrollTop />
    </Fragment>
  );
};

export default TaskDetailsPage;
