import React from 'react';
import classes from "./ItemTile.module.css";
import { IconName } from "react-icons/fa";
/*import img from './Subttasks.png';*/

const ItemTile = (props) => {
  const path = require(`./${props.imgName}.png`);

  return (
    <div className={classes.item}>
      <img src={path} className={classes.itemImage} alt="icon image here"></img>
      <div className={classes.text}>{props.content}</div>
    </div>
  );
};

export default ItemTile;
