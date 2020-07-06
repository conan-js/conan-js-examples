import * as React from "react";
import {useEffect} from "react";
import {IssueMeta} from './IssueMeta'
import {insertMentionLinks} from "../../utils/stringUtils";
import {Issue} from "../../api/gitHub";
import {IssueLabels} from "../../components/IssueLabels";
import {IFunction} from "conan-js-core";
import {IssuesCommentsData, issuesCommentsState$} from "../../state/issuesCommentState$";
import {IssueComments} from "./IssueComments";
import {useConanState} from "conan-js-core";
import {IssuesCommentsActions} from "../../state/issueCommentsActionsFn";
import {Button, Divider, Grid, Typography} from "@material-ui/core";
import {Remarkable} from 'remarkable';
import {Markdown} from "../../utils/markDown";


export interface IDProps {
    org: string;
    repo: string;
    issue: Issue;
}

export interface IDStateProps {
    showIssuesList: () => void;
    fetchComments: IFunction<Issue, any>
}

export type IDAllProps = IDProps & IDStateProps;

export const IssueDetailsPage = ({
                                     issue,
                                     showIssuesList,
                                     fetchComments
                                 }: IDAllProps) => {

    const [commentsState] = useConanState<IssuesCommentsData, IssuesCommentsActions>(issuesCommentsState$);

    useEffect(() => {
        if (issue) {
            fetchComments(issue)
        }
    }, []);

    const backToIssueListButton = (
        <Button onClick={showIssuesList} variant={"outlined"} color={"secondary"}>
            Back to Issues List
        </Button>
    );

    const md = new Remarkable();
    const comments = commentsState.commentsByIssue[issue.id];
    let renderedComments;
    if (comments) {
        renderedComments = <IssueComments issue={issue} comments={comments}/>
    }

    let content = (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={"h3"} color={"primary"}>{issue.title}</Typography>
            </Grid>
            <Grid item xs={12}>
                {backToIssueListButton}
            </Grid>
            <Grid item xs={12}>
                <IssueMeta issue={issue}/>
            </Grid>
            <Grid item xs={12}>
                <IssueLabels labels={issue.labels}/>
            </Grid>
            <Grid item container xs={12} spacing={1}>
                <Grid item xs={1}/>
                <Grid item xs={11}>
                    <Typography variant={"body1"} color={"primary"}>
                        <Markdown text={insertMentionLinks(issue.body)}/>
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container xs={12} spacing={1}>
                <Grid item xs={1} />
                <Grid item xs={10}>
                    <Divider light/>
                </Grid>
                <Grid item xs={1} />
            </Grid>
            <Grid item container xs={12} spacing={1}>
                <Grid item xs={2}/>
                <Grid item xs={10}>
                    {renderedComments}
                </Grid>
            </Grid>
        </Grid>
    )
    return <div>{content}</div>

}
