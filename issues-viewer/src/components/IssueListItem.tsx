import * as React from "react";
import {Issue} from "../api/gitHub";
import {IssueLabels} from "./IssueLabels";
import {Avatar, Divider, Grid, Typography} from "@material-ui/core";
import {shorten} from "../utils/stringUtils";


type Props = Issue & {
    showIssueComments: (issueId: number) => void
}

export const IssueListItem = ({
                                  number,
                                  title,
                                  labels,
                                  user,
                                  comments,
                                  body = '',
                                  showIssueComments
                              }: Props) => {
    const onIssueClicked = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        showIssueComments(number)
    }

    const pluralizedComments = comments === 1 ? 'comment' : 'comments'

    return (
        <Grid item container direction={"row"} justify={"space-around"}>
            <Grid item xs={3}>
                <Avatar src={user.avatar_url}></Avatar>
                <Typography color={"textSecondary"}>
                    {user.login}
                </Typography>
            </Grid>
            <Grid item xs={9}>
                <a href="#comments" onClick={onIssueClicked}>
                    <Typography color={"primary"}><span>#{number}</span></Typography>
                    <Typography color={"secondary"}><span> {title}</span></Typography>
                </a>
                <Typography color={"secondary"}>({comments} {pluralizedComments})</Typography>
                <Typography color={"primary"}>{shorten(body)}</Typography>
                <IssueLabels labels={labels}/>
                <Divider/>
            </Grid>
        </Grid>
    )
}
