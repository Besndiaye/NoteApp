import React from 'react'
import s from './style.module.css'

export default function ButtonPrimary({children, onClick, isdisabled}) {
  return (
    <button 
      disabled={isdisabled}
      onClick={onClick} 
      type='button' 
      className={`btn btn-primary ${s.button}`}>

      {children}
    </button>
  )
}
