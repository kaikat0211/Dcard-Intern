'use client'
import React, { useState } from 'react'
import { IoMdArrowDropdown } from "react-icons/io";
import { TbDots } from "react-icons/tb";
import Markdown from './Markdown';
import CloseIssueButton from './CloseIssueButton';

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
interface Props {
    issueInfo : SingleIssue | undefined
    markdown : string | undefined
    userIdentity: string | undefined
}
const SingleIssueBody = ({ issueInfo, markdown, userIdentity} : Props) => {
    const [editBody, setEditBody] = useState(false)
    const [updateValue, setUpdateValue] = useState<string | undefined>(issueInfo?.body)
    const addClassNameToHTML = (htmlString: string): string => {
        const modifiedHTML = htmlString.replace(/<[^>]+>/g, match => `<div class="mb-4">${match}</div>`)
        return modifiedHTML
    };

    const modifiedMarkdown = markdown ? addClassNameToHTML(markdown) : ''
  return (
    <div className='ml-10 pl-4'>
        <div className='border border-issuebodyblueborder w-[840px] rounded-lg'>
            <div className='text-white bg-issuebodyblueheader px-4 text-sm rounded-t-lg issueBefore border-b border-issuebodyblueborder flex items-center justify-between'>
                <div className='font-medium leading-9 flex gap-1' >
                    {issueInfo?.author.login}
                    <span className='text-textgray font-normal'> commented last week •</span>
                    <button className='flex items-center text-sm text-textgray font-normal gap-1'>
                        <div>edited</div>
                        <IoMdArrowDropdown />
                    </button>
                </div>
                <div className='flex items-center gap-2'>
                    {userIdentity === "Owner" && 
                        (<div className='border border-issuebodyblueborder leading-[20px] px-[7px] rounded-full text-xs text-textgray font-medium'>
                            {userIdentity}
                        </div>)
                    }
                    <TbDots className='text-xl text-textgray hover:text-dotblue cursor-pointer' onClick={()=>setEditBody(!editBody)}/>
                </div>
            </div>
            {!editBody ? (<div className='text-white p-4' dangerouslySetInnerHTML={{ __html: modifiedMarkdown }}>
            </div>) : (<Markdown value={updateValue} setValue={setUpdateValue}/>)}

        </div>
        <CloseIssueButton />
    </div>
  )
}

export default SingleIssueBody