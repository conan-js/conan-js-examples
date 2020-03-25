import {AuthenticatedStage} from "./authenticated.stage";
import {NotAuthenticatedStage} from "./notAuthenticated.stage";
import {AppCredentials, UserNameAndPassword} from "../../../domain/domain";
import {State} from "conan-ui-core";
import {OnEventCallback, SmListener} from "conan-ui-core";


export interface AuthenticatingActions {
    doSuccess (appCredentials: AppCredentials): AuthenticatedStage;
    doUnauthorised (): NotAuthenticatedStage;
}

export interface AuthenticatingListener extends SmListener{
    onAuthenticating?: OnEventCallback <AuthenticatingActions>;
}

export interface AuthenticatingStage extends State <'authenticating', UserNameAndPassword> {}
