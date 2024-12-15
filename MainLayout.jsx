import React from 'react'
import { Outlet, Link } from 'react-router-dom'

function MainLayout() {
  return (
    <div className="container mx-auto mt-5">
      <div className="flex gap-3 items-center">
        <img
          width={100}
          src=""
          alt=""
        />
        <h1 className="text-3xl font-bold me-10">TO DO LIST</h1>
      </div>
      <hr className="mt-5"/>
      <Outlet/>
    </div>
  )
}

export default MainLayout