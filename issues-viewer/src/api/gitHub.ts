export interface Label {
    id: number
    name: string
    color: string
}

export interface User {
    login: string
    avatar_url: string
}

export interface Issue {
    id: number
    title: string
    number: number
    user: User
    body: string
    labels: Label[]
    comments_url: string
    state: 'open' | 'closed'
    comments: number
}

export interface IssueComment {
    id: number
    body: string
    user: User
    created_at: string
    updated_at: string
}

export interface Label {
    id: number
    name: string
    color: string
}

export interface RepoDetails {
    id: number
    name: string
    full_name: string
    open_issues_count: number
}

