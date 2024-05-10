import React from 'react';
import classes from './LandingSection1.module.css';
import LandingItems from './LandingItems';

const LandingSection1 = props =>{

    return(
        <div className={classes.container}>
            <LandingItems></LandingItems>
        </div>
    );


}

export default LandingSection1;
