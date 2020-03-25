import {expect} from "chai";
import {AppCredentials, UserNameAndPassword} from "../../src/domain/domain";
import {AuthenticationPrototype} from "../../src/sm/authentication/authentication.sm";
import {Authenticators} from "../utils/authenticators";
import {SerializedSmEvent, TransitionSmEvent} from "conan-ui-core";
import {ListenerType} from "conan-ui-core";

export const initSequence: SerializedSmEvent[] = [
    {name: "init"},
    {transitionName: "doStart"},
    {name: "start"},
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
            {name: deferStageName, ...transitionPayload? {data: transitionPayload} : undefined},
            transition,
            {name: 'stop'},
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

        let sm = new AuthenticationPrototype(Authenticators.alwaysAuthenticatesSuccessfullyWith(APP_CREDENTIALS)).newBuilder()
            .addListener(['::notAuth=>doAuth', {
                onNotAuthenticated: (actions) => actions.doAuthenticating(USERNAME_AND_PASSWORD),
            }])
            .start('simple-auth');

        expect(sm.getEvents()).to.deep.eq([
            ...initSequence,
            {transitionName: "doInitialise"},
            {name: "notAuthenticated"},
            AUTHENTICATED_SUCCESS_FORK_TRANSITION,
            {name: "authenticated", data: APP_CREDENTIALS},
        ]);
    });

    it("should listen to stages and actions and stop gracefully", () => {
        let sm = new AuthenticationPrototype(Authenticators.alwaysAuthenticatesSuccessfullyWith(APP_CREDENTIALS)).newBuilder()
            .addListener(['::notAuthenticated=>authenticating', {
                onNotAuthenticated: (actions) => actions.doAuthenticating(USERNAME_AND_PASSWORD),
            }], ListenerType.ONCE)
            .addListener(['::authenticated->doTimeout', {
                onAuthenticated: (actions) => actions.doTimeout()
            }], ListenerType.ONCE)
            .start('auth-timeout');

        expect(sm.getEvents()).to.deep.eq([
            ...initSequence,
            {transitionName: "doInitialise"},
            {name: "notAuthenticated"},
            AUTHENTICATED_SUCCESS_FORK_TRANSITION,
            {name: "authenticated", data: APP_CREDENTIALS},
            {transitionName: "doTimeout"},
            {name: "notAuthenticated"},
        ]);
    });


    it("should call many times into a listener", (done) => {
        let calls: string [] = [];
        new AuthenticationPrototype(Authenticators.alwaysAuthenticatesSuccessfullyWith(APP_CREDENTIALS)).newBuilder()
            .addListener(['testMainListener', {
                onNotAuthenticated: (actions) => {
                    actions.doAuthenticating(USERNAME_AND_PASSWORD);
                    calls.push('first not authenticated');
                },
                onAuthenticated: (_) => {
                    calls.push('authenticated');
                }
            }])
            .addListener(['testMainListener - dupe', {
                onNotAuthenticated: () => calls.push('second not authenticated'),
            }])
            .addListener(['stop=>test', {
                onStop: () => {
                    expect(calls).to.deep.eq([
                        'first not authenticated',
                        'second not authenticated',
                        'authenticated',
                    ]);
                    done();
                }
            }])
            .start('auth-test5');
    });
});
