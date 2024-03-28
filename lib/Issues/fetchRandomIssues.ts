import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { graphql } from "@octokit/graphql";
import { CustomSession } from "@/app/types/userTypes";
interface Label {
name: string;
color: string;
description: string;
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
            node: Issue
        }[]
    }
}
const getRandomIssues = async () => {
    const session = await getServerSession(options)
    const token = (session as CustomSession)?.token
    try {
        const response:  Response  = await graphql(`
        query {
            search(query: "is:open is:issue", type: ISSUE, first: 10) {
              edges {
                node{
                  ... on Issue {
                    id
                    number
                    author {
                      login
                    }
                    title
                    body
                    createdAt
                    updatedAt
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
        console.error('Error fetching random issues:', error);
    }
};

export default getRandomIssues


