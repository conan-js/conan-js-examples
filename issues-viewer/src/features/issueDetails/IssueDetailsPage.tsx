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
        <button onClick={showIssuesList}>
            Back to Issues List
        </button>
    );


    const comments = commentsState.commentsByIssue[issue.id];
    let renderedComments;
    if (comments) {
        renderedComments = <IssueComments issue={issue} comments={comments}/>
    }

    let content = (
        <div>
            <h1>{issue.title}</h1>
            {backToIssueListButton}
            <IssueMeta issue={issue}/>
            <IssueLabels labels={issue.labels}/>
            <hr/>
            <div>
                {insertMentionLinks(issue.body)}
            </div>
            <hr/>
            <div>Comments</div>
            <ul>{renderedComments}
            </ul>
        </div>
    )
    return <div>{content}</div>

}
