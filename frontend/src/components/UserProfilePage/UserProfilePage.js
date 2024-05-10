import React, { Fragment } from "react";
import classes from "./UserProfilePage.module.css";
import Header from "../Header";
import UserDetails from "./UserDetails";
import ScrollTop from "../ScrollTop";
import { Link } from "react-router-dom";

const UserProfilePage = (props) => {
  return (
    <Fragment>
      <Header />
      <div className={classes["user-profile-div"]}>
        <div className={classes["user-profile-tile"]}>
          <div className={classes["user-profile-image-div"]}>
            <div className={classes["user-profile-image"]}></div>
            <Link  className={classes["username"]}>Edit Profile Image</Link>
          </div>

          <UserDetails/>
        </div>
      </div>
      <ScrollTop/>
    </Fragment>
  );
};

export default UserProfilePage;
