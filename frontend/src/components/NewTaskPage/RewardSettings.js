import React from "react";
import classes from './RewardSettings.module.css';

const RewardSettings = props =>{

    return(
        <div className={classes['rewards-div']}>
            <div className={classes['rewards-heading']}>Rewards or Incentives:</div>
            <div className={classes['rewards-desc']}>Set self-rewards or incentives on the completion of the task which </div>
            <div className={classes['rewards-desc']}>motivates you to quickly complete the task.</div>
            <div className={classes['rewards-text-area-div']}>
            <textarea
            className={classes['rewards-text-area']}
            rows="7"
            cols="50"
            onChange={(e)=>{props.onRewardInput(e.target.value)}}
          ></textarea>
          </div>
        </div>

    );
}

export default RewardSettings;