import React from 'react'
import { GoIssueOpened } from "react-icons/go";
import { SingleIssue } from "@/app/types/singleIssueTypes";

const SingleIssueTitleDescription = ({ issueInfo } : { issueInfo :  SingleIssue | undefined }) => {
  return (
    <>
        <div className='flex border-b border-bordercolor pb-2 mt-2 w-full '>
            <div className='mb-2 flex items-center '>
                <div className='mr-2 px-3 py-[5px] flex rounded-full bg-submitbuttoncolor items-center gap-1 text-white  font-medium'>
                    <GoIssueOpened className='text-base'/><span className=' text-sm'>Open</span>
                </div>
                <div className='text-textgray text-sm'> 
                    <a href={`/${issueInfo?.author.login}`} className='font-medium'>{issueInfo?.author.login}</a> opened this issue last week · {issueInfo?.comments.totalCount} comments
                </div>
            </div>
        </div>   
    </>
  )
}

export default SingleIssueTitleDescription