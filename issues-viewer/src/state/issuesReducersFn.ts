import {Issue} from "../api/gitHub";
import {IssuesData} from "./issuesState$";
import {Reducers, ReducersFn} from "conan-js-core";


export interface IssuesReducers extends Reducers<IssuesData> {
    $fetch(issues: Issue[]): IssuesData;

    $fetchIssue(issueId: number): IssuesData;

    $switchDisplay(displayType: 'issues' | 'comments'): IssuesData;
}

export const issuesReducersFn: ReducersFn<IssuesData, IssuesReducers> = (getState) => ({
    $fetch: (issues: Issue[]): IssuesData => {
        issues.forEach(issue => {
            getState().issuesByNumber[issue.number] = issue
        })
        return {
            ...getState(),
            issues: issues,
            displayType: 'issues'
        }
    },
    $fetchIssue: (issueId: number): IssuesData => ({
        ...getState(),
        issueId: issueId,
        displayType: 'comments'
    }),
    $switchDisplay(displayType): IssuesData {
        return {
            ...getState(),
            displayType: displayType
        }
    }
})
