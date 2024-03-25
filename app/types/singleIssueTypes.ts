export interface Label {
    name: string;
    color: string;
    description: string;
}
export interface Comments {
    body: string
    createdAt: string
    author: {
        login : string
    }
}
export interface SingleIssue {
    number: number;
    title: string;
    body: string;
    state: string;
    createdAt: string;
    updatedAt: string;
    comments: {
        totalCount: number
        nodes?:Comments[]
    }
    author :{
        login : string
    }
    labels: {
        nodes?: Label[]
    };
}

export interface updateIssueInfo {
    token: string,
    owner: string,
    repo: string,
    issueNumber: number,
}