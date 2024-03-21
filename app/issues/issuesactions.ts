'use server'

import getNewIssues from "@/lib/Issues/fetchIssues"

export async function fetchNewIssues({ cursor , query, userID, time} : { cursor?: string | undefined , query?: string | undefined, userID?: string | undefined, time?: string | undefined}) {
    const issues = await getNewIssues(cursor, query, userID, time)
    return issues
}
