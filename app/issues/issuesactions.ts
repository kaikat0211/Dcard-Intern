'use server'

import getNewIssues from "@/lib/Issues/fetchIssues"

export async function fetchNewIssues({ cursor, user } : { cursor?: string , user?: string}) {
    const issues = await getNewIssues(cursor, user)
    return issues
}
