import {UserNameAndPassword} from "../../../domain/domain";
import {AuthenticatingStage} from "./authenticating.stage";
import {State} from "conan-ui-core";
import {OnEventCallback, SmListener} from "conan-ui-core";

export interface NotAuthenticatedActions {
    doAuthenticating (userNameAndPassword: UserNameAndPassword): AuthenticatingStage
}

export interface NotAuthenticatedListener extends SmListener{
    onNotAuthenticated?: OnEventCallback <NotAuthenticatedActions>;
}

export interface NotAuthenticatedStage extends State<'notAuthenticated', NotAuthenticatedActions>{}
