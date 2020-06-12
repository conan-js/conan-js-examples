import {Issue, IssueComment, RepoDetails} from "../api/gitHub";
import {Asap, Asaps} from "conan-js-core";

export interface IssuesService {
    fetch(repo: string, org: string, page: number): Asap<Issue[]>;

    fetchComments(commentsUrl: string): Asap<IssueComment[]>;

    fetchRepoDetails(org: string, repo: string): Asap<RepoDetails>;
}

export class IssuesServiceImpl implements IssuesService {
    fetch(repo: string, org: string, page: number = 1): Asap<Issue[]> {
        return Asaps.fetch<Issue[]>(`https://api.github.com/repos/${org}/${repo}/issues?per_page=25&page=${page}`);
    }

    fetchComments(commentsUrl: string): Asap<IssueComment[]> {
        return Asaps.fetch<IssueComment[]>(commentsUrl);
    }

    fetchRepoDetails(org: string, repo: string): Asap<RepoDetails> {
        return Asaps.fetch(`https://api.github.com/repos/${org}/${repo}`);
    }
}

