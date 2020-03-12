import {UserNameAndPassword} from "../../../domain/domain";
import {AuthenticatingStage} from "./authenticating.stage";
import {Stage} from "../../../../lib/conan-sm/stage";
import {OnEventCallback, SmListener} from "../../../../lib/conan-sm/stateMachineListeners";

export interface NotAuthenticatedActions {
    doAuthenticating (userNameAndPassword: UserNameAndPassword): AuthenticatingStage
}

export interface NotAuthenticatedListener extends SmListener{
    onNotAuthenticated?: OnEventCallback <NotAuthenticatedActions>;
}

export interface NotAuthenticatedStage extends Stage<'notAuthenticated', NotAuthenticatedActions>{}
