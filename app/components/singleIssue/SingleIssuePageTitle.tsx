'use client'
import React, { useState, useEffect } from 'react'
import EditTitleButton from './EditTitleButton'
import CreateIssueButton from './CreateIssueButton'
import SaveEditButton from './SaveEditTitleButton'
import CancelEditButton from './CancelEditTitleButton'
import { SingleIssue, updateIssueInfo } from "@/app/types/singleIssueTypes";
import { useRouter } from 'next/navigation'

interface Props {
    issueInfo: SingleIssue | undefined
    userIdentity: string | undefined
    patchInfo: updateIssueInfo
}
const SingleIssuePageTitle = ({ issueInfo, patchInfo, userIdentity } : Props) => {
    const [edit, setEdit] = useState(false) //評估是否redux
    const [title, setTitle] = useState(issueInfo?.title || "")
    const [issueTitle, setIssueTitle] = useState<string | undefined>(issueInfo?.title)
    const [error, setError] = useState<string[]>([])
    const router = useRouter()
    useEffect(()=>{
        if(issueInfo?.title !== issueTitle) router.refresh()
    },[issueTitle])
  return (
   
    <div className='flex justify-between w-full max-md:flex-col-reverse'>
        {!edit ?
            <h1 className='text-[32px] '>
                <div className='text-white'>
                    {issueTitle} <span className=' text-textgray'>#{issueInfo?.number}</span>
                </div>
            </h1>
        :
            <input type='text' 
            className={`w-full text-[16px] rounded-md outline-0 border border-githubBorder px-3 mr-2  focus:ring-inputcolor focus:ring-2 text-white ${error?.some(item => typeof item === 'string' && item.includes("標題")) ? 'ring-2 ring-red-500' : ''} `}
            style={{background: '#02040A'}}
            value={title}
            name='Edit Title'
            onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setTitle(e.target.value)}
            />
        }
        <div className='flex items-center gap-1'>
            {!edit ? 
                <>
                    {userIdentity === "Owner" && <EditTitleButton edit={edit} setEdit={setEdit} issueInfo={issueInfo} setTitle={setTitle} error={error}  setError={setError}/>}
                    <CreateIssueButton patchInfo={patchInfo}/>
                </>
            :
                <>
                    <SaveEditButton edit={edit} setEdit={setEdit} patchInfo={patchInfo} title={title} setIssueTitle={setIssueTitle} setError={setError}/>
                    <CancelEditButton edit={edit} setEdit={setEdit}/>
                </>
            }

        </div>
    </div>
  )
}

export default SingleIssuePageTitle