'use server'

import getNewIssues from "@/lib/Issues/fetchIssues"

export async function fetchNewIssues({ cursor , query} : { cursor: string , query?: string}) {
    const issues = await getNewIssues(cursor, query)
    return issues
}
