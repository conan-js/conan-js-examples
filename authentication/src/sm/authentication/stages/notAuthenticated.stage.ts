import {UserNameAndPassword} from "../../../domain/domain";
import {AuthenticatingStage} from "./authenticating.stage";
import {State} from "../../../../lib/conan-sm/state";
import {OnEventCallback, SmListener} from "../../../../lib/conan-sm/stateMachineListeners";

export interface NotAuthenticatedActions {
    doAuthenticating (userNameAndPassword: UserNameAndPassword): AuthenticatingStage
}

export interface NotAuthenticatedListener extends SmListener{
    onNotAuthenticated?: OnEventCallback <NotAuthenticatedActions>;
}

export interface NotAuthenticatedStage extends State<'notAuthenticated', NotAuthenticatedActions>{}
