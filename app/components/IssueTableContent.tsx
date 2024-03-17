'use client'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/lib/hooks';
import { GoIssueOpened } from "react-icons/go";
import { differenceInDays } from 'date-fns'
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { fetchNewIssues } from '../issues/issuesactions';
import { getUserGitHubId } from '../useractions';

interface Label {
    name: string;
    color: string;
    description: string;
}

interface Issue {
    id: string;
    number: number;
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    cursor: string;
    labels: {
        nodes: Label[];
    };
    comments: {
        totalCount: number;
    };
    repository: {
        nameWithOwner: string;
    };
}
function hexToRgba(hex: string, alpha: number): string {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result === null) {
        throw new Error("Invalid hex color string");
    }
    const r = parseInt(result[1]!, 16);
    const g = parseInt(result[2]!, 16);
    const b = parseInt(result[3]!, 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
const getDiffDay = (day : string) => {
    const createDate = new Date(day)
    const nowTime = new Date()
    const diffDay = differenceInDays(createDate, nowTime)
    if(Math.abs(diffDay) < 2) return 'yesterday'
    else return `${Math.abs(diffDay)} days ago`
}
const IssueTableContent = ({ initIssue } : { initIssue : Issue[] | undefined }) => {
    const userState = useAppSelector(state => state.user)
    const [newIssue, setNewIssue] = useState<Issue[] | undefined>(initIssue)
    const [end, setEnd] = useState(false)
    const [recentCursor, setRecentCursor] = useState<string | undefined>(
        initIssue && initIssue.length > 0 ? initIssue[initIssue.length - 1].cursor : undefined
    );
    const [ref, inView] = useInView()

    async function fetchMoreIssues() {
        const issues = await fetchNewIssues({ cursor: recentCursor  , user: userState.name})
        if(issues?.length){
            setNewIssue((prev : Issue[] | undefined) => [
                ...(prev?.length ? prev : []),
                ...issues
            ])
        }else{
            setEnd(true)
        }
        
    }
    useEffect(() => {
        if (inView) {
            fetchMoreIssues()
        }
      }, [inView])

    useEffect(() => {
        if (newIssue && newIssue.length > 0) {
            setRecentCursor(newIssue[newIssue.length - 1]?.cursor);
        }
    }, [newIssue]);
  return (
    <>
    {newIssue!.map(i => (
        <div className='text-white px-4 py-2 border-t border-githubBorder flex' key={i.id}>
            <div className='pt-1'>
                <GoIssueOpened style={{color: '#3FB950'}} className='text-md mr-2'/>
            </div>
            <div className='w-3/4'>
                <div className='flex items-center gap-1  flex-auto flex-wrap'>
                    <div className='' >
                        <Link href={'/'} className='font-semibold text-textgray hover:text-hoverblue pr-1'>{i.repository.nameWithOwner}</Link>
                        <Link href={'/'} className='font-semibold hover:text-hoverblue'>{i.title}</Link>
                    </div>
                        {i.labels.nodes.map( label => (
                            <span 
                            className='px-[7px] rounded-full cursor-pointer font-semibold text-xs border' 
                            key={label.name}
                            style={{
                                color: hexToRgba(label.color, 0.9), 
                                borderColor: hexToRgba(label.color, 0.3), 
                                backgroundColor: hexToRgba(label.color, 0.2) 
                            }}>
                                {label.name}
                            </span>
                        ))}
                </div>
                <div className='text-xs text-textgray mt-1'>#{i.number} opened 
                <span> {getDiffDay(i.createdAt)} </span> 
                by 
                <span className='hover:text-hoverblue'> {userState.name}</span>
                </div>
            </div>
            
        </div>
    ))}

    {!end && <div
    ref={ref}
    className='col-span-1 mt-16 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4'
    >
        <svg
          aria-hidden='true'
          className='h-5 w-5 animate-spin fill-sky-600 text-gray-200 dark:text-gray-600'
          viewBox='0 0 100 101'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
            fill='currentColor'
          />
          <path
            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
            fill='currentFill'
          />
        </svg>
        <span className='sr-only'>Loading...</span>
      </div>}
    </>
  )
}

export default IssueTableContent