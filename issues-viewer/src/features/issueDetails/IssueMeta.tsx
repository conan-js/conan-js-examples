import * as React from "react";
import {Issue} from "../../api/gitHub";
import {UserWithAvatar} from "../../components/UserWithAvatar";

interface IssueProps {
    issue: Issue
}

const IssueState = ({issue: {state}}: IssueProps) => (
    <span>
    {state}
  </span>
)

const IssueNumber = ({issue}: IssueProps) => (
    <span>
    #{issue.number}
  </span>
)

export const IssueMeta = ({issue}: IssueProps) => {
    return (
        <div>
            <IssueNumber issue={issue}/>
            <IssueState issue={issue}/>
            <UserWithAvatar user={issue.user} orientation="horizontal"/>
        </div>
    )
}
