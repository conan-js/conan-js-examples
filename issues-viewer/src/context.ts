import {DiContextFactory} from "conan-js-core";
import {IssuesState, issuesState$} from "./state/issuesState$";
import {IssuesService, IssuesServiceImpl} from "./services/issuesService";
import {IssuesCommentsState, issuesCommentsState$} from "./state/issuesCommentState$";
import {RepoState, repoState$} from "./state/repoState$";
import {RepoDetailsState, repoDetailsState$} from "./state/repoDetailsState$";

interface AuxDependencies {
    issuesService: IssuesService
}

export let diContext = DiContextFactory.createContext<App, AuxDependencies>(
    {
        issuesCommentsState: issuesCommentsState$,
        issuesState: issuesState$,
        repoState: repoState$,
        repoDetailsState: repoDetailsState$
    }, {
        issuesService: IssuesServiceImpl
    }
);

export interface App {
    issuesState: IssuesState;
    issuesCommentsState: IssuesCommentsState;
    repoState: RepoState;
    repoDetailsState: RepoDetailsState;
}
