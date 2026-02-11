import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import './home.css'

function Home() {
  return (
    <div>
       <div className='admin-layout'>
          <div><Sidebar/></div>
          <div> <Outlet/> </div>
          
        </div>
    </div>
  )
}

export default Home