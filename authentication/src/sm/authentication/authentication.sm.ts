import {
    AuthenticatingActions,
    AuthenticatingListener,
    AuthenticatingStage,
} from "./stages/authenticating.stage";
import {
    NotAuthenticatedActions,
    NotAuthenticatedListener,
    NotAuthenticatedStage,
} from "./stages/notAuthenticated.stage";
import {
    AuthenticatedActions,
    AuthenticatedListener,
    AuthenticatedStage,
} from "./stages/authenticated.stage";
import {AppCredentials, UserNameAndPassword} from "../../domain/domain";
import {IBiConsumer} from "../../../lib/conan-utils/typesHelper";
import {BasicSmListener} from "../../../lib/conan-sm/stateMachineListeners";
import {StateMachineTreeDefBuilder} from "../../../lib/conan-sm/stateMachineTreeDefBuilder";
import {SmPrototype} from "../../../lib/conan-sm-sugar/smPrototype";


export class AuthenticatedActionsLogic implements AuthenticatedActions {
    doLogout(): NotAuthenticatedStage {
        return {
            name: "notAuthenticated",
        };
    }

    doTimeout(): NotAuthenticatedStage {
        return {
            name: "notAuthenticated",
        };
    }

}

export class AuthenticatingActionsLogic implements AuthenticatingActions {
    doSuccess(appCredentials: AppCredentials): AuthenticatedStage {
        return {
            data: appCredentials,
            name: 'authenticated'
        };
    }

    doUnauthorised(): NotAuthenticatedStage {
        return {
            name: 'notAuthenticated'
        };
    }

}

export class NotAuthenticatedActionsLogic implements NotAuthenticatedActions {
    doAuthenticating(userNameAndPassword: UserNameAndPassword): AuthenticatingStage {
        return {
            name: 'authenticating',
            data: userNameAndPassword
        };
    }
}

export type Authenticator = IBiConsumer<AuthenticatingActions, UserNameAndPassword>;

export interface AuthenticationSmListener extends NotAuthenticatedListener, AuthenticatingListener, AuthenticatedListener, BasicSmListener {
}

export class AuthenticationSm {
    constructor(
        private readonly authenticator: Authenticator,
    ) {
    }

    create(): SmPrototype<AuthenticationSmListener> {
        return new SmPrototype(new StateMachineTreeDefBuilder()
            .withInitialState('notAuthenticated')
            .withState<
                NotAuthenticatedActions,
                'notAuthenticated'
            >(
                'notAuthenticated',
                NotAuthenticatedActionsLogic,
            )
            .withDeferredStage<
                'authenticating',
                AuthenticatingActions,
                UserNameAndPassword
            >(
                "authenticating",
                AuthenticatingActionsLogic,
                this.authenticator,
                ['authenticated']
            ).withState<
                AuthenticatedActions,
                'authenticated'
            >(
                "authenticated",
                AuthenticatedActionsLogic,
            )
        )
    }
}
