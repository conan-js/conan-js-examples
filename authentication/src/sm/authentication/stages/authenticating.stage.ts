import {AuthenticatedStage} from "./authenticated.stage";
import {NotAuthenticatedStage} from "./notAuthenticated.stage";
import {AppCredentials, UserNameAndPassword} from "../../../domain/domain";
import {State} from "../../../../lib/conan-sm/state";
import {OnEventCallback, SmListener} from "../../../../lib/conan-sm/stateMachineListeners";


export interface AuthenticatingActions {
    doSuccess (appCredentials: AppCredentials): AuthenticatedStage;
    doUnauthorised (): NotAuthenticatedStage;
}

export interface AuthenticatingListener extends SmListener{
    onAuthenticating?: OnEventCallback <AuthenticatingActions>;
}

export interface AuthenticatingStage extends State <'authenticating', UserNameAndPassword> {}
