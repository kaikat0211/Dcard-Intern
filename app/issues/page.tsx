import React from 'react'
import ListInput from '../components/ListInput'
import LinkGroup from '../components/LinkGroup'
import IssueTable from '../components/IssueTable'
import { fetchNewIssues } from './issuesactions';
import { getUserGitHubId } from '../useractions';
import { FullIssue } from '../types/allIssueTypes';
const page = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => 
{
    const search = typeof searchParams.p === 'string' ? searchParams.p : undefined
    const userInfo = await getUserGitHubId()
    let userID
    if(userInfo) userID = userInfo.userId
    const data: FullIssue[] = await fetchNewIssues({cursor : undefined, query: search, userID: userID,}) || [];
    return (
      <div className='w-full flex justify-center'>
          <div className='flex justify-center bg-bodycolor w-full pt-6 max-lg:px-10 lg:px-4'>
              <div className='bg-bodycolor grow max-w-[980px]'>
                  <div className='flex w-full max-md:flex-col '>
                      <LinkGroup />
                      <ListInput search={search} userID={userID}/>
                  </div>
                  <IssueTable initIssue={data} /> 
              </div>
          </div>
      </div>
    );
};


export default page