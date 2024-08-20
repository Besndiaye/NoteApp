import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNoteList } from "./store/note/note-slice";
import { NoteAPI } from "./api/note-api";

function App() {
  const dispatch = useDispatch();

  async function fechAllNotes() {
    const noteList = await NoteAPI.fetchAll();
    dispatch(setNoteList(noteList));
  }

  useEffect(() => {
    fechAllNotes();
  }, []);

  return (
    <div className="container-fluid">
      <Header />
      <div className="outlet_container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
