
import React from 'react'
import { Outlet } from 'react-router-dom';


export default function Home() {
  return (
    <>
    <div>
        Home
      <section>
        <Outlet />
      </section>
    </div>
    </>
  )
}
