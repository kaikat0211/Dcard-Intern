'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const CreateIssueButton = () => {
  const pathname = usePathname()
  
  return (
    <>
      <Link href={`${pathname}/new`} className='bg-submitbuttonhovercolor px-2 rounded-md font-medium text-xs leading-7 text-white hover:bg-submitbuttoncolor'>New issue</Link>
    </>
  )
}

export default CreateIssueButton