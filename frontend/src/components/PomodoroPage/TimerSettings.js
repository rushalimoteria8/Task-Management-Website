import React from "react";
import classes from "./TimerSettings.module.css";

const TimerSettings = (props) => {
  return (
    <div className={classes.timerSettings}>
      <div className={classes.timerHeading}>Time (minutes)</div>
      <div className={classes.timeTile}>
      <label for="dropdown1" className={classes.settingHeading}>Pomodoro:</label>
        <div>
          <select id="dropdown1" className={classes.dropDown}>
            <option value="option1" className={classes.dropDownMenu}>15</option>
            <option value="option2" className={classes.dropDownMenu}>20</option>
            <option value="option3" selected className={classes.dropDownMenu}>25</option>
            <option value="option3" className={classes.dropDownMenu}>30</option>
            <option value="option3" className={classes.dropDownMenu}>35</option>
            <option value="option3" className={classes.dropDownMenu}>40</option>
            <option value="option3" className={classes.dropDownMenu}>45</option>
          </select>
        </div>
      </div>

      <div className={classes.timeTile}>
      <label for="dropdown2" className={classes.settingHeading}>Short Break:</label>
        <div>
          <select id="dropdown2" className={classes.dropDown}>
            <option value="option1" selected className={classes.dropDownMenu}>5</option>
            <option value="option2" className={classes.dropDownMenu}>10</option>
          </select>
        </div>
      </div>

      <div className={classes.timeTile}>
      <label for="dropdown3" className={classes.settingHeading}>Long Break:</label>
        <div>
          <select id="dropdown3" className={classes.dropDown}>
            <option value="option1" selected className={classes.dropDownMenu}>15</option>
            <option value="option2" className={classes.dropDownMenu}>20</option>
            <option value="option3" className={classes.dropDownMenu}>25</option>
            <option value="option4" className={classes.dropDownMenu}>30</option>
          </select>
        </div>
      </div>


    </div>
  );
};

export default TimerSettings;
