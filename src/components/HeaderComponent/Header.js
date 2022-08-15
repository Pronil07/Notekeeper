import React from 'react'
import classes from "./Header.module.css";
import { FaStickyNote } from "react-icons/fa";

function Header() {
  return (
    <div className={classes.headerContainer}>
        <FaStickyNote className={classes.iconStyle} />
        <h1>NOTE KEEPER</h1>
    </div>
  )
}

export default Header