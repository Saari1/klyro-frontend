import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar({ role }){
  return (
    <aside className="klyro-sidebar">
      <nav>
        <NavLink to="/dashboard" className={({isActive}) => isActive? 'active':''}>Dashboard</NavLink>
        <NavLink to="/profile" className={({isActive}) => isActive? 'active':''}>Profile Details</NavLink>
        <NavLink to="/attendance" className={({isActive}) => isActive? 'active':''}>Attendance</NavLink>
        <NavLink to="/settings" className={({isActive}) => isActive? 'active':''}>Settings</NavLink>
        {role !== 'Participant' && (
          <NavLink to="/admin-tools" className={({isActive}) => isActive? 'active':''}>Admin Tools</NavLink>
        )}
      </nav>
    </aside>
  )
}
