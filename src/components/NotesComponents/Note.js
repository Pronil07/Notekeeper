import React, { useContext } from "react";
import classes from "./Note.module.css";
import { MdDelete, MdOutlinePushPin, MdPushPin } from "react-icons/md";
import { NoteContext } from "../../store/note-context";

function Note({ noteData, pinned, id }) {
  const { toggleModal, setCurrentNoteData, deleteNote, togglePin } =
    useContext(NoteContext);

  const openModalHandler = () => {
    setCurrentNoteData(noteData);
    toggleModal();
  };

  return (
    <div
      className={`${classes.eachNoteStyle} ${
        pinned ? classes.pinnedStyle : ""
      }`}
    >
      <div className={classes.noteContent} onClick={openModalHandler}>
        <h3>{noteData.data().title}</h3>
        <span>{noteData.data().tagline}</span>
        <p>{noteData.data().body}</p>
      </div>

      <div className={classes.absolute}>
        <section className={classes.pinIcon}>
          {pinned ? (
            <MdPushPin onClick={() => togglePin(id)} />
          ) : (
            <MdOutlinePushPin onClick={() => togglePin(id)} />
          )}
        </section>
        <section className={classes.deleteIcon} onClick={() => deleteNote(id)}>
          <MdDelete />
        </section>
      </div>
    </div>
  );
}

export default Note;
