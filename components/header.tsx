"use client"

import React from 'react'

const Header = () => {
  return (
    <header className='border-grid sticky top-0 z-50 p-4 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <h1 className="text-2xl font-semibold">Air Quality Dashboard</h1>
    </header>
  )
}

export default Header