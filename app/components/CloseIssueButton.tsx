'use client'
import patchIssue from '@/lib/update/patchIssue';
import React, { useState } from 'react'
import { BsCheckCircle } from "react-icons/bs";
import { VscIssueReopened } from "react-icons/vsc";
import { SingleIssue, updateIssueInfo } from "@/app/types/singleIssueTypes";
import { useRouter } from 'next/navigation';

const CloseIssueButton = ({issueInfo, patchInfo } : {issueInfo: SingleIssue | undefined, patchInfo : updateIssueInfo}) => {
  const [open, setOpen] = useState((issueInfo?.state)?.toLowerCase())
  const [patching, setPatching] = useState(false)
  const router = useRouter()
    const handleClose = async () => {
      setPatching(true)
      const response = await patchIssue(patchInfo, {state: "closed"})
      if(response){
        setOpen('closed')
        router.replace('/issues')
      }
      setPatching(false)
    }
    const handleOpen = async () => {
      setPatching(true)
      const response = await patchIssue(patchInfo, {state: "open"})
      if(response){
        setOpen('open')
      }
      setPatching(false)
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