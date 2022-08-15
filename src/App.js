import { useContext } from 'react';
import classes from './App.module.css';
import FooterContent from './components/FooterContent';
import Header from './components/HeaderComponent/Header';
import Modal from './components/Modal/Modal';
import NoteContainer from './components/NotesComponents/NoteContainer';
import PopupComponent from './components/popUpMessage/PopupComponent';
import { NoteContext } from './store/note-context';

function App() {
  const {modalState, popUpState} = useContext(NoteContext);
  return (
    <div data-theme={'light'} className={classes.app}>
      {popUpState && <PopupComponent/>}
      {modalState && <Modal/>}
      <Header />
      <NoteContainer />
      <FooterContent />
    </div>
  );
}

export default App;
