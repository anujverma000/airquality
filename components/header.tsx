"use client"

import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='border-grid sticky top-0 z-50 p-4 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='flex flex-row justify-between items-center'>
        <Link href="/">
          <h1 className="text-2xl font-semibold">Air Quality Dashboard</h1>
        </Link>
        <nav className='flex flex-row px-20'>
          <ul className='flex flex-row space-x-8'>
            <li>
              <Link href="/api-docs" className='text-blue-800 hover:underline text-sm'>
                API Docs
              </Link>
            </li>
            <li>
              <Link href="/about" className='text-blue-800 hover:underline text-sm'>
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header