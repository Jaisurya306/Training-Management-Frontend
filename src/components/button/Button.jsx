import React from 'react'
import './button.css'
function Button({name,type}) {
  return (
    <>
        <button className='button' type={type}>{name}</button>
    </>
  )
}

export default Button