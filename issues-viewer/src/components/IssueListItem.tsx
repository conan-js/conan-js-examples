import * as React from "react";
import {Issue} from "../api/gitHub";
import {UserWithAvatar} from "./UserWithAvatar";
import {IssueLabels} from "./IssueLabels";


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
      <div>
        <UserWithAvatar user={user}/>
        <div className="issue__body">
          <a href="#comments" onClick={onIssueClicked}>
            <span>#{number}</span>
            <span>{title}</span>
          </a>
          <br/> ({comments} {pluralizedComments})
          <p className="issue__summary">{body}</p>
            <IssueLabels labels={labels}/>
        </div>
      </div>
  )
}
