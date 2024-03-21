'use server'

import getSingleIssue from "@/lib/Issues/fetchSingleIssues"

interface Props {
    ownerName: string
    repoName: string
    issueNumber : number 
}
export async function fetchSingleIssues({ ownerName, repoName, issueNumber } : Props){
    const data = await getSingleIssue(ownerName, repoName, issueNumber)
    return data
}
