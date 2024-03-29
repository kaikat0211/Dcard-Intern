'use client'
import React from 'react'
import { SingleIssue } from '../types/singleIssueTypes'

interface Props {
    edit: boolean
    setEdit: (edit: boolean) => void
    issueInfo: SingleIssue | undefined
    setTitle: (newTitle: string) => void
    error: string[]
    setError: (error: string[]) => void
}
const EditTitleButton = ({edit, setEdit, setTitle, issueInfo, error, setError} : Props) => {
  const clickEditFunc = () => {
    setEdit(!edit)
    if(error.length > 0) setTitle(issueInfo!.title)
    setError([])
  }
  return (
    <button className='text-xs bg-bordercolor rounded-lg border border-githubBorder hover:border-buttonhover hover:bg-githubBorder leading-7 px-2 font-medium' style={{color: '#c9d1d9'}} onClick={clickEditFunc}
    >
        Edit
    </button>
  )
}

export default EditTitleButton