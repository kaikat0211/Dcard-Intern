'use client'
import React, { useCallback, useState } from 'react'
import patchIssue from '@/lib/update/patchIssue';
import { updateIssueInfo } from "@/app/types/singleIssueTypes";
import LoadingIcon from './LoadingIcon';
import { z } from 'zod' 
interface Props {
  edit: boolean
  setEdit: (edit: boolean) => void
  patchInfo: updateIssueInfo
  title: string
  setIssueTitle: (newTitle : string) => void
  setError: (error: string[]) => void
}
const UserSchema = z.object({
  title: z.string().refine((val) => val.trim() !== '', {
      message: '標題不得為空',
    }),
})

const SaveEditButton = ({edit, setEdit, patchInfo, title, setIssueTitle, setError} : Props) => {
  const [update, setUpdate] = useState(false) 
  
  const handleSaveEdit = useCallback(async() => {
    const validationResult = UserSchema.safeParse({
      title: title
    })
    setUpdate(true)
    if(validationResult.success){
      const response = await patchIssue(patchInfo, { title: title })
      if(response){
        setIssueTitle(title)
        setEdit(!edit)
      }
    }else{
      const errorMsg = validationResult.error.issues.map(( issue ) => (
        issue.message
      ))
      setError(errorMsg)
      setUpdate(false)
    }
    setUpdate(false)
  },[update, edit, patchInfo, setError])  
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