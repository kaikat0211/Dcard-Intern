'use client'
import React, { useEffect, useState } from 'react'
import { Octokit } from "@octokit/core";
import { usePathname} from 'next/navigation';

interface Label {
    name: string;
    color: string;
    description: string;
}
interface User {
    login: string
}
interface IssueData {
    user: User
    number: Number
    title: string
    labels: Label[]
} 
const Issue = ({token} : { token : string }) => {
    const pathname = usePathname()
    const [issues, setIssues] = useState<IssueData[]>([])
    const getIssues = async () => {
        const octokit = new Octokit({
            auth: token
        })
        const res = await octokit.request('GET /repos/{owner}/{repo}/issues', {
            owner: pathname.split('/')[1],
            repo: pathname.split('/')[2],
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })
          return res.data.map((issue: any) => ({
            user: issue.user,
            number: issue.number,
            title: issue.title,
            labels: issue.labels 
        }));
    }
    useEffect(()=> {
        const fetchIssues = async () => {
            try {
                const issuesData = await getIssues(); 
                setIssues(issuesData);
                console.log('fetch issue');
                
            } catch (error) {
                console.error('Error fetching issues:', error);
            }
        };
        fetchIssues()
    },[])
  return (
    <>
        {
            issues.map(i => (
                <div className='text-white border border-bordercolor p-2'  key={i.title}>
                    <div className='flex'>
                        <div>{i.title}</div>
                        <span className='px-2 flex justify-center items-center rounded-full border text-xs border-bugborder text-bugtext bg-bugbg font-semibold ml-1 '>bug</span>
                    </div>
                <div>#{i.number.toString()} opened by {i.user.login}</div>
                </div>
            ))
        }
    </>
  )
}

export default Issue