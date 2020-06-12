import * as React from "react";
import {useEffect} from "react";
import {IBiConsumer, ITriConsumer} from "conan-js-core";
import {Issue} from "../../api/gitHub";
import {IssuesList} from "../../components/IssuesList";
import {diContext} from "../../context";
import {HeaderProps, IssuesPageHeader} from "./IssuesPageHeader";
import {repoDetailsState$} from "../../state/repoDetailsState$";

export interface ILPageProps {
    org: string
    repo: string
    page: number
}

export interface ILPageStateProps {
    fetchIssues: ITriConsumer<string, string, number>;
    issues: Issue[];
    fetchRepoDetails: IBiConsumer<string, string>;
}

export const IssuesListPage = ({
                                   org,
                                   repo,
                                   page = 1,
                                   fetchIssues,
                                   fetchRepoDetails,
                               }: ILPageProps & ILPageStateProps) => {

    useEffect(() => {
        fetchIssues(org, repo, page);
        fetchRepoDetails(org, repo);
    }, [org, repo, page]);

    return (
        <div id="issue-list-page">
            {repoDetailsState$.connectMap<HeaderProps>(
                IssuesPageHeader,
                data => ({
                    org: org,
                    repo: repo,
                    openIssuesCount: data.openIssuesCount
                })
            )
            }
            {diContext.issuesState.connect(IssuesList)}
        </div>
    )
}
