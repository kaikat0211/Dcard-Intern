'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const CreateIssueButton = () => {
  const pathname = usePathname()
  
  return (
    <>
      <Link href={`${pathname}/new`} className='bg-submitbuttoncolor p-3  ml-2 rounded-lg font-semibold text-sm text-white'>New issue</Link>
    </>
  )
}

export default CreateIssueButton