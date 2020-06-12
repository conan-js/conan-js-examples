import {Issue} from "../api/gitHub";
import {Conan} from "conan-js-core";
import {ConanState} from "conan-js-core";
import {IssuesReducers, issuesReducersFn} from "./issuesReducersFn";
import {issueActionsFn, IssuesActions} from "./issueActionsFn";


export type IssuesState = ConanState<IssuesData, IssuesActions>;

export interface IssuesData {
    issuesByNumber: Record<number, Issue>;
    issues: Issue[];
    issueId?: number;
    displayType: 'issues' | 'comments';
}

export const issuesState$: IssuesState = Conan.state<IssuesData, IssuesReducers, IssuesActions>({
    name: 'issues',
    initialData: {
        issuesByNumber: {} as Record<number, Issue>,
        issues: [],
        displayType: "issues"
    },
    reducers: issuesReducersFn,
    actions: issueActionsFn
})
