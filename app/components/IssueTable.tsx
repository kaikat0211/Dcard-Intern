'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoMdCheckmark } from "react-icons/io";
import { GoIssueOpened } from "react-icons/go";
import { IoMdArrowDropdown } from "react-icons/io";
import IssueTableContent from './IssueTableContent';
import { FullIssue } from '../types/allIssueTypes';

const IssueTable = ({ initIssue } : { initIssue: FullIssue[] }) => {
    const [newIssue, setNewIssue] = useState<FullIssue[]>(initIssue)
  return (
    <div className='w-full mt-5 border border-githubBorder rounded-md '>
        <div className='p-4 bg-labelscolor rounded-md flex justify-between'>
            <div className='flex gap-4'>
                <Link className='flex items-center text-white cursor-pointer' href={'/'}>
                    <GoIssueOpened  className='text-md'/>
                    <span className='ml-2 text-sm font-semibold'>{newIssue?.length} Open</span>
                </Link>
                <Link className='flex items-center text-textgray hover:text-white cursor-pointer' href={'/'} >
                    <IoMdCheckmark className=' text-md'/>
                    <span className='ml-2 text-sm'>0 Closed</span>
                </Link>
            </div>
            <div className='flex items-center text-textgray gap-7'>
                <button className='flex items-center hover:text-white'>
                    <span className='text-sm'>Visibility</span>
                    <IoMdArrowDropdown className='text-md'/>
                </button>
                <button className='flex items-center hover:text-white'>
                    <span className='text-sm'>Organization</span>
                    <IoMdArrowDropdown className='text-md'/>
                </button>
                <button className='flex items-center hover:text-white'>
                    <span className='text-sm'>Sort</span>
                    <IoMdArrowDropdown className='text-md'/>
                </button>
            </div>
        </div>
        <IssueTableContent initIssue={initIssue} newIssue={newIssue} setNewIssue={setNewIssue}/>
    </div>
  )
}

export default IssueTable