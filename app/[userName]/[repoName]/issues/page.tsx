'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const page = () => {
  const pathname = usePathname()
  console.log(pathname);
  
  return (
    <>
      <Link href={`${pathname}/new`} className='text-white'>Create new Issues</Link>
    </>
  )
}

export default page