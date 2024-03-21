import { graphql } from "@octokit/graphql";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
interface Label {
    name: string;
    color: string;
    description: string;
}

interface SingleIssue {
    number: number;
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    comments: {
        totalCount: number
    }
    author :{
        login : string
    }
    labels: {
        nodes?: Label[]
    };
}
interface Response {
    repository? : {
        issue?: SingleIssue
    }
}
const getSingleIssue = async (ownerName : string , repoName: string, IssueNumber : number) => {
    try {
        const session = await getServerSession(options)
        const token = session?.token
        const res : Response = await graphql(`
        query{
            repository(owner:"${ownerName}" name:"${repoName}") {
              issue(number:${IssueNumber}){
                title
                number
                body
                createdAt
                updatedAt
                comments {
                    totalCount
                }
                author{
                    login
                }
                labels(first:100) {
                    nodes {
                        name
                        color
                        description
                    }
                }
              }
            }
          }
        `,{
            headers: {
                authorization: `token ${token}`,
            },
        })
        if(res && res?.repository && res?.repository?.issue){
            return res.repository.issue
        }
        
    }
    catch(error){
        console.error('Error fetching single issues:', error);
    }

}

export default getSingleIssue