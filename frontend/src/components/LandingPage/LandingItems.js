import React from 'react';
import classes from './LandingItems.module.css';
import ItemTile from './ItemTile';


const LandingItems = props =>{

    return (
   
        <div className={classes.container}>
        <ItemTile imgName="Subttasks" content="Divide task into sub-tasks"></ItemTile>
        <ItemTile imgName="Paper_fill" content="Set priorities for tasks"></ItemTile>
        <ItemTile imgName="Waterfall" content="Track your progress"></ItemTile>
        </div>
        
    );



}

export default LandingItems;
