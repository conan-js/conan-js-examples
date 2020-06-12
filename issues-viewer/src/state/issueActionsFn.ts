import {IssuesData} from "./issuesState$";
import {IssuesReducers} from "./issuesReducersFn";
import {ActionsFn} from "conan-js-core";
import {diContext} from "../context";
import {Asap} from "conan-js-core";
import {Issue} from "../api/gitHub";

export interface IssuesActions {
    fetch(repo: string, org: string, page: number): Asap<IssuesData>;

    fetchIssue(issueId: number): Asap<IssuesData>;

    showIssues(): Asap<IssuesData>;
}


export const issueActionsFn: ActionsFn<IssuesData, IssuesReducers, IssuesActions> = thread => ({
    fetch(repo, org, page): Asap<IssuesData> {
        return thread.monitor(
            diContext.issuesService.fetch(repo, org, page).catch(() => thread.reducers.$fetch([])),
            (issues, reducers) => reducers.$fetch(issues as Issue[]),
            'fetch',
            [repo, org, page]
        )
    },
    fetchIssue(issueId: number): Asap<IssuesData> {
        return thread.chain(reducers=>reducers.$fetchIssue(issueId))
    },
    showIssues(): Asap<IssuesData> {
        return thread.chain(reducers=>reducers.$switchDisplay("issues"))
    }
})
