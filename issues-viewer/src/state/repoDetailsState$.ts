import {ConanState} from "conan-js-core";
import {Reducers, ReducersFn} from "conan-js-core";
import {Asap} from "conan-js-core";
import {ActionsFn} from "conan-js-core";
import {diContext} from "../context";
import {Conan} from "conan-js-core";

export interface RepoDetailsData {
    openIssuesCount: number
    error: string | null
}

export type RepoDetailsState = ConanState<RepoDetailsData, RepoDetailsActions>;

export interface RepoDetailsReducers extends Reducers<RepoDetailsData> {
    $fetchRepoDetails(openIssuesCount: number, error: string): RepoDetailsData;
}

export const repoDetailsReducersFn: ReducersFn<RepoDetailsData, RepoDetailsReducers> = () => ({
    $fetchRepoDetails: (openIssuesCount: number, error: string): RepoDetailsData => ({
        error: error,
        openIssuesCount: openIssuesCount
    })
})

export interface RepoDetailsActions {
    fetchRepoDetails(repo, org): Asap<RepoDetailsData>;
}

export const repoDetailsActionsFn: ActionsFn<RepoDetailsData, RepoDetailsReducers, RepoDetailsActions> = thread => ({
    fetchRepoDetails(repo, org): Asap<RepoDetailsData> {
        return thread.monitor(
            diContext.issuesService.fetchRepoDetails(repo, org).catch(() => thread.reducers.$fetchRepoDetails(-1, "error loading")),
            (repoDetails, reducers) => reducers.$fetchRepoDetails(repoDetails.open_issues_count, ""),
            'fetchRepoDetails',
            [repo, org]
        )
    }
});

export const repoDetailsState$: RepoDetailsState = Conan.state<RepoDetailsData>({
    name: 'repo-details',
    initialData: {openIssuesCount: -1, error: null},
    reducers: repoDetailsReducersFn,
    actions: repoDetailsActionsFn
});

//
//
// export class RepoDetailsStateImpl{
//     constructor(
//         private readonly getData: IProducer<RepoDetailsData>,
//         private readonly issuesService: IssuesService,
//     ) {
//     }
//
//     @Reducer
//     $updateIssueCount( count: number): RepoDetailsData{
//         return {
//             ...this.getData(),
//             openIssuesCount: count
//         }
//     }
//
//     @Reducer
//     $fetchRepoDetails (openIssuesCount: number, error: string): RepoDetailsData{
//         return {
//             error: error,
//             openIssuesCount: openIssuesCount
//         }
//     }
//
//     @MonitorAction
//     updateIssueCount(repo, org): Asap<number> {
//         return this.issuesService.fetchRepoDetails(repo, org)
//             .catch(() => this.$fetchRepoDetails(-1, 'error loading'))
//             .map(it=>it.open_issues_count);
//     }
//
// }
