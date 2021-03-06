import * as React from "react";
import {RepoSearchForm} from "./components/RepoSearchForm";
import {IssuesListPage} from "./features/issuesList/IssuesListPage";
import {diContext} from "./context";
import {IssueDetailsPage} from "./features/issueDetails/IssueDetailsPage";
import {IssuesData} from "./state/issuesState$";
import {useConanState} from "conan-js-core";
import {RepoData, repoState$} from "./state/repoState$";
import {Grid, ThemeProvider} from "@material-ui/core";
import {theme} from "./styles/styles";

export type IssuesViewerProps = IssuesData

export const IssuesViewerApp: React.FC = (): React.ReactElement => {
    return diContext.issuesState.connectData(
        IssuesViewer
    )
}

export const IssuesViewer: React.FC<IssuesViewerProps> = ({displayType, issuesByNumber, issueId, issues}: IssuesData) => {

    const [repoData] = useConanState<RepoData>(repoState$);

    const setOrgAndRepo = (org: string, repo: string) => {
        diContext.repoState.do.update(current => ({...current, org: org, repo: repo}));
    }

    const setJumpToPage = (page: number) => {
        diContext.repoState.do.update(current => ({...current, page: page}));
    }

    let content

    if (displayType === 'issues') {
        content = (
            <Grid container spacing={1} direction={"column"}>
                <Grid item xs={12} lg={4}>
                    <RepoSearchForm
                        org={repoData.org}
                        repo={repoData.repo}
                        page={repoData.page}
                        setOrgAndRepo={setOrgAndRepo}
                        setJumpToPage={setJumpToPage}
                    />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <IssuesListPage
                        org={repoData.org}
                        repo={repoData.repo}
                        page={repoData.page}
                        fetchIssues={diContext.issuesState.do.fetch}
                        fetchRepoDetails={diContext.repoDetailsState.do.fetchRepoDetails}
                        issues={issues}
                    />
                </Grid>
            </Grid>
        )
    } else {
        content = <IssueDetailsPage
            issue={issuesByNumber[issueId]}
            org={repoData.org}
            repo={repoData.repo}
            showIssuesList={diContext.issuesState.do.showIssues}
            fetchComments={diContext.issuesCommentsState.do.fetchComments}
        />;
    }

    return <div className="App"><ThemeProvider theme={theme}>{content}</ThemeProvider></div>
}

export default IssuesViewer
