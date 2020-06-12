import * as React from "react";
import {ChangeEvent, useState} from "react";

interface Props {
    org: string
    repo: string
    page: number
    setOrgAndRepo: (org: string, repo: string) => void
    setJumpToPage: (page: number) => void
}

type InputEvent = ChangeEvent<HTMLInputElement>
type ChangeHandler = (e: InputEvent) => void

export const RepoSearchForm = ({
                                   org,
                                   repo,
                                   page,
                                   setOrgAndRepo,
                                   setJumpToPage,
                               }: Props) => {
    const [currentOrg, setCurrentOrg] = useState(org)
    const [currentRepo, setCurrentRepo] = useState(repo)
    const [currentPageText, setCurrentPageText] = useState('' + page)

    const onOrgChanged: ChangeHandler = e => {
        setCurrentOrg(e.target.value)
    }

    const onRepoChanged: ChangeHandler = e => {
        setCurrentRepo(e.target.value)
    }

    const onCurrentPageChanged: ChangeHandler = e => {
        setCurrentPageText(e.target.value)
    }

    const onLoadRepoClicked = () => {
        setOrgAndRepo(currentOrg, currentRepo)
    }

    const onJumpToPageClicked = () => {
        const newPage = parseInt(currentPageText)

        if (newPage >= 1) {
            setJumpToPage(newPage)
        }
    }

    return (
        <form>
            <div>
                <label htmlFor="org" style={{marginRight: 5}}>
                    Org:
                </label>
                <input name="org" value={currentOrg} onChange={onOrgChanged}/>
                <label htmlFor="repo" style={{marginRight: 5, marginLeft: 10}}>
                    Repo:
                </label>
                <input name="repo" value={currentRepo} onChange={onRepoChanged}/>
                <button
                    type="button"
                    style={{marginLeft: 5}}
                    onClick={onLoadRepoClicked}
                >
                    Load Repo
                </button>
            </div>
            <div style={{marginTop: 5}}>
                <label htmlFor="jumpToPage" style={{marginRight: 5}}>
                    Issues Page:
                </label>
                <input
                    name="jumpToPage"
                    value={currentPageText}
                    onChange={onCurrentPageChanged}
                />
                <button
                    type="button"
                    style={{marginLeft: 5}}
                    onClick={onJumpToPageClicked}
                >
                    Jump to Page
                </button>
            </div>
        </form>
    )
}
