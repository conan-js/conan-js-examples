import * as React from "react";
import {Issue, IssueComment} from "../../api/gitHub";
import {UserWithAvatar} from "../../components/UserWithAvatar";


interface ICLProps {
    issue: Issue
    comments: IssueComment[]
}

interface ICProps {
    comment: IssueComment
}

function IssueCommentDisplay({comment}: ICProps) {
    return (
        <div>
            <UserWithAvatar
                user={comment.user}
                orientation="horizontal"
            />

            <div>
                {comment.body}
            </div>
      </div>
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
      <ul>
          {comments.map(comment => (
              <li key={comment.id}>
                  <IssueCommentDisplay comment={comment}/>
              </li>
          ))}
      </ul>
  )
}
