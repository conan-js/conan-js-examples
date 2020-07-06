import * as React from "react";
import {Issue, IssueComment} from "../../api/gitHub";
import {Avatar, Divider, Grid, List, ListItem, Typography} from "@material-ui/core";


interface ICLProps {
    issue: Issue
    comments: IssueComment[]
}

interface ICProps {
    comment: IssueComment
}

function IssueCommentDisplay({comment}: ICProps) {
    return (
        <Grid item container direction={"column"} spacing={1} justify={"space-around"}>
            <Grid item container xs={4} spacing={1}>
                <Grid item xs={1}>
                    <Avatar src={comment.user.avatar_url}/>
                </Grid>
                <Grid item xs={1}>
                    <Typography color={"textSecondary"}>
                        {comment.user.login}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}/>
            <Grid item xs={10}>
                <Typography color={"textPrimary"}>
                    {comment.body}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider light/>
            </Grid>
        </Grid>
    )
}

export function IssueComments({comments = [], issue}: ICLProps) {
    // The issue has no comments
    if (issue.comments === 0) {
        return <div className="issue-detail--no-comments">No comments</div>
    }

    // The issue has comments, but they're not loaded yet
    if (!comments || comments.length === 0) {
        return (
            <div className="issue-detail--comments-loading">Comments loading...</div>
        )
    }

    // Comments are loaded
    return (
        <List>
            {comments.map(comment => (
                <ListItem key={comment.id}>
                    <IssueCommentDisplay comment={comment}/>
                </ListItem>
            ))}
        </List>
    )
}
