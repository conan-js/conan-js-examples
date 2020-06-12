import * as React from "react";
import {IssueListItem} from "./IssueListItem";
import {ConnectedState} from "conan-js-core";
import {IssuesData} from "../state/issuesState$";
import {IssuesActions} from "../state/issueActionsFn";


export const IssuesList = ({data, actions}: ConnectedState<IssuesData, IssuesActions>) => {
    if (data.issues != null && data.issues.map != null) {
        let renderedIssues = data.issues.map(issue => (
            <li key={issue.id}>
                <IssueListItem {...issue} showIssueComments={actions.fetchIssue}/>
            </li>
        ))
        return <ul>{renderedIssues}</ul>
    } else {
        return <></>;
    }
}
