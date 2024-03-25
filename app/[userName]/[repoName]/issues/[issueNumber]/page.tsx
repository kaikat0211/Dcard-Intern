import SingleIssuePageTitle from '@/app/components/SingleIssuePageTitle'
import React from 'react'
import { fetchSingleIssues } from './issueinfoaction'
import SingleIssueTitleDescription from '@/app/components/SingleIssueTitleDescription';
import { getUserGitHubId } from '@/app/useractions';
import Image from 'next/image';
import Link from 'next/link';
import SingleIssueBody from '@/app/components/SingleIssueBody';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { Octokit } from '@octokit/core';
import Marks from '@/app/components/Marks';
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
    state: string
    comments: {
        totalCount: number
    }
    author: {
        login: string
    }
    labels: {
        nodes?: Label[]
    };
}
const getMarkDown = async ({ body, token } : {body: string | "", token: string}) => {
    const octokit = new Octokit({
        auth: token
      })
    const res = await octokit.request('POST /markdown', {
        text: body,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
    })
    return res.data
}
const getAuthorPhoto = async (username: string | undefined) => {
    const res = await fetch(`https://api.github.com/users/${username}`)
    return res.json()
}
interface updateIssueInfo {
    token: string,
    owner: string,
    repo: string,
    issueNumber: number,
}
const marksArr = [['Assignees', 'No one—'],['Labels', 'none yet'],['Projects', 'none yet'],['Milestone', 'No milestone']]
const page = async ({ params } : { params: { userName: string, repoName: string , issueNumber: number } }) => {
    const issueData: SingleIssue | undefined = await fetchSingleIssues({ownerName: params.userName, repoName: params.repoName, issueNumber: params.issueNumber})
    const user = await getUserGitHubId()
    const session = await getServerSession(options)
    const token = session?.token
    const IssueAuthor = await getAuthorPhoto(issueData?.author.login)
    const markdownBody = await getMarkDown({body: issueData?.body || "", token: token})
    const userID = user.userId
    let userIdentity = userID === params.userName ? 'Owner' : 'viewer'
    const patchInfo: updateIssueInfo = {
        token: token,
        owner: params.userName,
        repo: params.repoName,
        issueNumber: params.issueNumber
    }
  return (
    <>
        <div className='mt-6 xl:mx-12 max-lg:px-6 lg:px-8'>
            <div className='mb-8'>
                <SingleIssuePageTitle issueInfo={issueData} patchInfo={patchInfo}/>
                <SingleIssueTitleDescription issueInfo={issueData}/>
            </div>
            <div className='relative flex md:gap-2 lg:gap-4 justify-between'>
                <Link href={`/${IssueAuthor.login}`} className='absolute left-0 top-0'>
                    <Image alt="photo" src={IssueAuthor.avatar_url} width={40} height={40} className='rounded-full'/>
                </Link>   
                <SingleIssueBody issueInfo={issueData} markdown={markdownBody} userIdentity={userIdentity} patchInfo={patchInfo}/>
                <div className='w-1/4 min-w-[256px]:'>
                    {marksArr.map( (s, index) => (
                        <div key={index}>
                            <Marks markTitle={s} initLabels={issueData?.labels.nodes}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    </>
  )
}

export default page