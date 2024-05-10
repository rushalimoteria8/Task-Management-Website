import React, { Fragment } from "react";
import Header from '../Header'
import Intro from './Intro'
import TimerSection from "./TimerSection";
import ScrollTop from "../ScrollTop";

const PomodoroPage = props =>{

    return(
        <Fragment>
        <Header/>
        <Intro/>
       <TimerSection/> 
       <ScrollTop/>
        </Fragment>
    );
}

export default PomodoroPage;