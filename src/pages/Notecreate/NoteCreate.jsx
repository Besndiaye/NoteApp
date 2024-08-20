import React from "react";
import NoteForm from "../../components/NoteForm/NoteForm";
import NoteApi from "../../api/note-api.js";
import { useDispatch } from "react-redux";
import { addNote } from "../../store/note/note-slice.js";
import { useNavigate } from "react-router-dom";

export default function NoteCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function createNote(formValues) {
    const createNote = await NoteApi.create({
      ...formValues,
      created_at: new Date().toLocaleDateString(),
    });
    dispatch(addNote(createNote));
    navigate("/");
  }

  return (
    <>
      <NoteForm  title={"Create a note"} onSubmit={createNote} />
    </>
  );
}
