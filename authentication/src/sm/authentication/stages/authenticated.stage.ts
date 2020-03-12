import {NotAuthenticatedStage} from "./notAuthenticated.stage";
import {AppCredentials} from "../../../domain/domain";
import {Stage} from "../../../../lib/conan-sm/stage";
import {OnEventCallback, SmListener} from "../../../../lib/conan-sm/stateMachineListeners";


export interface AuthenticatedActions {
    doTimeout(): NotAuthenticatedStage;
    doLogout(): NotAuthenticatedStage;
}

export interface AuthenticatedListener extends SmListener {
    onAuthenticated?: OnEventCallback <AuthenticatedActions>
}

export interface AuthenticatedStage extends Stage <'authenticated', AppCredentials>{}
