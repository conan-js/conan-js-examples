import {AppCredentials, UserNameAndPassword} from "../domain/domain";
import {IConsumer} from "../../../../core/conan-utils/typesHelper";
import {SmListener} from "../../../../core/conan-sm/events/stateMachineListeners";
import {Reaction, ReactionType} from "../../../../core/conan-sm/reactions/reactor";
import {StateMachineBuilder, StateMachineBuilder$} from "../../../../core/conan-sm/stateMachineBuilder";
import {State} from "../../../../core/conan-sm/core/state";

//----> ::NOT AUTHENTICATED
export interface NotAuthenticatedState extends State<'notAuthenticated', NotAuthenticatedPaths>{}
export interface NotAuthenticatedPaths {
    toAuthenticating (userNameAndPassword: UserNameAndPassword): AuthenticatingState
}
//<---- ::NOT AUTHENTICATED


//----> ::AUTHENTICATING
export interface AuthenticatingState extends State <'authenticating', UserNameAndPassword> {}
export interface AuthenticatingPaths {
    toAuthenticated (appCredentials: AppCredentials): AuthenticatedState;
    toNotAuthenticated (): NotAuthenticatedState;
}
//<---- ::AUTHENTICATING


//----> ::AUTHENTICATED
export interface AuthenticatedState extends State <'authenticated', AppCredentials>{}
export interface AuthenticatedPaths {
    toNotAuthenticated(): NotAuthenticatedState;
}
//<---- ::AUTHENTICATED


//----> (LISTENERS)
export interface AuthenticationSmListener extends SmListener{
    onAuthenticated?: Reaction <AuthenticatedPaths>;
    onAuthenticating?: Reaction<AuthenticatingPaths>;
    onNotAuthenticated?: Reaction <NotAuthenticatedPaths>;
}
//<---- (LISTENERS)


//----> SM PARAMS
export type Authenticator = IConsumer<AuthenticatingPaths>;
export interface AuthenticationSmParams {
    authenticator: Authenticator
}
//<---- SM PARAMS

export let AuthenticationSmBuilder$ : StateMachineBuilder$<AuthenticationSmListener, AuthenticationSmParams> =
    (params) =>
        new StateMachineBuilder<AuthenticationSmListener>()
            .withState<NotAuthenticatedPaths>(
                {
                    name: 'notAuthenticated',
                    paths: () => ({
                        toAuthenticating(userNameAndPassword: UserNameAndPassword): AuthenticatingState {
                            return {
                                name: 'authenticating',
                                data: userNameAndPassword
                            };
                        }
                    })
                }
            )
            .withState<AuthenticatingPaths, UserNameAndPassword>(
                {
                    name: "authenticating",
                    paths: () => ({
                        toAuthenticated(appCredentials: AppCredentials): AuthenticatedState {
                            return {
                                data: appCredentials,
                                name: 'authenticated'
                            };
                        },

                        toNotAuthenticated(): NotAuthenticatedState {
                            return {
                                name: 'notAuthenticated'
                            };
                        }
                    }),
                    reactions: [{
                        metadata: {
                            name: '::authenticating->authenticator',
                            executionType: ReactionType.ALWAYS
                        },
                        value: (actions) => actions.defer(params.authenticator)
                    }]
                }
                ,
            ).withState<AuthenticatedPaths, AppCredentials>(
                {
                    name: "authenticated",
                    paths: () => ({
                        toNotAuthenticated(): NotAuthenticatedState {
                            return {
                                name: "notAuthenticated",
                            };
                        },
                    })
                }
            );
