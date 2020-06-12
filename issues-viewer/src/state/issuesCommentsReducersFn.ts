import {Reducers, ReducersFn} from "conan-js-core";
import {IssuesCommentsData} from "./issuesCommentState$";
import {IssueComment} from "../api/gitHub";

export interface IssuesCommentsReducersFn extends Reducers<IssuesCommentsData> {
    $fetchComments(issueId: number, comments: IssueComment[]): IssuesCommentsData;
}

export const issuesCommentsReducers: ReducersFn<IssuesCommentsData, IssuesCommentsReducersFn> = (getState) => ({
    $fetchComments: (issueId: number, comments: IssueComment[]): IssuesCommentsData => {
        getState().commentsByIssue[issueId] = comments;
        return {
            ...getState(),
        }
    }
});

