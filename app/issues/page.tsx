import React from 'react'
import ListInput from '../components/ListInput'
import LinkGroup from '../components/LinkGroup'
import IssueTable from '../components/IssueTable'
import { fetchNewIssues } from './issuesactions';
import { getUserGitHubId } from '../useractions';
const page = async () => {
  const userID = await getUserGitHubId()
  const data = await fetchNewIssues({cursor: "", user: userID})
  return (
    <div className='w-full flex justify-center'>
        <div className='flex justify-center bg-bodycolor w-full pt-6 max-lg:px-10 lg:px-4'>
            <div className='bg-bodycolor w-[980px] min-w-[980px] flex-row'>
                <div className='flex w-full'>
                    <LinkGroup />
                    <ListInput />
                </div>
                <IssueTable initIssue={data}/> 
            </div>
            
        </div>
    </div>
  )
}

export default page