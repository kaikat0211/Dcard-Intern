import { Octokit } from '@octokit/core';
interface updateIssueInfo {
    token: string
    owner: string
    repo: string
    issueNumber: number
  }
interface updateDataType {
    title?: string
    body?: string
    state?: string
}
const patchIssue = async (patchInfo : updateIssueInfo , updateData : updateDataType) => {
    const octokit = new Octokit({
        auth: patchInfo.token
    });

    try {
        await octokit.request(`PATCH /repos/${patchInfo.owner}/${patchInfo.repo}/issues/${patchInfo.issueNumber}`, {
            owner: patchInfo.owner,
            repo: patchInfo.repo,
            issue_number: patchInfo.issueNumber,
            ...updateData,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
    } catch (error) {
        console.error('Error patching single issues', error);
    }
};

export default patchIssue