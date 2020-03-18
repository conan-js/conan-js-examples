import {expect} from "chai";
import {AppCredentials, UserNameAndPassword} from "../../src/domain/domain";
import {AuthenticationSm} from "../../src/sm/authentication/authentication.sm";
import {Authenticators} from "../utils/authenticators";
import {SerializedSmEvent, TransitionSmEvent} from "../../lib/conan-sm/stateMachineEvents";
import {ListenerType} from "../../../../conan-ui-core/src/lib/conan-sm/stateMachineListeners";

export const initSequence: SerializedSmEvent[] = [
    {stateName: "init"},
    {transitionName: "doStart"},
    {stateName: "start"},
];

export function forkTransition(
    transitionName: string,
    transitionPayload: any,
    deferStageName: string,
    transition: TransitionSmEvent
): SerializedSmEvent {
    return {
        transitionName,
        ...transitionPayload? {payload: transitionPayload} : undefined,
        fork: [
            ...initSequence,
            {transitionName, ...transitionPayload? {payload: transitionPayload} : undefined},
            {stateName: deferStageName, ...transitionPayload? {data: transitionPayload} : undefined},
            transition,
            {stateName: 'stop'},
        ]
    };
}
describe('authentication test', () => {

    const APP_CREDENTIALS: AppCredentials = {test: '1'};

    const USERNAME_AND_PASSWORD: UserNameAndPassword = ['user', 'pwd'];

    const AUTHENTICATED_SUCCESS_FORK_TRANSITION: SerializedSmEvent = forkTransition("doAuthenticating", USERNAME_AND_PASSWORD, "authenticating", {
        transitionName: "doSuccess",
        payload: APP_CREDENTIALS
    });

    it("should listen to stages and stop gracefully", () => {

        let sm = new AuthenticationSm(Authenticators.alwaysAuthenticatesSuccessfullyWith(APP_CREDENTIALS)).create()
            .addListener(['::notAuth=>doAuth', {
                onNotAuthenticated: (actions) => actions.doAuthenticating(USERNAME_AND_PASSWORD),
            }])
            .start('simple-auth');

        expect(sm.getEvents()).to.deep.eq([
            ...initSequence,
            {transitionName: "doInitialise"},
            {stateName: "notAuthenticated"},
            AUTHENTICATED_SUCCESS_FORK_TRANSITION,
            {stateName: "authenticated", data: APP_CREDENTIALS},
        ]);
    });

    it("should listen to stages and actions and stop gracefully", () => {
        let sm = new AuthenticationSm(Authenticators.alwaysAuthenticatesSuccessfullyWith(APP_CREDENTIALS)).create()
            .addListener(['::notAuthenticated=>authenticating', {
                onNotAuthenticated: (actions, params) => actions.doAuthenticating(USERNAME_AND_PASSWORD),
            }], ListenerType.ONCE)
            .addListener(['::authenticated->doTimeout', {
                onAuthenticated: (actions, params) => actions.doTimeout()
            }], ListenerType.ONCE)
            .start('auth-timeout');

        expect(sm.getEvents()).to.deep.eq([
            ...initSequence,
            {transitionName: "doInitialise"},
            {stateName: "notAuthenticated"},
            AUTHENTICATED_SUCCESS_FORK_TRANSITION,
            {stateName: "authenticated", data: APP_CREDENTIALS},
            {transitionName: "doTimeout"},
            {stateName: "notAuthenticated"},
        ]);
    });


    it("should call many times into a listener", () => {
        let calls: string [] = [];
        new AuthenticationSm(Authenticators.alwaysAuthenticatesSuccessfullyWith(APP_CREDENTIALS)).create()
            .addListener(['testMainListener', {
                onNotAuthenticated: (actions) => {
                    actions.doAuthenticating(USERNAME_AND_PASSWORD);
                    calls.push('first not authenticated');
                },
                onAuthenticated: (_, params) => {
                    calls.push('authenticated');
                }
            }])
            .addListener(['testMainListener - dupe', {
                onNotAuthenticated: () => calls.push('second not authenticated'),
            }])
            .start('auth-test5');

        expect(calls).to.deep.eq([
            'first not authenticated',
            'second not authenticated',
            'authenticated',
        ]);
    });
});
