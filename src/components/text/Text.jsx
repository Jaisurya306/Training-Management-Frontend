import React from 'react'
import './text.css'
function Text({content}) {
  return (
    <div>
        <p className='heading'>{content}</p>
    </div>
  )
}

export default Text