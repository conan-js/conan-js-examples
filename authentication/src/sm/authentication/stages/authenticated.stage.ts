import {NotAuthenticatedStage} from "./notAuthenticated.stage";
import {AppCredentials} from "../../../domain/domain";
import {State} from "conan-ui-core";
import {OnEventCallback, SmListener} from "conan-ui-core";


export interface AuthenticatedActions {
    doTimeout(): NotAuthenticatedStage;
    doLogout(): NotAuthenticatedStage;
}

export interface AuthenticatedListener extends SmListener {
    onAuthenticated?: OnEventCallback <AuthenticatedActions>
}

export interface AuthenticatedStage extends State <'authenticated', AppCredentials>{}
