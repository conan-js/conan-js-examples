import {Conan} from "conan-js-core";
import {ConanState} from "conan-js-core";

export interface RepoData {
    org: string;
    repo: string;
    page: number;
}

export type RepoState = ConanState<RepoData>;
export const repoState$: RepoState = Conan.light<RepoData>('repo', {org: "rails", repo: "rails", page: 1})

