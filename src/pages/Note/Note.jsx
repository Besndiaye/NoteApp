import React, { useState } from "react";
import s from "./style.module.css";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoteForm from "../../components/NoteForm/NoteForm.jsx";
import NoteAPI from "../../api/note-api.js";
import { updateNote, deleteNote } from "../../store/note/note-slice.js";

export default function Note(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditable, setIsEditable] = useState(false)
  const { noteId } = useParams();
  const [searchParams] = useSearchParams();
  // console.log('***', noteId);

  const note = useSelector((store) =>
    store.NOTE.noteList.find((note) => note.id === noteId)
  );

  // console.log('***', note);


  async function submit(formValues){
    const updatedNote = await NoteAPI.update({...formValues, id : note.id});
    dispatch(updateNote(updatedNote));
    setIsEditable(false);
    
  }

  function deleteNote_(note) {
    if (window.confirm("Supprimer la note ?")) {
      NoteAPI.deleteById(note.id);
      dispatch(deleteNote(note));
      navigate("/")
    }
  }


  return (
    <>
      {/* {searchParams.get('truc')} */}
      {note && (
        <NoteForm
          isEditable={isEditable}
          title={isEditable ? "Edit note" : note.title}
          note={note}
          onClickEdit={() => setIsEditable(!isEditable)}
          onClickTrash={() => deleteNote_(note)}
          onSubmit={isEditable && submit}
        />
      )}
    </>
  );
}
