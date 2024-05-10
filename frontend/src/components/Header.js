import React, { useEffect, useState} from "react";
import classes from "./Header.module.css";
import { TbUserCircle } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";

const Header = (props) => {
  const [username, setusername] = useState("");

  useEffect(()=>{
    fecthUsername();
  },[]);

  const fecthUsername = async () =>{
    try{
      const token = localStorage.getItem('token');

      const res = await fetch(`/user/id`,{
      method:'GET',
      headers:{
          Authorization: `Bearer ${token}`
      }
      });
      const data = await res.json();
      setusername(data.username);
    }catch(e){
      console.log(e);
    }
  }

  return (
    <div className={classes.headerdiv}>
      <header className={classes.header}>
        <div className={classes.containLeft}>
          <h1 ><NavLink to='/' className={classes.brandName}>TaskPlanr</NavLink></h1>
          <span className={classes.navlist}>
            <div>
              <NavLink
                to="/homepage"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Home
              </NavLink>
            </div>
            <span>
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Tasks
              </NavLink>
            </span>
            {/*<span>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Contact
              </NavLink>
            </span>*/}
            <span>
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                FAQs
              </NavLink>
            </span>
          </span>
        </div>
        <span className={classes.user}>
          <Link to="/user-profile" className={classes.navItem}>
            {username}
          </Link>
          <TbUserCircle className={classes.usericon}></TbUserCircle>
        </span>
      </header>
    </div>
  );
};

export default Header;
