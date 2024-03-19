import SingleIssuePageTitle from '@/app/components/SingleIssuePageTitle'
import React from 'react'
import { fetchSingleIssues } from './issueinfoaction'
import SingleIssueTitleDescription from '@/app/components/SingleIssueTitleDescription';
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
    author: {
        login: string
    }
    labels: {
        nodes?: Label[]
    };
}
const page = async ({ params } : { params: { userName: string, repoName: string , issueNumber: number } }) => {
    const issueData: SingleIssue | undefined= await fetchSingleIssues({userName: params.userName, repoName: params.repoName, issueNumber: params.issueNumber})
  return (
    <div className='mt-6 mx-20 px-10'>
        <SingleIssuePageTitle issueInfo={issueData}/>
        <SingleIssueTitleDescription issueInfo={issueData}/>
    </div>
  )
}

export default page