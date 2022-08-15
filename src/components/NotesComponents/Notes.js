import React, { useContext } from "react";
import { NoteContext } from "../../store/note-context";
import Note from "./Note";
import classes from "./Notes.module.css";

function Notes({ indexOfFirstNote, indexOfLastNote }) {
  const { notes } = useContext(NoteContext);
  
  return (
    <>
      {notes < 1 && <h2 className={classes.noNotesDisclaimer}>Note list is empty!</h2>}
      {notes && (
        <div className={classes.innerGrid}>
          {notes.slice(indexOfFirstNote, indexOfLastNote).map((note) => (
            <Note
              key={note.id}
              id={note.id}
              noteData={note}
              pinned={note.data().pinned}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Notes;
