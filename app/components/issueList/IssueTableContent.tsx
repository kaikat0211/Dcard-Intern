'use client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import { fetchNewIssues } from '../../issues/issuesactions';
import { useSearchParams } from 'next/navigation';
import IssueContent from './IssueContent';
import { useAppSelector } from '@/lib/hooks';
import { FullIssue } from '../../types/allIssueTypes';
import LoadingIcon from '../LoadingIcon';
interface Props {
    initIssue: FullIssue[]
    newIssue: FullIssue[] 
    setNewIssue: React.Dispatch<React.SetStateAction<FullIssue[]>>;
}

const IssueTableContent = ({ initIssue, newIssue, setNewIssue } : Props) => {
    const searchParams = useSearchParams()
    const userID = useAppSelector(state => state.user.name)
    const query: string | undefined = useMemo(() => {
        return searchParams.has('p') ? (searchParams.get('p') === "" ? "" : (searchParams.get('p') || undefined)) : undefined;
    }, [searchParams]);
    const [end, setEnd] = useState(false)
    const isInitialLoad = useRef(true); 
    const [recentCursor, setRecentCursor] = useState<string | undefined>(
        initIssue && initIssue.length > 0 ? initIssue[initIssue?.length - 1].cursor.toString() : undefined
    );
    const [time, setTime] = useState(initIssue && initIssue.length > 0 ? initIssue[initIssue?.length - 1].node.createdAt : "")
    const [ref, inView] = useInView()
    const fetchMoreIssues = useCallback(async () => {
            const openIssueQuery = "is:open is:issue"
            const issues = await fetchNewIssues({
                cursor: recentCursor, 
                query: query, 
                userID: query === undefined ? userID : undefined,
                time : query?.split(" ").join("") === openIssueQuery.split(" ").join("")  || query === "" ? time : userID ? undefined : time
            })
            if(issues?.length){
                const updatedIssues: FullIssue[] = issues.map(issue => ({
                    cursor: issue.cursor,
                    node: issue.node
                }));
                setRecentCursor(issues[issues.length - 1].cursor.toString());
                setNewIssue((prev: FullIssue[]) => [
                    ...(prev?.length ? prev : []),
                    ...updatedIssues 
                ]);
                setTime(updatedIssues[updatedIssues.length - 1].node.createdAt)//目前問題是同時間的會被略
            }else{
                setEnd(true)
            }
    },[recentCursor, query, userID, time, setNewIssue])
    useEffect(() => {
        if (isInitialLoad.current) {
            isInitialLoad.current = false
            return
        }
        if (inView) {
            fetchMoreIssues()
        }
      }, [inView])
  return (
    <>
    {newIssue.map(i => (
        <IssueContent issue={i} key={i.node.id}/>
    ))}

    {!end && <div
    ref={ref}
    className='col-span-1  pt-3 mb-3 border-t border-githubBorder flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4'
    >
        <LoadingIcon className={'h-5 w-5 animate-spin fill-sky-600 text-gray-200 dark:text-gray-600'} />
        <span className='sr-only'>Loading...</span>
      </div>}
    </>
  )
}

export default IssueTableContent