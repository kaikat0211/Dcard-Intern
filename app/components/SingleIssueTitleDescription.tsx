import React from 'react'
import { GoIssueOpened } from "react-icons/go";

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
const SingleIssueTitleDescription = ({ issueInfo } : { issueInfo :  SingleIssue | undefined }) => {
  return (
    <>
        <div className='flex border-b border-bordercolor pb-2'>
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