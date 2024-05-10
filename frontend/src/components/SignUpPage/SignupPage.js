import React, { Fragment, useState } from "react";
import classes from "./SignupPage.module.css";
import styles from "../NewTaskPage/AddTask.module.css";
import LandingPageHeader from "../LandingPage/LandingPageHeader";
import LoginSignupButton from "../LoginSignupButton";
import ScrollTop from "../ScrollTop";
import { useNavigate } from "react-router-dom";

const SignupPage = (props) => {
  const navigate  = useNavigate();

  const [credentials, setCredentials] = useState({
    username:"",
    email:"",
    password:"",
    repassword:""
  });

  const [error, setError] = useState({
    username:"",
    email:"",
    password:"",
    repassword:"",
    submit:""
  });

  const OnInputHandler = (e) =>{
    setCredentials({...credentials, [e.target.name]:e.target.value});
  };

  const validationHandler = () =>{
    let ret = true;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 

    const {username, email, password, repassword} = credentials;
    setError({
      username:"",
      email:"",
      password:"",
      repassword:""
    });

    if(username===""){
      setError(prev=>
          ({
            ...prev,
            username:"This field is required.",
          })
      );
      ret=false
    }
    if(email===""){
      setError(prev=>
          ({
            ...prev,
            email:"This field is required.",
          })
      );
      ret=false
    }
    if(email!=="" && !emailRegex.test(email)){
        setError(prev=>
          ({
            ...prev,
            email:"Invalid email.",
          })
      );
      ret=false
    }
    if(password===""){
      setError(prev=>
        ({
          ...prev,
          password:"This field is required.",
        })
    );
    ret=false
    }
    if(repassword===""){
      setError(prev=>
        ({
          ...prev,
          repassword:"This field is required.",
        })
    );
    ret=false
    }
    if(password!=="" && password.trim().length<8){
      setError(prev=>
        ({
          ...prev,
          password:"Password must contain minimum 8 characters.",
        })
    );
    ret=false
    }
    if(password!=="" && repassword!=="" && password.trim() != repassword.trim()){
      setError(prev=>
        ({
          ...prev,
          repassword:"Entered password must match the above password.",
        })
    );
    ret=false
    }
    return ret;
  }

  const onSubmitHandler = async (e) =>{
    e.preventDefault();
   
    if(validationHandler()){
      console.log('form submitted');
      console.log(credentials);

      const res = await fetch('/user/signup',{
        method: 'POST',
        headers :{ 
          "Content-type":"application/json"
        },
        body:JSON.stringify(credentials),
      });

      const data = await res.json();

      if(data.status===false){
        setError(prev=>
          ({
            ...prev,
            submit:data.message,
          })
      );
      }
      else{
        console.log('user created successfully');
        console.log(data);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('token',data.token);
        navigate('/homepage');
      }


    }
  }


  return (
    <Fragment>
      <LandingPageHeader joinButton={false}> </LandingPageHeader>
      <div className={classes["create-account-tile"]}>
        <div className={styles.heading}>Create Account</div>
        <div className={classes['create-account-body']}>
            <div>
                <div className={classes['input-heading']}> Enter Name: <span className={classes['error-msg']}>{error.username}</span></div>
                <input className={classes['input-text']} type='text' name="username" onChange={OnInputHandler}/>
            </div>
            <div>
                <div className={classes['input-heading']}> Enter email: <span className={classes['error-msg']}>{error.email}</span></div>
                <input className={classes['input-text']} type='email' name="email" onChange={OnInputHandler}/>
            </div>
            <div>
                <div className={classes['input-heading']}> Enter password: <span className={classes['error-msg']}>{error.password}</span></div>
                <input className={classes['input-text']} type='password' name='password' onChange={OnInputHandler}/>
            </div>
            <div>
                <div className={classes['input-heading']}> Re-enter password: <span className={classes['error-msg']}>{error.repassword}</span></div>
                <input className={classes['input-text']} type='password' name='repassword' onChange={OnInputHandler}/>
            </div>
            <LoginSignupButton onSubmit={onSubmitHandler}/>
            <p className={classes['error-msg']} style={{alignSelf:"center", fontSize:"14px"}}>{error.submit}</p>
        </div>
      </div>
      <ScrollTop/>
    </Fragment>
  );
};

export default SignupPage;
