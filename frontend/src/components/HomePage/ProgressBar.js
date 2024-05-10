import React from "react";
import Progressbar from "@ramonak/react-progress-bar";


const ProgressBar = (props) => {
  return (
    <Progressbar
      completed={props.progress}
      height="10px"
      isLabelVisible={false}
      bgColor='#FD9460'
      baseBgColor='rgba(253, 148, 96, 0.19)'
    />
  );
};

export default ProgressBar;
