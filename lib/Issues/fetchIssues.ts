import { options } from "@/app/api/auth/[...nextauth]/options";
import { graphql } from "@octokit/graphql";
import { getServerSession } from "next-auth";
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
const getNewIssues = async (cursor: string, query?: string) => {
    const session = await getServerSession(options)
    const token = session?.token
    try {
        const response:  Response  = await graphql(`
        query {
            search(query: "${query ? `${query}`: query === "" ? "is:issue is:open" : "is:issue is:open author:kaikat0211" }", type: ISSUE, first: 10, ${cursor !== "" ? `after: "${cursor}"` : ""}) {
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


