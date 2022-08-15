import React, { useState, useEffect, useContext } from "react";
import classes from "./NoteContainer.module.css";
import AddNewNote from "./AddNewNote";
import Notes from "./Notes";
import Pagination from "./Pagination";
import { NoteContext } from "../../store/note-context";

function NoteContainer() {
  const {notes, setNotes} = useContext(NoteContext);
  const [pageNumber, setPageNumber] = useState(1);
  const notesPerPage = 6;

  var indexOfLastNote = pageNumber * notesPerPage;
  var indexOfFirstNote = indexOfLastNote - notesPerPage;

  

  useEffect(() => {
    setNotes(prev=> prev.sort(note => note.pinned === true ? -1 : 1));
  }, [notes, setNotes]);

  const changePageNumber = (value) => {
    setPageNumber(value);
  };

  return (
    <div className={classes.outerGridContainer}>
      <AddNewNote />

      <Notes notes={notes} setNotes={setNotes} indexOfLastNote={indexOfLastNote} indexOfFirstNote={indexOfFirstNote} />

      <Pagination
        totalNotes={notes.length}
        setPageNumber={changePageNumber}
        notesPerPage={notesPerPage}
      />
    </div>
  );
}

export default NoteContainer;
