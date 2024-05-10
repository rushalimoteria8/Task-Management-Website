import React, { useEffect, useState } from "react";
import classes from "./UserDetails.module.css";
import SaveButton from "./SaveButton";
import { useNavigate } from "react-router-dom";

const UserDetails = (props) => {
  const navigate = useNavigate();

  useEffect(()=>{
    fetchUserDetails();
  },[]);

  const [userDetials, setUserDetials] = useState({
    username:"",
    email:"",
  });

  /*const [updateUser, setUpdateUser] = useState({
  });*/
  const [error, setErrors] = useState({
    username:"",
    password:"",
    cpassword:""
  })

  //fetching user details
  const fetchUserDetails = async () =>{
    try{
      const token = localStorage.getItem('token');

      const res = await fetch(`/user/profile`,{
      method:'GET',
      headers:{
          Authorization: `Bearer ${token}`
      }
      });
      const data = await res.json();
      console.log(data);
      setUserDetials({
        username:data.user.username,
        email:data.user.email,
      });
      //setusername(data.username);
    }catch(e){
      console.log(e);
    }
  };

  const inputHandler = (e) =>{
    setUserDetials((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }));
  };

  const inputValidation = () =>{
    let ret = true;

    setErrors({
      username:"",
      password:"",
      cpassword:""
    });

    if(userDetials.username.trim().length>25){
      setErrors((prev)=>({
        ...prev,
        username:"Maximum 25 characters allowed.",
      }));
      ret = false;
    }
    if(userDetials.password && userDetials.password!=="" && userDetials.password.trim().length<8){
      setErrors((prev)=>({
        ...prev,
        password:"Password must contain minimum 8 characters."
      }));
      ret = false;
    }
    if(userDetials.password &&(userDetials.password!=="" || userDetials.cpassowrd!=="") && userDetials.password.trim()!==userDetials.cpassword.trim()){
      setErrors((prev)=>({
        ...prev,
        cpassword:"Password does not match the above password."
      }));
      ret = false;
    }

    return ret;
  };


  const onSaveHandler = async (e) =>{
    e.preventDefault();
  
      if(inputValidation()){

        try{
        
        delete userDetials.cpassword;
        console.log(userDetials);

        const token = localStorage.getItem('token');
  
        const res = await fetch('/user/update',{
          method: 'PATCH',
          headers :{ 
            "Content-type":"application/json",
            Authorization: `Bearer ${token}`
          },
          body:JSON.stringify(userDetials),
        });

        if(res.ok){
          const data = await res.json();
          console.log('user updated');
          console.log(data);
          window.location.reload();
        }

      }catch(error){
        console.log(error)
      }
    }

  };

  return (
    <div className={classes["user-profile-details-div"]}>
      <div>
        <div className={classes["profile-heading"]}>Name: <span className={classes['error-msg']}>{error.username}</span></div>
        <input
          name="username"
          className={classes["login-input-text"]}
          type="text"
          placeholder="First-name Last-name"
          value={userDetials.username}
          onChange={inputHandler}

        />
      </div>
      <div>
        <div className={classes["profile-heading"]}>Email Address:</div>
        <input
          className={classes["login-input-text"]}
          style={{border:"none"}}
          type="text"
          placeholder="xyz@gmail.com"
          value={userDetials.email}
          readOnly
        />
      </div>
      <div>
        <div className={classes["profile-heading"]}>Change Password: <span className={classes['error-msg']}>{error.password}</span></div>
        <input
          name="password"
          className={classes["login-input-text"]}
          type="password"
          placeholder="Enter new password"
          onChange={inputHandler}
        />
      </div>
      <div>
        <div className={classes["profile-heading"]}>Re-enter Password: <span className={classes['error-msg']}>{error.cpassword}</span></div>
        <input
          name="cpassword"
          className={classes["login-input-text"]}
          type="password"
          placeholder="Re-enter new password"
          onChange={inputHandler}
        />
      </div>

      <SaveButton onSave={onSaveHandler}/>
    </div>
  );
};

export default UserDetails;
