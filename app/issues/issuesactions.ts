'use server'

import getNewIssues from "@/lib/Issues/fetchIssues"

export async function fetchNewIssues({ cursor , query, userID} : { cursor: string , query?: string | undefined, userID?: string | undefined}) {
    const issues = await getNewIssues(cursor, query, userID)
    return issues
}
