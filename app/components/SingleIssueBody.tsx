'use client'
import React, { useEffect, useState } from 'react'
import { IoMdArrowDropdown } from "react-icons/io";
import { TbDots } from "react-icons/tb";
import Markdown from './Markdown';
import CloseIssueButton from './CloseIssueButton';
import { useRouter } from 'next/navigation';
import patchIssue from '@/lib/update/patchIssue';
import { SingleIssue, updateIssueInfo } from "@/app/types/singleIssueTypes";
import SingleIssueComments from './SingleIssueComments';

interface AuthorInfo {
    login: string
    avatar_url: string
}
interface Props {
    issueInfo : SingleIssue | undefined
    markdown : string
    userIdentity: string | undefined
    patchInfo: updateIssueInfo
    commentsAuthorsArray: AuthorInfo[] | undefined
}

const SingleIssueBody = ({ issueInfo, markdown, userIdentity, patchInfo, commentsAuthorsArray} : Props) => {
    const [editBody, setEditBody] = useState(false)
    const [updateValue, setUpdateValue] = useState<string | undefined>(issueInfo?.body)
    const [isUpdate, setIsUpdate] = useState(false)
    const router = useRouter()
    const addClassNameToHTML = (htmlString: string): string => {
        return htmlString.replace(/<[^>]+>/g, match => `<div class="mb-4">${match}</div>`)
    };
    const modifiedMarkdown = markdown ? addClassNameToHTML(markdown) : ''
    const handleEditBody = async () =>{
        if (issueInfo?.body === updateValue || !updateValue) return;
        const response = await patchIssue(patchInfo, { body: updateValue });
        if(response.state_reason === "completed"){
            setIsUpdate(true);
            router.refresh();
            setEditBody(false);
        }else {
            setIsUpdate(false);
            return
        }
        
      }
    
    useEffect(()=>{
        if (isUpdate) {
            router.refresh();
        }
    },[isUpdate])
  return (
    <div className='ml-10 pl-4 grow'>
        <div className={`border ${userIdentity === "Owner" ? 'border-issuebodyblueborder' : 'border-githubBorder'} rounded-lg `}>
            <div className={`text-white px-4 text-sm rounded-t-lg border-b ${userIdentity === "Owner" ? 'border-issuebodyblueborder bg-issuebodyblueheader' : 'border-githubBorder bg-labelscolor'} flex items-center justify-between`}>
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
                        (<div className={`border ${userIdentity === "Owner" ? 'border-issuebodyblueborder' : 'border-githubBorder'} leading-[20px] px-[7px] rounded-full text-xs text-textgray font-medium`}>
                            {userIdentity}
                        </div>)
                    }
                    <TbDots className='text-xl text-textgray hover:text-dotblue cursor-pointer' onClick={()=>{
                        if(userIdentity !== "Owner") return
                        setEditBody(!editBody)
                    }}/>
                </div>
            </div>
            <div className='p-2'>
                {
                !editBody ? (<div className='text-white p-4' dangerouslySetInnerHTML={{ __html: modifiedMarkdown }}>
                </div>) : (<Markdown value={updateValue} setValue={setUpdateValue}/>)
                }
            </div>
            <div className='mb-2 mr-2'>
                {editBody && (
                <div className='flex justify-end items-center gap-1'>
                    <button 
                    className={`leading-8 px-3 font-medium text-sm ring-1 ring-githubBorder rounded-lg text-cancelred bg-bordercolor hover:bg-cancelhoverbgred hover:text-white hover:ring-0 ${isUpdate && 'opacity-60'}`}
                    onClick={()=>setEditBody(!editBody)}
                    disabled={isUpdate}
                    >
                        Cancel
                    </button>
                    <button 
                    className={`leading-8 px-3 font-medium text-sm rounded-lg bg-submitbuttonhovercolor ${isUpdate && 'opacity-60'} text-white hover:bg-submitbuttoncolor`}
                    onClick={handleEditBody}
                    disabled={isUpdate}
                    >
                        Update Comment
                    </button>
                </div>
                )}
            </div>

        </div>
        <SingleIssueComments issueInfo={issueInfo} commentsAuthorsArray={commentsAuthorsArray} userIdentity={userIdentity}/>
        {userIdentity === "Owner" &&  <CloseIssueButton issueInfo={issueInfo} patchInfo={patchInfo}/>}
    </div>
  )
}
export default SingleIssueBody