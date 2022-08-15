import React, { useState, useEffect } from "react";
import { NoteContext } from "./note-context";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

function NoteContextProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [currentNoteData, setCurrentNoteData] = useState();
  const [popUpState, setPopUpState] = useState(false);
  const [popUpData, setPopUpData] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "notes")),
      orderBy("pinned", "desc"),
      (snapshot) => {
        setNotes(
          [...snapshot.docs].sort((note) =>
            note.data().pinned === true ? -1 : 1
          )
        );
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const toggleModal = () => {
    setModalState((prevState) => !prevState);
  };

  const deleteNote = async (id) => {

    await deleteDoc(doc(db, "notes", id));
    setPopUpData({backgroundColor: 'rgb(231, 88, 82)', color: 'white', message: 'Deleted!'});
    togglePopup();

  };

  const togglePin = async (id) => {
    const index = notes.findIndex((note) => note.id === id);

    await updateDoc(doc(db, "notes", id), {
      pinned: !notes[index].data().pinned,
    });
  };

  const togglePopup = () => {
    setPopUpState(prev=>!prev);
  }

  const initialValue = {
    modalState,
    notes,
    currentNoteData,
    popUpData,
    popUpState,
    setNotes,
    toggleModal,
    setCurrentNoteData,
    deleteNote,
    togglePin,
    togglePopup,
    setPopUpData,
  };

  return (
    <NoteContext.Provider value={initialValue}>{children}</NoteContext.Provider>
  );
}

export default NoteContextProvider;
