import React, { useContext } from "react";
import classes from "./AddNewNote.module.css";
import { FaPlusCircle } from "react-icons/fa";
import { NoteContext } from "../../store/note-context";

function AddNewNote() {
  const {toggleModal, setCurrentNoteData} = useContext(NoteContext);
  const newNoteButtonClickHandler = () => {
    setCurrentNoteData();
    toggleModal();
  }

  return (
    <div className={classes.newNoteButtonArea}>
      <button className={classes.buttonStyle} onClick={newNoteButtonClickHandler}>
        <FaPlusCircle /> Add a New Note
      </button>
    </div>
  );
}

export default AddNewNote;
