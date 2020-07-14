import * as React from "react";
import {Typography} from "@material-ui/core";

interface OrgProps {
    org: string
    repo: string
}

export type HeaderProps = {
    openIssuesCount: number
} & OrgProps

function OrgRepo({org, repo}: OrgProps) {
    return (
        <span>
      <a href={`https://github.com/${org}`} className="header__org">
        {org}
      </a>
            {' / '}
            <a href={`https://github.com/${org}/${repo}`} className="header__repo">
        {repo}
      </a>
    </span>
    )
}

export function IssuesPageHeader({
                                     openIssuesCount = -1,
                                     org,
                                     repo
                                 }: HeaderProps) {
    if (openIssuesCount === -1) {
        return (
            <><Typography variant={"h4"}> issues for </Typography><OrgRepo org={org} repo={repo}/></>
        )
    } else {
        const pluralizedIssue = openIssuesCount === 1 ? 'issue' : 'issues'
        return (
            <>
                <Typography variant={"h4"}><span className="header__openIssues">{openIssuesCount}</span> open{' '}
                    {pluralizedIssue} for <OrgRepo org={org} repo={repo}/></Typography>
            </>
        )
    }
}
