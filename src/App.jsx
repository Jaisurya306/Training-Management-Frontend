import React from 'react'


import Display from './Display'
import { BrowserRouter } from 'react-router-dom'


function App() {
  return (
    <div>
  
      <BrowserRouter>
    <Display/>
     </BrowserRouter>
    </div>
  )
}

export default App