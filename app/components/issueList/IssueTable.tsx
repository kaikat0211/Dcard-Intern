'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { GoIssueOpened } from "react-icons/go";
import IssueTableContent from './IssueTableContent';
import { FullIssue } from '../../types/allIssueTypes';
import { useRouter } from 'next/navigation';

const IssueTable = ({ initIssue } : { initIssue: FullIssue[] }) => {
    const [newIssue, setNewIssue] = useState<FullIssue[]>(initIssue)
    const router = useRouter()
    useEffect(()=>{
        router.refresh()
    },[])
    useEffect(()=>{
        setNewIssue(initIssue!.filter(i => i.node.state === "OPEN"))
    },[initIssue])
  return (
    <div className='w-full mt-5 border border-githubBorder rounded-md max-xs:rounded-none max-xs:border-y'>
        <div className='p-4 bg-labelscolor rounded-md flex justify-between'>
            <div className='flex gap-4'>
                <Link className='flex items-center text-white cursor-pointer' href={'/'}>
                    <GoIssueOpened  className='text-md'/>
                    <span className='ml-2 text-sm font-semibold'>{newIssue?.length} Open</span>
                </Link>

            </div>
        </div>
        <IssueTableContent initIssue={initIssue} newIssue={newIssue} setNewIssue={setNewIssue}/>
    </div>
  )
}

export default IssueTable