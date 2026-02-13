import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import './home.css'

function Home({setIslogin}) {
  return (
    <div>
       <div className='admin-layout'>
          <div><Sidebar setIslogin={setIslogin}/></div>
          <div> <Outlet/> </div>
          
        </div>
    </div>
  )
}

export default Home