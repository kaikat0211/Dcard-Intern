import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { graphql } from "@octokit/graphql";
import { CustomSession } from "@/app/types/userTypes";
import { AllIssue, Cursor } from "@/app/types/allIssueTypes";



interface Response {
    search?: {
        edges?: {
            cursor: Cursor
            node: AllIssue
        }[]
    }
}
const queryFunc = (query : string | undefined, userID?: string | undefined) => {
    switch(query) {
        case "" : 
        return "is:issue is:open"
        case undefined : 
        return `is:issue is:open author:${userID}`
        default:
        return query;
    }
}
const getNewIssues = async (cursor?: string | undefined, query?: string | undefined, userID?: string | undefined, time?: string | undefined) => {
    const session = await getServerSession(options)
    const token = (session as CustomSession)?.token
    const searchQuery = `${queryFunc(query, userID)} ${time !== undefined ? `created:<${time}` : ''}`
    try {
        const response:  Response  = await graphql(`
        query {
            search(query: "${searchQuery}", type: ISSUE, first: 10, ${cursor !== undefined ? `after: "${cursor}"` : ""}) {
                edges {
                cursor
                node {
                    ... on Issue {
                    id
                    number
                    title
                    body
                    createdAt
                    updatedAt
                    state
                    author{
                        login
                    }
                    labels(first: 10) {
                        nodes {
                        name
                        color
                        description
                        }
                    }
                    comments {
                        totalCount
                    }
                    repository {
                        nameWithOwner
                    }
                    }
                }
                }
                }
            }
        `, {
            headers: {
                authorization: `token ${token}`,
                "cache-control": "no-cache",
            },
        });
        if (response && response?.search && response?.search?.edges) {
            const nodes = response.search.edges.map(node => node)
            return nodes
        }
    } catch (error) {
        console.error('Error fetching new issues:', error);
    }
};

export default getNewIssues


