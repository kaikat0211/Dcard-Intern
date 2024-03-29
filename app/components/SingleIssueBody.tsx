'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { IoMdArrowDropdown } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import Markdown from './Markdown';
import CloseIssueButton from './CloseIssueButton';
import { useRouter } from 'next/navigation';
import patchIssue from '@/lib/update/patchIssue';
import { SingleIssue, updateIssueInfo } from "@/app/types/singleIssueTypes";
import SingleIssueComments from './SingleIssueComments';
import { z } from 'zod'
import getDiffDay from '@/lib/simple/getTimeFunc';

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
const UserSchema = z.object({
    body: z.string().min(30, {message: '內容需要至少30字'})
  })

const SingleIssueBody = ({ issueInfo, markdown, userIdentity, patchInfo, commentsAuthorsArray} : Props) => {
    const [editBody, setEditBody] = useState(false)
    const [updateValue, setUpdateValue] = useState<string | undefined>(issueInfo?.body)
    const [isUpdate, setIsUpdate] = useState(false)
    const [error, setError] = useState<string[]>([])
    const router = useRouter()
    const addClassNameToHTML = (htmlString: string): string => {
        return htmlString.replace(/<[^>]+>/g, match => `<div class="mb-4">${match}</div>`)
    };
    const modifiedMarkdown = useMemo(() => {
        return markdown ? addClassNameToHTML(markdown) : '';
      }, [markdown]);
    const handleEditBody = useCallback(async () => {
        const validationResult = UserSchema.safeParse({
          body: updateValue,
        });
        setIsUpdate(true);
        if (validationResult.success) {
          const response = await patchIssue(patchInfo, { body: updateValue });
          if (response) {
            router.refresh();
            setError([]);
            setEditBody(!editBody);
            setIsUpdate(false);
          }
        } else {
          const errorMsg = validationResult.error.issues.map((issue) => issue.message);
          setError(errorMsg);
          setIsUpdate(false);
        }
      }, [updateValue, patchInfo, router, editBody]);
    const cancelEdit = useCallback(() => {
        setEditBody(!editBody);
        setUpdateValue(issueInfo?.body);
        setError([]);
      }, [editBody, issueInfo]);
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
                    <span className='text-textgray font-normal'> commented {getDiffDay(issueInfo!.createdAt)}</span>
                </div>
                <div className='flex items-center gap-2'>
                    {userIdentity === "Owner" && 
                        (<div className={`border ${userIdentity === "Owner" ? 'border-issuebodyblueborder' : 'border-githubBorder'} leading-[20px] px-[7px] rounded-full text-xs text-textgray font-medium`}>
                            {userIdentity}
                        </div>)
                    }
                    <FaPencilAlt className='text-sm text-textgray hover:text-dotblue cursor-pointer' onClick={()=>{
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
            <div className='flex justify-end text-red-500 mr-2 mb-2'>
                {error.length > 0 && error[0]}
            </div>
            <div className='mb-2 mr-2'>
                {editBody && (
                <div className='flex justify-end items-center gap-1'>
                    <button 
                    className={`leading-8 px-3 font-medium text-sm ring-1 ring-githubBorder rounded-lg text-cancelred bg-bordercolor hover:bg-cancelhoverbgred hover:text-white hover:ring-0 ${isUpdate && 'opacity-60'}`}
                    onClick={cancelEdit}
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