import React from "react";

export const NoteContext = React.createContext({
  modalState: false,
  notes: [],
  currentNoteData: {},
  popUpData: {},
  popUpState: false,
  toggleModal: () => {},
  setNotes: () => {},
  setCurrentNoteData: () => {},
  deleteNote: () => {},
  togglePin: () => {},
  togglePopup: () => {},
  setPopUpData: ()=>{},
});
