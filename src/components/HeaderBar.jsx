import React from 'react'
import './HeaderBar.css'

export default function HeaderBar({ username }){
  return (
    <header className="klyro-header glass">
      <div className="klyro-header-left"></div>
      <div className="klyro-header-center">Welcome{/* , {username} */}</div>
      <div className="klyro-header-right">
        <img src="/assets/logo/smoke-hourglass.svg" alt="Klyro symbol" className="symbol"/>
        <span className="klyro-text">KLYRO</span>
      </div>
    </header>
  )
}
