import React from 'react'
import MainHeader from './MainHeader'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
    <main>
        <Outlet />
    </main>
    </>
  )
}

export default RootLayout