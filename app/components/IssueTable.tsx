'use client'
import Link from 'next/link'
import React from 'react'
import { IoMdCheckmark } from "react-icons/io";
import { GoIssueOpened } from "react-icons/go";
import { IoMdArrowDropdown } from "react-icons/io";
import IssueTableContent from './IssueTableContent';

interface Label {
    name: string;
    color: string;
    description: string;
}

interface Issue {
    id: string;
    number: number;
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    cursor: string;
    labels: {
        nodes: Label[];
    };
    comments: {
        totalCount: number;
    };
    repository: {
        nameWithOwner: string;
    };
}
const IssueTable = ({ initIssue } : { initIssue : Issue[] | undefined }) => {
  return (
    <div className='w-full mt-5 border border-githubBorder rounded-md'>
        <div className='p-4 bg-labelscolor rounded-md flex justify-between'>
            <div className='flex gap-4'>
                <Link className='flex items-center text-white cursor-pointer' href={'/'}>
                    <GoIssueOpened  className='text-md'/>
                    <span className='ml-2 text-sm'>10 Open</span>
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
        <IssueTableContent initIssue={initIssue}/>
    </div>
  )
}

export default IssueTable