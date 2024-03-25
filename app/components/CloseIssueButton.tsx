'use client'
import patchIssue from '@/lib/update/patchIssue';
import React, { useState } from 'react'
import { BsCheckCircle } from "react-icons/bs";
import { VscIssueReopened } from "react-icons/vsc";
interface updateIssueInfo {
  token: string
  owner: string
  repo: string
  issueNumber: number
}
interface Label {
  name: string;
  color: string;
  description: string;
}
interface SingleIssue {
  number: number;
  title: string;
  body: string;
  state: string;
  createdAt: string;
  updatedAt: string;
  comments: {
      totalCount: number
  }
  author :{
      login : string
  }
  labels: {
      nodes?: Label[]
  };
}
const CloseIssueButton = ({issueInfo, patchInfo } : {issueInfo: SingleIssue | undefined, patchInfo : updateIssueInfo}) => {
  const [open, setOpen] = useState((issueInfo?.state)?.toLowerCase())
  const [patching, setPatching] = useState(false)
    const handleClose = () => {
      patchIssue(patchInfo, {state: "closed"})
      setPatching(true)
      setTimeout(() => {
        setOpen('closed')
        setPatching(false)
      }, 1000);
      
    }
    const handleOpen = () => {
      patchIssue(patchInfo, {state: "open"})
      setPatching(true)
      setTimeout(() => {
        setOpen('open')
        setPatching(false)
      }, 1000);
    }
  return (
    <div className='flex justify-end'>
        {open && open === "open" ? (
        <button className={`mt-2 border border-githubBorder py-[5px] px-4  flex items-center gap-2 bg-bordercolor hover:bg-closebuttonbg rounded-lg justify-center ${patching && 'opacity-60'}`}
        onClick={handleClose}
        >
            <BsCheckCircle style={{color : '#A371F7'}} className='text-base font-semibold'/>
            <div style={{color : '#C9D1D9'}} className=' text-sm font-medium'>Close issue</div>
        </button>
        ) : (
        <button className={`mt-2 border border-githubBorder py-[5px] px-4  flex items-center gap-2 bg-bordercolor hover:bg-closebuttonbg rounded-lg justify-center ${patching && 'opacity-60'}`}
        onClick={handleOpen}

        >
            <VscIssueReopened style={{color : '#3FB950'}} className='text-lg font-semibold'/>
            <div style={{color : '#C9D1D9'}} className=' text-sm font-medium'>Reopen issue</div>
        </button>
        )}
    </div>
  )
}

export default CloseIssueButton