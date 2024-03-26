'use client'
import Link from 'next/link'
import React from 'react'
import { updateIssueInfo } from '../types/singleIssueTypes'


const CreateIssueButton = ({ patchInfo } : { patchInfo : updateIssueInfo }) => {
  
  return (
    <>
      <Link href={`/${patchInfo.owner}/${patchInfo.repo}/issues/new`} className='bg-submitbuttonhovercolor text-white hover:bg-submitbuttoncolor px-2 rounded-md font-medium text-xs leading-7 '>New issue</Link>
    </>
  )
}

export default CreateIssueButton