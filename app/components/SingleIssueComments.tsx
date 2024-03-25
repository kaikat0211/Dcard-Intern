import React from 'react'
import { SingleIssue } from '../types/singleIssueTypes'
import { IoMdArrowDropdown } from "react-icons/io";
import { TbDots } from "react-icons/tb";
import Link from 'next/link';
import Image from 'next/image';
interface AuthorInfo {
    login: string
    avatar_url: string
}
const SingleIssueComments = ({ issueInfo, commentsAuthorsArray, userIdentity} : { issueInfo: SingleIssue | undefined, commentsAuthorsArray: AuthorInfo[] | undefined, userIdentity: string | undefined}) => {
    
    const addClassNameToHTML = (htmlString: string): string => {
        const modifiedHTML = htmlString.replace(/<[^>]+>/g, match => `<div class="mb-4">${match}</div>`)
        return modifiedHTML
    }
  return (
    <>
        {issueInfo?.comments?.nodes!.map((c, i) => (
            <div className={`border ${issueInfo.author.login === c.author.login ? 'border-issuebodyblueborder' : 'border-githubBorder'} relative rounded-lg mt-4`} key={c.createdAt}>
                {
                commentsAuthorsArray &&  (<Link href={`/${commentsAuthorsArray[i].login}`} className='absolute left-[-6%] top-0' key={i}>
                    <Image alt="photo" src={commentsAuthorsArray[i].avatar_url} width={40} height={40} className='rounded-full'/>
                </Link>)
                }
                <div className={`${issueInfo.author.login === c.author.login ? 'border-issuebodyblueborder bg-issuebodyblueheader' : 'border-githubBorder bg-labelscolor'} text-white   px-4 text-sm rounded-t-lg  border-b flex items-center justify-between`}>
                    <div className='font-medium leading-9 flex gap-1' >
                        {c.author.login}
                        <span className='text-textgray font-normal'> commented last week •</span>
                        <button className='flex items-center text-sm text-textgray font-normal gap-1'>
                            <div>edited</div>
                            <IoMdArrowDropdown />
                        </button>
                    </div>
                    <div className='flex items-center gap-2'>
                        {issueInfo.author.login === c.author.login &&
                            (<div className='flex gap-2'>
                                <div className={`border ${userIdentity === "Owner" ? 'border-issuebodyblueborder' : 'border-githubBorder'} leading-[20px] px-[7px] rounded-full text-xs text-textgray font-medium`}>
                                Owner
                                </div>
                                <div className={`border ${userIdentity === "Owner" ? 'border-issuebodyblueborder' : 'border-githubBorder'} leading-[20px] px-[7px] rounded-full text-xs text-textgray font-medium`}>
                                Author
                                </div>
                            </div>)
                        }
                        <TbDots className='text-xl text-textgray hover:text-dotblue cursor-pointer'/>
                    </div>
                </div>
                <div className='p-2'>
                    {
                    <div className='text-white p-4' dangerouslySetInnerHTML={{ __html: addClassNameToHTML(c.body) }}>
                    </div>
                    }
                </div>
            </div>
        )) }
    </>
  )
}

export default SingleIssueComments