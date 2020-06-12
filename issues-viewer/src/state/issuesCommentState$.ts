import {ConanState} from "conan-js-core";
import {IssueComment} from "../api/gitHub";
import {issuesCommentsReducers, IssuesCommentsReducersFn} from "./issuesCommentsReducersFn";
import {issueCommentsActionsFn, IssuesCommentsActions} from "./issueCommentsActionsFn";
import {Conan} from "conan-js-core";

export interface IssuesCommentsData {
    commentsByIssue: Record<number, IssueComment[] | undefined>
}

export type IssuesCommentsState = ConanState<IssuesCommentsData, IssuesCommentsActions>;

export const issuesCommentsState$: IssuesCommentsState = Conan.state<IssuesCommentsData, IssuesCommentsReducersFn, IssuesCommentsActions>({
    name: 'issues-comments',
    initialData: {
        commentsByIssue: {} as Record<number, IssueComment[]>,
    },
    reducers: issuesCommentsReducers,
    actions: issueCommentsActionsFn
})
