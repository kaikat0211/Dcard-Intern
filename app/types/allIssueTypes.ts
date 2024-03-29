interface Label {
    name: string;
    color: string;
    description: string;
}
export interface Cursor {
    cursor: string
}
export interface AllIssue {
    id: string;
    number: number;
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    state: string;
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
export interface FullIssue {
    cursor: Cursor 
    node: AllIssue
  }