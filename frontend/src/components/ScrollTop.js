import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTop = props =>{

    const routePath = useLocation();

    const GoToTop = () =>{
        window.scroll(0,0);
    }

    useEffect(()=>{GoToTop()}, [routePath])
    return null;
}

export default ScrollTop;