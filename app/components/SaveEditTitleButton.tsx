'use client'
import React from 'react'
import { Octokit } from '@octokit/core'
interface updateIssueInfo {
  token: string,
  owner: string,
  repo: string,
  issueNumber: number,
}
interface Props {
  edit: boolean
  setEdit: (edit: boolean) => void
  patchInfo: updateIssueInfo
  title: string
  setIssueTitle: (newTitle : string) => void
}



const SaveEditButton = ({edit, setEdit, patchInfo, title, setIssueTitle} : Props) => {
  const EditFunc = async (patchInfo : updateIssueInfo, updateTitle: string) => {
    const octokit = new Octokit({
        auth: patchInfo.token
      })
    try{
      await octokit.request(`PATCH /repos/${patchInfo.owner}/${patchInfo.repo}/issues/${patchInfo.issueNumber}`, {
        owner: patchInfo.owner,
        repo: patchInfo.repo,
        issue_number: patchInfo.issueNumber,
        title: updateTitle,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
        })
      setIssueTitle(title)
    }catch(error){
      console.error('Error patching single issues:', error);
    }
  }
  const handleSaveEdit = () => {
    setEdit(!edit)
    if(title) EditFunc(patchInfo, title) 
  }
  return (
    <button className='text-sm bg-bordercolor rounded-lg border border-githubBorder hover:border-buttonhover hover:bg-githubBorder leading-8 px-3 font-medium'
    style={{color: '#c9d1d9'}}
    onClick={handleSaveEdit}
    >
      Save
    </button>
  )
}

export default SaveEditButton