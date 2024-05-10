import React from "react";
import classes from './LoginSignupButton.module.css';
import { Link } from "react-router-dom";

const LoginSignupButton = (props) => {
  return (
    <div className={classes['login-button-div']}>
      <button type='submit' className={classes['login-button']} onClick={(e)=>props.onSubmit(e)}>
        <Link  className={classes['login-button-label']} >
          Sign up
        </Link>
      </button>
    </div>
  );
};

export default LoginSignupButton;
