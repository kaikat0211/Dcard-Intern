import { options } from "@/app/api/auth/[...nextauth]/options";
import { CustomSession } from "@/app/types/userTypes";
import { getServerSession } from "next-auth";
async function getUserData(userID : string) {
    const session = await getServerSession(options)
    const token = (session as CustomSession)?.token
    const response = await fetch(`https://api.github.com/users/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userInfo = await response.json();
    const repoRes = await fetch(userInfo.repos_url);
    const repoData = await repoRes.json() ; //origin
    const copyRepoData = JSON.parse(JSON.stringify(repoData))
    const repoInfoPromises = copyRepoData.map((repo: any) => {
      const repoName = repo.name;
      const issuesUrl = repo.issues_url.replace(/{\/number}/g, '');
      return { [repoName]: { getIssueUrl: issuesUrl }};
    });
  
    const repoInfos = await Promise.all(repoInfoPromises);
  
    const repoInfo: { [key: string]: { getIssueUrl: string } } = {};
    repoInfos.forEach((info: any) => {
      const repoName = Object.keys(info)[0];
      const { getIssueUrl } = info[repoName];
      repoInfo[repoName] = { getIssueUrl };
    });
  
    return { userInfo, repoInfo, token };
  }
  
export default getUserData