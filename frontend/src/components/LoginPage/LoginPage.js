import React, { Fragment, useState } from "react";
import LandingPageHeader from "../LandingPage/LandingPageHeader";
import styles from "../NewTaskPage/AddTask.module.css";
import classes from "./LoginPage.module.css";
import LoginSignupButton from "../LoginSignupButton";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { Link, useNavigate} from "react-router-dom";
import ScrollTop from "../ScrollTop";

const LoginPage = (props) => {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email:"",
    password:"",
  });

  const [error, setError] = useState({
    email:"",
    password:""
  });

  const onInputHandler = (e) =>{
    setCredentials((prev)=>(
      {
        ...prev,
        [e.target.name]:e.target.value
      }
    ));
  };

  const inputValidation = () =>{
    setError({
      email:"",
      password:"",
      submit:""
    })
    const {email, password} = credentials;
    let ret = true;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;


    if(email===""){
      setError((prev)=>({
          ...prev,
          email:"Please enter email"
        }));
        ret=false;
    }
    if(password===""){
      setError((prev)=>({
        ...prev,
        password:"Please enter password"
      }));
      ret=false;
    }
    if(email.trim()!=="" && !emailRegex.test(email)){
      setError((prev)=>({
        ...prev,
        email:"Please enter valid email"
      }));
      ret=false;
    }
    if(password!=="" && password.trim().length<8){
      setError((prev)=>({
        ...prev,
        password:"Password must contain minimum 8 characters"
      }));
      ret=false;
    }
    return ret;

  };

  const loginSubmitHandler = async (e) =>{
      e.preventDefault();

      if(inputValidation()){
        console.log('login form submitted');
        try{
        const res = await fetch('/user/login',{
          method:'POST',
          headers:{
            "Content-type":"application/json"
          },
          body:JSON.stringify(credentials)
        });

        const data = await res.json();

        console.log(data);

        if(data.status===true){
          console.log('login successful');
          localStorage.setItem('username,', data.user.username);
          localStorage.setItem('token',data.token);
          navigate('/homepage');
        }
        else{
          console.log('unable to login');
          setError((prev)=>({
            ...prev,
            submit:data.message
          }));
        }

      }catch(erorr){
          console.log(error);
      }
    }else{
      console.log('error submiting login form');
    }
  };


  return (
    <Fragment>
      <LandingPageHeader joinButton={false}> </LandingPageHeader>
      <div className={classes['login-page-div']}>
      <div className={classes["login-div"]}>
        <div className={styles.heading}>Login</div>
        <div className={classes["login-tile"]}>
          <div className={classes["div-left"]}>
            <div>
              <div className={classes["login-heading"]}> Enter email: <span className={classes['error-msg']}>{error.email}</span></div>
              <input className={classes["login-input-text"]} type="email" name="email" onChange={onInputHandler}/>
            </div>
            <div>
              <div className={classes["login-heading"]}> Enter Password: <span className={classes['error-msg']}>{error.password}</span></div>
              <input className={classes["login-input-text"]} type="password" name="password" onChange={onInputHandler}/>
            </div>
            <LoginSignupButton onSubmit={loginSubmitHandler}/>
            <p className={classes['error-msg']} >{error.submit}</p>
          </div>
          <div className={classes["vertical"]}></div>
          <div className={classes["div-right"]}>
            <div className={classes["login-options"]}>
              <div className={classes["login-option-box"]}>
                <FcGoogle className={classes['login-icon']}/> 
                <div>Continue with Google</div>
              </div>
              <div
                className={classes["login-option-box"]}
                style={{ marginTop: "28px" }}
              >
                <BsFacebook className={`${classes['login-icon']} ${classes['fb-icon']}`}/> 
                <div>Continue with Facebook</div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes["sign-up-option"]}>
            <div className={classes['sign-up-option-label']}>Do not have an account?</div>
            <div className={classes['sign-up-option-label']}><Link to="/sign-up" >Sign up here</Link></div>
        </div>
        
      </div>
      </div>
      <ScrollTop/>
    </Fragment>
  );
};

export default LoginPage;
