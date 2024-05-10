import React, { useEffect, useRef, useState } from "react";
import { Fragment } from "react";
import styles from "../NewTaskPage/AddTask.module.css";
import style from "../NewTaskPage/NewTaskForm.module.css";
import classes from "../NewTaskPage/TaskSettings.module.css";
import classes1 from "../NewTaskPage/ReminderSettings.module.css";
import classes2 from "../NewTaskPage/PrioritySettings.module.css";
import classes3 from "../NewTaskPage/RewardSettings.module.css";
import classes4 from "../PomodoroPage/TimerSettings.module.css";
import classes5 from "./EditTaskSettings.module.css";

const EditTaskSettings = (props) => {
  //let taskobj = {};
  
  const taskobj = useRef({});
  const [reminder, setreminder] = useState(false);
  const [priority, setpriority] = useState(0);
  const [reward, setreward] = useState("");

  const [selectpriority, setselectPriority] = useState(false);

  useEffect(()=>{
    props.task.tasksettings && setreminder(props.task.tasksettings.reminder);
    props.task.tasksettings && setpriority(props.task.tasksettings.priority);
    props.task.tasksettings && setreward(props.task.tasksettings.reward);
    //setreward(props.task.TaskSettings?props.task.TaskSettings.rewards:"");
  },[props.task]);

  /*const reminderInputHandler = (reminderData) => {
    taskobj["reminder"] = reminderData;
  };

  const priorityInputHandler = (prioityData) => {
    taskobj["priority"] = prioityData;
  };

  const rewardInputHandler = (rewardData) => {
    taskobj["reward"] = rewardData;
  };*/


  //////

  const onClickSaveHandler = () => {  
    console.log(taskobj);
    props.onEditTaskSettings(taskobj.current);
  };

  ///// REMINDERS:
  const radioButtonHandler = (e) => {
    setreminder(e.target.value);
    taskobj.current={...taskobj.current, "tasksettings.reminder":e.target.value};
    console.log(taskobj)
  };

  ////////////Priority:
  const handlePriorityChange = (e) => {
    setpriority(e.target.value);
    taskobj.current={...taskobj.current, "tasksettings.priority":e.target.value};
    console.log(taskobj)
  }

  ////////Rewards:
  const rewardChangeHandler = (rewardInput) => {
    setreward(rewardInput);
    taskobj.current={...taskobj.current, "tasksettings.reward":rewardInput};
    console.log(taskobj)
  }

  return (
    <Fragment>
      <div className={classes["task-settings-div"]}>
        <div className={styles.heading}>Edit Task Settings</div>
        <div className={classes["task-settings-tile"]}>
          {/*<ReminderSettings onReminderInput={reminderInputHandler}/>
          <PrioritySettings onPriorityInput={priorityInputHandler}/>
            <RewardSettings onRewardInput={rewardInputHandler}/>*/}

          <div className={classes1["reminder-div"]}>
            <div className={classes1["content-div"]}>
              <div className={classes1["rem-heading"]}>
                Set reminder for the task:
              </div>
              <div className={classes1["rem-desc"]}>
                (Sets reminders for all sub-tasks as well)
              </div>
            </div>
            <div className={classes1["radio-button-div"]}>
              <input
                type="radio"
                name="option"
                id="yes"
                className={classes1["radiobutton"]}
                onChange={radioButtonHandler}
                value="yes"
                checked={reminder=="yes"}
              />
              <label className={classes1["radiobutton-label"]}>Yes</label>
            </div>
            <div className={classes1["radio-button-div"]}>
              <input
                type="radio"
                name="option"
                id="no"
                className={classes["radiobutton"]}
                onChange={radioButtonHandler}
                value="no"
                checked={reminder=="no"}
              />
              <label className={classes1["radiobutton-label"]}>No</label>
            </div>
          </div>

          <div className={classes2["priority-settings-div"]}>
            <div className={classes4.editDropdownDiv}>
            <div className={classes2["priority-settings-heading"]}>
              Set priority for the task:
            </div>
            <div>
          <select id="dropdown1" onChange={handlePriorityChange} className={`${classes5.dropDown} ${classes5.editDropDown}`}>
            <option value="1" className={classes5.dropDownMenu} selected={priority===1}>1</option>
            <option value="2" className={classes5.dropDownMenu} selected={priority===2}>2</option>
            <option value="3" className={classes5.dropDownMenu}selected={priority===3}>3</option>
            <option value="4" className={classes5.dropDownMenu}selected={priority===4}>4</option>
            <option value="5" className={classes5.dropDownMenu}selected={priority===5}>5</option>
          </select>
        </div>
        </div>
            {/*<div className={classes2["priority-settings-options"]}>
              {nums.map((item) => (
                <input
                  type="number"
                  name="option"
                  id={item}
                  className={`${classes2["prioity-option"]} ${click === item &&
                    classes["prioity-option-highlight"]}`}
                  value={item}
                  onClick={(e) => prioritySettingHandler(e, item)}
               
                />
              ))}
                  </div>*/}
            <div className={classes2["priority-settings-desc"]}>
              <div className={classes2["desc"]}>1: Highly important</div>
              <div className={classes2["desc"]}>5: Least important</div>
            </div>
          </div>

          <div className={classes3["rewards-div"]}>
            <div className={classes3["rewards-heading"]}>
              Rewards or Incentives:
            </div>
            <div className={classes3["rewards-desc"]}>
              Set self-rewards or incentives on the completion of the task which{" "}
            </div>
            <div className={classes3["rewards-desc"]}>
              motivates you to quickly complete the task.
            </div>
            <div className={classes3["rewards-text-area-div"]}>
              <textarea
                className={classes3["rewards-text-area"]}
                rows="7"
                cols="50"
                onChange={(e) => {
                  rewardChangeHandler(e.target.value);
                }}
                value={reward}
              ></textarea>
            </div>
          </div>

          <button
            style={{ marginTop: "20px" }}
            className={style["task-save-button"]}
            onClick={onClickSaveHandler}
          >
            Save
          </button>
          {selectpriority && (
            <p className={classes["input-error-msg"]}>
              Please select priority.
            </p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default EditTaskSettings;
