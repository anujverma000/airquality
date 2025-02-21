"use client"

import { Card } from '@/components/ui/card';

const Footer = () => {
  return (
    <footer className="px-4 sm:px-20">
      <Card className='p-4 rounded-b-none rounded-t-xl text-center'>
        <p className='text-muted-foreground text-sm'>
          Developed by <a href="https://www.linkedin.com/in/anujverma000/" className='text-blue-500 hover:underline'>Anuj Verma</a>
        </p>
        <p className='text-muted-foreground text-xs pt-4'>
          © {new Date().getFullYear()} All Rights Reserved
        </p>
      </Card>
    </footer>
  )
}

export default Footer