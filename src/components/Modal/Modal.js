import React, { useContext, useEffect, useState } from "react";
import ReactDom from "react-dom";
import { NoteContext } from "../../store/note-context";
import classes from "./Modal.module.css";
import { MdClose } from "react-icons/md";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";


function Modal() {
  const { toggleModal, currentNoteData, deleteNote, togglePopup, setPopUpData } = useContext(NoteContext);
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [text, setText] = useState("");

  //currentNoteData state exist app-wide and only contains value if clicked on an existing note.
  //checks whether currentNoteData exist, if data is present, load the existing data to title, label & text state. 
  useEffect(() => {
    if (currentNoteData) {
      setTitle(currentNoteData.data().title);
      setLabel(currentNoteData.data().tagline);
      setText(currentNoteData.data().body);
    }
  }, [currentNoteData]);

  //Deletes the existing note.
  const deleteNoteHandler = () => {
    deleteNote(currentNoteData.id);
    toggleModal();
  };

  //same modal is used for creating new note & editing existing note
  //purposeOfModal is defined by whether currentNotedata has value or not.
  const purposeOfModal = currentNoteData
    ? "EDIT EXISTING NOTE"
    : "CREATE A NEW NOTE";

  const buttonSumbitHandler = () => {
    if(title === '' || label === '' || text === '') {
      setPopUpData({backgroundColor: 'rgb(231, 88, 82)', color: 'white', message: 'Please fill the required field!'});
      togglePopup();
    }
  }



  //buttonGroup alters it button's group which depends on currentNoteData
  //1st group(currentNoteData has no data): -->[         CREATE A NOTE BTN        ]<-- 
  //2nd group(currentNoteData has data):    -->[ DELETE NOTE BTN ][ SAVE EDIT BTN ]<-- 
  const buttonGroup = !currentNoteData ? (
    <button type="submit" onClick={buttonSumbitHandler}>CREATE A NOTE</button>
  ) : (
    <div className={classes.buttonGroup}>
      <button className={classes.redColor} onClick={deleteNoteHandler}>
        DELETE NOTE
      </button>
      <button type="submit">SAVE EDIT</button>
    </div>
  );


  //noteSubmitHander consist 2 separate operations
  //1st operation: if its a newNote, add the data to firestore db
  //2nd operation: if its an existing note, update the data in the firestore db
  const noteSubmitHandler = async (e) => {

    e.preventDefault();
    if (!currentNoteData) {
      const newNote = await addDoc(collection(db, "notes"), {
        title: title,
        tagline: label,
        pinned: false,
        body: text,
      });
      setPopUpData({backgroundColor: 'rgb(142, 141, 138)', color: 'white', message: `Added a new note with id ${newNote.id}`});
      togglePopup();
    } else {
      console.log("this is current note : " + currentNoteData.id);
      await updateDoc(doc(db, "notes", currentNoteData.id), {
        title: title,
        tagline: label,
        body: text,
      });
      setPopUpData({backgroundColor: 'rgb(142, 141, 138)', color: 'white', message: `Note updated`});
      togglePopup();
    }
    toggleModal();
  };

  
  const portalElement = document.getElementById("overlay"); //fetches the element with "overlay" id which is present above the root node
  
  const renderElement = (
    <div className={classes.modal}>
      <div className={classes.popupWindow}>
        <span>
          <h3>{purposeOfModal}</h3>
          <MdClose className={classes.closeButton} onClick={toggleModal} />
        </span>
        <form className={classes.form} onSubmit={noteSubmitHandler}>
          <input
            className={classes.titleContentOfNote}
            type="text"
            placeholder="TITLE"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
          <input
            className={classes.labelContentOfNote}
            type="text"
            placeholder="LABEL"
            onChange={(e) => setLabel(e.target.value)}
            value={label}
            required
          />
          <textarea
            className={classes.textAreaOfNote}
            type="text"
            placeholder="WRITE A NOTE"
            onChange={(e) => setText(e.target.value)}
            value={text}
            required
          />
          {buttonGroup}
        </form>
      </div>
      <div className={classes.backdrop} onClick={toggleModal}></div>
    </div>
  );

  return ReactDom.createPortal(renderElement, portalElement);
}

export default Modal;
