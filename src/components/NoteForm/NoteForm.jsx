import React, { useState } from "react";
import s from "./style.module.css";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import ValidatorsService from "../../services/form-validators";
import FieldError from "../FieldError/FieldError";

const VALADATORS = {
  title: (value) => {
    return ValidatorsService.min(value, 3) || ValidatorsService.max(value, 20);
  },
  content: (value) => {
    return ValidatorsService.min(value, 20);
  },
};

export default function NoteForm({
  isEditable = true,
  note,
  title,
  onSubmit,
  onClickTrash,
  onClickEdit,
}) {
  const [formValues, setFormValues] = useState({
    title: note?.title || '',
    content: note?.content || '',
  });

  const [formErrors, setFormErrors] = useState({
    // title: undefined,
    // content: undefined,
    title: note?.title ? undefined : "",
    content: note?.content ? undefined : "",
  });

  function hasError() {
    return Object.values(formErrors).some((error) => error !== undefined);
  }

  function updateFormValues(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    validate(e.target.name, e.target.value);
  }
  // console.log('***', formValues);
  // console.log('***', formErrors);

  function validate(fieldName, fieldValue) {
    setFormErrors({
      ...formErrors,
      [fieldName]: VALADATORS[fieldName](fieldValue),
    });
  }
  const actionIcons = (
    <>
      <div className="col-1">
        {onClickEdit && <PencilFill onClick={onClickEdit} className={s.icon} />}
      </div>
      <div className="col-1">
        {onClickTrash && (
          <TrashFill onClick={onClickTrash} className={s.icon} />
        )}
      </div>
    </>
  );

  const titleInput = (
    <div className="mb-5">
      <label className={`form-label ${s.text}`}>Title</label>
      <input
        onChange={updateFormValues}
        type="text"
        name="title"
        className="form-control"
        value={formValues.title}
      />
      <FieldError msg={formErrors.title} />
    </div>
  );

  const contentInput = (
    <div className="mb-5">
      <label className={`form-label ${s.text}`}>Content</label>
      <textarea
        onChange={updateFormValues}
        type="text"
        name="content"
        className="form-control"
        row="10"
        value={formValues.content}
      />
      <FieldError msg={formErrors.content} />
    </div>
  );

  const submitButton = (
    <>
      <div className={s.submit_btn}>
        <ButtonPrimary
          isdisabled={hasError()}
          onClick={() => onSubmit(formValues)}
        >
          Submit
        </ButtonPrimary>
      </div>
    </>
  );

  return (
    <div className={s.container}>
      <div className="row justify-content-space-between">
        <div className="col-10">
          <h2 className="mb-3">{title}</h2>
        </div>
        {actionIcons}
      </div>
      <div className={`mb-3 ${s.title_input_container}`}>
        {isEditable && titleInput}
      </div>
      <div className={`mb-3 `}>
        {isEditable ? contentInput : <pre>{note.content}</pre>}
      </div>
      {onSubmit && submitButton}
    </div>
  );
}
