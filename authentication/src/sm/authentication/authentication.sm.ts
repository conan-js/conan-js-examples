import {
    AuthenticatingActions,
    AuthenticatingListener,
    AuthenticatingStage,
    AuthenticatingStageName
} from "./stages/authenticating.stage";
import {
    NotAuthenticatedActions,
    NotAuthenticatedListener,
    NotAuthenticatedStage,
    NotAuthenticatedStageName
} from "./stages/notAuthenticated.stage";
import {
    AuthenticatedActions,
    AuthenticatedListener,
    AuthenticatedStage,
    AuthenticatedStageName
} from "./stages/authenticated.stage";
import {AppCredentials, UserNameAndPassword} from "../../domain/domain";
import {IBiConsumer} from "../../../lib/conan-utils/typesHelper";
import {BasicSmListener} from "../../../lib/conan-sm/stateMachineListeners";
import {StateMachine} from "../../../lib/conan-sm/stateMachine";


export class AuthenticatedActionsLogic implements AuthenticatedActions {
    doLogout(): NotAuthenticatedStage {
        return {
            stateName: "notAuthenticated",
        };
    }

    doTimeout(): NotAuthenticatedStage {
        return {
            stateName: "notAuthenticated",
        };
    }

}

export class AuthenticatingActionsLogic implements AuthenticatingActions {
    doSuccess(appCredentials: AppCredentials): AuthenticatedStage {
        return {
            data: appCredentials,
            stateName: 'authenticated'
        };
    }

    doUnauthorised(): NotAuthenticatedStage {
        return {
            stateName: 'notAuthenticated'
        };
    }

}

export class NotAuthenticatedActionsLogic implements NotAuthenticatedActions {
    doAuthenticating(userNameAndPassword: UserNameAndPassword): AuthenticatingStage {
        return {
            stateName: 'authenticating',
            data: userNameAndPassword
        };
    }
}

export type Authenticator = IBiConsumer<AuthenticatingActions, UserNameAndPassword>;

export interface AuthenticationSmListener extends NotAuthenticatedListener, AuthenticatingListener, AuthenticatedListener, BasicSmListener {
}

export class AuthenticationPrototype {
    constructor(
        private readonly authenticator: Authenticator,
    ) {
    }

    newBuilder(): StateMachine<AuthenticationSmListener> {
        return new StateMachine()
            .withInitialState('notAuthenticated')
            .withState<
                NotAuthenticatedActions,
                NotAuthenticatedStageName
            >(
                'notAuthenticated',
                NotAuthenticatedActionsLogic,
            )
            .withDeferredStage<
                AuthenticatingStageName,
                AuthenticatingActions,
                UserNameAndPassword
            >(
                "authenticating",
                AuthenticatingActionsLogic,
                this.authenticator,
                ['authenticated']
            ).withState<
                AuthenticatedActions,
                AuthenticatedStageName
            >(
                "authenticated",
                AuthenticatedActionsLogic,
            )
    }
}
