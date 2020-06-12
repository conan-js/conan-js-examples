import {diContext} from "../context";
import {Asap} from "conan-js-core";
import {IssuesCommentsData} from "./issuesCommentState$";
import {IssuesCommentsReducersFn} from "./issuesCommentsReducersFn";
import {Issue, IssueComment} from "../api/gitHub";
import {ActionsFn} from "conan-js-core";

export interface IssuesCommentsActions {
    fetchComments(issue: Issue): Asap<IssuesCommentsData>;
}

export const issueCommentsActionsFn: ActionsFn<IssuesCommentsData, IssuesCommentsReducersFn, IssuesCommentsActions> = thread => ({
    fetchComments(issue: Issue): Asap<IssuesCommentsData> {
        return thread.monitor(
            diContext.issuesService.fetchComments(issue.comments_url).catch(() => thread.reducers.$fetch([])),
            (comments, reducers) => reducers.$fetchComments(issue.id, comments as IssueComment[]),
            'fetchComments',
            issue.comments_url
        )
    }
})
