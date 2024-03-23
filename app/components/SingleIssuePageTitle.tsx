'use client'
import React, { useState, useEffect } from 'react'
import EditTitleButton from './EditTitleButton'
import CreateIssueButton from './CreateIssueButton'
import SaveEditButton from './SaveEditTitleButton'
import CancelEditButton from './CancelEditTitleButton'

interface Label {
    name: string;
    color: string;
    description: string;
}
interface SingleIssue {
    number: number;
    title: string;
    body: string;
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

interface updateIssueInfo {
    token: string,
    owner: string,
    repo: string,
    issueNumber: number,
}

const SingleIssuePageTitle = ({ issueInfo, patchInfo } : { issueInfo :  SingleIssue | undefined, patchInfo: updateIssueInfo }) => {
    const [edit, setEdit] = useState(false) //評估是否redux
    const [title, setTitle] = useState(issueInfo?.title || "")
    const [issueTitle, setIssueTitle] = useState<string | undefined>(issueInfo?.title)
  return (
    <div className='flex justify-between min-w-[768px]'>
        {!edit ?
            <h1 className='text-[32px] mb-2'>
                <div className='text-white'>
                    {issueTitle} <span className=' text-textgray'>#{issueInfo?.number}</span>
                </div>
            </h1>
        :
            <input type='text' 
            className='w-full text-[16px] rounded-md outline-0 border border-githubBorder px-3 mr-2  focus:ring-inputcolor focus:ring-2 text-white' 
            style={{background: '#02040A'}}
            value={title}
            name='Edit Title'
            onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setTitle(e.target.value)}
            />
        }
        <div className='flex items-center gap-1'>
            {!edit ? 
                <>
                    <EditTitleButton edit={edit} setEdit={setEdit}/>
                    <CreateIssueButton />
                </>
            :
                <>
                    <SaveEditButton edit={edit} setEdit={setEdit} patchInfo={patchInfo} title={title} setIssueTitle={setIssueTitle}/>
                    <CancelEditButton edit={edit} setEdit={setEdit}/>
                </>
            }

        </div>
    </div>
  )
}

export default SingleIssuePageTitle