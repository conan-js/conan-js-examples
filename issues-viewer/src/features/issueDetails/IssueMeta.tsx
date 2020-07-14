import * as React from "react";
import {Issue} from "../../api/gitHub";
import {Avatar, Grid, Typography} from "@material-ui/core";

interface IssueProps {
    issue: Issue
}

const IssueState = ({issue: {state}}: IssueProps) => (
    <Typography variant={"h6"} color={"secondary"}>
        {state}
    </Typography>
)

const IssueNumber = ({issue}: IssueProps) => (
    <Typography variant={"h6"} color={"secondary"}>
        #{issue.number}
    </Typography>
)

export const IssueMeta = ({issue}: IssueProps) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={2}><IssueNumber issue={issue}/></Grid>
            <Grid item xs={2}><IssueState issue={issue}/></Grid>
            <Grid item xs={2}><Avatar src={issue.user.avatar_url}/>
                <Typography color={"textSecondary"}>
                    {issue.user.login}
                </Typography>
            </Grid>
        </Grid>
    )
}
