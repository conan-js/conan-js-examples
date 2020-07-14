import * as React from "react";
import {ChangeEvent, useState} from "react";
import {Button, Grid, TextField, Typography} from "@material-ui/core";

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
            <Grid item container xs={12} direction={"row"}>
                <Grid item xs={1}>
                    <Typography variant={"h6"}>Org:</Typography>
                </Grid>
                <Grid item xs={11} sm={2}>
                    <TextField name="org" size="small" variant={"outlined"} onChange={onOrgChanged} value={currentOrg}/>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant={"h6"}>Repo:</Typography>
                </Grid>
                <Grid item xs={5} sm={2}>
                    <TextField name="repo" size="small" variant={"outlined"} onChange={onRepoChanged}
                               value={currentRepo}/>
                </Grid>
                <Grid item xs={6}>
                    <Button variant={"outlined"}
                            style={{marginLeft: 5}}
                            onClick={onLoadRepoClicked}
                    >
                        Load Repo
                    </Button>
                </Grid>
            </Grid>
            <Grid item container xs={12} direction={"row"}>
                <Grid item xs={1}>
                    <Typography variant={"h6"}>Page:</Typography>
                </Grid>
                <Grid item xs={5} sm={2}>
                    <TextField name="jumpToPage" size="small" variant={"outlined"} onChange={onCurrentPageChanged}
                               value={currentPageText}/>
                </Grid>
                <Grid item xs={6}>
                    <Button variant={"outlined"}
                            style={{marginLeft: 5}}
                            onClick={onJumpToPageClicked}
                    >
                        Jump to Page
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}
