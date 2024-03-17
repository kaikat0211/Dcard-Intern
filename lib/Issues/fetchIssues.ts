import { auth, options } from "@/app/api/auth/[...nextauth]/options";
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
        cursor: string;
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
    const getNewIssues = async (cursor?: string, user?: string) => {
        const session = await getServerSession(options)
        const token = session?.token
        try {
            const response: { user?: { issues?: { edges?: Cursor[], nodes?: Issue[] } } } = await graphql(`
            query {
                user(login: "${user}") {
                    issues(first: 10,${cursor !== "" ? `after: "${cursor}"`: ""} orderBy: {field: CREATED_AT, direction: DESC} ) {
                        edges {
                            cursor
                        }
                        nodes {
                            id
                            number
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
          `, {
                headers: {
                    authorization: `token ${token}`,
                },
            });
            if (response && response.user && response.user.issues) {
                const { nodes, edges } = response.user.issues;
                const edgeCursors = edges?.map(edge => edge.cursor) ?? [];
                const nodesWithCursors = nodes!.map((node, index) => ({
                    ...node,
                    cursor: edgeCursors[index] ?? null
                }));
                return nodesWithCursors
            }
        } catch (error) {
            console.error('Error fetching new issues:', error);
        }
    };

export default getNewIssues