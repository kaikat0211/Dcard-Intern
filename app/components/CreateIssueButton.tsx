'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const CreateIssueButton = () => {
  const pathname = usePathname()
  
  return (
    <>
      <Link href={`${pathname}/new`} className='bg-submitbuttoncolor px-2 rounded-md font-medium text-xs leading-7 text-white'>New issue</Link>
    </>
  )
}

export default CreateIssueButton