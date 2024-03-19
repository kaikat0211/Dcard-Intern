'use server'

import getSingleIssue from "@/lib/Issues/fetchSingleIssues"

interface Props {
    userName: string
    repoName: string
    issueNumber : number 
}
export async function fetchSingleIssues({ userName, repoName, issueNumber } : Props){
    const data = await getSingleIssue(userName, repoName, issueNumber)
    return data
}
