import React, { useContext, useEffect } from 'react'
import ReactDom from 'react-dom';
import { NoteContext } from '../../store/note-context';
import classes from "./PopupComponent.module.css";

function PopupComponent() {
    const {popUpData, togglePopup, setPopUpData} = useContext(NoteContext);

    useEffect(()=>{
        const timeOut = setTimeout(()=>{
            togglePopup();
            setPopUpData({});
        },2000)
        return ()=>clearTimeout(timeOut);
    },[togglePopup, setPopUpData])
  
    const portalElement = document.getElementById("message");
    const renderElement = <div className={classes.absolute} style={{backgroundColor: popUpData.backgroundColor, color:popUpData.color}}><h3>{popUpData.message}</h3></div>
    return ReactDom.createPortal(renderElement, portalElement);
  
}

export default PopupComponent