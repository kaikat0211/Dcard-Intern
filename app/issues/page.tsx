import React from 'react'
import ListInput from '../components/ListInput'
import LinkGroup from '../components/LinkGroup'
import IssueTable from '../components/IssueTable'
import { graphql } from "@octokit/graphql";
import { auth } from '../api/auth/[...nextauth]/options';
interface Label {
  name: string;
  color: string;
  description: string;
}

interface Issue {
  number: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
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
const getNewIssues = async () => {
  const session = await auth();
  const token = session?.token;
  try {
    const response: { user?: { issues?: { nodes?: Issue[] } } } = await graphql(`
      query {
        user(login: "${session?.user?.name}") {
          issues(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes {
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
  if (response && response.user && response.user.issues && response.user.issues.nodes) {
      return response.user.issues.nodes;
  }
  } catch (error) {
    console.error('Error fetching new issues:', error);
  }
};
const page = async () => {
  const data = await getNewIssues()
  return (
    <div className='w-full flex justify-center'>
        <div className='flex justify-center bg-bodycolor w-full pt-6 max-lg:px-10 lg:px-4'>
            <div className='bg-bodycolor w-[980px] min-w-[980px] flex-row'>
                <div className='flex w-full'>
                    <LinkGroup />
                    <ListInput />
                </div>
                <IssueTable initIssue={data}/> 
            </div>
            
        </div>
    </div>
  )
}

export default page