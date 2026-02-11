import React from 'react'
import './input.css'
function Input({type,name,placeholder,value,onChange}) {
  return (
    <>
    <input className='input' type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} required />
    </>
  )
}

export default Input