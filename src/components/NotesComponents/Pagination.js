import React from "react";
import classes from "./Pagination.module.css";

function Pagination({ totalNotes, setPageNumber, notesPerPage }) {
  var pages = [];
    for(let i=1; i<=Math.ceil(totalNotes/notesPerPage); i++) {
        pages[i] = i;
    }
  return <div className={classes.paginate}>{pages.map((page, index)=><span key={index} onClick={()=>setPageNumber(index)}>{page}</span>)}</div>;
}

export default Pagination;
