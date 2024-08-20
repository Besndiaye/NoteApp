import React from 'react'
import s from './style.module.css'

export default function FieldError({msg}) {
  return <span className={s.container}>{msg}</span>;
  
}
