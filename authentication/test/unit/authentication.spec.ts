import {expect} from "chai";
import {AppCredentials, UserNameAndPassword} from "../../src/domain/domain";
import {AuthenticationPrototype} from "../../src/sm/authentication/authentication.sm";
import {Authenticators} from "../utils/authenticators";

describe('authentication test', () => {
    const APP_CREDENTIALS: AppCredentials = {test: '1'};
    const USERNAME_AND_PASSWORD: UserNameAndPassword = ['user', 'pwd'];

    it("should listen to stages and stop gracefully", (done) => {
        new AuthenticationPrototype(Authenticators.alwaysAuthenticatesSuccessfullyWith(APP_CREDENTIALS)).newBuilder()
            .addListener(['::notAuth=>doAuth,::auth=>stop', {
                onNotAuthenticated: (actions) => actions.doAuthenticating(USERNAME_AND_PASSWORD),
                onAuthenticated: (actions, params) => params.sm.stop(),
            }])
            .addListener(['::stop->test', {
                onStop: (actions, params) => {
                    expect(params.sm.getEvents()).to.deep.eq(params.sm.getEvents());
                    done();
                }

            }])
            .start('auth-test1')
    });

    it("should listen to stages and actions and stop gracefully", (done) => {
        let attempts: number = 0;
        new AuthenticationPrototype(Authenticators.alwaysAuthenticatesSuccessfullyWith(APP_CREDENTIALS)).newBuilder()
            .addListener(['::notAuthenticated=>[authenticating|stop], ::authenticated->[doTimeout]', {
                onNotAuthenticated: (actions, params) => {
                    if (attempts === 1) {
                        params.sm.stop();
                        return;
                    }
                    attempts++;
                    actions.doAuthenticating(USERNAME_AND_PASSWORD);
                },
                onAuthenticated: (actions, params) => setTimeout(() => actions.doTimeout()),
            }])
            .addListener(['stop => test', {
                onStop: (_, params) => {
                    {
                        expect(params.sm.getEvents()).to.deep.eq(params.sm.getEvents());
                        done();
                    }

                },
            }])
            .start('auth-test2')
    });


    it("should queue a request", (done) => {
        new AuthenticationPrototype(Authenticators.alwaysAuthenticatesSuccessfullyWith(APP_CREDENTIALS)).newBuilder()
            .addListener(['onNotAuthenticated=>doAuthenticating', {
                onNotAuthenticated: (actions) => actions.doAuthenticating(USERNAME_AND_PASSWORD)
            }])
            .addListener(['testMainListener', {
                onAuthenticated: (actions, params) => params.sm.stop()
            }])
            .addListener(['stop=>test', {
                onStop: (_, params) => {
                    expect(params.sm.getEvents()).to.deep.eq(params.sm.getEvents());
                    done();
                }

            }])
            .start('auth-test4')
    });

    it("should call many times into a listener", (done) => {
        let calls: string [] = [];
        new AuthenticationPrototype(Authenticators.alwaysAuthenticatesSuccessfullyWith(APP_CREDENTIALS)).newBuilder()
            .addListener(['testMainListener', {
                onNotAuthenticated: (actions) => {
                    actions.doAuthenticating(USERNAME_AND_PASSWORD);
                    calls.push('first not authenticated');
                },
                onAuthenticated: (_, params) => {
                    calls.push('authenticated');
                    params.sm.stop();
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
