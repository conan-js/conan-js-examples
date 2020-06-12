import * as React from "react";
import {User} from "../api/gitHub";


interface UserAvatarProps {
  user: User
  orientation?: 'vertical' | 'horizontal'
  link?: boolean
  classes?: { [key: string]: string }
}

export const UserWithAvatar = ({
                                 user,
                                 orientation = 'vertical',
                                 link = true,
                                 classes = {}
                               }: UserAvatarProps) => {


  const contents = (
      <React.Fragment>
        <img src={user.avatar_url} alt=""/>
        <div>{user.login}</div>
      </React.Fragment>
  )

  if (link) {
    return (
        <a href={`https://github.com/${user.login}`}>
          {contents}
        </a>
    )
  } else {
    return <span>{contents}</span>
  }
}
