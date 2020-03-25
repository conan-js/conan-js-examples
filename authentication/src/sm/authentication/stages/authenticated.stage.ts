import {NotAuthenticatedStage} from "./notAuthenticated.stage";
import {AppCredentials} from "../../../domain/domain";
import {State} from "../../../../lib/conan-sm/core/state";
import {OnEventCallback, SmListener} from "../../../../lib/conan-sm/core/stateMachineListeners";


export interface AuthenticatedActions {
    doTimeout(): NotAuthenticatedStage;
    doLogout(): NotAuthenticatedStage;
}

export interface AuthenticatedListener extends SmListener {
    onAuthenticated?: OnEventCallback <AuthenticatedActions>
}

export interface AuthenticatedStage extends State <'authenticated', AppCredentials>{}
