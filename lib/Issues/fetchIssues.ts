import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { graphql } from "@octokit/graphql";
interface Label {
name: string;
color: string;
description: string;
}
interface Cursor {
    cursor: string
}

interface Issue {
    id: string;
    number: number;
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    author: {
        login: string;
    }
    labels: {
        nodes: Label[];
    };
    comments: {
        totalCount: number;
    };
    repository: {
        nameWithOwner: string;
    };
}
interface Response {
    search?: {
        edges?: {
            cursor: Cursor
            node: Issue
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
const getNewIssues = async (cursor: string, query?: string | undefined, userID?: string | undefined) => {
    const session = await getServerSession(options)
    const token = session?.token
    try {
        const response:  Response  = await graphql(`
        query {
            search(query: "${queryFunc(query, userID)}", type: ISSUE, first: 10, ${cursor !== "" ? `after: "${cursor}"` : ""}) {
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


