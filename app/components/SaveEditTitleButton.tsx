'use client'
import React, { useState } from 'react'
import patchIssue from '@/lib/update/patchIssue';
import { SingleIssue, updateIssueInfo } from "@/app/types/singleIssueTypes";
import LoadingIcon from './LoadingIcon';

interface Props {
  edit: boolean
  setEdit: (edit: boolean) => void
  patchInfo: updateIssueInfo
  title: string
  setIssueTitle: (newTitle : string) => void
  issueInfo :  SingleIssue | undefined
}

const SaveEditButton = ({edit, setEdit, patchInfo, title, setIssueTitle, issueInfo} : Props) => {
  const [update, setUpdate] = useState(false) 
  const handleSaveEdit = async () => {
    if(issueInfo?.title === title || !title) return
    setUpdate(true)
    const response = await patchIssue(patchInfo, { title: title })
    if(response){
      setIssueTitle(title)
      setEdit(!edit)
    }
    setUpdate(false)
  }
  return (
    <button className={`text-sm bg-bordercolor rounded-lg border border-githubBorder leading-8 px-3 font-medium ${!update ? "hover:border-buttonhover hover:bg-githubBorder" : "flex items-center gap-2"} `}
    style={{color: '#c9d1d9'}}
    disabled={update}
    onClick={handleSaveEdit}
    >
      {update ? <LoadingIcon className={'h-3 w-3 animate-spin fill-sky-600 text-gray-200 dark:text-gray-600'}/> : ''}
      {update ? 'Updating' : 'Save'}
    </button>
  )
}

export default SaveEditButton